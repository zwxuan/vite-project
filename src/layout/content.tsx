//main.tsx
import React, { useState, useEffect } from 'react';
import { Layout, Tabs, } from "antd";
import { HomeOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/hooks/use_global.hooks';
import { selectUserState } from "@/store/reducers/user";
import type { UserLoginState } from '@/store/reducers/global_state';
import { Outlet, useLocation } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom';
import AppMenu from './menu';
import routers from '@/router';
import Home from './home';
import { setCollapsed } from '@/store/reducers/global';

const { Content } = Layout;

interface TabItem {
  key: string;
  label: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  closable?: boolean;
}

interface AppSiderProps {
  collapsed: boolean;
}

const AppContent: React.FC<AppSiderProps> = ({ collapsed }) => {
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
  };
  
  const [activeKey, setActiveKey] = useState<string>('');
  const [tabs, setTabs] = useState<TabItem[]>([{
    key: 'home',
    label: '首页',
    children: <Home />,
    closable: false,
    icon: <HomeOutlined />
  }]);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const handleTabChange = (key: string) => {
    setActiveKey(key);
    //tabs切换时记录当前tabskey，用于同步面包屑
    dispatch(setCollapsed({collapsed: false,tabsActiveKey: key}));
  };

  const addTab = (key: string, title: string) => {
    const existingTab = tabs.find(tab => tab.key === key);
    const element = findElementByPath(routers.routes, key);
    
    if (!existingTab) {
      if (element) {
        setTabs([...tabs, { 
          key, 
          label: title, 
          children: (
            <>
              {element}
            </>
          )
        }]);
        setActiveKey(key);
      } else {
        console.warn(`找不到路径 ${key} 对应的组件`);
      }
    } else {
      setActiveKey(existingTab.key);
    }
  };

  const findElementByPath = (routes: RouteObject[], path: string): React.ReactNode | null => {
    // 直接查找完整路径匹配
    for (const route of routes) {
      if (route.path === path) {
        return route.element;
      }
    }
    
    // 处理嵌套路由
    for (const route of routes) {
      if (route.children) {
        // 检查是否是父路由路径
        if (route.path && path.startsWith(route.path + '/')) {
          // 构建子路由的完整路径并检查是否匹配
          for (const childRoute of route.children) {
            if (!childRoute.path) continue;
            
            const childFullPath = childRoute.path.startsWith('/') 
              ? childRoute.path 
              : `${route.path}/${childRoute.path}`;
              
            if (childFullPath === path || `/${childFullPath}` === path) {
              console.log('找到匹配的子路由:', childFullPath, '元素:', childRoute.element);
              return childRoute.element;
            }
          }
        }
        
        // 递归查找更深层次的嵌套路由
        const found = findElementByPath(route.children, path);
        if (found) return found;
      }
    }
    
    return null;
  };

  const findRouteByPath = (routes: RouteObject[], path: string): RouteObject | null => {
    for (const route of routes) {
      // 检查完整路径匹配
      if (route.path === path) {
        return route;
      }
      // 检查嵌套路由
      if (route.children) {
        // 对于嵌套路由，我们需要检查当前路径是否是父路径的一部分
        if (path.startsWith(route.path + '/') || path === route.path) {
          // 先在子路由中查找完整匹配
          const childRoute = findRouteByPath(route.children, path);
          if (childRoute) return childRoute;
          
          // 如果没有完整匹配，检查相对路径匹配
          if (route.path !== '/') { // 避免根路径的特殊情况
            const relativePath = path.substring(route.path?.length || 0);
            // 确保相对路径以/开头
            const normalizedRelativePath = relativePath.startsWith('/') ? relativePath : '/' + relativePath;
            
            for (const childRoute of route.children) {
              const childFullPath = childRoute.path?.startsWith('/') 
                ? childRoute.path 
                : (route.path + '/' + childRoute.path);
                
              if (childFullPath === path) {
                return childRoute;
              }
            }
          }
        }
      }
    }
    return null;
  };

  useEffect(() => {
    const currentKey = location.pathname;
    
    // 首先尝试直接查找完整路径匹配的路由
    let route = routers.routes[0].children?.find(route => route.path === currentKey);
    
    // 如果没有找到，尝试查找嵌套路由
    if (!route) {
      // 遍历所有路由，查找嵌套路由
      for (const parentRoute of routers.routes[0].children || []) {
        if (parentRoute.children && parentRoute.path && currentKey.startsWith(parentRoute.path + '/')) {
          // 查找匹配的子路由
          for (const childRoute of parentRoute.children) {
            if (!childRoute.path) continue;
            
            const childFullPath = childRoute.path.startsWith('/') 
              ? childRoute.path 
              : `${parentRoute.path}/${childRoute.path}`;
              
            if (childFullPath === currentKey || `/${childFullPath}` === currentKey) {
              route = childRoute;
              break;
            }
          }
          if (route) break;
        }
      }
      
      // 如果仍然没有找到，使用findRouteByPath作为备选方案
      if (!route) {
        const foundRoute = findRouteByPath(routers.routes, currentKey);
        route = foundRoute || undefined;
      }
    }
    
    const title = route?.handle?.title;
    console.log('当前路径:', currentKey, '找到路由:', route?.path, '标题:', title);
    if (title) {
      addTab(currentKey, title);
    }
  }, [location]);

  const removeTab = (targetKey: string) => {
    const newTabs = tabs.filter(tab => tab.key !== targetKey);
    setTabs(newTabs);
    if (activeKey === targetKey) {
      const lastTab = newTabs[newTabs.length - 1];
      setActiveKey(lastTab?.key || '');
      //tabs切换时记录当前tabskey，用于同步面包屑
      dispatch(setCollapsed({collapsed: false,tabsActiveKey: lastTab?.key || ''}));
    }
  };

  return (
    <Content style={containerStyle}>
      <AppMenu collapsed={collapsed}></AppMenu>
      <Tabs 
        activeKey={activeKey} 
        onChange={handleTabChange}
        items={tabs}
        type="editable-card"
        hideAdd
        onEdit={(targetKey: any, action) => {
          if (action === 'remove') {
            removeTab(targetKey as string);
          }
        }} 
      />
      {/* <Outlet></Outlet> */}
    </Content>
  );
};

export default AppContent;
//main.tsx
import React, { useState, useEffect } from 'react';
import { Layout, Tabs, } from "antd";
import { HomeOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/hooks/use_global.hooks';
import { selectUserState } from "@/store/reducers/user";
import type { UserLoginState } from '@/store/reducers/global_state';
import { Outlet, useLocation } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom';
import AppMenu from './menu';
import routers from '@/router';

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
    key: '/',
    label: '首页',
    children: '',
    closable: false,
    icon: <HomeOutlined />
  }]);
  const location = useLocation();

  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  const addTab = (key: string, title: string) => {
    const existingTab = tabs.find(tab => tab.key === key);
    const element = findElementByPath(routers.routes, key);
    if (!existingTab) {
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
      setActiveKey(existingTab.key);
    }
  };

  const findElementByPath = (routes: RouteObject[], path: string): React.ReactNode | null => {
    for (const route of routes) {
      if (route.path === path) {
        return route.element;
      }
      if (route.children) {
        const found = findElementByPath(route.children, path);
        if (found) return found;
      }
    }
    return null;
  };

  useEffect(() => {
    const currentKey = location.pathname;
    const route = routers.routes[0].children?.find(route => route.path === currentKey);
    const title = route?.handle?.title;
    if (title) {
      addTab(currentKey, title);
    }
  }, [location]);

  const removeTab = (targetKey: string) => {
    const newTabs = tabs.filter(tab => tab.key !== targetKey);
    setTabs(newTabs);
    if (activeKey === targetKey) {
      const lastTab = newTabs[newTabs.length - 1];
      setActiveKey(lastTab?.key || '/');
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
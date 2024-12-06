//main.tsx
import React from 'react';
import { Layout } from "antd";
import { useAppSelector} from '@/hooks/use_global.hooks';
import { selectUserState } from "@/store/reducers/user";
import type { UserLoginState } from '@/store/reducers/global_state';
import {Outlet}  from 'react-router-dom'
import AppMenu from './menu';
const { Content } = Layout;
interface AppSiderProps {
  collapsed: boolean;
}
const AppContent : React.FC<AppSiderProps> = ({collapsed}) => {
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
  };

  return (
    <Content style={containerStyle}>
      <AppMenu collapsed={collapsed}></AppMenu>
      {/* <div>{userLoginState.UserName}</div> */}
      <Outlet />
    </Content>
  );
};
export default AppContent;
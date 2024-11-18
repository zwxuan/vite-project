//main.tsx
import React from 'react';
import { Layout } from "antd";
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
      {/* <div style={{height:'900px',width:'1200px',background:'red'}}>123</div> */}
    </Content>
  );
};
export default AppContent;
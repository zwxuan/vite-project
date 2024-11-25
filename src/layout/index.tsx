import React from 'react';
import { Layout} from 'antd';
import { useAppSelector} from '@/hooks/use_global.hooks';
import { selectCollapsed } from "@/store/reducers/global";
import AppHead from './head';
import AppContext from './content';

///组件库 js 引用

const App: React.FC = () => {
  const collapsed: boolean = useAppSelector(selectCollapsed);
  return (
    
    <Layout className="app-layout ">
        <AppHead collapsed={collapsed} />
        <AppContext collapsed={collapsed}>
          
        </AppContext>
    </Layout>
    
  );
};

export default App;
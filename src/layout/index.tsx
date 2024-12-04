import React from 'react';
import { Layout} from 'antd';
import { useAppSelector} from '@/hooks/use_global.hooks';
import { selectGlobalState } from "@/store/reducers/global";
import type { GlobalState } from '@/store/reducers/global_state';
import AppHead from './head';
import AppContext from './content';

///组件库 js 引用

const App: React.FC = () => {
  const globalState:GlobalState = useAppSelector(selectGlobalState);

  return (
    
    <Layout className="app-layout ">
        <AppHead collapsed={globalState.collapsed} />
        <AppContext collapsed={globalState.collapsed}>

        </AppContext>
        
    </Layout>
  );
};

export default App;
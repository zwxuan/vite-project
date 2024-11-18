import React from 'react';
import { Layout} from 'antd';
import AppHead from './head';
import AppContext from './content';


const App: React.FC = () => {

  return (
    <Layout className="app-layout ">
        <AppHead />
        <AppContext>
        </AppContext>
    </Layout>
    
  );
};

export default App;
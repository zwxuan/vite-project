import React, { Suspense } from 'react';
import { Layout, Spin } from 'antd';
import { useAppSelector } from '@/hooks/use_global.hooks';
import { selectGlobalState } from "@/store/reducers/global";
import type { GlobalState } from '@/store/reducers/global_state';
import AppHead from './head';
import AppContext from './content';
import { useTranslation } from 'react-i18next';
const App: React.FC = () => {
  const globalState: GlobalState = useAppSelector(selectGlobalState);
  const { i18n, t } = useTranslation(undefined, { useSuspense: false });
  return (

    <Layout className="app-layout ">
      <AppHead collapsed={globalState.collapsed} i18n_page={i18n} />
      <Suspense fallback={
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Spin size="large" tip="加载中..." />
        </div>
      }>
        <AppContext collapsed={globalState.collapsed}>
        </AppContext>
      </Suspense>
    </Layout>

  );
};

export default App;
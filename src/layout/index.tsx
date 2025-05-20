import React, { Suspense } from 'react';
import { Layout} from 'antd';
import { useAppSelector} from '@/hooks/use_global.hooks';
import { selectGlobalState } from "@/store/reducers/global";
import type { GlobalState } from '@/store/reducers/global_state';
import AppHead from './head';
import AppContext from './content';
import { useTranslation } from 'react-i18next';

///组件库 js 引用

const App: React.FC = () => {
  const globalState:GlobalState = useAppSelector(selectGlobalState);
  const {i18n, t } = useTranslation(undefined, { useSuspense: false });
  return (
    <Suspense fallback={<div>Loading translations...</div>}>
      <Layout className="app-layout ">
          <AppHead collapsed={globalState.collapsed} i18n_page={i18n} />
          <AppContext collapsed={globalState.collapsed}>

          </AppContext>
      </Layout>
    </Suspense>
  );
};

export default App;
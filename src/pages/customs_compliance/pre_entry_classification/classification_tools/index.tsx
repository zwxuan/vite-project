import React from 'react';
import { Tabs, Tooltip } from 'antd';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import SuggestionPanel from './suggestion';
import HistoryPanel from './history';
import TariffPanel from './tariff';

const ClassificationTools: React.FC = () => {
  const items = [
    {
      key: 'suggestion',
      label: i18n.t(LocaleHelper.getClassificationSuggestionPageTitle()),
      children: <SuggestionPanel />,
    },
    {
      key: 'history',
      label: i18n.t(LocaleHelper.getHistoricalClassificationPageTitle()),
      children: <HistoryPanel />,
    },
    {
      key: 'tariff',
      label: i18n.t(LocaleHelper.getTariffDataPageTitle()),
      children: <TariffPanel />,
    },
  ];

  return (
    <div style={{ height: 'calc(100vh - 80px)', overflow: 'hidden' }}>
      <div className="nc-bill-header-area" style={{ marginBottom: 0, paddingBottom: 0 }}>
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap">
            <span className="bill-info-title">
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px', marginRight: '8px' }} />
              {i18n.t(LocaleHelper.getClassificationToolsPageTitle())}
              <Tooltip
                title={
                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                            <li style={{ marginBottom: '10px' }}>
                                <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                                    <b>{i18n.t(LocaleHelper.getClassificationToolsHelpLabel())}</b>
                                </span>
                                <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                                    <li>
                                        <b>{i18n.t(LocaleHelper.getClassificationToolsHelpRole())}</b>
                                        {i18n.t(LocaleHelper.getClassificationToolsHelpRoleDesc())}
                                    </li>
                                    <li>
                                        <b>{i18n.t(LocaleHelper.getClassificationToolsHelpOrigin())}</b>
                                        {i18n.t(LocaleHelper.getClassificationToolsHelpOriginDesc())}
                                    </li>
                                    <li>
                                        <b>{i18n.t(LocaleHelper.getClassificationToolsHelpFunc())}</b>
                                        {i18n.t(LocaleHelper.getClassificationToolsHelpFuncDesc())}
                                    </li>
                                </ul>
                            </li>
                        </ol>
                    </div>
                }
                color='white'
              >
                <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
              </Tooltip>
            </span>
          </div>
        </div>
      </div>
      <div style={{ padding: '0 16px 16px 16px', backgroundColor: '#fff', height: '100%' }}>
          <Tabs defaultActiveKey="suggestion" items={items} />
      </div>
    </div>
  );
};

export default ClassificationTools;
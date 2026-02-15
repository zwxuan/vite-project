import React from 'react';
import { Tooltip } from 'antd';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import '@/pages/page_list.less';
import CustomIcon from '@/components/custom-icon';

const ReceiptManagement: React.FC = () => {
  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
        <div className="nc-bill-header-area">
            <div className="header-title-search-area">
                 <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                    <span className="bill-info-title" style={{ display: 'flex', alignItems: 'center' }}>
                        <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px', marginRight: '8px' }} />
                        {i18n.t(LocaleHelper.getReceiptManagementTitle())}
                        <Tooltip
                            title={
                                <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                    <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                        <li style={{ marginBottom: '10px' }}>
                                            <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                                                <b>说明</b>
                                            </span>
                                            <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                                                <li>
                                                    <b>{i18n.t(LocaleHelper.getReceiptManagementPageHelpRoleDesc()) || '角色：'}</b>
                                                    {i18n.t(LocaleHelper.getReceiptManagementPageHelpRoleDesc())}
                                                </li>
                                                <li>
                                                    <b>{i18n.t(LocaleHelper.getReceiptManagementPageHelpOriginDesc()) || '数据来源：'}</b>
                                                    {i18n.t(LocaleHelper.getReceiptManagementPageHelpOriginDesc())}
                                                </li>
                                                <li>
                                                    <b>{i18n.t(LocaleHelper.getReceiptManagementPageHelpFuncDesc()) || '功能说明：'}</b>
                                                    {i18n.t(LocaleHelper.getReceiptManagementPageHelpFuncDesc())}
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
        <div style={{ padding: '20px' }}>
             功能开发中...
        </div>
    </div>
  );
};

export default ReceiptManagement;

import React, { useState, useEffect } from 'react';
import { Table, Button, message, Tooltip, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AdvancedSearchForm from '@/components/search-form';
import { fields } from './search_fields';
import { getColumns } from './columns';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import '@/pages/page_list.less';
import CustomIcon from '@/components/custom-icon';
import { getSecurityFilingList } from '@/api/customs_compliance/manifest_security/security_filing_service';
import { SecurityFiling } from '@/types/customs_compliance/manifest_security/security_filing';

const SecurityFilingManagement: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState<SecurityFiling[]>([]);

    const fetchData = async (params: any = {}) => {
        setLoading(true);
        try {
            const res = await getSecurityFilingList(params);
            setDataSource(res.list);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (values: any) => {
        fetchData(values);
    };

    const handleAction = (key: string, record: any) => {
        message.info(`Action: ${key}`);
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ display: 'flex', alignItems: 'center' }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px', marginRight: '8px' }} />
                            {i18n.t(LocaleHelper.getSecurityFilingManagementTitle())}
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
                                                        <b>{i18n.t(LocaleHelper.getSecurityFilingManagementPageHelpRoleDesc()) || '角色：'}</b>
                                                        {i18n.t(LocaleHelper.getSecurityFilingManagementPageHelpRoleDesc())}
                                                    </li>
                                                    <li>
                                                        <b>{i18n.t(LocaleHelper.getSecurityFilingManagementPageHelpOriginDesc()) || '数据来源：'}</b>
                                                        {i18n.t(LocaleHelper.getSecurityFilingManagementPageHelpOriginDesc())}
                                                    </li>
                                                    <li>
                                                        <b>{i18n.t(LocaleHelper.getSecurityFilingManagementPageHelpFuncDesc()) || '功能说明：'}</b>
                                                        {i18n.t(LocaleHelper.getSecurityFilingManagementPageHelpFuncDesc())}
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
                <div className="header-button-area">
                    <span className="button-app-wrapper"></span>
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary" icon={<PlusOutlined />}>新建申报</Button>
                        </div>
                    </div>
                </div>
            </div>
            <AdvancedSearchForm fields={fields} onSearch={handleSearch} />
            <div style={{ padding: '0 20px 20px' }}>
                <Table
                    columns={getColumns(handleAction)}
                    dataSource={dataSource}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default SecurityFilingManagement;

import React, { useState, useEffect } from 'react';
import { Table, Button, message, Tooltip, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import AdvancedSearchForm from '@/components/search-form';
import { fields } from './search_fields';
import { getColumns } from './columns';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import '@/pages/page_list.less';
import CustomIcon from '@/components/custom-icon';
import { getSecurityFilingList, getSecurityStatusHistory, updateSecurityStatus } from '@/api/customs_compliance/manifest_security/security_filing_service';
import { SecurityFiling } from '@/types/customs_compliance/manifest_security/security_filing';
import StatusHistoryModal from '../components/StatusHistoryModal';

const SecurityFilingManagement: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState<SecurityFiling[]>([]);
    const [statusHistoryVisible, setStatusHistoryVisible] = useState(false);
    const [statusHistoryData, setStatusHistoryData] = useState<any[]>([]);
    const [statusHistoryLoading, setStatusHistoryLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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

    const handleAction = async (key: string, record: any) => {
        if (key === 'track') {
            setStatusHistoryVisible(true);
            setStatusHistoryLoading(true);
            try {
                const history = await getSecurityStatusHistory(record.key);
                setStatusHistoryData(history);
            } finally {
                setStatusHistoryLoading(false);
            }
        } else if (key === 'submit') {
            setLoading(true);
            try {
                await updateSecurityStatus(record.key, 'Processing');
                message.success('Submitted successfully');
                fetchData();
            } finally {
                setLoading(false);
            }
        } else if (key === 'edit') {
            navigate(`/manifest_security/new_security_filing?mode=edit&id=${record.key}`);
        } else if (key === 'view') {
            navigate(`/manifest_security/new_security_filing?mode=view&id=${record.key}`);
        } else {
            message.info(`Action: ${key}`);
        }
    };

    const handleBatchSubmit = async () => {
        if (selectedRowKeys.length === 0) {
            message.warning('请选择需要提交的记录');
            return;
        }
        setLoading(true);
        try {
            // Mock batch submit
            for (const key of selectedRowKeys) {
                await updateSecurityStatus(key as string, 'Processing');
            }
            message.success('批量提交成功');
            setSelectedRowKeys([]);
            fetchData();
        } finally {
            setLoading(false);
        }
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys: React.Key[]) => {
            setSelectedRowKeys(newSelectedRowKeys);
        },
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
                                                        <b>角色：</b>
                                                        {i18n.t(LocaleHelper.getSecurityFilingManagementPageHelpRoleDesc())}
                                                    </li>
                                                    <li>
                                                        <b>数据来源：</b>
                                                        {i18n.t(LocaleHelper.getSecurityFilingManagementPageHelpOriginDesc())}
                                                    </li>
                                                    <li>
                                                        <b>功能说明：</b>
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
                            <Space>
                                <Button type="primary" onClick={handleBatchSubmit} disabled={selectedRowKeys.length === 0}>
                                    批量提交
                                </Button>
                                <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/customs_compliance/manifest_security/new_security_filing?mode=create')}>新建申报</Button>
                            </Space>
                        </div>
                    </div>
                </div>
            </div>
            <AdvancedSearchForm fields={fields} onSearch={handleSearch} />
            <div className="nc-bill-table-area">
                <Table
                    rowSelection={rowSelection}
                    columns={getColumns(handleAction)}
                    dataSource={dataSource}
                    loading={loading}
                    bordered
                    size="small"
                    pagination={{
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total) => `共 ${total} 条`,
                    }}
                    scroll={{ x: 1500, y: 'calc(100vh - 350px)' }}
                />
            </div>
            <StatusHistoryModal
                visible={statusHistoryVisible}
                onCancel={() => setStatusHistoryVisible(false)}
                data={statusHistoryData}
                loading={statusHistoryLoading}
                title="申报状态历史"
            />
        </div>
    );
};

export default SecurityFilingManagement;

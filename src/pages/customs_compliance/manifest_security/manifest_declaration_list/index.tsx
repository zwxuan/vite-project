import React, { useState, useEffect } from 'react';
import { Table, Button, message, Tooltip, Space } from 'antd';
import { PlusOutlined, ExportOutlined, ImportOutlined, FileTextOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AdvancedSearchForm from '@/components/search-form';
import { fields } from './search_fields';
import { getColumns } from './columns';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import '@/pages/page_list.less';
import CustomIcon from '@/components/custom-icon';
import { getManifestDeclarationList, getManifestStatusHistory, updateManifestStatus } from '@/api/customs_compliance/manifest_security/manifest_declaration_service';
import { ManifestDeclaration } from '@/types/customs_compliance/manifest_security/manifest_declaration';
import GenerateManifestModal from './GenerateManifestModal';
import StatusHistoryModal from '../components/StatusHistoryModal';
import OperationLogModal from '../components/OperationLogModal';

const ManifestDeclarationList: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState<ManifestDeclaration[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isGenerateModalVisible, setIsGenerateModalVisible] = useState(false);
    const [statusHistoryVisible, setStatusHistoryVisible] = useState(false);
    const [statusHistoryData, setStatusHistoryData] = useState<any[]>([]);
    const [statusHistoryLoading, setStatusHistoryLoading] = useState(false);
    const [logModalVisible, setLogModalVisible] = useState(false);

    const fetchData = async (params: any = {}) => {
        setLoading(true);
        try {
            const res = await getManifestDeclarationList(params);
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
        if (key === 'view') {
            navigate(`/manifest_security/new_manifest_declaration?id=${record.key}&mode=view`);
        } else if (key === 'edit') {
            navigate(`/manifest_security/new_manifest_declaration?id=${record.key}&mode=edit`);
        } else if (key === 'query') {
            setStatusHistoryVisible(true);
            setStatusHistoryLoading(true);
            try {
                const history = await getManifestStatusHistory(record.key);
                setStatusHistoryData(history);
            } finally {
                setStatusHistoryLoading(false);
            }
        } else if (key === 'submit') {
            setLoading(true);
            try {
                await updateManifestStatus(record.key, '处理中');
                message.success('申报提交成功');
                fetchData();
            } finally {
                setLoading(false);
            }
        } else if (key === 'delete') {
             message.success('删除成功');
             fetchData();
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
                await updateManifestStatus(key as string, '处理中');
            }
            message.success('批量申报提交成功');
            setSelectedRowKeys([]);
            fetchData();
        } finally {
            setLoading(false);
        }
    };

    const handleBatchExport = () => {
        if (selectedRowKeys.length === 0) {
            message.warning('请至少选择一条记录');
            return;
        }
        message.success(`成功导出 ${selectedRowKeys.length} 条记录`);
    }

    const handleImport = () => {
        message.success('导入成功');
        fetchData();
    };

    const handleLog = () => {
        setLogModalVisible(true);
    };

    const handleCreate = () => {
        navigate('/manifest_security/new_manifest_declaration?mode=create');
    }

    const handleGenerateFromBooking = () => {
        setIsGenerateModalVisible(true);
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
                            {i18n.t(LocaleHelper.getManifestDeclarationListTitle())}
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
                                                        {i18n.t(LocaleHelper.getManifestDeclarationListPageHelpRoleDesc())}
                                                    </li>
                                                    <li>
                                                        <b>数据来源：</b>
                                                        {i18n.t(LocaleHelper.getManifestDeclarationListPageHelpOriginDesc())}
                                                    </li>
                                                    <li>
                                                        <b>功能说明：</b>
                                                        {i18n.t(LocaleHelper.getManifestDeclarationListPageHelpFuncDesc())}
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
                                <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>新建申报</Button>
                                <Button icon={<ExportOutlined />} onClick={handleGenerateFromBooking}>{i18n.t(LocaleHelper.getManifestDeclarationListBtnGenerateFromBooking()) || '从订舱生成'}</Button>
                                <Button type="primary" onClick={handleBatchSubmit} disabled={selectedRowKeys.length === 0}>申报</Button>
                                <Button icon={<ImportOutlined />} onClick={handleImport}>导入</Button>
                                <Button icon={<ExportOutlined />} onClick={handleBatchExport}>导出</Button>
                                <Button icon={<FileTextOutlined />} onClick={handleLog}>日志</Button>
                            </Space>
                        </div>
                    </div>
                </div>
            </div>
            <AdvancedSearchForm fields={fields} onSearch={handleSearch} />
            <div className="nc-bill-table-area">
                <Table
                    columns={getColumns(handleAction)}
                    dataSource={dataSource}
                    loading={loading}
                    bordered={true}
                    rowSelection={rowSelection}
                    pagination={{
                        size: 'small',
                        showTotal: (total) => `总共 ${total} 条`,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        locale: {
                            items_per_page: i18n.t(LocaleHelper.getItemsPerPage()),
                            jump_to: i18n.t(LocaleHelper.getJumpTo()),
                            page: i18n.t(LocaleHelper.getPage()),
                        }
                    }}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 340px)' }}
                />
            </div>
            <GenerateManifestModal
                visible={isGenerateModalVisible}
                onCancel={() => setIsGenerateModalVisible(false)}
                onSuccess={() => {
                    setIsGenerateModalVisible(false);
                    fetchData();
                }}
            />
            <StatusHistoryModal
                visible={statusHistoryVisible}
                onCancel={() => setStatusHistoryVisible(false)}
                data={statusHistoryData}
                loading={statusHistoryLoading}
                title="申报状态历史"
            />
            <OperationLogModal
                visible={logModalVisible}
                onCancel={() => setLogModalVisible(false)}
            />
        </div>
    );
};

export default ManifestDeclarationList;

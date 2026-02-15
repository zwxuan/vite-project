import React, { useState, useEffect } from 'react';
import { Table, Button, message, Tooltip, Space } from 'antd';
import { PlusOutlined, ExportOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AdvancedSearchForm from '@/components/search-form';
import { fields } from './search_fields';
import { getColumns } from './columns';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import '@/pages/page_list.less';
import CustomIcon from '@/components/custom-icon';
import { getManifestDeclarationList } from '@/api/customs_compliance/manifest_security/manifest_declaration_service';
import { ManifestDeclaration } from '@/types/customs_compliance/manifest_security/manifest_declaration';
import GenerateManifestModal from './GenerateManifestModal';

const ManifestDeclarationList: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState<ManifestDeclaration[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isGenerateModalVisible, setIsGenerateModalVisible] = useState(false);

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

    const handleAction = (key: string, record: any) => {
        if (key === 'view') {
            navigate(`/manifest_security/new_manifest_declaration?id=${record.key}&mode=view`);
        } else if (key === 'edit') {
            navigate(`/manifest_security/new_manifest_declaration?id=${record.key}&mode=edit`);
        } else if (key === 'query') {
            // Assuming query goes to status query page or same detail page
            navigate(`/manifest_security/declaration_status_query?declaration_no=${record.declaration_no}`);
        } else if (key === 'delete') {
             message.success('删除成功');
             fetchData();
        }
    };

    const handleBatchExport = () => {
        if (selectedRowKeys.length === 0) {
            message.warning('请至少选择一条记录');
            return;
        }
        message.success(`成功导出 ${selectedRowKeys.length} 条记录`);
    }

    const handleCreate = () => {
        navigate('/manifest_security/new_manifest_declaration?mode=create');
    }

    const handleGenerateFromBooking = () => {
        setIsGenerateModalVisible(true);
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
                            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>新建申报</Button>
                            <Button icon={<ExportOutlined />} onClick={handleGenerateFromBooking}>{i18n.t(LocaleHelper.getManifestDeclarationListBtnGenerateFromBooking()) || '从订舱生成'}</Button>
                            <Button icon={<ExportOutlined />} onClick={handleBatchExport}>导出</Button>
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
                    rowSelection={{
                        selectedRowKeys,
                        onChange: setSelectedRowKeys,
                    }}
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
        </div>
    );
};

export default ManifestDeclarationList;

import React, { useState } from 'react';
import { Table, Button, Space } from 'antd';
import { SwapOutlined, ExportOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import CustomIcon from "@/components/custom-icon";
import AdvancedSearchForm from '@/components/search-form';
import { fields } from './search_fields';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import '@/pages/page_list.less';

interface VersionItem {
    id: string;
    version: string;
    modify_time: string;
    modifier: string;
    description: string;
}

const DocumentVersion: React.FC = () => {
    const navigate = useNavigate();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    // Mock data
    const versionHistory: VersionItem[] = [
        { id: '1', version: 'v1.3', modify_time: '2023-03-19 15:30', modifier: 'Operator A', description: 'Update Consignee Address' },
        { id: '2', version: 'v1.2', modify_time: '2023-03-18 10:20', modifier: 'Operator B', description: 'Correct Cargo Weight' },
        { id: '3', version: 'v1.1', modify_time: '2023-03-17 14:15', modifier: 'Operator A', description: 'Initial Creation' },
    ];

    const handleView = (record: VersionItem) => {
        navigate(`/document_management/version/detail/${record.id}`);
    };

    const handleSearch = (values: any) => {
        console.log('Search values:', values);
    };

    const handleCompare = () => {
        if (selectedRowKeys.length !== 2) {
            // In a real app, use message.warning()
            alert('Please select exactly two versions to compare.');
            return;
        }
        navigate(`/document_management/version/compare?v1=${selectedRowKeys[0]}&v2=${selectedRowKeys[1]}`);
    };

    const columns = [
        { title: i18n.t(LocaleHelper.getDocumentVersionNumber()), dataIndex: 'version', key: 'version' },
        { title: i18n.t(LocaleHelper.getDocumentVersionModifyTime()), dataIndex: 'modify_time', key: 'modify_time' },
        { title: i18n.t(LocaleHelper.getDocumentVersionModifier()), dataIndex: 'modifier', key: 'modifier' },
        { title: i18n.t(LocaleHelper.getDocumentVersionDescription()), dataIndex: 'description', key: 'description' },
        { 
            title: i18n.t(LocaleHelper.getDocumentVersionAction()), 
            key: 'action',
            render: (_: any, record: VersionItem) => (
                <Space>
                    <a onClick={() => handleView(record)}>{i18n.t(LocaleHelper.getDocumentVersionView())}</a>
                    <a>{i18n.t(LocaleHelper.getDocumentVersionRollback())}</a>
                </Space>
            )
        }
    ];

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
                    <div className="BillHeadInfoWrap">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getDocumentVersionTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button icon={<SwapOutlined />} onClick={handleCompare}>{i18n.t(LocaleHelper.getDocumentVersionContrast())}</Button>
                            <Button icon={<ExportOutlined />}>{i18n.t(LocaleHelper.getDocumentVersionExport())}</Button>
                        </div>
                    </div>
                </div>
            </div>

            <AdvancedSearchForm
                fields={fields}
                onSearch={handleSearch}
            />

            <div className='nc-bill-table-area'>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={versionHistory}
                    rowKey="id"
                    size="small"
                    bordered={true}
                />
            </div>
        </div>
    );
};

export default DocumentVersion;

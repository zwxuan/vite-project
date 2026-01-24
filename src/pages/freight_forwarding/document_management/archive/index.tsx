import React, { useState } from 'react';
import { Table, Button, Tag, Space } from 'antd';
import { ExportOutlined, InboxOutlined } from '@ant-design/icons';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import CustomIcon from '@/components/custom-icon';
import AdvancedSearchForm from '@/components/search-form';
import { fields } from './search_fields';
import '@/pages/page_list.less';

const DocumentArchive: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([
        {
            key: '1',
            archiveNo: 'ARCH-001',
            docNo: 'DOC-001',
            type: 'Bill of Lading',
            archiveDate: '2024-03-20',
            location: 'Zone A-01-05',
            status: 'Normal',
        },
        {
            key: '2',
            archiveNo: 'ARCH-002',
            docNo: 'DOC-002',
            type: 'Invoice',
            archiveDate: '2024-03-21',
            location: 'Zone B-02-03',
            status: 'Lent',
        },
    ]);

    const columns = [
        {
            title: 'Archive No.',
            dataIndex: 'archiveNo',
            key: 'archiveNo',
        },
        {
            title: 'Document No.',
            dataIndex: 'docNo',
            key: 'docNo',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: i18n.t(LocaleHelper.getDocumentArchiveArchiveDate()),
            dataIndex: 'archiveDate',
            key: 'archiveDate',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: i18n.t(LocaleHelper.getDocumentArchiveStatus()),
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                let color = 'green';
                if (status === 'Lent') color = 'orange';
                return <Tag color={color}>{status}</Tag>;
            }
        },
        {
            title: i18n.t(LocaleHelper.getDocumentArchiveOperation()),
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <a>{i18n.t(LocaleHelper.getDocumentArchiveView())}</a>
                    {record.status === 'Normal' ? <a>Borrow</a> : <a>Return</a>}
                </Space>
            ),
        },
    ];

    const handleSearch = (values: any) => {
        setLoading(true);
        console.log('Search values:', values);
        // Simulate API call
        setTimeout(() => setLoading(false), 500);
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getDocumentArchiveTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary" icon={<InboxOutlined />}>
                                {i18n.t(LocaleHelper.getDocumentArchiveBatchArchive())}
                            </Button>
                            <Button icon={<ExportOutlined />}>
                                {i18n.t(LocaleHelper.getDocumentArchiveExport())}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <AdvancedSearchForm fields={fields} onSearch={handleSearch} />

            <div className="nc-bill-table-area">
                <Table
                    columns={columns}
                    dataSource={data}
                    size="small"
                    bordered={true}
                    loading={loading}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
                    pagination={{
                        size: 'small',
                        showTotal: total => `Total ${total} items`,
                        showQuickJumper: true,
                        showSizeChanger: true,
                    }}
                />
            </div>
        </div>
    );
};

export default DocumentArchive;

import React, { useState } from 'react';
import { Table, Button, Space } from 'antd';
import { FilePdfOutlined } from '@ant-design/icons';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import CustomIcon from '@/components/custom-icon';
import AdvancedSearchForm from '@/components/search-form';
import { fields } from './search_fields';
import '@/pages/page_list.less';

const DocumentReport: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([
        { key: '1', date: '2024-03-20', total: 120, auto: 100, approved: 115, exceptions: 5 },
        { key: '2', date: '2024-03-19', total: 115, auto: 95, approved: 110, exceptions: 5 },
    ]);

    const columns = [
        {
            title: i18n.t(LocaleHelper.getDocumentReportDate()),
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Total Docs',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Auto Generated',
            dataIndex: 'auto',
            key: 'auto',
        },
        {
            title: 'Approved',
            dataIndex: 'approved',
            key: 'approved',
        },
        {
            title: 'Exceptions',
            dataIndex: 'exceptions',
            key: 'exceptions',
            render: (val: number) => <span style={{ color: val > 0 ? 'red' : 'inherit' }}>{val}</span>
        },
        {
            title: 'Action',
            key: 'action',
            render: () => <a>View</a>,
        },
    ];

    const handleSearch = (values: any) => {
        setLoading(true);
        console.log('Search values:', values);
        setTimeout(() => setLoading(false), 500);
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getDocumentReportTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary" icon={<FilePdfOutlined />}>
                                {i18n.t(LocaleHelper.getDocumentReportExport())}
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

export default DocumentReport;

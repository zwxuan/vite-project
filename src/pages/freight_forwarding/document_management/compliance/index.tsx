import React, { useState } from 'react';
import { Table, Button, Tag, Space } from 'antd';
import { SafetyCertificateOutlined } from '@ant-design/icons';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import CustomIcon from '@/components/custom-icon';
import AdvancedSearchForm from '@/components/search-form';
import { fields } from './search_fields';
import '@/pages/page_list.less';

const DocumentCompliance: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([
        { key: '1', time: '03-19 10:00', doc: 'DOC-006', result: 'Pass', risk: 'Low Risk' },
        { key: '2', time: '03-19 09:30', doc: 'DOC-005', result: 'Fail', risk: 'High Risk' },
    ]);

    const historyColumns = [
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Document',
            dataIndex: 'doc',
            key: 'doc',
        },
        {
            title: i18n.t(LocaleHelper.getDocumentComplianceResult()),
            dataIndex: 'result',
            key: 'result',
            render: (result: string) => {
                let color = result === 'Pass' ? 'green' : 'red';
                return <Tag color={color}>{result}</Tag>;
            }
        },
        {
            title: i18n.t(LocaleHelper.getDocumentComplianceRiskLevel()),
            dataIndex: 'risk',
            key: 'risk',
            render: (risk: string) => {
                let color = 'green';
                if (risk === 'High Risk') color = 'red';
                if (risk === 'Medium Risk') color = 'orange';
                return <Tag color={color}>{risk}</Tag>;
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: () => <a>{i18n.t(LocaleHelper.getDocumentComplianceViewReport())}</a>,
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
                            {i18n.t(LocaleHelper.getDocumentComplianceTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary" icon={<SafetyCertificateOutlined />}>
                                {i18n.t(LocaleHelper.getDocumentComplianceCheckHistory())}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <AdvancedSearchForm fields={fields} onSearch={handleSearch} />

            <div className="nc-bill-table-area">
                <Table
                    columns={historyColumns}
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

export default DocumentCompliance;

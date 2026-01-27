import React, { useState } from 'react';
import { Table, Button, Tag, message } from 'antd';
import { SafetyCertificateOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import CustomIcon from '@/components/custom-icon';
import AdvancedSearchForm from '@/components/search-form';
import { fields } from './search_fields';
import '@/pages/page_list.less';
import RuleConfigModal from './detail/components/RuleConfigModal';

type ComplianceResult = 'pass' | 'fail';
type ComplianceRisk = 'high' | 'medium' | 'low';

const DocumentCompliance: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [ruleConfigOpen, setRuleConfigOpen] = useState(false);
    const [ruleConfig, setRuleConfig] = useState({
        ruleVersion: 'v1.2.0',
        addressFormatCheck: true,
        requireHsCode: true,
        sensitiveWordsCheck: true,
    });
    const [data, setData] = useState([
        { key: '1', time: '03-19 10:00', doc: 'DOC-006', result: 'pass' as ComplianceResult, risk: 'low' as ComplianceRisk },
        { key: '2', time: '03-19 09:30', doc: 'DOC-005', result: 'fail' as ComplianceResult, risk: 'high' as ComplianceRisk },
        { key: '3', time: '03-18 16:10', doc: 'DOC-004', result: 'pass' as ComplianceResult, risk: 'medium' as ComplianceRisk },
    ]);

    const historyColumns = [
        {
            title: i18n.t(LocaleHelper.getDocumentComplianceTime()),
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: i18n.t(LocaleHelper.getDocumentComplianceDocument()),
            dataIndex: 'doc',
            key: 'doc',
        },
        {
            title: i18n.t(LocaleHelper.getDocumentComplianceResult()),
            dataIndex: 'result',
            key: 'result',
            render: (result: ComplianceResult) => {
                let color = result === 'pass' ? 'green' : 'red';
                return <Tag color={color}>{result}</Tag>;
            }
        },
        {
            title: i18n.t(LocaleHelper.getDocumentComplianceRiskLevel()),
            dataIndex: 'risk',
            key: 'risk',
            render: (risk: ComplianceRisk) => {
                let color = 'green';
                if (risk === 'high') color = 'red';
                if (risk === 'medium') color = 'orange';
                return <Tag color={color}>{risk}</Tag>;
            }
        },
        {
            title: i18n.t(LocaleHelper.getOperation()),
            key: 'action',
            render: (_: unknown, record: { doc: string }) => (
                <a onClick={() => navigate(`/document_management/compliance/detail/${record.doc}`)}>
                    {i18n.t(LocaleHelper.getDocumentComplianceViewReport())}
                </a>
            ),
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
                            <Button type="primary" icon={<SettingOutlined />} onClick={() => setRuleConfigOpen(true)} style={{ marginRight: 8 }}>
                                {i18n.t(LocaleHelper.getDocumentComplianceRuleConfig())}
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
                        showTotal: total => `${i18n.t(LocaleHelper.getTotal())} ${total} ${i18n.t(LocaleHelper.getItems())}`,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        locale: {
                            items_per_page: i18n.t(LocaleHelper.getItemsPerPage()),
                            jump_to: i18n.t(LocaleHelper.getJumpTo()),
                            page: i18n.t(LocaleHelper.getPage()),
                        },
                    }}
                />
            </div>
            <RuleConfigModal
                open={ruleConfigOpen}
                initialValues={ruleConfig}
                onCancel={() => setRuleConfigOpen(false)}
                onApply={values => {
                    setRuleConfig(values);
                    setRuleConfigOpen(false);
                    message.success(i18n.t(LocaleHelper.getDocumentComplianceSavedSuccess()));
                }}
            />
        </div>
    );
};

export default DocumentCompliance;

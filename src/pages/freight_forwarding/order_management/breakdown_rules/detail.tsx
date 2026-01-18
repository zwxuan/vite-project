import React, { useState } from 'react';
import { Form, Input, Card, Button, Table, Space, Select, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

interface JobItem {
    key: string;
    jobType: string;
    dept: string;
    duration: string;
    priority: string;
    isRequired: boolean;
}

const BreakdownRulesDetail: React.FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [jobs, setJobs] = useState<JobItem[]>([
        { key: '1', jobType: 'Freight Job', dept: 'Sea Freight Dept', duration: '30 Days', priority: 'High', isRequired: true },
        { key: '2', jobType: 'Customs Job', dept: 'Customs Dept', duration: '3 Days', priority: 'High', isRequired: true },
        { key: '3', jobType: 'Warehouse Job', dept: 'Warehouse Dept', duration: '2 Days', priority: 'Medium', isRequired: false },
    ]);

    const columns = [
        {
            title: i18n.t(LocaleHelper.getBreakdownRulesJobType()),
            dataIndex: 'jobType',
            key: 'jobType',
            render: (text: string, record: JobItem) => (
                <Input defaultValue={text} />
            )
        },
        {
            title: i18n.t(LocaleHelper.getBreakdownRulesResponsibleDept()),
            dataIndex: 'dept',
            key: 'dept',
            render: (text: string, record: JobItem) => (
                <Select defaultValue={text} style={{ width: '100%' }}>
                    <Select.Option value="Sea Freight Dept">Sea Freight Dept</Select.Option>
                    <Select.Option value="Customs Dept">Customs Dept</Select.Option>
                    <Select.Option value="Warehouse Dept">Warehouse Dept</Select.Option>
                </Select>
            )
        },
        {
            title: i18n.t(LocaleHelper.getBreakdownRulesDuration()),
            dataIndex: 'duration',
            key: 'duration',
            render: (text: string, record: JobItem) => (
                <Input defaultValue={text} />
            )
        },
        {
            title: i18n.t(LocaleHelper.getBreakdownRulesPriority()),
            dataIndex: 'priority',
            key: 'priority',
            render: (text: string, record: JobItem) => (
                <Select defaultValue={text} style={{ width: '100%' }}>
                    <Select.Option value="High">High</Select.Option>
                    <Select.Option value="Medium">Medium</Select.Option>
                    <Select.Option value="Low">Low</Select.Option>
                </Select>
            )
        },
        {
            title: i18n.t(LocaleHelper.getBreakdownRulesRequired()),
            dataIndex: 'isRequired',
            key: 'isRequired',
            render: (val: boolean, record: JobItem) => (
                <Select defaultValue={val ? 'Yes' : 'No'} style={{ width: '100%' }}>
                    <Select.Option value="Yes">{i18n.t(LocaleHelper.getBreakdownRulesRequired())}</Select.Option>
                    <Select.Option value="No">{i18n.t(LocaleHelper.getBreakdownRulesOptional())}</Select.Option>
                </Select>
            )
        },
        {
            title: i18n.t(LocaleHelper.getOrderListActions()),
            key: 'action',
            render: (_: any, record: JobItem) => (
                <Button type="text" danger icon={<DeleteOutlined />} />
            ),
        },
    ];

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getBreakdownRulesRuleDetail())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div style={{ display: "flex" }}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button type="primary">{i18n.t(LocaleHelper.getBreakdownRulesSave())}</Button>
                                <Button>{i18n.t(LocaleHelper.getBreakdownRulesTest())}</Button>
                                <Button onClick={() => navigate(-1)}>{i18n.t(LocaleHelper.getBreakdownRulesCancel())}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '20px' }}>
                <Card title={i18n.t(LocaleHelper.getBreakdownRulesRuleDetail())} style={{ marginBottom: 16 }}>
                    <Form layout="vertical" form={form} initialValues={{ 
                        ruleName: 'Sea Export Standard Process', 
                        condition: 'Order Type = Sea Export' 
                    }}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label={i18n.t(LocaleHelper.getBreakdownRulesRuleName())} name="ruleName">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={i18n.t(LocaleHelper.getBreakdownRulesApplicableCondition())} name="condition">
                                    <Input disabled />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>

                <Card title={i18n.t(LocaleHelper.getBreakdownRulesGeneratedJobs())} style={{ marginBottom: 16 }} extra={<Button type="primary" icon={<PlusOutlined />} size="small">{i18n.t(LocaleHelper.getBreakdownRulesAddJob())}</Button>}>
                    <Table<JobItem>
                        columns={columns}
                        dataSource={jobs}
                        pagination={false}
                        size="small"
                        bordered
                    />
                </Card>

                <Card title={i18n.t(LocaleHelper.getBreakdownRulesConditionSetting())}>
                    <Input.TextArea 
                        rows={6} 
                        defaultValue={`IF Order Type = "Sea Export" AND Trade Terms = "FOB"
THEN Generate Job: Freight Job + Customs Job
IF Service Requirement includes "Door to Door" THEN Add Job: Warehouse Job + Delivery Job`}
                        style={{ fontFamily: 'monospace' }}
                    />
                </Card>
            </div>
        </div>
    );
};

export default BreakdownRulesDetail;

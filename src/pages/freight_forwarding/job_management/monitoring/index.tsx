import React from 'react';
import { Card, Row, Col, Statistic, Form, Radio, DatePicker, Button, Select, List, Tag, Table, Space } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, BarChartOutlined, PieChartOutlined, AlertOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import '@/pages/page_list.less';

const { RangePicker } = DatePicker;

const JobMonitoring: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    const alerts = [
        { type: 'error', message: 'Urgent: Job-009 deadline missed', time: '10 mins ago' },
        { type: 'warning', message: 'Warning: Team A load > 90%', time: '30 mins ago' },
        { type: 'success', message: 'System: Daily backup completed', time: '2 hours ago' },
    ];

    const abnormalJobs = [
        { jobId: 'JOB-009', assignee: 'User A', exception: 'Overdue', days: 2, impact: 'High' },
        { jobId: 'JOB-015', assignee: 'User B', exception: 'Blocked', days: 1, impact: 'Medium' },
    ];

    const columns = [
        { title: i18n.t(LocaleHelper.getJobId()), dataIndex: 'jobId', key: 'jobId' },
        { title: i18n.t(LocaleHelper.getAssignee()), dataIndex: 'assignee', key: 'assignee' },
        { title: i18n.t(LocaleHelper.getException()), dataIndex: 'exception', key: 'exception', render: (t: string) => <Tag color="red">{t}</Tag> },
        { title: i18n.t(LocaleHelper.getOverdueDays()), dataIndex: 'days', key: 'days' },
        { title: i18n.t(LocaleHelper.getImpact()), dataIndex: 'impact', key: 'impact' },
        { title: i18n.t(LocaleHelper.getAction()), key: 'action', render: () => <Space><a>{i18n.t(LocaleHelper.getUrge())}</a><a>{i18n.t(LocaleHelper.getReassign())}</a></Space> },
    ];

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getJobMonitoringTitle())}
                        </span>
                    </div>
                </div>
                 <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button>{i18n.t(LocaleHelper.getRealTimeRefresh())}</Button>
                            <Button>{i18n.t(LocaleHelper.getAlertSettings())}</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '20px' }}>
                <Card bordered={false} style={{ marginBottom: '20px' }}>
                    <Form form={form} layout="inline" onFinish={onFinish} initialValues={{ period: 'week' }}>
                        <Form.Item name="period"><Radio.Group buttonStyle="solid"><Radio.Button value="day">{i18n.t(LocaleHelper.getDay())}</Radio.Button><Radio.Button value="week">{i18n.t(LocaleHelper.getWeek())}</Radio.Button></Radio.Group></Form.Item>
                        <Form.Item name="dateRange"><RangePicker /></Form.Item>
                        <Form.Item><Button type="primary" htmlType="submit">{i18n.t(LocaleHelper.getSearch())}</Button></Form.Item>
                    </Form>
                </Card>

                <Row gutter={16}>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic title="Total Jobs" value={1128} valueStyle={{ color: '#3f8600' }} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic title="Pending" value={93} valueStyle={{ color: '#faad14' }} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic title="Overdue" value={12} valueStyle={{ color: '#cf1322' }} prefix={<ArrowUpOutlined />} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic title="Avg Time" value={2.5} suffix="days" valueStyle={{ color: '#1890ff' }} />
                        </Card>
                    </Col>
                </Row>

                <Row gutter={16} style={{ marginTop: '20px' }}>
                    <Col span={16}>
                        <Card title="Job Trends" bordered={false}>
                             <div style={{ height: '300px', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                                <BarChartOutlined style={{ fontSize: '48px' }} /> Chart Placeholder
                            </div>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Real-time Alerts" bordered={false} bodyStyle={{ padding: 0 }}>
                            <List
                                dataSource={alerts}
                                renderItem={item => (
                                    <List.Item style={{ padding: '10px 20px' }}>
                                        <List.Item.Meta
                                            avatar={<AlertOutlined style={{ color: item.type === 'error' ? 'red' : item.type === 'warning' ? 'orange' : 'green' }} />}
                                            title={item.message}
                                            description={item.time}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>

                <Row style={{ marginTop: '20px' }}>
                    <Col span={24}>
                        <Card title={i18n.t(LocaleHelper.getAbnormalJobList())} bordered={false}>
                            <Table dataSource={abnormalJobs} columns={columns} pagination={false} rowKey="jobId" size="small" />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default JobMonitoring;

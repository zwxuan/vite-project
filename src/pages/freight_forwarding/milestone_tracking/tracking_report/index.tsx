import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Select, Statistic, Table } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import CustomIcon from '@/components/custom-icon';
import { getTrackingReportList } from '@/api/freight_forwarding/milestone_tracking/service';
import { TrackingReportItem } from '@/types/freight_forwarding/milestone_tracking';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import '@/pages/page_list.less';

const TrackingReport: React.FC = () => {
    const [data, setData] = useState<TrackingReportItem[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const result = await getTrackingReportList();
            setData(result);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        { title: 'Route', dataIndex: 'route', key: 'route' },
        { title: 'Shipment Count', dataIndex: 'shipmentCount', key: 'shipmentCount' },
        { title: 'Avg Duration', dataIndex: 'avgDuration', key: 'avgDuration' },
        { title: i18n.t(LocaleHelper.getOnTimeRate()), dataIndex: 'onTimeRate', key: 'onTimeRate', render: (val: number) => `${val}%` },
        { title: i18n.t(LocaleHelper.getExceptionRate()), dataIndex: 'exceptionRate', key: 'exceptionRate', render: (val: number) => `${val}%` },
        { title: 'Customer Satisfaction', dataIndex: 'customerSatisfaction', key: 'customerSatisfaction' },
    ];

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getTrackingReportTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button>Custom Report</Button>
                            <Button>Export</Button>
                        </div>
                    </div>
                </div>
            </div>
            
            <Card className="nc-bill-table-area" bordered={false}>
                <Form layout="inline" style={{ marginBottom: 16 }}>
                    <Form.Item label={i18n.t(LocaleHelper.getReportType())}>
                        <Select defaultValue="time" style={{ width: 200 }}>
                            <Select.Option value="time">Transport Time Analysis</Select.Option>
                            <Select.Option value="exception">Exception Analysis</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={fetchData}>Generate</Button>
                    </Form.Item>
                </Form>

                <Row gutter={16} style={{ marginBottom: 24 }}>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Avg Transport Time"
                                value={18.5}
                                precision={1}
                                suffix="days"
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowDownOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="On-time Rate"
                                value={92.3}
                                precision={1}
                                suffix="%"
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Exception Rate"
                                value={7.7}
                                precision={1}
                                suffix="%"
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<ArrowDownOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Customer Satisfaction"
                                value={4.2}
                                precision={1}
                                suffix="/ 5.0"
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                            />
                        </Card>
                    </Col>
                </Row>

                <div style={{ height: 300, border: '1px dashed #d9d9d9', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                    <span style={{ color: '#999' }}>Chart Placeholder (Time Trend Analysis)</span>
                </div>

                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="route"
                    loading={loading}
                    size="small"
                    bordered={true}
                    pagination={false}
                />
            </Card>
        </div>
    );
};

export default TrackingReport;

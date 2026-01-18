import React from 'react';
import { Card, Row, Col, Statistic, Form, DatePicker, Button, Select } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import '@/pages/page_list.less';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

const OrderStatistics: React.FC = () => {
    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)', padding: '24px' }}>
            <Card title={i18n.t(LocaleHelper.getOrderStatisticsFilterTitle())} style={{ marginBottom: 16 }}>
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item label={i18n.t(LocaleHelper.getOrderStatisticsDateRange())}>
                                <DatePicker.RangePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                             <Form.Item label={i18n.t(LocaleHelper.getQueryOrderType())}>
                                <Select defaultValue="All">
                                    <Select.Option value="All">All</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                             <Form.Item label={i18n.t(LocaleHelper.getServicePerformanceCustomerGroup())}>
                                <Select defaultValue="All">
                                    <Select.Option value="All">All</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                             <Form.Item label={i18n.t(LocaleHelper.getQuerySalesman())}>
                                <Select defaultValue="All">
                                    <Select.Option value="All">All</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label={i18n.t(LocaleHelper.getOrderStatisticsActions())}>
                                <Button type="primary">{i18n.t(LocaleHelper.getOrderStatisticsQuery())}</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
            
            <Row gutter={16} style={{ marginBottom: 16 }}>
                <Col span={4}>
                    <Card>
                        <Statistic
                            title={i18n.t(LocaleHelper.getOrderStatisticsTotalOrders())}
                            value={1128}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                            suffix={i18n.t(LocaleHelper.getOrderStatisticsSuffixOrders())}
                        />
                    </Card>
                </Col>
                <Col span={4}>
                    <Card>
                        <Statistic
                            title={i18n.t(LocaleHelper.getOrderStatisticsCompleted())}
                            value={850}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col span={4}>
                    <Card>
                        <Statistic
                            title={i18n.t(LocaleHelper.getOrderStatisticsInProgress())}
                            value={278}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col span={4}>
                    <Card>
                        <Statistic
                            title={i18n.t(LocaleHelper.getOrderStatisticsTotalAmount())}
                            value={112893}
                            precision={2}
                            prefix="$"
                        />
                    </Card>
                </Col>
                 <Col span={4}>
                    <Card>
                        <Statistic
                            title={i18n.t(LocaleHelper.getOrderStatisticsAvgAmount())}
                            value={100}
                            precision={2}
                            prefix="$"
                        />
                    </Card>
                </Col>
                <Col span={4}>
                    <Card>
                        <Statistic
                            title={i18n.t(LocaleHelper.getOrderStatisticsSatisfaction())}
                            value={4.8}
                            suffix="/ 5.0"
                            valueStyle={{ color: '#cf1322' }}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Card title={i18n.t(LocaleHelper.getOrderStatisticsOrderTrend())} style={{ marginBottom: 16 }}>
                        <div style={{ 
                            height: '300px', 
                            border: '2px dashed #d9d9d9', 
                            background: '#f5f5f5', 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            color: '#999'
                        }}>
                            Line Chart Placeholder
                        </div>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title={i18n.t(LocaleHelper.getOrderStatisticsBusinessTypeAnalysis())} style={{ marginBottom: 16 }}>
                        <div style={{ 
                            height: '300px', 
                            border: '2px dashed #d9d9d9', 
                            background: '#f5f5f5', 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            color: '#999'
                        }}>
                            Pie Chart Placeholder
                        </div>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title={i18n.t(LocaleHelper.getOrderStatisticsCustomerRanking())} style={{ marginBottom: 16 }}>
                         <div style={{ 
                            height: '300px', 
                            border: '2px dashed #d9d9d9', 
                            background: '#f5f5f5', 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            color: '#999'
                        }}>
                            Bar Chart Placeholder
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default OrderStatistics;

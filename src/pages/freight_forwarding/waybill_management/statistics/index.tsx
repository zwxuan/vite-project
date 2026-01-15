import React, { useState } from 'react';
import { Card, Row, Col, Statistic, DatePicker, Button, Form, Radio, Table, Progress } from 'antd';
import { RiseOutlined, FileTextOutlined, ContainerOutlined, TeamOutlined, PieChartOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import '@/pages/page_list.less';

const { RangePicker } = DatePicker;

const WaybillStatistics: React.FC = () => {
    const [form] = Form.useForm();
    const [chartType, setChartType] = useState('trend');

    const transportData = [
        { key: '1', mode: 'SEA', count: 850, prop: 68, mom: '+5%', yoy: '+10%' },
        { key: '2', mode: 'AIR', count: 200, prop: 16, mom: '+2%', yoy: '-5%' },
        { key: '3', mode: 'RAIL', count: 150, prop: 12, mom: '+15%', yoy: '+20%' },
        { key: '4', mode: 'TRUCK', count: 50, prop: 4, mom: '0%', yoy: '+2%' },
    ];

    const carrierData = [
        { key: '1', rank: 1, carrier: 'COSCO', count: 300, prop: 35, leadTime: 18 },
        { key: '2', rank: 2, carrier: 'MAERSK', count: 250, prop: 29, leadTime: 16 },
        { key: '3', rank: 3, carrier: 'MSC', count: 180, prop: 21, leadTime: 20 },
        { key: '4', rank: 4, carrier: 'CMA', count: 120, prop: 14, leadTime: 19 },
    ];

    const transportColumns = [
        { title: i18n.t(LocaleHelper.getWaybillListTransportMode()), dataIndex: 'mode', key: 'mode' },
        { title: i18n.t(LocaleHelper.getWaybillStatisticsWaybillCount()), dataIndex: 'count', key: 'count' },
        { 
            title: i18n.t(LocaleHelper.getWaybillStatisticsProportion()), 
            dataIndex: 'prop', 
            key: 'prop',
            render: (val: number) => <Progress percent={val} size="small" />
        },
        { title: i18n.t(LocaleHelper.getWaybillStatisticsMomGrowth()), dataIndex: 'mom', key: 'mom', render: (text: string) => <span style={{ color: text.startsWith('+') ? 'green' : 'red' }}>{text}</span> },
        { title: i18n.t(LocaleHelper.getWaybillStatisticsYoyGrowth()), dataIndex: 'yoy', key: 'yoy', render: (text: string) => <span style={{ color: text.startsWith('+') ? 'green' : 'red' }}>{text}</span> },
    ];

    const carrierColumns = [
        { title: 'Rank', dataIndex: 'rank', key: 'rank', width: 80 },
        { title: i18n.t(LocaleHelper.getWaybillListCarrier()), dataIndex: 'carrier', key: 'carrier' },
        { title: i18n.t(LocaleHelper.getWaybillStatisticsWaybillCount()), dataIndex: 'count', key: 'count' },
        { 
            title: i18n.t(LocaleHelper.getWaybillStatisticsProportion()), 
            dataIndex: 'prop', 
            key: 'prop',
            render: (val: number) => <Progress percent={val} size="small" />
        },
        { title: i18n.t(LocaleHelper.getWaybillStatisticsAvgLeadTime()) + ' (Days)', dataIndex: 'leadTime', key: 'leadTime' },
    ];

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
             <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getWaybillStatisticsTitle())}
                        </span>
                    </div>
                </div>
            </div>

            <div style={{ padding: '20px' }}>
                <Card bordered={false} style={{ marginBottom: '20px' }}>
                    <Form form={form} layout="vertical">
                        <Row gutter={24}>
                            <Col span={8}>
                                <Form.Item label={i18n.t(LocaleHelper.getWaybillStatisticsTimeRange())}>
                                    <RangePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={i18n.t(LocaleHelper.getWaybillStatisticsStatisticsType())}>
                                    <Radio.Group value={chartType} onChange={e => setChartType(e.target.value)} buttonStyle="solid">
                                        <Radio.Button value="trend">{i18n.t(LocaleHelper.getWaybillStatisticsWaybillCount())}</Radio.Button>
                                        <Radio.Button value="carrier">{i18n.t(LocaleHelper.getWaybillStatisticsCarrierRanking())}</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="&nbsp;">
                                    <Button type="primary">Query</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>

                <Row gutter={16} style={{ marginBottom: '20px' }}>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic 
                                title={i18n.t(LocaleHelper.getWaybillStatisticsWaybillCount())} 
                                value={1250} 
                                prefix={<FileTextOutlined style={{ color: '#1890ff' }} />} 
                            />
                            <div style={{ marginTop: 8, fontSize: 12, color: '#8c8c8c' }}>
                                {i18n.t(LocaleHelper.getWaybillStatisticsMomGrowth())} <span style={{ color: '#52c41a' }}>+12%</span>
                            </div>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic 
                                title="TEU Volume" 
                                value={3200} 
                                prefix={<ContainerOutlined style={{ color: '#faad14' }} />} 
                            />
                             <div style={{ marginTop: 8, fontSize: 12, color: '#8c8c8c' }}>
                                {i18n.t(LocaleHelper.getWaybillStatisticsYoyGrowth())} <span style={{ color: '#f5222d' }}>-5%</span>
                            </div>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic 
                                title="Active Carriers" 
                                value={15} 
                                prefix={<TeamOutlined style={{ color: '#722ed1' }} />} 
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic 
                                title={i18n.t(LocaleHelper.getWaybillStatisticsAvgLeadTime())} 
                                value={18.5} 
                                suffix="days" 
                                prefix={<RiseOutlined style={{ color: '#52c41a' }} />} 
                            />
                        </Card>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Card title={i18n.t(LocaleHelper.getWaybillStatisticsWaybillCount())} bordered={false}>
                            <Table dataSource={transportData} columns={transportColumns} pagination={false} size="small" />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title={i18n.t(LocaleHelper.getWaybillStatisticsStatusDistribution())} bordered={false}>
                             <div style={{ 
                                height: '200px', 
                                border: '2px dashed #d9d9d9', 
                                background: '#fafafa', 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                borderRadius: '4px',
                                flexDirection: 'column'
                            }}>
                                <PieChartOutlined style={{ fontSize: '48px', color: '#ccc' }} />
                                <span style={{ color: '#999', marginTop: '10px' }}>Pie Chart Placeholder</span>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Row gutter={16} style={{ marginTop: '20px' }}>
                    <Col span={24}>
                        <Card title={i18n.t(LocaleHelper.getWaybillStatisticsCarrierRanking())} bordered={false}>
                             <Table dataSource={carrierData} columns={carrierColumns} pagination={false} size="small" />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default WaybillStatistics;

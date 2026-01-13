import React, { useState } from 'react';
import { Table, Button, Input, Form, Row, Col, Select, DatePicker, Card, Radio, Statistic, Space, Divider } from 'antd';
import CustomIcon from "@/components/custom-icon";
import '@/pages/page_list.less';
import { ArrowUpOutlined, ArrowDownOutlined, ShoppingOutlined, CheckCircleOutlined, SyncOutlined, DollarOutlined, BankOutlined, SmileOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const OrderStatistics: React.FC = () => {
    const [businessTypeData] = useState([
        { key: '1', type: '海运出口', count: 78, ratio: '50%', amount: '$1,560,000', avgAmount: '$20,000' },
        { key: '2', type: '海运进口', count: 35, ratio: '22%', amount: '$580,000', avgAmount: '$16,571' },
        { key: '3', type: '空运出口', count: 28, ratio: '18%', amount: '$320,000', avgAmount: '$11,429' },
        { key: '4', type: '空运进口', count: 15, ratio: '10%', amount: '$120,000', avgAmount: '$8,000' },
    ]);

    const [customerRankingData] = useState([
        { key: '1', rank: 1, name: 'ABC公司', count: 25, amount: '$520,000', growth: '+15%' },
        { key: '2', rank: 2, name: 'XYZ公司', count: 18, amount: '$380,000', growth: '+8%' },
        { key: '3', rank: 3, name: 'DEF公司', count: 15, amount: '$290,000', growth: '+22%' },
    ]);

    const businessTypeColumns = [
        { title: '业务类型', dataIndex: 'type', key: 'type' },
        { title: '订单数量', dataIndex: 'count', key: 'count' },
        { title: '占比', dataIndex: 'ratio', key: 'ratio' },
        { title: '总金额', dataIndex: 'amount', key: 'amount' },
        { title: '平均金额', dataIndex: 'avgAmount', key: 'avgAmount' },
    ];

    const customerRankingColumns = [
        { title: '排名', dataIndex: 'rank', key: 'rank' },
        { title: '客户名称', dataIndex: 'name', key: 'name' },
        { title: '订单数量', dataIndex: 'count', key: 'count' },
        { title: '订单金额', dataIndex: 'amount', key: 'amount' },
        { 
            title: '增长率', 
            dataIndex: 'growth', 
            key: 'growth',
            render: (text: string) => (
                <span style={{ color: text.startsWith('+') ? 'red' : 'green' }}>
                    {text.startsWith('+') ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {text}
                </span>
            )
        },
    ];

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            <span>订单管理 {'>'} 订单统计报表</span>
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button>自定义报表</Button>
                            <Button>导出</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '10px' }}>
                <Card size="small" title="报表筛选条件" style={{ marginBottom: '10px' }}>
                    <Form layout="vertical">
                        <Row gutter={[24, 16]}>
                            <Col span={8}>
                                <Form.Item label="统计周期">
                                    <Radio.Group defaultValue="month" buttonStyle="solid">
                                        <Radio.Button value="month">本月</Radio.Button>
                                        <Radio.Button value="quarter">本季度</Radio.Button>
                                        <Radio.Button value="year">本年度</Radio.Button>
                                        <Radio.Button value="custom">自定义</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="自定义时间">
                                    <RangePicker placeholder={['开始日期', '结束日期']} style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="业务类型">
                                    <Select placeholder="请选择业务类型" allowClear>
                                        <Select.Option value="all">全部</Select.Option>
                                        <Select.Option value="sea_export">海运出口</Select.Option>
                                        <Select.Option value="sea_import">海运进口</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="客户类型">
                                    <Select placeholder="请选择客户类型" allowClear>
                                        <Select.Option value="all">全部</Select.Option>
                                        <Select.Option value="direct">直客</Select.Option>
                                        <Select.Option value="agent">同行</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="业务员">
                                    <Select placeholder="请选择业务员" allowClear>
                                        <Select.Option value="all">全部</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8} style={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Form.Item>
                                    <Space>
                                        <Button type="primary">生成报表</Button>
                                        <Button>重置</Button>
                                    </Space>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>

                <Card size="small" title="订单概况统计" style={{ marginBottom: '10px' }}>
                    <Row gutter={[16, 16]}>
                        <Col span={4}>
                            <Card bordered hoverable bodyStyle={{ padding: '12px' }}>
                                <Statistic 
                                    title="总订单数" 
                                    value={156} 
                                    suffix="单" 
                                    prefix={<ShoppingOutlined style={{ color: '#1890ff' }} />}
                                />
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card bordered hoverable bodyStyle={{ padding: '12px' }}>
                                <Statistic 
                                    title="已完成" 
                                    value={89} 
                                    valueStyle={{ color: '#3f8600' }} 
                                    prefix={<CheckCircleOutlined />}
                                    suffix={<span style={{ fontSize: '12px', color: '#999' }}>57%</span>}
                                />
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card bordered hoverable bodyStyle={{ padding: '12px' }}>
                                <Statistic 
                                    title="进行中" 
                                    value={45} 
                                    valueStyle={{ color: '#faad14' }} 
                                    prefix={<SyncOutlined spin />}
                                    suffix={<span style={{ fontSize: '12px', color: '#999' }}>29%</span>}
                                />
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card bordered hoverable bodyStyle={{ padding: '12px' }}>
                                <Statistic 
                                    title="总金额" 
                                    value={2580000} 
                                    prefix={<DollarOutlined style={{ color: '#cf1322' }} />}
                                />
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card bordered hoverable bodyStyle={{ padding: '12px' }}>
                                <Statistic 
                                    title="平均金额" 
                                    value={16538} 
                                    prefix={<BankOutlined style={{ color: '#722ed1' }} />}
                                />
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card bordered hoverable bodyStyle={{ padding: '12px' }}>
                                <Statistic 
                                    title="满意度" 
                                    value={4.8} 
                                    suffix="/ 5.0" 
                                    valueStyle={{ color: '#cf1322' }} 
                                    prefix={<SmileOutlined />}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Card>

                <Card size="small" title="订单趋势分析" style={{ marginBottom: '10px', height: '350px', backgroundColor: '#fff' }}>
                    <div style={{ 
                        height: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        backgroundColor: '#fafafa',
                        border: '1px dashed #d9d9d9',
                        borderRadius: '2px'
                    }}>
                        <div style={{ textAlign: 'center', color: '#999' }}>
                            <div style={{ marginBottom: '16px', fontSize: '16px' }}>[ 订单数量趋势图 / 金额分布图 ]</div>
                            <div>此处将展示可视化图表组件 (ECharts / AntV)</div>
                        </div>
                    </div>
                </Card>

                <Row gutter={16}>
                    <Col span={12}>
                        <Card size="small" title="业务类型分析" style={{ marginBottom: '10px' }}>
                            <Table
                                columns={businessTypeColumns}
                                dataSource={businessTypeData}
                                pagination={false}
                                size="small"
                                bordered
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="客户排行榜" style={{ marginBottom: '10px' }}>
                            <Table
                                columns={customerRankingColumns}
                                dataSource={customerRankingData}
                                pagination={false}
                                size="small"
                                bordered
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default OrderStatistics;

/**
 * 毛利分析报表页面
 */
import React, { useState, useEffect } from 'react';
import { Card, Form, Select, DatePicker, Button, Table, Statistic, Row, Col, Space, message, Empty } from 'antd';
import { LineChartOutlined, BarChartOutlined, ExportOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import '@/pages/page_list.less';

const { RangePicker } = DatePicker;

interface CustomerProfitData {
    id: string;
    customerName: string;
    orderCount: number;
    totalRevenue: number;
    totalCost: number;
    grossProfit: number;
    profitMargin: number;
}

interface TrendData {
    month: string;
    profitMargin: number;
    revenue: number;
    cost: number;
}

const ProfitAnalysis: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [customerData, setCustomerData] = useState<CustomerProfitData[]>([]);
    const [trendData, setTrendData] = useState<TrendData[]>([]);
    const [summary, setSummary] = useState({
        totalRevenue: 2456789,
        totalCost: 1987654,
        grossProfit: 469135,
        avgProfitMargin: 19.1,
    });

    // 客户盈利排行列定义
    const columns: ColumnsType<CustomerProfitData> = [
        {
            title: '排名',
            key: 'rank',
            width: 80,
            align: 'center',
            render: (_, __, index) => {
                const rank = index + 1;
                let color = '#666';
                if (rank === 1) color = '#FFD700';
                else if (rank === 2) color = '#C0C0C0';
                else if (rank === 3) color = '#CD7F32';
                return <span style={{ fontWeight: 'bold', color }}>{rank}</span>;
            },
        },
        {
            title: '客户名称',
            dataIndex: 'customerName',
            key: 'customerName',
            width: 150,
        },
        {
            title: '订单数量',
            dataIndex: 'orderCount',
            key: 'orderCount',
            width: 100,
            align: 'right',
            render: (value) => `${value} 个`,
        },
        {
            title: '总收入',
            dataIndex: 'totalRevenue',
            key: 'totalRevenue',
            width: 150,
            align: 'right',
            render: (value) => `¥${value.toLocaleString()}`,
        },
        {
            title: '总成本',
            dataIndex: 'totalCost',
            key: 'totalCost',
            width: 150,
            align: 'right',
            render: (value) => `¥${value.toLocaleString()}`,
        },
        {
            title: '毛利润',
            dataIndex: 'grossProfit',
            key: 'grossProfit',
            width: 150,
            align: 'right',
            render: (value) => (
                <span style={{ color: '#1890ff', fontWeight: 'bold' }}>
                    ¥{value.toLocaleString()}
                </span>
            ),
        },
        {
            title: '利润率',
            dataIndex: 'profitMargin',
            key: 'profitMargin',
            width: 120,
            align: 'right',
            render: (value) => (
                <span style={{ color: value >= 20 ? '#52c41a' : value >= 15 ? '#faad14' : '#ff4d4f', fontWeight: 'bold' }}>
                    {value.toFixed(1)}%
                </span>
            ),
        },
    ];



    // 加载数据
    const loadData = async () => {
        setLoading(true);
        try {
            // 模拟客户盈利数据
            const mockCustomerData: CustomerProfitData[] = [
                {
                    id: '1',
                    customerName: 'ABC贸易',
                    orderCount: 25,
                    totalRevenue: 456789,
                    totalCost: 365431,
                    grossProfit: 91358,
                    profitMargin: 20.0,
                },
                {
                    id: '2',
                    customerName: 'XYZ公司',
                    orderCount: 18,
                    totalRevenue: 345678,
                    totalCost: 283456,
                    grossProfit: 62222,
                    profitMargin: 18.0,
                },
                {
                    id: '3',
                    customerName: '123集团',
                    orderCount: 32,
                    totalRevenue: 567890,
                    totalCost: 471349,
                    grossProfit: 96541,
                    profitMargin: 17.0,
                },
            ];

            // 模拟趋势数据
            const mockTrendData: TrendData[] = [
                { month: '1月', profitMargin: 15.5, revenue: 180000, cost: 152100 },
                { month: '2月', profitMargin: 17.2, revenue: 195000, cost: 161460 },
                { month: '3月', profitMargin: 19.8, revenue: 210000, cost: 168420 },
                { month: '4月', profitMargin: 18.5, revenue: 205000, cost: 167075 },
                { month: '5月', profitMargin: 20.3, revenue: 225000, cost: 179325 },
                { month: '6月', profitMargin: 19.1, revenue: 215000, cost: 173935 },
                { month: '7月', profitMargin: 21.0, revenue: 235000, cost: 185650 },
                { month: '8月', profitMargin: 20.5, revenue: 230000, cost: 182850 },
            ];

            setCustomerData(mockCustomerData);
            setTrendData(mockTrendData);
        } catch (error) {
            message.error('加载数据失败');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // 分析
    const handleAnalyze = async () => {
        try {
            await form.validateFields();
            loadData();
            message.success('分析完成！');
        } catch (error) {
            message.error('请完善分析条件');
        }
    };

    // 重置
    const handleReset = () => {
        form.resetFields();
    };

    // 导出
    const handleExport = () => {
        message.info('导出功能开发中...');
    };

    return (
        <div style={{ padding: '24px', background: '#f0f2f5', minHeight: 'calc(100vh - 80px)' }}>
            {/* 分析条件 */}
            <Card title="分析维度" style={{ marginBottom: '16px' }}>
                <Form form={form} layout="inline">
                    <Form.Item name="timeDimension" label="时间维度" initialValue="month">
                        <Select style={{ width: 150 }}>
                            <Select.Option value="day">按日</Select.Option>
                            <Select.Option value="week">按周</Select.Option>
                            <Select.Option value="month">按月</Select.Option>
                            <Select.Option value="quarter">按季度</Select.Option>
                            <Select.Option value="year">按年</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="dateRange" label="时间范围">
                        <RangePicker />
                    </Form.Item>

                    <Form.Item name="customer" label="客户维度">
                        <Select placeholder="全部客户" style={{ width: 200 }} allowClear>
                            <Select.Option value="all">全部客户</Select.Option>
                            <Select.Option value="vip">VIP客户</Select.Option>
                            <Select.Option value="normal">普通客户</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="route" label="航线">
                        <Select placeholder="全部航线" style={{ width: 200 }} allowClear>
                            <Select.Option value="all">全部航线</Select.Option>
                            <Select.Option value="asia">亚洲航线</Select.Option>
                            <Select.Option value="europe">欧洲航线</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="salesman" label="业务员">
                        <Select placeholder="全部业务员" style={{ width: 150 }} allowClear>
                            <Select.Option value="all">全部</Select.Option>
                            <Select.Option value="zhang">张三</Select.Option>
                            <Select.Option value="li">李四</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="transportMode" label="运输方式">
                        <Select placeholder="全部方式" style={{ width: 150 }} allowClear>
                            <Select.Option value="all">全部</Select.Option>
                            <Select.Option value="sea">海运</Select.Option>
                            <Select.Option value="air">空运</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>

                <div style={{ marginTop: '16px' }}>
                    <Space>
                        <Button type="primary" icon={<LineChartOutlined />} onClick={handleAnalyze}>
                            开始分析
                        </Button>
                        <Button icon={<ReloadOutlined />} onClick={handleReset}>
                            重置
                        </Button>
                        <Button icon={<ExportOutlined />} onClick={handleExport}>
                            导出报表
                        </Button>
                    </Space>
                </div>
            </Card>

            {/* 盈利概况 */}
            <Card title="盈利概况" style={{ marginBottom: '16px' }}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="总收入"
                                value={summary.totalRevenue}
                                precision={2}
                                prefix="¥"
                                valueStyle={{ color: '#52c41a' }}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="总成本"
                                value={summary.totalCost}
                                precision={2}
                                prefix="¥"
                                valueStyle={{ color: '#ff4d4f' }}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="毛利润"
                                value={summary.grossProfit}
                                precision={2}
                                prefix="¥"
                                valueStyle={{ color: '#1890ff' }}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="平均利润率"
                                value={summary.avgProfitMargin}
                                precision={1}
                                suffix="%"
                                valueStyle={{ color: '#722ed1' }}
                            />
                        </Card>
                    </Col>
                </Row>
            </Card>

            {/* 利润率趋势图 */}
            <Card title="利润率趋势图" style={{ marginBottom: '16px' }}>
                <Empty
                    description="图表功能开发中，需要安装 @ant-design/plots 库"
                    style={{ padding: '60px 0' }}
                />
            </Card>

            {/* 收入成本对比图 */}
            <Card title="收入成本对比" style={{ marginBottom: '16px' }}>
                <Empty
                    description="图表功能开发中，需要安装 @ant-design/plots 库"
                    style={{ padding: '60px 0' }}
                />
            </Card>

            {/* 客户盈利排行 */}
            <Card title="客户盈利排行">
                <Table
                    columns={columns}
                    dataSource={customerData}
                    rowKey="id"
                    loading={loading}
                    size="small"
                    bordered
                    pagination={false}
                />
            </Card>
        </div>
    );
};

export default ProfitAnalysis;

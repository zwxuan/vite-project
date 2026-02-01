/**
 * 费用计算页面
 */
import React, { useState } from 'react';
import { Card, Form, Select, DatePicker, Button, Table, Statistic, Row, Col, Space, message, Divider } from 'antd';
import { CalculatorOutlined, ReloadOutlined, ExportOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import '@/pages/page_list.less';

const { RangePicker } = DatePicker;

interface CalculationResult {
    id: string;
    orderNo: string;
    customer: string;
    receivableAmount: number;
    payableAmount: number;
    grossProfit: number;
    profitMargin: number;
    currency: string;
}

const CostCalculation: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [calculating, setCalculating] = useState(false);
    const [results, setResults] = useState<CalculationResult[]>([]);
    const [summary, setSummary] = useState({
        totalReceivable: 0,
        totalPayable: 0,
        totalProfit: 0,
        avgProfitMargin: 0,
    });

    // 表格列定义
    const columns: ColumnsType<CalculationResult> = [
        {
            title: '订单号',
            dataIndex: 'orderNo',
            key: 'orderNo',
            width: 150,
            fixed: 'left',
        },
        {
            title: '客户',
            dataIndex: 'customer',
            key: 'customer',
            width: 150,
        },
        {
            title: '应收金额',
            dataIndex: 'receivableAmount',
            key: 'receivableAmount',
            width: 150,
            align: 'right',
            render: (value, record) => (
                <span style={{ color: '#52c41a', fontWeight: 'bold' }}>
                    {record.currency} {value.toLocaleString()}
                </span>
            ),
        },
        {
            title: '应付金额',
            dataIndex: 'payableAmount',
            key: 'payableAmount',
            width: 150,
            align: 'right',
            render: (value, record) => (
                <span style={{ color: '#ff4d4f', fontWeight: 'bold' }}>
                    {record.currency} {value.toLocaleString()}
                </span>
            ),
        },
        {
            title: '毛利润',
            dataIndex: 'grossProfit',
            key: 'grossProfit',
            width: 150,
            align: 'right',
            render: (value, record) => (
                <span style={{ color: value >= 0 ? '#1890ff' : '#ff4d4f', fontWeight: 'bold' }}>
                    {record.currency} {value.toLocaleString()}
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
                <span style={{ color: value >= 0 ? '#52c41a' : '#ff4d4f', fontWeight: 'bold' }}>
                    {value.toFixed(2)}%
                </span>
            ),
        },
    ];

    // 执行计算
    const handleCalculate = async () => {
        try {
            const values = await form.validateFields();
            setCalculating(true);

            // 模拟计算过程
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // 模拟计算结果
            const mockResults: CalculationResult[] = [
                {
                    id: '1',
                    orderNo: 'ORD001',
                    customer: '客户A',
                    receivableAmount: 50000,
                    payableAmount: 40000,
                    grossProfit: 10000,
                    profitMargin: 20.0,
                    currency: 'CNY',
                },
                {
                    id: '2',
                    orderNo: 'ORD002',
                    customer: '客户B',
                    receivableAmount: 75000,
                    payableAmount: 60000,
                    grossProfit: 15000,
                    profitMargin: 20.0,
                    currency: 'CNY',
                },
                {
                    id: '3',
                    orderNo: 'ORD003',
                    customer: '客户C',
                    receivableAmount: 30000,
                    payableAmount: 27000,
                    grossProfit: 3000,
                    profitMargin: 10.0,
                    currency: 'CNY',
                },
            ];

            // 计算汇总
            const totalReceivable = mockResults.reduce((sum, item) => sum + item.receivableAmount, 0);
            const totalPayable = mockResults.reduce((sum, item) => sum + item.payableAmount, 0);
            const totalProfit = totalReceivable - totalPayable;
            const avgProfitMargin = totalReceivable > 0 ? (totalProfit / totalReceivable) * 100 : 0;

            setResults(mockResults);
            setSummary({
                totalReceivable,
                totalPayable,
                totalProfit,
                avgProfitMargin,
            });

            message.success('费用计算完成！');
        } catch (error) {
            message.error('请完善计算条件');
        } finally {
            setCalculating(false);
        }
    };

    // 重置
    const handleReset = () => {
        form.resetFields();
        setResults([]);
        setSummary({
            totalReceivable: 0,
            totalPayable: 0,
            totalProfit: 0,
            avgProfitMargin: 0,
        });
    };

    // 导出
    const handleExport = () => {
        message.info('导出功能开发中...');
    };

    return (
        <div style={{ padding: '24px', background: '#f0f2f5', minHeight: 'calc(100vh - 80px)' }}>
            {/* 计算条件 */}
            <Card title="费用计算条件" style={{ marginBottom: '16px' }}>
                <Form form={form} layout="inline">
                    <Form.Item
                        name="calculationType"
                        label="计算类型"
                        rules={[{ required: true, message: '请选择计算类型' }]}
                    >
                        <Select placeholder="请选择" style={{ width: 200 }}>
                            <Select.Option value="order">按订单计算</Select.Option>
                            <Select.Option value="customer">按客户计算</Select.Option>
                            <Select.Option value="period">按期间计算</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="dateRange"
                        label="时间范围"
                        rules={[{ required: true, message: '请选择时间范围' }]}
                    >
                        <RangePicker />
                    </Form.Item>

                    <Form.Item name="customer" label="客户">
                        <Select placeholder="全部客户" style={{ width: 200 }} allowClear>
                            <Select.Option value="customer_a">客户A</Select.Option>
                            <Select.Option value="customer_b">客户B</Select.Option>
                            <Select.Option value="customer_c">客户C</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="currency" label="币种">
                        <Select placeholder="全部币种" style={{ width: 150 }} allowClear>
                            <Select.Option value="CNY">CNY</Select.Option>
                            <Select.Option value="USD">USD</Select.Option>
                            <Select.Option value="EUR">EUR</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>

                <Divider />

                <Space>
                    <Button
                        type="primary"
                        icon={<CalculatorOutlined />}
                        onClick={handleCalculate}
                        loading={calculating}
                    >
                        开始计算
                    </Button>
                    <Button icon={<ReloadOutlined />} onClick={handleReset}>
                        重置
                    </Button>
                    <Button icon={<ExportOutlined />} onClick={handleExport} disabled={results.length === 0}>
                        导出结果
                    </Button>
                </Space>
            </Card>

            {/* 计算结果汇总 */}
            {results.length > 0 && (
                <Card title="计算结果汇总" style={{ marginBottom: '16px' }}>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="应收总额"
                                    value={summary.totalReceivable}
                                    precision={2}
                                    prefix="¥"
                                    valueStyle={{ color: '#52c41a' }}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="应付总额"
                                    value={summary.totalPayable}
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
                                    value={summary.totalProfit}
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
                                    precision={2}
                                    suffix="%"
                                    valueStyle={{ color: '#722ed1' }}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Card>
            )}

            {/* 计算结果明细 */}
            {results.length > 0 && (
                <Card title="计算结果明细">
                    <Table
                        columns={columns}
                        dataSource={results}
                        rowKey="id"
                        loading={loading}
                        size="small"
                        bordered
                        pagination={{
                            showTotal: (total) => `共 ${total} 条`,
                            showQuickJumper: true,
                            showSizeChanger: true,
                        }}
                    />
                </Card>
            )}
        </div>
    );
};

export default CostCalculation;

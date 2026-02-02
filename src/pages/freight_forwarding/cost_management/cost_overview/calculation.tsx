/**
 * 费用计算页面
 */
import React, { useState } from 'react';
import { Card, Form, Select, DatePicker, Button, Table, Statistic, Row, Col, Space, message, Divider, Tooltip } from 'antd';
import { CalculatorOutlined, ReloadOutlined, ExportOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
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
    const navigate = useNavigate();
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
            title: i18n.t(LocaleHelper.getCostOverviewColOrderNo()),
            dataIndex: 'orderNo',
            key: 'orderNo',
            width: 150,
            fixed: 'left',
        },
        {
            title: i18n.t(LocaleHelper.getCostOverviewColCustomer()),
            dataIndex: 'customer',
            key: 'customer',
            width: 150,
        },
        {
            title: i18n.t(LocaleHelper.getCostOverviewColReceivableAmount()),
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
            title: i18n.t(LocaleHelper.getCostOverviewColPayableAmount()),
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
            title: i18n.t(LocaleHelper.getCostOverviewCardGrossProfit()),
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
            title: i18n.t(LocaleHelper.getCostOverviewColProfitMargin()),
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

            message.success(i18n.t(LocaleHelper.getCostOverviewMsgCalculationComplete()));
        } catch (error) {
            message.error(i18n.t(LocaleHelper.getCostOverviewMsgCompleteCondition()));
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
        message.info(i18n.t(LocaleHelper.getCostOverviewMsgEditWip())); // Reusing WIP message or generic
    };

    const handleBack = () => {
        navigate('/cost_management/cost_overview');
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getCostOverviewCalculationTitle())}
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>说明</b></span>
                                                本页面用于根据选定的条件（如订单、客户、时间段）进行费用的试算与模拟。
                                                适用于费率调整后的预估或在费用确认前的利润分析。
                                            </li>
                                        </ol>
                                    </div>
                                }
                                color='white'>
                                <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                            </Tooltip>
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
                                {i18n.t(LocaleHelper.getCostOverviewBtnBack())}
                            </Button>
                            <Button
                                type="primary"
                                icon={<CalculatorOutlined />}
                                onClick={handleCalculate}
                                loading={calculating}
                            >
                                {i18n.t(LocaleHelper.getCostOverviewBtnStartCalculate())}
                            </Button>
                            <Button icon={<ReloadOutlined />} onClick={handleReset}>
                                {i18n.t(LocaleHelper.getCostOverviewBtnReset())}
                            </Button>
                            <Button icon={<ExportOutlined />} onClick={handleExport} disabled={results.length === 0}>
                                {i18n.t(LocaleHelper.getCostOverviewBtnExportResult())}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '24px', background: '#f0f2f5' }}>
                {/* 计算条件 */}
                <Card title={i18n.t(LocaleHelper.getCostOverviewSectionCalculationCondition())} style={{ marginBottom: '16px' }}>
                    <Form form={form} layout="inline">
                        <Form.Item
                            name="calculationType"
                            label={i18n.t(LocaleHelper.getCostOverviewLabelCalculationType())}
                            rules={[{ required: true, message: i18n.t(LocaleHelper.getCostOverviewMsgCompleteCondition()) }]}
                        >
                            <Select placeholder={i18n.t(LocaleHelper.getSelectPlaceholder())} style={{ width: 200 }}>
                                <Select.Option value="order">{i18n.t(LocaleHelper.getCostOverviewOptionCalcByOrder())}</Select.Option>
                                <Select.Option value="customer">{i18n.t(LocaleHelper.getCostOverviewOptionCalcByCustomer())}</Select.Option>
                                <Select.Option value="period">{i18n.t(LocaleHelper.getCostOverviewOptionCalcByPeriod())}</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="dateRange"
                            label={i18n.t(LocaleHelper.getCostOverviewLabelTimeRange())}
                            rules={[{ required: true, message: i18n.t(LocaleHelper.getCostOverviewMsgCompleteCondition()) }]}
                        >
                            <RangePicker />
                        </Form.Item>

                        <Form.Item name="customer" label={i18n.t(LocaleHelper.getCostOverviewColCustomer())}>
                            <Select placeholder={i18n.t(LocaleHelper.getCostOverviewPlaceholderAllCustomers())} style={{ width: 200 }} allowClear>
                                <Select.Option value="customer_a">客户A</Select.Option>
                                <Select.Option value="customer_b">客户B</Select.Option>
                                <Select.Option value="customer_c">客户C</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="currency" label={i18n.t(LocaleHelper.getCostOverviewLabelCurrency())}>
                            <Select placeholder={i18n.t(LocaleHelper.getCostOverviewPlaceholderAllCurrencies())} style={{ width: 150 }} allowClear>
                                <Select.Option value="CNY">CNY</Select.Option>
                                <Select.Option value="USD">USD</Select.Option>
                                <Select.Option value="EUR">EUR</Select.Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Card>

                {/* 计算结果汇总 */}
                {results.length > 0 && (
                    <Card title={i18n.t(LocaleHelper.getCostOverviewSectionCalculationSummary())} style={{ marginBottom: '16px' }}>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Card>
                                    <Statistic
                                        title={i18n.t(LocaleHelper.getCostOverviewCardTotalReceivable())}
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
                                        title={i18n.t(LocaleHelper.getCostOverviewCardTotalPayable())}
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
                                        title={i18n.t(LocaleHelper.getCostOverviewCardGrossProfit())}
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
                                        title={i18n.t(LocaleHelper.getCostOverviewCardAvgProfitMargin())}
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
                    <Card title={i18n.t(LocaleHelper.getCostOverviewSectionCalculationDetail())}>
                        <Table
                            columns={columns}
                            dataSource={results}
                            rowKey="id"
                            loading={loading}
                            size="small"
                            bordered
                            pagination={{
                                showTotal: (total) => `${i18n.t(LocaleHelper.getTotal())} ${total} ${i18n.t(LocaleHelper.getItems())}`,
                                showQuickJumper: true,
                                showSizeChanger: true,
                            }}
                        />
                    </Card>
                )}
            </div>
        </div>
    );
};

export default CostCalculation;

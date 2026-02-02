/**
 * 毛利分析报表页面
 */
import React, { useState, useEffect } from 'react';
import { Card, Form, Select, DatePicker, Button, Table, Statistic, Row, Col, Space, message, Empty, Tooltip } from 'antd';
import { LineChartOutlined, BarChartOutlined, ExportOutlined, ReloadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import CustomIcon from '@/components/custom-icon';
import type { ColumnsType } from 'antd/es/table';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
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
    const navigate = useNavigate();
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
            title: i18n.t(LocaleHelper.getCostOverviewColRank()),
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
            title: i18n.t(LocaleHelper.getCostOverviewColCustomerName()),
            dataIndex: 'customerName',
            key: 'customerName',
            width: 150,
        },
        {
            title: i18n.t(LocaleHelper.getCostOverviewColOrderCount()),
            dataIndex: 'orderCount',
            key: 'orderCount',
            width: 100,
            align: 'right',
            render: (value) => `${value}`,
        },
        {
            title: i18n.t(LocaleHelper.getCostOverviewColTotalRevenue()),
            dataIndex: 'totalRevenue',
            key: 'totalRevenue',
            width: 150,
            align: 'right',
            render: (value) => `¥${value.toLocaleString()}`,
        },
        {
            title: i18n.t(LocaleHelper.getCostOverviewColTotalCost()),
            dataIndex: 'totalCost',
            key: 'totalCost',
            width: 150,
            align: 'right',
            render: (value) => `¥${value.toLocaleString()}`,
        },
        {
            title: i18n.t(LocaleHelper.getCostOverviewCardGrossProfit()),
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
            title: i18n.t(LocaleHelper.getCostOverviewCardProfitMargin()),
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
            message.error(i18n.t(LocaleHelper.getCostOverviewMsgLoadFail()));
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
            message.success(i18n.t(LocaleHelper.getCostOverviewMsgAnalysisComplete()));
        } catch (error) {
            message.error(i18n.t(LocaleHelper.getCostOverviewMsgCompleteAnalysisCondition()));
        }
    };

    // 重置
    const handleReset = () => {
        form.resetFields();
    };

    // 导出
    const handleExport = () => {
        message.info(i18n.t(LocaleHelper.getCostOverviewMsgExportWip()));
    };

    // 返回
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
                            {i18n.t(LocaleHelper.getCostOverviewAnalysisTitle())}
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>说明</b></span>
                                                本页面提供多维度的毛利分析报表，支持按时间、客户、航线等维度统计收入、成本及利润情况。
                                                帮助企业掌握经营效益，辅助决策。
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
                            <Button type="primary" icon={<LineChartOutlined />} onClick={handleAnalyze}>
                                {i18n.t(LocaleHelper.getCostOverviewBtnStartAnalyze())}
                            </Button>
                            <Button icon={<ReloadOutlined />} onClick={handleReset}>
                                {i18n.t(LocaleHelper.getCostOverviewBtnReset())}
                            </Button>
                            <Button icon={<ExportOutlined />} onClick={handleExport}>
                                {i18n.t(LocaleHelper.getCostOverviewBtnExportReport())}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '24px', background: '#f0f2f5' }}>
                {/* 分析条件 */}
                <Card title={i18n.t(LocaleHelper.getCostOverviewSectionAnalysisDimension())} style={{ marginBottom: '16px' }}>
                    <Form form={form} layout="inline">
                        <Form.Item name="timeDimension" label={i18n.t(LocaleHelper.getCostOverviewLabelTimeDimension())} initialValue="month">
                            <Select style={{ width: 150 }}>
                                <Select.Option value="day">{i18n.t(LocaleHelper.getCostOverviewOptionTimeDay())}</Select.Option>
                                <Select.Option value="week">{i18n.t(LocaleHelper.getCostOverviewOptionTimeWeek())}</Select.Option>
                                <Select.Option value="month">{i18n.t(LocaleHelper.getCostOverviewOptionTimeMonth())}</Select.Option>
                                <Select.Option value="quarter">{i18n.t(LocaleHelper.getCostOverviewOptionTimeQuarter())}</Select.Option>
                                <Select.Option value="year">{i18n.t(LocaleHelper.getCostOverviewOptionTimeYear())}</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="dateRange" label={i18n.t(LocaleHelper.getCostOverviewLabelTimeRange())}>
                            <RangePicker />
                        </Form.Item>

                        <Form.Item name="customer" label={i18n.t(LocaleHelper.getCostOverviewLabelCustomerDimension())}>
                            <Select placeholder={i18n.t(LocaleHelper.getCostOverviewOptionCustomerAll())} style={{ width: 200 }} allowClear>
                                <Select.Option value="all">{i18n.t(LocaleHelper.getCostOverviewOptionCustomerAll())}</Select.Option>
                                <Select.Option value="vip">{i18n.t(LocaleHelper.getCostOverviewOptionCustomerVip())}</Select.Option>
                                <Select.Option value="normal">{i18n.t(LocaleHelper.getCostOverviewOptionCustomerNormal())}</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="route" label={i18n.t(LocaleHelper.getCostOverviewLabelRoute())}>
                            <Select placeholder={i18n.t(LocaleHelper.getCostOverviewPlaceholderAllRoutes())} style={{ width: 200 }} allowClear>
                                <Select.Option value="all">{i18n.t(LocaleHelper.getCostOverviewPlaceholderAllRoutes())}</Select.Option>
                                <Select.Option value="asia">{i18n.t(LocaleHelper.getCostOverviewOptionRouteAsia())}</Select.Option>
                                <Select.Option value="europe">{i18n.t(LocaleHelper.getCostOverviewOptionRouteEurope())}</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="salesman" label={i18n.t(LocaleHelper.getCostOverviewLabelSalesman())}>
                            <Select placeholder={i18n.t(LocaleHelper.getCostOverviewPlaceholderAllSalesmen())} style={{ width: 150 }} allowClear>
                                <Select.Option value="all">{i18n.t(LocaleHelper.getCostOverviewPlaceholderAllSalesmen())}</Select.Option>
                                <Select.Option value="zhang">张三</Select.Option>
                                <Select.Option value="li">李四</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="transportMode" label={i18n.t(LocaleHelper.getCostOverviewLabelTransportMode())}>
                            <Select placeholder={i18n.t(LocaleHelper.getCostOverviewPlaceholderAllModes())} style={{ width: 150 }} allowClear>
                                <Select.Option value="all">{i18n.t(LocaleHelper.getCostOverviewPlaceholderAllModes())}</Select.Option>
                                <Select.Option value="sea">{i18n.t(LocaleHelper.getCostOverviewOptionModeSea())}</Select.Option>
                                <Select.Option value="air">{i18n.t(LocaleHelper.getCostOverviewOptionModeAir())}</Select.Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Card>

                {/* 盈利概况 */}
                <Card title={i18n.t(LocaleHelper.getCostOverviewSectionProfitOverview())} style={{ marginBottom: '16px' }}>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title={i18n.t(LocaleHelper.getCostOverviewCardTotalRevenue())}
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
                                    title={i18n.t(LocaleHelper.getCostOverviewCardTotalCost())}
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
                                    title={i18n.t(LocaleHelper.getCostOverviewCardGrossProfit())}
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
                                    title={i18n.t(LocaleHelper.getCostOverviewCardAvgProfitMargin())}
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
                <Card title={i18n.t(LocaleHelper.getCostOverviewSectionProfitTrend())} style={{ marginBottom: '16px' }}>
                    <Empty
                        description={i18n.t(LocaleHelper.getCostOverviewMsgChartWip())}
                        style={{ padding: '60px 0' }}
                    />
                </Card>

                {/* 收入成本对比图 */}
                <Card title={i18n.t(LocaleHelper.getCostOverviewSectionRevenueCostComparison())} style={{ marginBottom: '16px' }}>
                    <Empty
                        description={i18n.t(LocaleHelper.getCostOverviewMsgChartWip())}
                        style={{ padding: '60px 0' }}
                    />
                </Card>

                {/* 客户盈利排行 */}
                <Card title={i18n.t(LocaleHelper.getCostOverviewSectionCustomerRanking())}>
                    <div className="nc-bill-table-area">
                        <Table
                            columns={columns}
                            dataSource={customerData}
                            rowKey="id"
                            loading={loading}
                            size="small"
                            bordered
                            pagination={false}
                        />
                    </div>

                </Card>
            </div>
        </div>
    );
};

export default ProfitAnalysis;

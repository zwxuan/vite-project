/**
 * 费用总览页面
 */
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Button, Space, Tag, Statistic, message } from 'antd';
import {
    DollarOutlined,
    RiseOutlined,
    FallOutlined,
    PercentageOutlined,
    ExportOutlined,
    CalculatorOutlined,
    FileSearchOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import AdvancedSearchForm from '@/components/search-form';
import CustomIcon from '@/components/custom-icon';
import { CostOverviewItem, CostOverviewStats, CostStatus } from '@/types/freight_forwarding/cost_management';
import { getColumns } from './columns';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import '@/pages/page_list.less';

const CostOverview: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState<CostOverviewItem[]>([]);
    const [stats, setStats] = useState<CostOverviewStats>({
        totalReceivable: 1234567,
        totalPayable: 987654,
        grossProfit: 246913,
        profitMargin: 20.0,
        pendingReceivable: 156789,
        pendingPayable: 89456,
        monthlyNew: 345678,
        abnormalCost: 12,
    });
    const [total, setTotal] = useState(0);
    const [searchParams, setSearchParams] = useState<any>({
        pageNum: 1,
        pageSize: 10,
    });

    // 搜索字段配置
    const searchFields = [
        {
            key: 'orderNo',
            name: 'orderNo',
            label: i18n.t(LocaleHelper.getCostOverviewSearchOrderNo()),
            type: 'input',
        },
        {
            key: 'waybillNo',
            name: 'waybillNo',
            label: i18n.t(LocaleHelper.getCostOverviewSearchWaybillNo()),
            type: 'input',
        },
        {
            key: 'customer',
            name: 'customer',
            label: i18n.t(LocaleHelper.getCostOverviewSearchCustomer()),
            type: 'input',
        },
        {
            key: 'costType',
            name: 'costType',
            label: i18n.t(LocaleHelper.getCostOverviewSearchCostType()),
            type: 'select',
            selectOptions: [
                { label: i18n.t(LocaleHelper.getCostOverviewTypeReceivable()), value: 'RECEIVABLE' },
                { label: i18n.t(LocaleHelper.getCostOverviewTypePayable()), value: 'PAYABLE' },
            ],
        },
        {
            key: 'dateRange',
            name: 'dateRange',
            label: i18n.t(LocaleHelper.getCostOverviewSearchDateRange()),
            type: 'dateRange',
        },
    ];





    // 加载数据
    const loadData = async () => {
        setLoading(true);
        try {
            // 模拟数据
            const mockData: CostOverviewItem[] = [
                {
                    id: '1',
                    orderNo: 'ORD001',
                    waybillNo: 'WAY001',
                    costType: 'RECEIVABLE',
                    costName: '海运费',
                    amount: 15000,
                    currency: 'CNY',
                    status: CostStatus.CONFIRMED,
                    customer: '客户A',
                    createTime: '2024-03-15 14:30',
                },
                {
                    id: '2',
                    orderNo: 'ORD001',
                    waybillNo: 'WAY001',
                    costType: 'PAYABLE',
                    costName: '港杂费',
                    amount: 2000,
                    currency: 'CNY',
                    status: CostStatus.PENDING,
                    supplier: '供应商B',
                    createTime: '2024-03-15 15:00',
                },
                {
                    id: '3',
                    orderNo: 'ORD002',
                    waybillNo: 'WAY002',
                    costType: 'RECEIVABLE',
                    costName: '文件费',
                    amount: 300,
                    currency: 'CNY',
                    status: CostStatus.DRAFT,
                    customer: '客户C',
                    createTime: '2024-03-16 10:00',
                },
            ];
            setDataSource(mockData);
            setTotal(mockData.length);
        } catch (error) {
            message.error(i18n.t(LocaleHelper.getFail()));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [searchParams]);

    // 搜索处理
    const handleSearch = (values: any) => {
        setSearchParams({
            ...values,
            pageNum: 1,
            pageSize: searchParams.pageSize,
        });
    };

    // 查看详情
    const handleViewDetail = (record: CostOverviewItem) => {
        navigate(`/cost_management/cost_detail/${record.id}`);
    };

    // 费用计算
    const handleCalculate = () => {
        navigate('/cost_management/cost_calculation');
    };

    // 导出Excel
    const handleExport = () => {
        message.info(i18n.t(LocaleHelper.getCostOverviewBtnExport()) + '功能开发中...');
    };

    // 费用分析
    const handleAnalysis = () => {
        navigate('/cost_management/profit_analysis');
    };

    // 表格列定义
    const columns = getColumns(handleViewDetail);

    // 分页变化
    const handleTableChange = (pagination: any) => {
        setSearchParams({
            ...searchParams,
            pageNum: pagination.current,
            pageSize: pagination.pageSize,
        });
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            {/* 页面头部 */}
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap">
                        <CustomIcon type="icon-Currency" style={{ fontSize: 24, marginRight: 8 }} />
                        <span style={{ fontSize: 18, fontWeight: 500 }}>
                            {i18n.t(LocaleHelper.getCostOverviewTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button
                                type="primary"
                                icon={<CalculatorOutlined />}
                                onClick={handleCalculate}
                            >
                                {i18n.t(LocaleHelper.getCostOverviewBtnCalculate())}
                            </Button>
                            <Button icon={<ExportOutlined />} onClick={handleExport}>
                                {i18n.t(LocaleHelper.getCostOverviewBtnExport())}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 搜索表单 */}
            <AdvancedSearchForm
                fields={searchFields}
                onSearch={handleSearch}
            />

            {/* 统计卡片 */}
            <div style={{ padding: '16px', background: '#fff', marginBottom: '16px' }}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title={i18n.t(LocaleHelper.getCostOverviewCardTotalReceivable())}
                                value={stats.totalReceivable}
                                precision={2}
                                prefix="¥"
                                valueStyle={{ color: '#3f8600' }}
                                suffix={<RiseOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title={i18n.t(LocaleHelper.getCostOverviewCardTotalPayable())}
                                value={stats.totalPayable}
                                precision={2}
                                prefix="¥"
                                valueStyle={{ color: '#cf1322' }}
                                suffix={<FallOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title={i18n.t(LocaleHelper.getCostOverviewCardGrossProfit())}
                                value={stats.grossProfit}
                                precision={2}
                                prefix="¥"
                                valueStyle={{ color: '#1890ff' }}
                                suffix={<DollarOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title={i18n.t(LocaleHelper.getCostOverviewCardProfitMargin())}
                                value={stats.profitMargin}
                                precision={1}
                                suffix="%"
                                valueStyle={{ color: '#722ed1' }}
                                prefix={<PercentageOutlined />}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginTop: '16px' }}>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title={i18n.t(LocaleHelper.getCostOverviewCardPendingReceivable())}
                                value={stats.pendingReceivable}
                                precision={2}
                                prefix="¥"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title={i18n.t(LocaleHelper.getCostOverviewCardPendingPayable())}
                                value={stats.pendingPayable}
                                precision={2}
                                prefix="¥"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title={i18n.t(LocaleHelper.getCostOverviewCardMonthlyNew())}
                                value={stats.monthlyNew}
                                precision={2}
                                prefix="¥"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title={i18n.t(LocaleHelper.getCostOverviewCardAbnormalCost())}
                                value={stats.abnormalCost}
                                suffix="项"
                                valueStyle={{ color: stats.abnormalCost > 0 ? '#cf1322' : '#3f8600' }}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* 费用明细表格 */}
            <div className="nc-bill-table-area">
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    loading={loading}
                    rowKey="id"
                    size="small"
                    bordered={true}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 600px)' }}
                    pagination={{
                        current: searchParams.pageNum,
                        pageSize: searchParams.pageSize,
                        total: total,
                        showTotal: (total) => `共 ${total} 条`,
                        showQuickJumper: true,
                        showSizeChanger: true,
                    }}
                    onChange={handleTableChange}
                />
                <div style={{ marginTop: '16px', textAlign: 'right' }}>
                    <Space>
                        <Button onClick={handleExport}>{i18n.t(LocaleHelper.getCostOverviewBtnBatchExport())}</Button>
                        <Button type="primary" onClick={handleAnalysis}>
                            {i18n.t(LocaleHelper.getCostOverviewBtnCostAnalysis())}
                        </Button>
                    </Space>
                </div>
            </div>
        </div>
    );
};

export default CostOverview;

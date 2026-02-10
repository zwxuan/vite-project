import '@/pages/page_list.less';
import React, { useState, useEffect, useMemo } from 'react';
import { Card, Row, Col, Statistic, Table, Tooltip, message, Spin } from 'antd';
import CustomIcon from '@/components/custom-icon';
import AdvancedSearchForm from '@/components/search-form';
import { getFields } from './search_fields';
import { getColumns } from './columns';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getStatisticsData, StatisticsKPI, TrendItem, ReasonItem, DetailItem } from '@/api/customs_compliance/supporting_documents_management/statistics_service';
import { TrendChart, ReasonChart } from './charts';

const StatisticsReport: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [kpi, setKpi] = useState<StatisticsKPI | null>(null);
    const [trend, setTrend] = useState<TrendItem[]>([]);
    const [reason, setReason] = useState<ReasonItem[]>([]);
    const [list, setList] = useState<DetailItem[]>([]);
    const [total, setTotal] = useState(0);

    // Memoize fields to prevent unnecessary re-renders in AdvancedSearchForm
    const fields = useMemo(() => getFields(), []);

    const fetchData = async (params = {}) => {
        setLoading(true);
        try {
            const res = await getStatisticsData(params);
            if (res.success) {
                setKpi(res.kpi);
                setTrend(res.trend);
                setReason(res.reason);
                setList(res.list);
                setTotal(res.list.length);
            }
        } catch (error) {
            message.error('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (values: any) => {
        fetchData(values);
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
             {/* Header */}
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px', marginRight: '8px' }} />
                            {i18n.t(LocaleHelper.getCcsdmStatisticsReportPageTitle())}
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}>
                                                <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                                                    <b>说明</b>
                                                </span>
                                                <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                                                    <li><b>角色：</b>{i18n.t(LocaleHelper.getCcsdmStatisticsReportHelpRole())}</li>
                                                    <li><b>数据来源：</b>{i18n.t(LocaleHelper.getCcsdmStatisticsReportHelpOrigin())}</li>
                                                    <li><b>功能说明：</b>{i18n.t(LocaleHelper.getCcsdmStatisticsReportHelpDesc())}</li>
                                                </ul>
                                            </li>
                                        </ol>
                                    </div>
                                }
                                color='white'
                                overlayInnerStyle={{ color: 'black' }}
                            >
                                <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                            </Tooltip>
                        </span>
                    </div>
                </div>
            </div>

            {/* Search */}
            <AdvancedSearchForm
                fields={fields}
                onSearch={handleSearch}
            />

            <div style={{ padding: '10px 20px' }}>
                <Spin spinning={loading}>
                    {/* KPIs */}
                    <Row gutter={16} style={{ marginBottom: '20px' }}>
                        <Col span={6}>
                            <Card size="small" hoverable>
                                <Statistic
                                    title={i18n.t(LocaleHelper.getCcsdmStatisticsReportKpiTotalJobs())}
                                    value={kpi?.totalJobs}
                                    prefix={<CustomIcon type="icon-Currency" />}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card size="small" hoverable>
                                <Statistic
                                    title={i18n.t(LocaleHelper.getCcsdmStatisticsReportKpiDocsCollected())}
                                    value={kpi?.docsCollected}
                                    valueStyle={{ color: '#3f8600' }}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card size="small" hoverable>
                                <Statistic
                                    title={i18n.t(LocaleHelper.getCcsdmStatisticsReportKpiMissingDocs())}
                                    value={kpi?.missingDocs}
                                    valueStyle={{ color: '#cf1322' }}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card size="small" hoverable>
                                <Statistic
                                    title={i18n.t(LocaleHelper.getCcsdmStatisticsReportKpiComplianceRate())}
                                    value={kpi?.complianceRate}
                                    suffix="%"
                                    precision={2}
                                />
                            </Card>
                        </Col>
                    </Row>

                    {/* Charts */}
                    <Row gutter={16} style={{ marginBottom: '20px' }}>
                        <Col span={16}>
                            <Card title={i18n.t(LocaleHelper.getCcsdmStatisticsReportChartTrendTitle())} size="small">
                                <TrendChart data={trend} />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title={i18n.t(LocaleHelper.getCcsdmStatisticsReportChartReasonTitle())} size="small">
                                <ReasonChart data={reason} />
                            </Card>
                        </Col>
                    </Row>

                    {/* Table */}
                    <div className="nc-bill-table-area" style={{ marginTop: 10 }}>
                        <Table
                            columns={getColumns()}
                            dataSource={list}
                            rowKey="id"
                            size="small"
                            bordered
                            pagination={{
                                total,
                                showTotal: (total) => `Total ${total} items`,
                                showQuickJumper: true,
                                showSizeChanger: true,
                                defaultPageSize: 10,
                            }}
                            scroll={{ x: 'max-content', y: 400 }}
                        />
                    </div>
                </Spin>
            </div>
        </div>
    );
};

export default StatisticsReport;

import '@/pages/page_list.less';
import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Table, DatePicker, Select, Tooltip, Space } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import i18n from '@/i18n';
import { JobStatisticsLocale } from '@/utils/locale/customs_compliance/customs_job_management/job_statistics';
import { CommonLocale } from '@/utils/locale/common';
import CustomIcon from "@/components/custom-icon";
import { TrendChart, DistributionChart, RankingChart } from './charts';
import { mockKpiData, mockTrendData, mockDistributionData, mockRankingData, mockTableData } from './mockData';
import { getColumns } from './columns';

const { RangePicker } = DatePicker;

const JobStatistics: React.FC = () => {
    // State for filters (mock functionality)
    const [dateRange, setDateRange] = useState<any>([]);
    const [businessType, setBusinessType] = useState<string>('all');
    const [pageSize, setPageSize] = useState(20);

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(JobStatisticsLocale.getPageTitle())}
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}>
                                                <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                                                    <b>{i18n.t(JobStatisticsLocale.getHelpLabel())}</b>
                                                </span>
                                                <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                                                    <li><b>{i18n.t(JobStatisticsLocale.getHelpRole())}</b>{i18n.t(JobStatisticsLocale.getHelpRoleDesc())}</li>
                                                    <li><b>{i18n.t(JobStatisticsLocale.getHelpOrigin())}</b>{i18n.t(JobStatisticsLocale.getHelpOriginDesc())}</li>
                                                    <li><b>{i18n.t(JobStatisticsLocale.getHelpFunctionality())}</b>{i18n.t(JobStatisticsLocale.getHelpFunctionalityDesc())}</li>
                                                </ul>
                                            </li>
                                        </ol>
                                    </div>
                                }
                                color='white'
                            >
                                <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                            </Tooltip>
                        </span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="nc-bill-search-area">
                <div className="search-area-contant">
                    <Row gutter={24} style={{ padding: '10px 0 10px 10px' }}>
                        <Col>
                            <Space>
                                <label style={{ fontWeight: 'bold' }}>{i18n.t(JobStatisticsLocale.getFilterDateRange())}:</label>
                                <RangePicker onChange={(dates) => setDateRange(dates)} />
                            </Space>
                        </Col>
                        <Col>
                            <Space>
                                <label style={{ fontWeight: 'bold' }}>{i18n.t(JobStatisticsLocale.getFilterBusinessType())}:</label>
                                <Select
                                    defaultValue="all"
                                    style={{ width: 200 }}
                                    onChange={setBusinessType}
                                    options={[
                                        { value: 'all', label: 'All' },
                                        { value: 'import', label: 'Import' },
                                        { value: 'export', label: 'Export' },
                                    ]}
                                />
                            </Space>
                        </Col>
                    </Row>
                </div>
            </div>

            <div style={{ padding: '10px 20px 0' }}>
                {/* KPIs */}
                <Row gutter={16} style={{ marginBottom: '20px' }}>
                    <Col span={6}>
                        <Card size="small">
                            <Statistic
                                title={i18n.t(JobStatisticsLocale.getKpiTotalJobs())}
                                value={mockKpiData.total}
                                prefix={<CustomIcon type="icon-Currency" />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card size="small">
                            <Statistic
                                title={i18n.t(JobStatisticsLocale.getKpiCompleted())}
                                value={mockKpiData.completed}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                                suffix={`/ ${mockKpiData.total}`}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card size="small">
                            <Statistic
                                title={i18n.t(JobStatisticsLocale.getKpiProcessing())}
                                value={mockKpiData.processing}
                                valueStyle={{ color: '#1890ff' }}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card size="small">
                            <Statistic
                                title={i18n.t(JobStatisticsLocale.getKpiException())}
                                value={mockKpiData.exception}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<ArrowDownOutlined />}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* Charts */}
                <Row gutter={16} style={{ marginBottom: '20px' }}>
                    <Col span={16}>
                        <Card size="small" title={i18n.t(JobStatisticsLocale.getChartTrendTitle())}>
                            <TrendChart data={mockTrendData} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card size="small" title={i18n.t(JobStatisticsLocale.getChartDistributionTitle())}>
                            <DistributionChart data={mockDistributionData} />
                        </Card>
                    </Col>
                </Row>

                <Row gutter={16} style={{ marginBottom: '10px' }}>
                    <Col span={24}>
                        <Card size="small" title={i18n.t(JobStatisticsLocale.getChartRankingTitle())}>
                            <RankingChart data={mockRankingData} />
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* Table */}
            <div className="nc-bill-table-area">
                <Table
                    columns={getColumns()}
                    dataSource={mockTableData}
                    size="small"
                    bordered={true}
                    scroll={{ x: 'max-content', y: 400 }}
                    pagination={{
                        size: 'small',
                        pageSize: pageSize,
                        showTotal: (total) => `${i18n.t(CommonLocale.getTotal())} ${total} ${i18n.t(CommonLocale.getItems())}`,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        onShowSizeChange: (current, size) => {
                            setPageSize(size);
                        },
                        locale: {
                            items_per_page: i18n.t(CommonLocale.getItemsPerPage()),
                            jump_to: i18n.t(CommonLocale.getJumpTo()),
                            page: i18n.t(CommonLocale.getPage()),
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default JobStatistics;

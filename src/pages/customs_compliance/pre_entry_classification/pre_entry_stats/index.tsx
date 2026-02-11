import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Card, Col, Row, Statistic, Tooltip, message, Table, Spin } from 'antd';
import { Chart } from '@antv/g2';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getStatsData } from '@/api/customs_compliance/pre_entry_classification/pre_entry_stats_service';
import AdvancedSearchForm from '@/components/search-form';
import { getFields } from './search_fields';

const PreEntryStats: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const trendChartRef = useRef<HTMLDivElement>(null);
  const statusChartRef = useRef<HTMLDivElement>(null);
  const errorChartRef = useRef<HTMLDivElement>(null);

  // Memoize fields to prevent unnecessary re-renders in AdvancedSearchForm
  const fields = useMemo(() => getFields(), []);

  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      const res = await getStatsData(); // In real scenario, pass params here
      if (res.success) {
        setData(res.data);
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

  useEffect(() => {
    if (!data) return;

    // Trend Chart
    if (trendChartRef.current) {
      trendChartRef.current.innerHTML = '';
      const chart = new Chart({
        container: trendChartRef.current,
        autoFit: true,
      });

      chart
        .data(data.trend)
        .encode('x', 'date')
        .encode('y', 'value')
        .encode('color', 'type')
        .scale('y', { nice: true });

      chart.line().encode('shape', 'smooth');
      chart.point().encode('shape', 'point').tooltip(false);

      chart.render();
    }

    // Status Distribution Chart
    if (statusChartRef.current) {
      statusChartRef.current.innerHTML = '';
      const chart = new Chart({
        container: statusChartRef.current,
        autoFit: true,
      });

      chart.coordinate({ type: 'theta', outerRadius: 0.8 });

      chart
        .interval()
        .data(data.statusDistribution)
        .transform({ type: 'stackY' })
        .encode('y', 'value')
        .encode('color', 'type')
        .label({
          text: 'value',
          position: 'outside',
          fontWeight: 'bold',
        });

      chart.render();
    }

    // Error Analysis Chart
    if (errorChartRef.current) {
      errorChartRef.current.innerHTML = '';
      const chart = new Chart({
        container: errorChartRef.current,
        autoFit: true,
      });

      chart
        .interval()
        .data(data.errorAnalysis)
        .encode('x', 'reason')
        .encode('y', 'value')
        .encode('color', 'reason');

      chart.render();
    }
  }, [data]);

  const topHsCodesColumns = [
    { title: i18n.t(LocaleHelper.getPreEntryStatsTopHsCodes()) + ' (HS Code)', dataIndex: 'code', key: 'code' },
    { title: 'Goods Name', dataIndex: 'name', key: 'name' },
    { title: 'Count', dataIndex: 'count', key: 'count' },
  ];

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      {/* Header */}
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <span className="bill-info-title" style={{ marginLeft: "10px" }}>
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px', marginRight: '8px' }} />
              {i18n.t(LocaleHelper.getPreEntryStatsPageTitle())}
              <Tooltip title={
                  <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                      <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                          <li style={{ marginBottom: '10px' }}>
                              <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                                  <b>{i18n.t(LocaleHelper.getPreEntryStatsHelpLabel())}</b>
                              </span>
                              <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                                  <li><b>角色：</b>{i18n.t(LocaleHelper.getPreEntryStatsHelpRole())} - {i18n.t(LocaleHelper.getPreEntryStatsHelpRoleDesc())}</li>
                                  <li><b>数据来源：</b>{i18n.t(LocaleHelper.getPreEntryStatsHelpOrigin())} - {i18n.t(LocaleHelper.getPreEntryStatsHelpOriginDesc())}</li>
                                  <li><b>功能说明：</b>{i18n.t(LocaleHelper.getPreEntryStatsHelpFunc())} - {i18n.t(LocaleHelper.getPreEntryStatsHelpFuncDesc())}</li>
                              </ul>
                          </li>
                      </ol>
                  </div>
              } color='white' overlayInnerStyle={{ color: 'black' }}>
                  <i className='iconfont icon-bangzhutishi' style={{ marginLeft: '10px', cursor: 'pointer' }} />
              </Tooltip>
            </span>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <AdvancedSearchForm
          fields={fields}
          onSearch={handleSearch}
      />

      <div style={{ padding: '10px 20px' }}>
        <Spin spinning={loading}>
            {/* KPI Row 1 */}
            <Row gutter={16} style={{ marginBottom: '16px' }}>
                <Col span={6}>
                <Card size="small" hoverable>
                    <Statistic
                    title={i18n.t(LocaleHelper.getPreEntryStatsTotalPreEntries())}
                    value={data?.kpi?.total || 0}
                    />
                </Card>
                </Col>
                <Col span={6}>
                <Card size="small" hoverable>
                    <Statistic
                    title={i18n.t(LocaleHelper.getPreEntryStatsPendingClassification())}
                    value={data?.kpi?.pendingClassification || 0}
                    valueStyle={{ color: '#faad14' }}
                    />
                </Card>
                </Col>
                <Col span={6}>
                <Card size="small" hoverable>
                    <Statistic
                    title={i18n.t(LocaleHelper.getPreEntryStatsCompletedToday())}
                    value={data?.kpi?.completedToday || 0}
                    valueStyle={{ color: '#3f8600' }}
                    />
                </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" hoverable>
                    <Statistic
                    title={i18n.t(LocaleHelper.getPreEntryStatsPendingReview())}
                    value={data?.kpi?.pending || 0}
                    valueStyle={{ color: '#faad14' }}
                    />
                </Card>
                </Col>
            </Row>

            {/* KPI Row 2 */}
            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={8}>
                <Card size="small" hoverable>
                    <Statistic
                    title={i18n.t(LocaleHelper.getPreEntryStatsSLACompliance())}
                    value={data?.kpi?.sla || 0}
                    precision={2}
                    suffix="%"
                    />
                </Card>
                </Col>
                <Col span={8}>
                <Card size="small" hoverable>
                    <Statistic
                    title={i18n.t(LocaleHelper.getPreEntryStatsErrorRate())}
                    value={data?.kpi?.errorRate || 0}
                    precision={2}
                    suffix="%"
                    valueStyle={{ color: '#cf1322' }}
                    />
                </Card>
                </Col>
                <Col span={8}>
                <Card size="small" hoverable>
                    <Statistic
                    title={i18n.t(LocaleHelper.getPreEntryStatsAvgTurnaroundTime())}
                    value={data?.kpi?.avgTurnaroundTime || 0}
                    precision={1}
                    suffix="h"
                    />
                </Card>
                </Col>
            </Row>

            {/* Charts Row 1 */}
            <Row gutter={16} style={{ marginBottom: '16px' }}>
                <Col span={16}>
                <Card title={i18n.t(LocaleHelper.getPreEntryStatsWorkloadTrend())} size="small">
                    <div ref={trendChartRef} style={{ height: '300px' }} />
                </Card>
                </Col>
                <Col span={8}>
                <Card title={i18n.t(LocaleHelper.getPreEntryStatsStatusDistribution())} size="small">
                    <div ref={statusChartRef} style={{ height: '300px' }} />
                </Card>
                </Col>
            </Row>

            {/* Charts Row 2 */}
            <Row gutter={16}>
                <Col span={12}>
                <Card title={i18n.t(LocaleHelper.getPreEntryStatsErrorAnalysis())} size="small">
                    <div ref={errorChartRef} style={{ height: '300px' }} />
                </Card>
                </Col>
                <Col span={12}>
                <Card title={i18n.t(LocaleHelper.getPreEntryStatsTopHsCodes())} size="small">
                    <div className="nc-bill-table-area">
                        <Table 
                            dataSource={data?.topHsCodes || []} 
                            columns={topHsCodesColumns} 
                            pagination={false}
                            size="small"
                            bordered
                            scroll={{ y: 240 }}
                        />
                    </div>
                </Card>
                </Col>
            </Row>
        </Spin>
      </div>
    </div>
  );
};

export default PreEntryStats;

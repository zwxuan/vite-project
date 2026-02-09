import React, { useEffect, useRef, useState } from 'react';
import { Card, Row, Col, Statistic, Button, DatePicker, Space, Tooltip, message, Select } from 'antd';
import { Chart } from '@antv/g2';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const ScreeningStatisticsReport: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const trendChartRef = useRef<HTMLDivElement>(null);
  const riskDistChartRef = useRef<HTMLDivElement>(null);
  const topEntitiesChartRef = useRef<HTMLDivElement>(null);
  
  // Mock data
  const [stats, setStats] = useState({
    total: 12580,
    riskHits: 342,
    autoPass: 97.2,
    avgTime: 0.85
  });

  useEffect(() => {
    renderTrendChart();
    renderRiskDistChart();
    renderTopEntitiesChart();
  }, []);

  const renderTrendChart = () => {
    if (!trendChartRef.current) return;
    
    // Clear previous chart if any (simple way for this demo)
    trendChartRef.current.innerHTML = '';

    const chart = new Chart({
      container: trendChartRef.current,
      autoFit: true,
    });

    const data = [
      { date: '2023-10-01', value: 1200, type: 'Total' },
      { date: '2023-10-01', value: 50, type: 'Risk' },
      { date: '2023-10-02', value: 1350, type: 'Total' },
      { date: '2023-10-02', value: 45, type: 'Risk' },
      { date: '2023-10-03', value: 1100, type: 'Total' },
      { date: '2023-10-03', value: 30, type: 'Risk' },
      { date: '2023-10-04', value: 1500, type: 'Total' },
      { date: '2023-10-04', value: 60, type: 'Risk' },
      { date: '2023-10-05', value: 1400, type: 'Total' },
      { date: '2023-10-05', value: 55, type: 'Risk' },
      { date: '2023-10-06', value: 1600, type: 'Total' },
      { date: '2023-10-06', value: 70, type: 'Risk' },
      { date: '2023-10-07', value: 1300, type: 'Total' },
      { date: '2023-10-07', value: 40, type: 'Risk' },
    ];

    chart
      .line()
      .data(data)
      .encode('x', 'date')
      .encode('y', 'value')
      .encode('color', 'type')
      .scale('y', { nice: true })
      .axis('y', { labelFormatter: (d: any) => `${d}` });

    chart.render();
  };

  const renderRiskDistChart = () => {
    if (!riskDistChartRef.current) return;
    riskDistChartRef.current.innerHTML = '';

    const chart = new Chart({
      container: riskDistChartRef.current,
      autoFit: true,
    });

    const data = [
      { type: 'Sanctions', value: 45 },
      { type: 'PEP', value: 25 },
      { type: 'Adverse Media', value: 15 },
      { type: 'Enforcement', value: 10 },
      { type: 'Other', value: 5 },
    ];

    chart.coordinate({ type: 'theta', outerRadius: 0.8 });

    chart
      .interval()
      .data(data)
      .transform({ type: 'stackY' })
      .encode('y', 'value')
      .encode('color', 'type')
      .legend('color', { position: 'bottom', layout: { justifyContent: 'center' } })
      .label({
        position: 'outside',
        text: (data: any) => `${data.type}: ${data.value}%`,
      });

    chart.render();
  };

  const renderTopEntitiesChart = () => {
    if (!topEntitiesChartRef.current) return;
    topEntitiesChartRef.current.innerHTML = '';

    const chart = new Chart({
      container: topEntitiesChartRef.current,
      autoFit: true,
    });

    const data = [
        { entity: 'Trading Co A', count: 120 },
        { entity: 'Logistics Ltd B', count: 95 },
        { entity: 'Import/Export C', count: 80 },
        { entity: 'Supplier D', count: 65 },
        { entity: 'Manufacturer E', count: 50 },
    ];

    chart
      .interval()
      .data(data)
      .encode('x', 'entity')
      .encode('y', 'count')
      .encode('color', '#1890ff');

    chart.render();
  };

  const handleSearch = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      message.success(i18n.t(LocaleHelper.getSuccess()));
      // In a real app, we would fetch new data here
    }, 1000);
  };

  const handleExport = () => {
    message.success(i18n.t(LocaleHelper.getSuccess()));
  };

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      {/* Header Area */}
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap">
            <div className="bill-info-title">
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px', marginRight: '8px' }} />
              <span>{i18n.t(LocaleHelper.getScreeningStatisticsReportPageTitle())}</span>
              <Tooltip
                  title={
                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                      <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                        <li style={{ marginBottom: '10px' }}>
                          <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                            <b>{i18n.t(LocaleHelper.getScreeningStatisticsReportPageHelpLabel())}</b>
                          </span>
                          <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                            <li><b>{i18n.t(LocaleHelper.getScreeningStatisticsReportPageHelpRole())}</b>{i18n.t(LocaleHelper.getScreeningStatisticsReportPageHelpRoleDesc())}</li>
                            <li><b>{i18n.t(LocaleHelper.getScreeningStatisticsReportPageHelpOrigin())}</b>{i18n.t(LocaleHelper.getScreeningStatisticsReportPageHelpOriginDesc())}</li>
                            <li><b>{i18n.t(LocaleHelper.getScreeningStatisticsReportPageHelpFunc())}</b>{i18n.t(LocaleHelper.getScreeningStatisticsReportPageHelpFuncDesc())}</li>
                          </ul>
                        </li>
                      </ol>
                    </div>
                  }
                  color='white'
                >
                  <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                </Tooltip>
            </div>
          </div>
        </div>
        <div className="header-button-area">
            <div style={{ display: "flex" }}>
                <Button onClick={handleExport}>{i18n.t(LocaleHelper.getScreeningStatisticsReportBtnExport())}</Button>
            </div>
        </div>
      </div>

      {/* Filter Area */}
      <div style={{ padding: '0 20px', marginBottom: '20px', background: '#fff', paddingTop: '20px' }}>
         <Space size="large">
            <Space>
                <span>{i18n.t(LocaleHelper.getScreeningStatisticsReportSearchDateRange())}:</span>
                <RangePicker defaultValue={[dayjs().subtract(7, 'day'), dayjs()]} />
            </Space>
            <Space>
                <span>{i18n.t(LocaleHelper.getScreeningStatisticsReportSearchBizUnit())}:</span>
                <Select defaultValue="all" style={{ width: 150 }} options={[
                    { value: 'all', label: 'All Units' },
                    { value: 'import', label: 'Import Dept' },
                    { value: 'export', label: 'Export Dept' },
                ]} />
            </Space>
            <Button type="primary" onClick={handleSearch} loading={loading}>
                {i18n.t(LocaleHelper.getScreeningStatisticsReportBtnRefresh())}
            </Button>
         </Space>
      </div>

      {/* Content Area */}
      <div style={{ padding: '0 20px 20px 20px' }}>
        {/* Statistics Cards */}
        <Row gutter={16} style={{ marginBottom: '20px' }}>
            <Col span={6}>
            <Card bordered={false} hoverable>
                <Statistic 
                    title={i18n.t(LocaleHelper.getScreeningStatisticsReportCardTotal())} 
                    value={stats.total} 
                    prefix={<CustomIcon type="icon-Currency" />} 
                />
            </Card>
            </Col>
            <Col span={6}>
            <Card bordered={false} hoverable>
                <Statistic 
                    title={i18n.t(LocaleHelper.getScreeningStatisticsReportCardRiskHits())} 
                    value={stats.riskHits} 
                    valueStyle={{ color: '#cf1322' }} 
                    prefix={<CustomIcon type="icon-Currency" />} 
                />
            </Card>
            </Col>
            <Col span={6}>
            <Card bordered={false} hoverable>
                <Statistic 
                    title={i18n.t(LocaleHelper.getScreeningStatisticsReportCardAutoPass())} 
                    value={stats.autoPass} 
                    precision={1} 
                    suffix="%" 
                    valueStyle={{ color: '#3f8600' }}
                />
            </Card>
            </Col>
            <Col span={6}>
            <Card bordered={false} hoverable>
                <Statistic 
                    title={i18n.t(LocaleHelper.getScreeningStatisticsReportCardAvgTime())} 
                    value={stats.avgTime} 
                    precision={2} 
                    suffix="s" 
                />
            </Card>
            </Col>
        </Row>

        {/* Charts */}
        <Row gutter={16}>
            <Col span={16}>
                <Card title={i18n.t(LocaleHelper.getScreeningStatisticsReportChartTrend())} bordered={false} style={{ marginBottom: '20px' }}>
                    <div ref={trendChartRef} style={{ height: '350px' }}></div>
                </Card>
            </Col>
            <Col span={8}>
                <Card title={i18n.t(LocaleHelper.getScreeningStatisticsReportChartRiskDist())} bordered={false} style={{ marginBottom: '20px' }}>
                    <div ref={riskDistChartRef} style={{ height: '350px' }}></div>
                </Card>
            </Col>
        </Row>

        <Row gutter={16}>
             <Col span={24}>
                <Card title={i18n.t(LocaleHelper.getScreeningStatisticsReportChartTopEntities())} bordered={false}>
                    <div ref={topEntitiesChartRef} style={{ height: '300px' }}></div>
                </Card>
             </Col>
        </Row>
      </div>
    </div>
  );
};

export default ScreeningStatisticsReport;

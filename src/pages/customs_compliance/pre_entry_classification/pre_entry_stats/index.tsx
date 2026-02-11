import React, { useEffect, useState, useRef } from 'react';
import { Card, Col, Row, Statistic, Tooltip, message } from 'antd';
import { Chart } from '@antv/g2';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getStatsData } from '@/api/customs_compliance/pre_entry_classification/pre_entry_stats_service';

const PreEntryStats: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const trendChartRef = useRef<HTMLDivElement>(null);
  const accuracyChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getStatsData();
        if (res.success) {
          setData(res.data);
        }
      } catch (error) {
        message.error('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
        .scale('y', { nice: true });

      chart.line().encode('shape', 'smooth');
      chart.point().encode('shape', 'point').tooltip(false);

      chart.render();
    }

    // Accuracy Chart
    if (accuracyChartRef.current) {
      accuracyChartRef.current.innerHTML = '';
      const chart = new Chart({
        container: accuracyChartRef.current,
        autoFit: true,
      });

      chart.coordinate({ type: 'theta', outerRadius: 0.8 });

      chart
        .interval()
        .data(data.accuracy)
        .transform({ type: 'stackY' })
        .encode('y', 'value')
        .encode('color', 'type');

      chart.render();
    }
  }, [data]);

  return (
    <div style={{ padding: '24px', overflowY: 'auto', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area" style={{ marginBottom: '24px' }}>
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <span className="bill-info-title">
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
                  <i className='iconfont icon-bangzhutishi' style={{ marginLeft: '8px', cursor: 'pointer' }} />
              </Tooltip>
            </span>
          </div>
        </div>
        <div className="header-button-area">
        </div>
      </div>

      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title={i18n.t(LocaleHelper.getPreEntryStatsTotalPreEntries())}
              value={data?.kpi?.total || 0}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title={i18n.t(LocaleHelper.getPreEntryStatsPendingReview())}
              value={data?.kpi?.pending || 0}
              valueStyle={{ color: '#faad14' }}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title={i18n.t(LocaleHelper.getPreEntryStatsCompleted())}
              value={data?.kpi?.completed || 0}
              valueStyle={{ color: '#3f8600' }}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title={i18n.t(LocaleHelper.getPreEntryStatsSLACompliance())}
              value={data?.kpi?.sla || 0}
              precision={2}
              suffix="%"
              loading={loading}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={16}>
          <Card title={i18n.t(LocaleHelper.getPreEntryStatsWeeklyTrend())}>
            <div ref={trendChartRef} style={{ height: '300px' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title={i18n.t(LocaleHelper.getPreEntryStatsClassificationAccuracy())}>
            <div ref={accuracyChartRef} style={{ height: '300px' }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PreEntryStats;

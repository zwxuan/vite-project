import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import CustomIcon from '@/components/custom-icon';

const ScreeningStatisticsReport: React.FC = () => {
  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap">
            <div className="bill-info-title">
              <CustomIcon type="icon-Currency" />
              <span>筛查统计报表</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: '20px' }}>
        <Row gutter={16}>
            <Col span={6}>
            <Card>
                <Statistic title="今日筛查数" value={128} prefix={<CustomIcon type="icon-Currency" />} />
            </Card>
            </Col>
            <Col span={6}>
            <Card>
                <Statistic title="风险命中数" value={5} valueStyle={{ color: '#cf1322' }} prefix={<CustomIcon type="icon-Currency" />} />
            </Card>
            </Col>
            <Col span={6}>
            <Card>
                <Statistic title="自动通过率" value={92} suffix="%" />
            </Card>
            </Col>
            <Col span={6}>
            <Card>
                <Statistic title="平均耗时" value={1.5} suffix="s" />
            </Card>
            </Col>
        </Row>
        <div style={{ marginTop: '20px', height: '350px', background: '#f0f2f5', border: '1px dashed #d9d9d9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Placeholder for Charts (Trend Analysis)
        </div>
      </div>
    </div>
  );
};
export default ScreeningStatisticsReport;

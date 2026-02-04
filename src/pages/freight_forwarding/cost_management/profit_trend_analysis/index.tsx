import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic, Table } from 'antd';
import { DollarOutlined, BarChartOutlined } from '@ant-design/icons';
import AdvancedSearchForm from '@/components/search-form';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getProfitTrendAnalysisSearchFields } from './search_fields';
import { getColumns } from './columns';
import {
  queryProfitTrendAnalysisList,
  queryProfitTrendAnalysisStats,
} from '@/api/freight_forwarding/cost_management/department_profit_analysis_service';
import { ProfitTrendAnalysisItem, ProfitTrendAnalysisStats } from '@/types/freight_forwarding/cost_management';
import '@/pages/page_list.less';

const ProfitTrendAnalysis: React.FC = () => {
  const [data, setData] = useState<ProfitTrendAnalysisItem[]>([]);
  const [stats, setStats] = useState<ProfitTrendAnalysisStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  const fetchData = async () => {
    setLoading(true);
    const queryParams = {
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      ...filters,
    };
    const [listRes, statsRes] = await Promise.all([
      queryProfitTrendAnalysisList(queryParams),
      queryProfitTrendAnalysisStats(queryParams),
    ]);
    setData(listRes.data);
    setPagination((prev) => ({ ...prev, total: listRes.total }));
    setStats(statsRes);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, filters]);

  const onSearch = (values: any) => {
    const nextFilters = Array.isArray(values)
      ? values.reduce((acc, item) => {
          acc[item.field] = item.value;
          return acc;
        }, {} as Record<string, any>)
      : values || {};
    setFilters(nextFilters);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const columns = getColumns();

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <span className="bill-info-title">
              <CustomIcon type="icon-Currency" style={{ fontSize: 24, color: 'red' }} />
              {i18n.t(LocaleHelper.getProfitTrendAnalysisPageTitle())}
            </span>
          </div>
        </div>
        <div className="header-button-area">
          <span className="buttonGroup-component">
            <div className="u-button-group" />
          </span>
        </div>
      </div>

      <div className="nc-bill-search-area">
        <AdvancedSearchForm fields={getProfitTrendAnalysisSearchFields()} onSearch={onSearch} />
      </div>

      <div style={{ padding: '10px 10px 0' }}>
        <Card size="small" bordered={false}>
          <Row gutter={16}>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getProfitTrendAnalysisStatTotalRevenue())}
                value={stats?.totalRevenue || 0}
                precision={2}
                prefix={<DollarOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getProfitTrendAnalysisStatTotalCost())}
                value={stats?.totalCost || 0}
                precision={2}
                prefix={<DollarOutlined />}
                valueStyle={{ color: '#ff4d4f' }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getProfitTrendAnalysisStatGrossProfit())}
                value={stats?.grossProfit || 0}
                precision={2}
                prefix={<BarChartOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getProfitTrendAnalysisStatAvgProfitMargin())}
                value={stats?.avgProfitMargin || 0}
                precision={2}
                suffix="%"
                valueStyle={{ color: '#722ed1' }}
              />
            </Col>
          </Row>
        </Card>
      </div>

      <div style={{ padding: '10px 10px 0' }}>
        <Card
          size="small"
          bordered={false}
          title={i18n.t(LocaleHelper.getProfitTrendAnalysisSectionProfitTrend())}
        >
          <div
            style={{
              height: 320,
              background: '#fafafa',
              border: '1px dashed #d9d9d9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#999',
            }}
          >
            {i18n.t(LocaleHelper.getProfitTrendAnalysisChartPlaceholder())}
          </div>
        </Card>
      </div>

      <div style={{ padding: '10px 10px 0' }}>
        <Card
          size="small"
          bordered={false}
          title={i18n.t(LocaleHelper.getProfitTrendAnalysisSectionRevenueCostTrend())}
        >
          <div
            style={{
              height: 320,
              background: '#fafafa',
              border: '1px dashed #d9d9d9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#999',
            }}
          >
            {i18n.t(LocaleHelper.getProfitTrendAnalysisChartPlaceholder())}
          </div>
        </Card>
      </div>

      <div className="nc-bill-table-area">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
          size="small"
          bordered
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showTotal: (total) =>
              `${i18n.t(LocaleHelper.getTotal())}${total}${i18n.t(LocaleHelper.getItems())}`,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
          scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
          onChange={(page) =>
            setPagination((prev) => ({
              ...prev,
              current: page.current || 1,
              pageSize: page.pageSize || 10,
            }))
          }
        />
      </div>
    </div>
  );
};

export default ProfitTrendAnalysis;

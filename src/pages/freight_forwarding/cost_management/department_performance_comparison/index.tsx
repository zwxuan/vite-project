import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic, Table } from 'antd';
import { DollarOutlined, BarChartOutlined, TrophyOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AdvancedSearchForm from '@/components/search-form';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getDepartmentPerformanceComparisonSearchFields } from './search_fields';
import {
  queryDepartmentPerformanceComparisonList,
  queryDepartmentPerformanceComparisonStats,
} from '@/api/freight_forwarding/cost_management/department_profit_analysis_service';
import {
  DepartmentPerformanceComparisonItem,
  DepartmentPerformanceComparisonStats,
} from '@/types/freight_forwarding/cost_management';
import '@/pages/page_list.less';

const DepartmentPerformanceComparison: React.FC = () => {
  const [data, setData] = useState<DepartmentPerformanceComparisonItem[]>([]);
  const [stats, setStats] = useState<DepartmentPerformanceComparisonStats | null>(null);
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
      queryDepartmentPerformanceComparisonList(queryParams),
      queryDepartmentPerformanceComparisonStats(queryParams),
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

  const columns: ColumnsType<DepartmentPerformanceComparisonItem> = [
    {
      title: i18n.t(LocaleHelper.getDepartmentPerformanceComparisonColRank()),
      dataIndex: 'rank',
      key: 'rank',
      width: 90,
      align: 'center',
      render: (value, _, index) => {
        const rank = value ?? index + 1;
        let color = '#666';
        if (rank === 1) color = '#FFD700';
        else if (rank === 2) color = '#C0C0C0';
        else if (rank === 3) color = '#CD7F32';
        return <span style={{ fontWeight: 'bold', color }}>{rank}</span>;
      },
    },
    {
      title: i18n.t(LocaleHelper.getDepartmentPerformanceComparisonColDepartment()),
      dataIndex: 'department',
      key: 'department',
      width: 160,
    },
    {
      title: i18n.t(LocaleHelper.getDepartmentPerformanceComparisonColOrderCount()),
      dataIndex: 'orderCount',
      key: 'orderCount',
      width: 110,
      align: 'right',
    },
    {
      title: i18n.t(LocaleHelper.getDepartmentPerformanceComparisonColRevenue()),
      dataIndex: 'revenue',
      key: 'revenue',
      width: 150,
      align: 'right',
      render: (value) => `¥${value.toLocaleString()}`,
    },
    {
      title: i18n.t(LocaleHelper.getDepartmentPerformanceComparisonColCost()),
      dataIndex: 'cost',
      key: 'cost',
      width: 150,
      align: 'right',
      render: (value) => `¥${value.toLocaleString()}`,
    },
    {
      title: i18n.t(LocaleHelper.getDepartmentPerformanceComparisonColGrossProfit()),
      dataIndex: 'grossProfit',
      key: 'grossProfit',
      width: 150,
      align: 'right',
      render: (value) => (
        <span style={{ color: '#1890ff', fontWeight: 'bold' }}>¥{value.toLocaleString()}</span>
      ),
    },
    {
      title: i18n.t(LocaleHelper.getDepartmentPerformanceComparisonColProfitMargin()),
      dataIndex: 'profitMargin',
      key: 'profitMargin',
      width: 120,
      align: 'right',
      render: (value) => (
        <span
          style={{
            color: value >= 20 ? '#52c41a' : value >= 15 ? '#faad14' : '#ff4d4f',
            fontWeight: 'bold',
          }}
        >
          {value.toFixed(1)}%
        </span>
      ),
    },
    {
      title: i18n.t(LocaleHelper.getDepartmentPerformanceComparisonColKpiScore()),
      dataIndex: 'kpiScore',
      key: 'kpiScore',
      width: 120,
      align: 'right',
    },
  ];

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <CustomIcon type="icon-Currency" className="page-title-Icon" />
            <span className="bill-info-title">
              {i18n.t(LocaleHelper.getDepartmentPerformanceComparisonPageTitle())}
            </span>
          </div>
        </div>
      </div>

      <div className="nc-bill-search-area">
        <AdvancedSearchForm fields={getDepartmentPerformanceComparisonSearchFields()} onSearch={onSearch} />
      </div>

      <div style={{ padding: '10px 10px 0' }}>
        <Card
          size="small"
          bordered={false}
          title={i18n.t(LocaleHelper.getDepartmentPerformanceComparisonSectionCompare())}
        >
          <Row gutter={16}>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getDepartmentPerformanceComparisonStatTotalRevenue())}
                value={stats?.totalRevenue || 0}
                precision={2}
                prefix={<DollarOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getDepartmentPerformanceComparisonStatTotalCost())}
                value={stats?.totalCost || 0}
                precision={2}
                prefix={<DollarOutlined />}
                valueStyle={{ color: '#ff4d4f' }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getDepartmentPerformanceComparisonStatHighestProfit())}
                value={stats?.highestProfit || 0}
                precision={2}
                prefix={<BarChartOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getDepartmentPerformanceComparisonStatAvgKpiScore())}
                value={stats?.avgKpiScore || 0}
                precision={2}
                prefix={<TrophyOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Col>
          </Row>
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

export default DepartmentPerformanceComparison;

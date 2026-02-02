import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Space, Statistic, Table } from 'antd';
import { DollarOutlined, BarChartOutlined, ReloadOutlined, ExportOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AdvancedSearchForm from '@/components/search-form';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getSalesDepartmentPerformanceSearchFields } from './search_fields';
import {
  querySalesDepartmentPerformanceList,
  querySalesDepartmentPerformanceStats,
} from '@/api/freight_forwarding/cost_management/department_profit_analysis_service';
import {
  SalesDepartmentPerformanceItem,
  SalesDepartmentPerformanceStats,
} from '@/types/freight_forwarding/cost_management';
import '@/pages/page_list.less';

const SalesDepartmentPerformance: React.FC = () => {
  const [data, setData] = useState<SalesDepartmentPerformanceItem[]>([]);
  const [stats, setStats] = useState<SalesDepartmentPerformanceStats | null>(null);
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
      querySalesDepartmentPerformanceList(queryParams),
      querySalesDepartmentPerformanceStats(queryParams),
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

  const columns: ColumnsType<SalesDepartmentPerformanceItem> = [
    {
      title: i18n.t(LocaleHelper.getSalesDepartmentPerformanceColDepartment()),
      dataIndex: 'department',
      key: 'department',
      width: 160,
    },
    {
      title: i18n.t(LocaleHelper.getSalesDepartmentPerformanceColManager()),
      dataIndex: 'manager',
      key: 'manager',
      width: 120,
    },
    {
      title: i18n.t(LocaleHelper.getSalesDepartmentPerformanceColOrderCount()),
      dataIndex: 'orderCount',
      key: 'orderCount',
      width: 110,
      align: 'right',
    },
    {
      title: i18n.t(LocaleHelper.getSalesDepartmentPerformanceColTotalRevenue()),
      dataIndex: 'totalRevenue',
      key: 'totalRevenue',
      width: 150,
      align: 'right',
      render: (value) => `¥${value.toLocaleString()}`,
    },
    {
      title: i18n.t(LocaleHelper.getSalesDepartmentPerformanceColTotalCost()),
      dataIndex: 'totalCost',
      key: 'totalCost',
      width: 150,
      align: 'right',
      render: (value) => `¥${value.toLocaleString()}`,
    },
    {
      title: i18n.t(LocaleHelper.getSalesDepartmentPerformanceColGrossProfit()),
      dataIndex: 'grossProfit',
      key: 'grossProfit',
      width: 150,
      align: 'right',
      render: (value) => (
        <span style={{ color: '#1890ff', fontWeight: 'bold' }}>¥{value.toLocaleString()}</span>
      ),
    },
    {
      title: i18n.t(LocaleHelper.getSalesDepartmentPerformanceColProfitMargin()),
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
      title: i18n.t(LocaleHelper.getSalesDepartmentPerformanceColCompletionRate()),
      dataIndex: 'completionRate',
      key: 'completionRate',
      width: 120,
      align: 'right',
      render: (value) => `${value.toFixed(1)}%`,
    },
    {
      title: i18n.t(LocaleHelper.getSalesDepartmentPerformanceColPeriod()),
      dataIndex: 'period',
      key: 'period',
      width: 120,
      align: 'center',
    },
  ];

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <CustomIcon type="icon-Currency" className="page-title-Icon" />
            <span className="bill-info-title">
              {i18n.t(LocaleHelper.getSalesDepartmentPerformancePageTitle())}
            </span>
          </div>
        </div>
        <div className="header-button-area">
          <span className="buttonGroup-component">
            <div className="u-button-group">
              <Button type="primary" danger icon={<ExportOutlined />}>
                {i18n.t(LocaleHelper.getSalesDepartmentPerformanceActionExport())}
              </Button>
              <Button icon={<ReloadOutlined />}>
                {i18n.t(LocaleHelper.getSalesDepartmentPerformanceActionRefresh())}
              </Button>
            </div>
          </span>
        </div>
      </div>

      <div className="nc-bill-search-area">
        <AdvancedSearchForm fields={getSalesDepartmentPerformanceSearchFields()} onSearch={onSearch} />
      </div>

      <div style={{ padding: '10px 10px 0' }}>
        <Card size="small" bordered={false}>
          <Row gutter={16}>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getSalesDepartmentPerformanceStatTotalRevenue())}
                value={stats?.totalRevenue || 0}
                precision={2}
                prefix={<DollarOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getSalesDepartmentPerformanceStatTotalCost())}
                value={stats?.totalCost || 0}
                precision={2}
                prefix={<DollarOutlined />}
                valueStyle={{ color: '#ff4d4f' }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getSalesDepartmentPerformanceStatGrossProfit())}
                value={stats?.grossProfit || 0}
                precision={2}
                prefix={<BarChartOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getSalesDepartmentPerformanceStatAvgProfitMargin())}
                value={stats?.avgProfitMargin || 0}
                precision={2}
                suffix="%"
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

export default SalesDepartmentPerformance;

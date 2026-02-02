import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic, Table } from 'antd';
import { DollarOutlined, BarChartOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AdvancedSearchForm from '@/components/search-form';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getOperationDepartmentProfitSearchFields } from './search_fields';
import {
  queryOperationDepartmentProfitList,
  queryOperationDepartmentProfitStats,
} from '@/api/freight_forwarding/cost_management/department_profit_analysis_service';
import {
  OperationDepartmentProfitItem,
  OperationDepartmentProfitStats,
} from '@/types/freight_forwarding/cost_management';
import '@/pages/page_list.less';

const OperationDepartmentProfit: React.FC = () => {
  const [data, setData] = useState<OperationDepartmentProfitItem[]>([]);
  const [stats, setStats] = useState<OperationDepartmentProfitStats | null>(null);
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
      queryOperationDepartmentProfitList(queryParams),
      queryOperationDepartmentProfitStats(queryParams),
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

  const columns: ColumnsType<OperationDepartmentProfitItem> = [
    {
      title: i18n.t(LocaleHelper.getOperationDepartmentProfitColDepartment()),
      dataIndex: 'department',
      key: 'department',
      width: 160,
    },
    {
      title: i18n.t(LocaleHelper.getOperationDepartmentProfitColOperatorCount()),
      dataIndex: 'operatorCount',
      key: 'operatorCount',
      width: 110,
      align: 'right',
    },
    {
      title: i18n.t(LocaleHelper.getOperationDepartmentProfitColTicketCount()),
      dataIndex: 'ticketCount',
      key: 'ticketCount',
      width: 110,
      align: 'right',
    },
    {
      title: i18n.t(LocaleHelper.getOperationDepartmentProfitColTeuCount()),
      dataIndex: 'teuCount',
      key: 'teuCount',
      width: 110,
      align: 'right',
    },
    {
      title: i18n.t(LocaleHelper.getOperationDepartmentProfitColTotalRevenue()),
      dataIndex: 'totalRevenue',
      key: 'totalRevenue',
      width: 150,
      align: 'right',
      render: (value) => `¥${value.toLocaleString()}`,
    },
    {
      title: i18n.t(LocaleHelper.getOperationDepartmentProfitColTotalCost()),
      dataIndex: 'totalCost',
      key: 'totalCost',
      width: 150,
      align: 'right',
      render: (value) => `¥${value.toLocaleString()}`,
    },
    {
      title: i18n.t(LocaleHelper.getOperationDepartmentProfitColGrossProfit()),
      dataIndex: 'grossProfit',
      key: 'grossProfit',
      width: 150,
      align: 'right',
      render: (value) => (
        <span style={{ color: '#1890ff', fontWeight: 'bold' }}>¥{value.toLocaleString()}</span>
      ),
    },
    {
      title: i18n.t(LocaleHelper.getOperationDepartmentProfitColProfitMargin()),
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
  ];

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <CustomIcon type="icon-Currency" className="page-title-Icon" />
            <span className="bill-info-title">
              {i18n.t(LocaleHelper.getOperationDepartmentProfitPageTitle())}
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
        <AdvancedSearchForm fields={getOperationDepartmentProfitSearchFields()} onSearch={onSearch} />
      </div>

      <div style={{ padding: '10px 10px 0' }}>
        <Card
          size="small"
          bordered={false}
          title={i18n.t(LocaleHelper.getOperationDepartmentProfitSectionOverview())}
        >
          <Row gutter={16}>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getOperationDepartmentProfitStatTotalRevenue())}
                value={stats?.totalRevenue || 0}
                precision={2}
                prefix={<DollarOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getOperationDepartmentProfitStatTotalCost())}
                value={stats?.totalCost || 0}
                precision={2}
                prefix={<DollarOutlined />}
                valueStyle={{ color: '#ff4d4f' }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getOperationDepartmentProfitStatGrossProfit())}
                value={stats?.grossProfit || 0}
                precision={2}
                prefix={<BarChartOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getOperationDepartmentProfitStatAvgProfitMargin())}
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
          title={i18n.t(LocaleHelper.getOperationDepartmentProfitSectionTrend())}
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
            {i18n.t(LocaleHelper.getOperationDepartmentProfitChartPlaceholder())}
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

export default OperationDepartmentProfit;

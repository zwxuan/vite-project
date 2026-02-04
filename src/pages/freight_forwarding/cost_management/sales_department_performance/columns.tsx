import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { SalesDepartmentPerformanceItem } from '@/types/freight_forwarding/cost_management';

export const getColumns = (): ColumnsType<SalesDepartmentPerformanceItem> => [
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

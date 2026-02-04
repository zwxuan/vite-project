import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { DepartmentPerformanceComparisonItem } from '@/types/freight_forwarding/cost_management';

export const getDepartmentPerformanceComparisonColumns = (): ColumnsType<DepartmentPerformanceComparisonItem> => [
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

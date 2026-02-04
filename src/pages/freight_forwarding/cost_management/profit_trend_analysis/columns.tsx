import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { ProfitTrendAnalysisItem } from '@/types/freight_forwarding/cost_management';

export const getColumns = (): ColumnsType<ProfitTrendAnalysisItem> => [
  {
    title: i18n.t(LocaleHelper.getProfitTrendAnalysisColMonth()),
    dataIndex: 'period',
    key: 'period',
    width: 120,
    align: 'center',
  },
  {
    title: i18n.t(LocaleHelper.getProfitTrendAnalysisColRevenue()),
    dataIndex: 'revenue',
    key: 'revenue',
    width: 150,
    align: 'right',
    render: (value) => `¥${value.toLocaleString()}`,
  },
  {
    title: i18n.t(LocaleHelper.getProfitTrendAnalysisColCost()),
    dataIndex: 'cost',
    key: 'cost',
    width: 150,
    align: 'right',
    render: (value) => `¥${value.toLocaleString()}`,
  },
  {
    title: i18n.t(LocaleHelper.getProfitTrendAnalysisColTotalProfit()),
    dataIndex: 'totalProfit',
    key: 'totalProfit',
    width: 150,
    align: 'right',
    render: (value) => (
      <span style={{ color: '#1890ff', fontWeight: 'bold' }}>¥{value.toLocaleString()}</span>
    ),
  },
  {
    title: i18n.t(LocaleHelper.getProfitTrendAnalysisColProfitMargin()),
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
    title: i18n.t(LocaleHelper.getProfitTrendAnalysisColSalesProfit()),
    dataIndex: 'salesProfit',
    key: 'salesProfit',
    width: 140,
    align: 'right',
    render: (value) => `¥${value.toLocaleString()}`,
  },
  {
    title: i18n.t(LocaleHelper.getProfitTrendAnalysisColOpsProfit()),
    dataIndex: 'opsProfit',
    key: 'opsProfit',
    width: 140,
    align: 'right',
    render: (value) => `¥${value.toLocaleString()}`,
  },
];

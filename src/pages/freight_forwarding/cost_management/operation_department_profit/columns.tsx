import React from 'react';
import { ColumnsType } from 'antd/es/table';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { OperationDepartmentProfitItem } from '@/types/freight_forwarding/cost_management';

export const getColumns = (): ColumnsType<OperationDepartmentProfitItem> => [
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

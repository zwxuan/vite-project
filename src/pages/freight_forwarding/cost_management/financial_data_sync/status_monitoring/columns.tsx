import React from 'react';
import { Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import {
  SyncStatusItem,
  SyncType,
  SyncStatus,
} from '@/types/freight_forwarding/cost_management';

export const getColumns = (): ColumnsType<SyncStatusItem> => {
  const syncTypeLabelMap = {
    [SyncType.COST_ALLOCATION]: i18n.t(LocaleHelper.getFinancialDataSyncCommonTypeCostAllocation()),
    [SyncType.ORDER_FEE]: i18n.t(LocaleHelper.getFinancialDataSyncCommonTypeOrderFee()),
    [SyncType.BILLING]: i18n.t(LocaleHelper.getFinancialDataSyncCommonTypeBilling()),
    [SyncType.INVOICE]: i18n.t(LocaleHelper.getFinancialDataSyncCommonTypeInvoice()),
  };

  const statusLabelMap = {
    [SyncStatus.PENDING]: i18n.t(LocaleHelper.getFinancialDataSyncCommonStatusPending()),
    [SyncStatus.RUNNING]: i18n.t(LocaleHelper.getFinancialDataSyncCommonStatusRunning()),
    [SyncStatus.SUCCESS]: i18n.t(LocaleHelper.getFinancialDataSyncCommonStatusSuccess()),
    [SyncStatus.FAILED]: i18n.t(LocaleHelper.getFinancialDataSyncCommonStatusFailed()),
  };

  const statusColorMap = {
    [SyncStatus.PENDING]: 'default',
    [SyncStatus.RUNNING]: 'processing',
    [SyncStatus.SUCCESS]: 'success',
    [SyncStatus.FAILED]: 'error',
  };

  return [
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncStatusMonitoringColSyncType()),
      dataIndex: 'syncType',
      key: 'syncType',
      render: (value: SyncType) => syncTypeLabelMap[value],
      width: 160,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncStatusMonitoringColStatus()),
      dataIndex: 'status',
      key: 'status',
      render: (value: SyncStatus) => <Tag color={statusColorMap[value]}>{statusLabelMap[value]}</Tag>,
      width: 120,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncStatusMonitoringColLastSyncTime()),
      dataIndex: 'lastSyncTime',
      key: 'lastSyncTime',
      width: 180,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncStatusMonitoringColNextSyncTime()),
      dataIndex: 'nextSyncTime',
      key: 'nextSyncTime',
      width: 180,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncStatusMonitoringColSuccessRate()),
      dataIndex: 'successRate',
      key: 'successRate',
      align: 'right',
      width: 120,
      render: (value: number) => `${value.toFixed(1)}%`,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncStatusMonitoringColFailedCount()),
      dataIndex: 'failedCount',
      key: 'failedCount',
      align: 'right',
      width: 120,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncStatusMonitoringColPendingCount()),
      dataIndex: 'pendingCount',
      key: 'pendingCount',
      align: 'right',
      width: 120,
    },
  ];
};

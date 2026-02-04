import React from 'react';
import { Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import {
  SyncTaskItem,
  SyncScheduleType,
  SyncType,
  SyncStatus,
} from '@/types/freight_forwarding/cost_management';

export const getColumns = (): ColumnsType<SyncTaskItem> => {
  const syncTypeLabelMap = {
    [SyncType.COST_ALLOCATION]: i18n.t(LocaleHelper.getFinancialDataSyncCommonTypeCostAllocation()),
    [SyncType.ORDER_FEE]: i18n.t(LocaleHelper.getFinancialDataSyncCommonTypeOrderFee()),
    [SyncType.BILLING]: i18n.t(LocaleHelper.getFinancialDataSyncCommonTypeBilling()),
    [SyncType.INVOICE]: i18n.t(LocaleHelper.getFinancialDataSyncCommonTypeInvoice()),
  };

  const scheduleLabelMap = {
    [SyncScheduleType.REAL_TIME]: i18n.t(LocaleHelper.getFinancialDataSyncCommonScheduleRealTime()),
    [SyncScheduleType.HOURLY]: i18n.t(LocaleHelper.getFinancialDataSyncCommonScheduleHourly()),
    [SyncScheduleType.DAILY]: i18n.t(LocaleHelper.getFinancialDataSyncCommonScheduleDaily()),
    [SyncScheduleType.WEEKLY]: i18n.t(LocaleHelper.getFinancialDataSyncCommonScheduleWeekly()),
    [SyncScheduleType.CRON]: 'Cron表达式',
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
      title: i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementColTaskNo()),
      dataIndex: 'taskNo',
      key: 'taskNo',
      width: 160,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementColSyncType()),
      dataIndex: 'syncType',
      key: 'syncType',
      render: (value: SyncType) => syncTypeLabelMap[value],
      width: 140,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementColScheduleType()),
      dataIndex: 'scheduleType',
      key: 'scheduleType',
      render: (value: SyncScheduleType, record) => {
        if (value === SyncScheduleType.CRON && record.cronExpression) {
          return `${scheduleLabelMap[value]} (${record.cronExpression})`;
        }
        return scheduleLabelMap[value];
      },
      width: 140,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementColStatus()),
      dataIndex: 'status',
      key: 'status',
      render: (value: SyncStatus) => <Tag color={statusColorMap[value]}>{statusLabelMap[value]}</Tag>,
      width: 120,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementColLastRunTime()),
      dataIndex: 'lastRunTime',
      key: 'lastRunTime',
      width: 180,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementColNextRunTime()),
      dataIndex: 'nextRunTime',
      key: 'nextRunTime',
      width: 180,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementColOwner()),
      dataIndex: 'owner',
      key: 'owner',
      width: 120,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementColCreatedTime()),
      dataIndex: 'createdTime',
      key: 'createdTime',
      width: 180,
    },
  ];
};

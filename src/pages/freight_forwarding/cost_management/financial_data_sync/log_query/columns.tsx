import React from 'react';
import { Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import {
  SyncLogItem,
  SyncLogLevel,
  SyncStatus,
  SyncType,
} from '@/types/freight_forwarding/cost_management';

export const getColumns = (): ColumnsType<SyncLogItem> => {
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

  const levelLabelMap = {
    [SyncLogLevel.INFO]: i18n.t(LocaleHelper.getFinancialDataSyncCommonLogLevelInfo()),
    [SyncLogLevel.WARN]: i18n.t(LocaleHelper.getFinancialDataSyncCommonLogLevelWarn()),
    [SyncLogLevel.ERROR]: i18n.t(LocaleHelper.getFinancialDataSyncCommonLogLevelError()),
  };

  const statusColorMap = {
    [SyncStatus.PENDING]: 'default',
    [SyncStatus.RUNNING]: 'processing',
    [SyncStatus.SUCCESS]: 'success',
    [SyncStatus.FAILED]: 'error',
  };

  const levelColorMap = {
    [SyncLogLevel.INFO]: 'processing',
    [SyncLogLevel.WARN]: 'warning',
    [SyncLogLevel.ERROR]: 'error',
  };

  return [
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncLogQueryColLogNo()),
      dataIndex: 'logNo',
      key: 'logNo',
      width: 160,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncLogQueryColSyncId()),
      dataIndex: 'syncId',
      key: 'syncId',
      width: 160,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncLogQueryColSyncType()),
      dataIndex: 'syncType',
      key: 'syncType',
      render: (value: SyncType) => syncTypeLabelMap[value],
      width: 140,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncLogQueryColLevel()),
      dataIndex: 'level',
      key: 'level',
      render: (value: SyncLogLevel) => <Tag color={levelColorMap[value]}>{levelLabelMap[value]}</Tag>,
      width: 120,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncLogQueryColStatus()),
      dataIndex: 'status',
      key: 'status',
      render: (value: SyncStatus) => <Tag color={statusColorMap[value]}>{statusLabelMap[value]}</Tag>,
      width: 120,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncLogQueryColMessage()),
      dataIndex: 'message',
      key: 'message',
      width: 240,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncLogQueryColStartTime()),
      dataIndex: 'startTime',
      key: 'startTime',
      width: 180,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncLogQueryColEndTime()),
      dataIndex: 'endTime',
      key: 'endTime',
      width: 180,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncLogQueryColDuration()),
      dataIndex: 'duration',
      key: 'duration',
      align: 'right',
      width: 120,
    },
  ];
};

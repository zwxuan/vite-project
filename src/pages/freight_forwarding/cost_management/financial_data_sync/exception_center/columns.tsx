import React from 'react';
import { Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import {
  SyncExceptionItem,
  SyncExceptionStatus,
  SyncType,
} from '@/types/freight_forwarding/cost_management';

export const getColumns = (): ColumnsType<SyncExceptionItem> => {
  const syncTypeLabelMap = {
    [SyncType.COST_ALLOCATION]: i18n.t(LocaleHelper.getFinancialDataSyncCommonTypeCostAllocation()),
    [SyncType.ORDER_FEE]: i18n.t(LocaleHelper.getFinancialDataSyncCommonTypeOrderFee()),
    [SyncType.BILLING]: i18n.t(LocaleHelper.getFinancialDataSyncCommonTypeBilling()),
    [SyncType.INVOICE]: i18n.t(LocaleHelper.getFinancialDataSyncCommonTypeInvoice()),
  };

  const statusLabelMap = {
    [SyncExceptionStatus.PENDING]: i18n.t(LocaleHelper.getFinancialDataSyncCommonExceptionPending()),
    [SyncExceptionStatus.PROCESSING]: i18n.t(LocaleHelper.getFinancialDataSyncCommonExceptionProcessing()),
    [SyncExceptionStatus.RESOLVED]: i18n.t(LocaleHelper.getFinancialDataSyncCommonExceptionResolved()),
  };

  const statusColorMap = {
    [SyncExceptionStatus.PENDING]: 'default',
    [SyncExceptionStatus.PROCESSING]: 'processing',
    [SyncExceptionStatus.RESOLVED]: 'success',
  };

  return [
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterColExceptionNo()),
      dataIndex: 'exceptionNo',
      key: 'exceptionNo',
      width: 160,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterColSyncId()),
      dataIndex: 'syncId',
      key: 'syncId',
      width: 160,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterColSyncType()),
      dataIndex: 'syncType',
      key: 'syncType',
      render: (value: SyncType) => syncTypeLabelMap[value],
      width: 140,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterColErrorType()),
      dataIndex: 'errorType',
      key: 'errorType',
      width: 140,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterColErrorMessage()),
      dataIndex: 'errorMessage',
      key: 'errorMessage',
      width: 220,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterColStatus()),
      dataIndex: 'status',
      key: 'status',
      render: (value: SyncExceptionStatus) => <Tag color={statusColorMap[value]}>{statusLabelMap[value]}</Tag>,
      width: 120,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterColOccurredTime()),
      dataIndex: 'occurredTime',
      key: 'occurredTime',
      width: 180,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterColHandler()),
      dataIndex: 'handler',
      key: 'handler',
      width: 120,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterColHandleTime()),
      dataIndex: 'handleTime',
      key: 'handleTime',
      width: 180,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterColRetryCount()),
      dataIndex: 'retryCount',
      key: 'retryCount',
      align: 'right',
      width: 120,
    },
  ];
};

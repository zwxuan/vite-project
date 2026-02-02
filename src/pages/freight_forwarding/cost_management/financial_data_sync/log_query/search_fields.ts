import type { SearchFieldConfig as SearchField } from '@/components/search-form';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { SyncLogLevel, SyncStatus, SyncType } from '@/types/freight_forwarding/cost_management';

export const getLogQuerySearchFields = (): SearchField[] => [
  {
    key: 'logNo',
    name: 'logNo',
    label: i18n.t(LocaleHelper.getFinancialDataSyncLogQuerySearchLogNo()),
    type: 'input',
  },
  {
    key: 'syncId',
    name: 'syncId',
    label: i18n.t(LocaleHelper.getFinancialDataSyncLogQuerySearchSyncId()),
    type: 'input',
  },
  {
    key: 'syncType',
    name: 'syncType',
    label: i18n.t(LocaleHelper.getFinancialDataSyncLogQuerySearchSyncType()),
    type: 'select',
    selectOptions: [
      { label: i18n.t(LocaleHelper.getFinancialDataSyncCommonTypeAll()), value: '' },
      { label: i18n.t(LocaleHelper.getFinancialDataSyncCommonTypeCostAllocation()), value: SyncType.COST_ALLOCATION },
      { label: i18n.t(LocaleHelper.getFinancialDataSyncCommonTypeOrderFee()), value: SyncType.ORDER_FEE },
      { label: i18n.t(LocaleHelper.getFinancialDataSyncCommonTypeBilling()), value: SyncType.BILLING },
      { label: i18n.t(LocaleHelper.getFinancialDataSyncCommonTypeInvoice()), value: SyncType.INVOICE },
    ],
  },
  {
    key: 'status',
    name: 'status',
    label: i18n.t(LocaleHelper.getFinancialDataSyncLogQuerySearchStatus()),
    type: 'select',
    selectOptions: [
      { label: i18n.t(LocaleHelper.getFinancialDataSyncCommonStatusAll()), value: '' },
      { label: i18n.t(LocaleHelper.getFinancialDataSyncCommonStatusPending()), value: SyncStatus.PENDING },
      { label: i18n.t(LocaleHelper.getFinancialDataSyncCommonStatusRunning()), value: SyncStatus.RUNNING },
      { label: i18n.t(LocaleHelper.getFinancialDataSyncCommonStatusSuccess()), value: SyncStatus.SUCCESS },
      { label: i18n.t(LocaleHelper.getFinancialDataSyncCommonStatusFailed()), value: SyncStatus.FAILED },
    ],
  },
  {
    key: 'level',
    name: 'level',
    label: i18n.t(LocaleHelper.getFinancialDataSyncLogQuerySearchLevel()),
    type: 'select',
    selectOptions: [
      { label: i18n.t(LocaleHelper.getFinancialDataSyncCommonTypeAll()), value: '' },
      { label: i18n.t(LocaleHelper.getFinancialDataSyncCommonLogLevelInfo()), value: SyncLogLevel.INFO },
      { label: i18n.t(LocaleHelper.getFinancialDataSyncCommonLogLevelWarn()), value: SyncLogLevel.WARN },
      { label: i18n.t(LocaleHelper.getFinancialDataSyncCommonLogLevelError()), value: SyncLogLevel.ERROR },
    ],
  },
  {
    key: 'keyword',
    name: 'keyword',
    label: i18n.t(LocaleHelper.getFinancialDataSyncLogQuerySearchKeyword()),
    type: 'input',
  },
  {
    key: 'dateRange',
    name: 'dateRange',
    label: i18n.t(LocaleHelper.getFinancialDataSyncLogQuerySearchDateRange()),
    type: 'dateRange',
  },
];

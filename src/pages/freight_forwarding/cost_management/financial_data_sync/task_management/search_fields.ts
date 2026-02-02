import type { SearchFieldConfig as SearchField } from '@/components/search-form';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { SyncScheduleType, SyncStatus, SyncType } from '@/types/freight_forwarding/cost_management';

export const getTaskManagementSearchFields = (): SearchField[] => [
  {
    key: 'taskNo',
    name: 'taskNo',
    label: i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementSearchTaskNo()),
    type: 'input',
  },
  {
    key: 'syncType',
    name: 'syncType',
    label: i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementSearchSyncType()),
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
    key: 'scheduleType',
    name: 'scheduleType',
    label: i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementSearchScheduleType()),
    type: 'select',
    selectOptions: [
      { label: i18n.t(LocaleHelper.getFinancialDataSyncCommonTypeAll()), value: '' },
      { label: i18n.t(LocaleHelper.getFinancialDataSyncCommonScheduleRealTime()), value: SyncScheduleType.REAL_TIME },
      { label: i18n.t(LocaleHelper.getFinancialDataSyncCommonScheduleHourly()), value: SyncScheduleType.HOURLY },
      { label: i18n.t(LocaleHelper.getFinancialDataSyncCommonScheduleDaily()), value: SyncScheduleType.DAILY },
      { label: i18n.t(LocaleHelper.getFinancialDataSyncCommonScheduleWeekly()), value: SyncScheduleType.WEEKLY },
    ],
  },
  {
    key: 'status',
    name: 'status',
    label: i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementSearchStatus()),
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
    key: 'dateRange',
    name: 'dateRange',
    label: i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementSearchDateRange()),
    type: 'dateRange',
  },
];

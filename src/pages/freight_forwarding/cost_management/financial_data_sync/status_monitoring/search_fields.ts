import type { SearchFieldConfig as SearchField } from '@/components/search-form';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { SyncStatus, SyncType } from '@/types/freight_forwarding/cost_management';

export const getStatusMonitoringSearchFields = (): SearchField[] => [
  {
    key: 'syncType',
    name: 'syncType',
    label: i18n.t(LocaleHelper.getFinancialDataSyncStatusMonitoringSearchSyncType()),
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
    label: i18n.t(LocaleHelper.getFinancialDataSyncStatusMonitoringSearchStatus()),
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
    label: i18n.t(LocaleHelper.getFinancialDataSyncStatusMonitoringSearchDateRange()),
    type: 'dateRange',
  },
];

import type { SearchFieldConfig as SearchField } from '@/components/search-form';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { SyncExceptionStatus, SyncType } from '@/types/freight_forwarding/cost_management';

export const getExceptionCenterSearchFields = (): SearchField[] => [
  {
    key: 'exceptionNo',
    name: 'exceptionNo',
    label: i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterSearchExceptionNo()),
    type: 'input',
  },
  {
    key: 'syncId',
    name: 'syncId',
    label: i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterSearchSyncId()),
    type: 'input',
  },
  {
    key: 'syncType',
    name: 'syncType',
    label: i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterSearchSyncType()),
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
    label: i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterSearchStatus()),
    type: 'select',
    selectOptions: [
      { label: i18n.t(LocaleHelper.getFinancialDataSyncCommonStatusAll()), value: '' },
      { label: i18n.t(LocaleHelper.getFinancialDataSyncCommonExceptionPending()), value: SyncExceptionStatus.PENDING },
      { label: i18n.t(LocaleHelper.getFinancialDataSyncCommonExceptionProcessing()), value: SyncExceptionStatus.PROCESSING },
      { label: i18n.t(LocaleHelper.getFinancialDataSyncCommonExceptionResolved()), value: SyncExceptionStatus.RESOLVED },
    ],
  },
  {
    key: 'dateRange',
    name: 'dateRange',
    label: i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterSearchDateRange()),
    type: 'dateRange',
  },
];

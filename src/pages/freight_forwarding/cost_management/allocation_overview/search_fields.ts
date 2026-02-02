import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getSearchFields = () => [
  {
    name: 'orderNo',
    label: i18n.t(LocaleHelper.getAllocationOverviewSearchOrderNo()),
    type: 'input',
  },
  {
    name: 'customer',
    label: i18n.t(LocaleHelper.getAllocationOverviewSearchCustomer()),
    type: 'input',
  },
  {
    name: 'salesman',
    label: i18n.t(LocaleHelper.getAllocationOverviewSearchSalesman()),
    type: 'input',
  },
  {
    name: 'status',
    label: i18n.t(LocaleHelper.getAllocationOverviewSearchStatus()),
    type: 'select',
    options: [
      { label: i18n.t(LocaleHelper.getAllocationOverviewStatusAll()), value: '' },
      { label: i18n.t(LocaleHelper.getAllocationOverviewStatusPending()), value: 'pending' },
      { label: i18n.t(LocaleHelper.getAllocationOverviewStatusAllocated()), value: 'allocated' },
      { label: i18n.t(LocaleHelper.getAllocationOverviewStatusException()), value: 'exception' },
    ],
  },
  {
    name: 'dateRange',
    label: i18n.t(LocaleHelper.getAllocationOverviewSearchDateRange()),
    type: 'dateRange',
  },
];

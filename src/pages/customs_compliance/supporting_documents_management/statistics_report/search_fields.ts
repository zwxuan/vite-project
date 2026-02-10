import { AdvancedSearchFormProps } from '@/components/search-form';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const getFields = (): AdvancedSearchFormProps['fields'] => [
  {
    type: 'rangePicker',
    label: i18n.t(LocaleHelper.getCcsdmStatisticsReportSearchDateRange()),
    key: 'dateRange',
  },
  {
    type: 'input',
    label: i18n.t(LocaleHelper.getCcsdmStatisticsReportSearchCustomer()),
    key: 'customer',
  },
  {
    type: 'select',
    label: i18n.t(LocaleHelper.getCcsdmStatisticsReportSearchDocType()),
    key: 'docType',
    selectOptions: [
        { label: 'Invoice', value: 'Invoice' },
        { label: 'Packing List', value: 'Packing List' },
        { label: 'Bill of Lading', value: 'Bill of Lading' },
    ]
  },
];

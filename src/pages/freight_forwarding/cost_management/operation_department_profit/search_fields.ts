import type { SearchFieldConfig as SearchField } from '@/components/search-form';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getOperationDepartmentProfitSearchFields = (): SearchField[] => [
  {
    key: 'department',
    name: 'department',
    label: i18n.t(LocaleHelper.getOperationDepartmentProfitSearchDepartment()),
    type: 'input',
  },
  {
    key: 'dateRange',
    name: 'dateRange',
    label: i18n.t(LocaleHelper.getOperationDepartmentProfitSearchDateRange()),
    type: 'dateRange',
  },
];

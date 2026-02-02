import type { SearchFieldConfig as SearchField } from '@/components/search-form';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getSalesDepartmentPerformanceSearchFields = (): SearchField[] => [
  {
    key: 'department',
    name: 'department',
    label: i18n.t(LocaleHelper.getSalesDepartmentPerformanceSearchDepartment()),
    type: 'input',
  },
  {
    key: 'manager',
    name: 'manager',
    label: i18n.t(LocaleHelper.getSalesDepartmentPerformanceSearchManager()),
    type: 'input',
  },
  {
    key: 'dateRange',
    name: 'dateRange',
    label: i18n.t(LocaleHelper.getSalesDepartmentPerformanceSearchDateRange()),
    type: 'dateRange',
  },
];

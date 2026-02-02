import type { SearchFieldConfig as SearchField } from '@/components/search-form';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getDepartmentPerformanceComparisonSearchFields = (): SearchField[] => [
  {
    key: 'department',
    name: 'department',
    label: i18n.t(LocaleHelper.getDepartmentPerformanceComparisonSearchDepartment()),
    type: 'input',
  },
  {
    key: 'kpiLevel',
    name: 'kpiLevel',
    label: i18n.t(LocaleHelper.getDepartmentPerformanceComparisonSearchKpiLevel()),
    type: 'select',
    selectOptions: [
      { label: i18n.t(LocaleHelper.getDepartmentPerformanceComparisonKpiAll()), value: '' },
      { label: i18n.t(LocaleHelper.getDepartmentPerformanceComparisonKpiHigh()), value: 'high' },
      { label: i18n.t(LocaleHelper.getDepartmentPerformanceComparisonKpiMedium()), value: 'medium' },
      { label: i18n.t(LocaleHelper.getDepartmentPerformanceComparisonKpiLow()), value: 'low' },
    ],
  },
  {
    key: 'dateRange',
    name: 'dateRange',
    label: i18n.t(LocaleHelper.getDepartmentPerformanceComparisonSearchDateRange()),
    type: 'dateRange',
  },
];

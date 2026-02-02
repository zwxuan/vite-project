import type { SearchFieldConfig as SearchField } from '@/components/search-form';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getProfitTrendAnalysisSearchFields = (): SearchField[] => [
  {
    key: 'timeDimension',
    name: 'timeDimension',
    label: i18n.t(LocaleHelper.getProfitTrendAnalysisSearchTimeDimension()),
    type: 'select',
    selectOptions: [
      { label: i18n.t(LocaleHelper.getProfitTrendAnalysisTimeDay()), value: 'day' },
      { label: i18n.t(LocaleHelper.getProfitTrendAnalysisTimeWeek()), value: 'week' },
      { label: i18n.t(LocaleHelper.getProfitTrendAnalysisTimeMonth()), value: 'month' },
      { label: i18n.t(LocaleHelper.getProfitTrendAnalysisTimeQuarter()), value: 'quarter' },
      { label: i18n.t(LocaleHelper.getProfitTrendAnalysisTimeYear()), value: 'year' },
    ],
  },
  {
    key: 'departmentType',
    name: 'departmentType',
    label: i18n.t(LocaleHelper.getProfitTrendAnalysisSearchDepartmentType()),
    type: 'select',
    selectOptions: [
      { label: i18n.t(LocaleHelper.getProfitTrendAnalysisDepartmentAll()), value: 'all' },
      { label: i18n.t(LocaleHelper.getProfitTrendAnalysisDepartmentSales()), value: 'sales' },
      { label: i18n.t(LocaleHelper.getProfitTrendAnalysisDepartmentOps()), value: 'ops' },
    ],
  },
  {
    key: 'dateRange',
    name: 'dateRange',
    label: i18n.t(LocaleHelper.getProfitTrendAnalysisSearchDateRange()),
    type: 'dateRange',
  },
];

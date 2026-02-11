import { AdvancedSearchFormProps } from '@/components/search-form';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const getFields = (): AdvancedSearchFormProps['fields'] => [
  {
    type: 'rangePicker',
    label: i18n.t(LocaleHelper.getPreEntryStatsSearchDateRange()),
    key: 'dateRange',
  },
  {
    type: 'select',
    label: i18n.t(LocaleHelper.getPreEntryStatsSearchDept()),
    key: 'dept',
    selectOptions: [
        { label: 'Import Dept', value: 'dept1' },
        { label: 'Export Dept', value: 'dept2' },
    ]
  },
  {
    type: 'select',
    label: i18n.t(LocaleHelper.getPreEntryStatsSearchBusinessType()),
    key: 'businessType',
    selectOptions: [
        { label: 'General Trade', value: 'general' },
        { label: 'Processing Trade', value: 'processing' },
    ]
  },
];

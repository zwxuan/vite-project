import { FilterOperator } from '@/components/search-form';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const fields = [
    {
        key: 'date',
        label: i18n.t(LocaleHelper.getDocumentReportDate()),
        type: 'rangePicker',
        operator: FilterOperator.EQ
    }
];

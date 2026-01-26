import { FilterOperator } from '@/components/search-form';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const fields = [
    {
        key: 'document_code',
        label: i18n.t(LocaleHelper.getDocumentVersionCode()),
        type: 'input',
        operator: FilterOperator.LIKE
    },
    {
        key: 'version',
        label: i18n.t(LocaleHelper.getDocumentVersionNumber()),
        type: 'input',
        operator: FilterOperator.LIKE
    },
    {
        key: 'modifier',
        label: i18n.t(LocaleHelper.getDocumentVersionModifier()),
        type: 'input',
        operator: FilterOperator.LIKE
    }
];

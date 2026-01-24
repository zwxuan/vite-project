import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { FilterOperator } from '@/components/search-form';

export const signatureSearchFields = [
    {
        key: 'name',
        label: i18n.t(LocaleHelper.getDocumentSignatureName()),
        type: 'input',
        operator: FilterOperator.LIKE
    },
    {
        key: 'type',
        label: i18n.t(LocaleHelper.getDocumentSignatureType()),
        type: 'select',
        operator: FilterOperator.EQ,
        selectOptions: [
            { label: i18n.t(LocaleHelper.getDocumentSignatureTypeCompany()), value: 'Company' },
            { label: i18n.t(LocaleHelper.getDocumentSignatureTypePersonal()), value: 'Personal' }
        ]
    },
    {
        key: 'status',
        label: i18n.t(LocaleHelper.getDocumentSignatureStatus()),
        type: 'select',
        operator: FilterOperator.EQ,
        selectOptions: [
            { label: i18n.t(LocaleHelper.getDocumentTemplateStatusActive()), value: 'Active' },
            { label: i18n.t(LocaleHelper.getDocumentTemplateStatusInactive()), value: 'Inactive' }
        ]
    }
];

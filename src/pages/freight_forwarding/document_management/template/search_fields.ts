import { FilterOperator } from '@/components/search-form';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const fields = [
    {
        key: 'name',
        label: i18n.t(LocaleHelper.getDocumentTemplateName()),
        type: 'input',
        operator: FilterOperator.LIKE
    },
    {
        key: 'category',
        label: i18n.t(LocaleHelper.getDocumentTemplateCategory()),
        type: 'select',
        operator: FilterOperator.EQ,
        selectOptions: [
            { label: i18n.t(LocaleHelper.getDocumentTemplateTransportModeSea()), value: 'Ocean Freight' },
            { label: i18n.t(LocaleHelper.getDocumentTemplateTransportModeAir()), value: 'Air Freight' },
            { label: i18n.t(LocaleHelper.getDocumentTemplateTransportModeRail()), value: 'Rail Freight' }
        ]
    },
    {
        key: 'version',
        label: i18n.t(LocaleHelper.getDocumentTemplateVersion()),
        type: 'input',
        operator: FilterOperator.LIKE
    },
    {
        key: 'status',
        label: i18n.t(LocaleHelper.getDocumentTemplateStatus()),
        type: 'select',
        operator: FilterOperator.EQ,
        selectOptions: [
            { label: i18n.t(LocaleHelper.getDocumentTemplateStatusActive()), value: 'Active' },
            { label: i18n.t(LocaleHelper.getDocumentTemplateStatusInactive()), value: 'Inactive' },
            { label: i18n.t(LocaleHelper.getDocumentTemplateStatusDraft()), value: 'Draft' }
        ]
    }
];

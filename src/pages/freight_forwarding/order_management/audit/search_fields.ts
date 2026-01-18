import { AdvancedSearchFormProps } from "@/components/search-form";
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const fields: AdvancedSearchFormProps["fields"] = [
    {
        type: 'dateRange',
        label: i18n.t(LocaleHelper.getOrderAuditSubmissionDate()),
        key: 'submissionDate',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getOrderAuditCustomerLevel()),
        key: 'customerLevel',
        selectOptions: [
            { value: 'VIP', label: 'VIP' },
            { value: 'Normal', label: 'Normal' },
        ]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrderAuditOrderAmount()),
        key: 'amount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getQuerySalesman()),
        key: 'salesman',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getOrderAuditUrgency()),
        key: 'urgency',
        selectOptions: [
            { value: 'Normal', label: 'Normal' },
            { value: 'Urgent', label: 'Urgent' },
        ]
    },
];

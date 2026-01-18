import { AdvancedSearchFormProps } from "@/components/search-form";
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const fields: AdvancedSearchFormProps["fields"] = [
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getStandaloneServiceServiceType()),
        key: 'serviceType',
        selectOptions: [
            { value: 'Customs', label: i18n.t(LocaleHelper.getStandaloneServiceCustomsClearance()) },
            { value: 'Warehouse', label: i18n.t(LocaleHelper.getStandaloneServiceWarehousing()) },
            { value: 'Document', label: i18n.t(LocaleHelper.getStandaloneServiceDocumentation()) },
            { value: 'Insurance', label: i18n.t(LocaleHelper.getStandaloneServiceInsurance()) },
            { value: 'Consulting', label: i18n.t(LocaleHelper.getStandaloneServiceConsulting()) },
        ]
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getStandaloneServiceServiceStatus()),
        key: 'status',
        selectOptions: [
            { value: 'Pending', label: 'Pending' },
            { value: 'In Progress', label: 'In Progress' },
            { value: 'Completed', label: 'Completed' },
        ]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getQueryCustomerName()),
        key: 'customerName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getStandaloneServiceServiceLocation()),
        key: 'location',
    },
    {
        type: 'dateRange',
        label: i18n.t(LocaleHelper.getQueryDateRange()),
        key: 'dateRange',
    },
];

import { AdvancedSearchFormProps } from "@/components/search-form";
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const fields: AdvancedSearchFormProps["fields"] = [
    {
        type: 'dateRange',
        label: i18n.t(LocaleHelper.getServicePerformanceTimeRange()),
        key: 'dateRange',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getStandaloneServiceServiceType()),
        key: 'serviceType',
        selectOptions: [
            { value: 'All', label: 'All' },
            { value: 'Customs', label: i18n.t(LocaleHelper.getStandaloneServiceCustomsClearance()) },
        ]
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getServicePerformanceCustomerGroup()),
        key: 'customerGroup',
        selectOptions: [
            { value: 'All', label: 'All' },
            { value: 'VIP', label: 'VIP' },
        ]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getQuerySalesman()),
        key: 'salesman',
    },
];

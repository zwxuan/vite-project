import { AdvancedSearchFormProps } from "@/components/search-form";
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const fields: AdvancedSearchFormProps["fields"] = [
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getQueryCustomerName()),
        key: 'customerName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getQuerySalesman()),
        key: 'salesman',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getQueryOrderType()),
        key: 'orderType',
        selectOptions: [
            { value: 'Sea Export', label: 'Sea Export' },
            { value: 'Sea Import', label: 'Sea Import' },
            { value: 'Air Export', label: 'Air Export' },
            { value: 'Air Import', label: 'Air Import' },
        ]
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getQueryOrderStatus()),
        key: 'orderStatus',
        selectOptions: [
            { value: 'Confirmed', label: 'Confirmed' },
            { value: 'In Progress', label: 'In Progress' },
            { value: 'Completed', label: 'Completed' },
        ]
    },
    {
        type: 'dateRange',
        label: i18n.t(LocaleHelper.getQueryDateRange()),
        key: 'dateRange',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getQueryOrigin()),
        key: 'origin',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getQueryDestination()),
        key: 'destination',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getQueryCommodity()),
        key: 'commodity',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getQueryHSCode()),
        key: 'hsCode',
    },
];

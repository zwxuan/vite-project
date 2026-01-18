import { AdvancedSearchFormProps } from "@/components/search-form";
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const fields: AdvancedSearchFormProps["fields"] = [
    {
        type: 'dateRange',
        label: i18n.t(LocaleHelper.getQueryDateRange()),
        key: 'dateRange',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getQueryCustomerName()),
        key: 'customerName',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getQueryOrderType()),
        key: 'orderType',
        selectOptions: [
            { value: 'Sea Export', label: 'Sea Export' },
            { value: 'Air Export', label: 'Air Export' },
        ]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getQuerySalesman()),
        key: 'salesman',
    },
];

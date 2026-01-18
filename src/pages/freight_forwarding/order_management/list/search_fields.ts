import { AdvancedSearchFormProps } from "@/components/search-form";
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const fields: AdvancedSearchFormProps["fields"] = [
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrderManagementOrderNo()),
        key: 'orderNo',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrderManagementCustomerName()),
        key: 'customerName',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getOrderManagementOrderType()),
        key: 'orderType',
        selectOptions: [
            { value: 'Sea Export', label: 'Sea Export' },
            { value: 'Sea Import', label: 'Sea Import' },
            { value: 'Air Export', label: 'Air Export' },
            { value: 'Air Import', label: 'Air Import' },
            { value: 'Rail Export', label: 'Rail Export' },
            { value: 'Rail Import', label: 'Rail Import' },
        ]
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getOrderManagementBookingDate()),
        key: 'bookingDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrderManagementOrigin()),
        key: 'origin',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrderManagementDestination()),
        key: 'destination',
    },
];

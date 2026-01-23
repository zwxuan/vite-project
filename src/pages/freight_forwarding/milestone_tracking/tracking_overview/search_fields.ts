import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const searchFields = [
    {
        label: i18n.t(LocaleHelper.getWaybillNumber()),
        name: 'waybillNumber',
        type: 'input',
    },
    {
        label: i18n.t(LocaleHelper.getCustomer()),
        name: 'customer',
        type: 'input',
    },
    {
        label: i18n.t(LocaleHelper.getStatus()),
        name: 'status',
        type: 'select',
        options: [
            { label: 'Pending', value: 'pending' },
            { label: 'In Transit', value: 'in_transit' },
            { label: 'Completed', value: 'completed' },
        ],
    },
    {
        label: i18n.t(LocaleHelper.getDateRange()),
        name: 'dateRange',
        type: 'dateRange',
    },
];

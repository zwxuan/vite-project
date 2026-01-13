import LocaleHelper from '@/utils/locale/freight_forwarding/order_management/orders';
import i18n from '@/i18n';

export const fields = [
    {
        name: 'orderNo',
        label: i18n.t(LocaleHelper.getOrderNo()),
        type: 'input',
    },
    {
        name: 'customerName',
        label: i18n.t(LocaleHelper.getCustomerName()),
        type: 'input',
    },
    {
        name: 'status',
        label: i18n.t(LocaleHelper.getOrderStatus()),
        type: 'select',
        options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Pending', value: 'pending' },
            { label: 'Confirmed', value: 'confirmed' },
        ]
    }
];

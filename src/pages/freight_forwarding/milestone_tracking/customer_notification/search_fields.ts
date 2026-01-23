import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const searchFields = [
    {
        label: i18n.t(LocaleHelper.getCustomer()),
        name: 'customerName',
        type: 'input',
    },
    {
        label: i18n.t(LocaleHelper.getTemplateType()),
        name: 'notificationType',
        type: 'input',
    },
    {
        label: i18n.t(LocaleHelper.getNotificationMethod()),
        name: 'method',
        type: 'select',
        options: [
            { label: 'Email', value: 'Email' },
            { label: 'SMS', value: 'SMS' },
            { label: 'WeChat', value: 'WeChat' },
        ],
    },
];

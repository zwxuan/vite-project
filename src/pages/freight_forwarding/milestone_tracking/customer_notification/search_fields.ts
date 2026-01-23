import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const searchFields = [
    {
        label: i18n.t(LocaleHelper.getCustomer()),
        name: 'customerName',
        type: 'select',
        options: [
            { label: '客户A', value: '客户A' },
            { label: '客户B', value: '客户B' },
            { label: '客户C', value: '客户C' },
        ],
    },
    {
        label: '通知类型',
        name: 'notificationType',
        type: 'select',
        options: [
            { label: '里程碑更新', value: '里程碑更新' },
            { label: '起运通知', value: '起运通知' },
            { label: '到港通知', value: '到港通知' },
            { label: '延迟通知', value: '延迟通知' },
        ],
    },
    {
        label: '发送方式',
        name: 'method',
        type: 'select',
        options: [
            { label: '邮件', value: 'Email' },
            { label: '短信', value: 'SMS' },
            { label: '微信', value: 'WeChat' },
        ],
    },
];

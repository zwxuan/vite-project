import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const searchFields = [
    {
        label: i18n.t(LocaleHelper.getAlertType()),
        name: 'alertType',
        type: 'input',
    },
    {
        label: i18n.t(LocaleHelper.getSeverity()),
        name: 'severity',
        type: 'select',
        options: [
            { label: 'Low', value: 'Low' },
            { label: 'Medium', value: 'Medium' },
            { label: 'High', value: 'High' },
            { label: 'Critical', value: 'Critical' },
        ],
    },
    {
        label: i18n.t(LocaleHelper.getStatus()),
        name: 'status',
        type: 'select',
        options: [
            { label: 'Pending', value: 'Pending' },
            { label: 'Processed', value: 'Processed' },
            { label: 'Ignored', value: 'Ignored' },
        ],
    },
    {
        label: i18n.t(LocaleHelper.getDateRange()),
        name: 'dateRange',
        type: 'dateRange',
    },
];

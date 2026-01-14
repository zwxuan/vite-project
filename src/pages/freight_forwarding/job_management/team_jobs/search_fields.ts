import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const fields = [
    {
        name: 'assignee',
        label: i18n.t(LocaleHelper.getAssignee()),
        type: 'input',
    },
    {
        name: 'status',
        label: i18n.t(LocaleHelper.getStatus()),
        type: 'select',
        options: [
            { label: '执行中', value: 'IN_PROGRESS' },
            { label: '已完成', value: 'COMPLETED' },
        ]
    },
    {
        name: 'priority',
        label: i18n.t(LocaleHelper.getPriority()),
        type: 'select',
        options: [
            { label: '高', value: 'HIGH' },
            { label: '中', value: 'MEDIUM' },
            { label: '低', value: 'LOW' },
        ]
    },
];

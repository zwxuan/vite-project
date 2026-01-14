import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const fields = [
    {
        name: 'jobType',
        label: i18n.t(LocaleHelper.getJobType()),
        type: 'select',
        options: [
            { label: '订舱作业', value: 'BOOKING_JOB' },
            { label: '运单作业', value: 'WAYBILL_JOB' },
            { label: '拖车作业', value: 'TRUCKING_JOB' },
            { label: '关务作业', value: 'CUSTOMS_JOB' },
            { label: '仓储作业', value: 'WAREHOUSE_JOB' },
            { label: '单证作业', value: 'DOCUMENT_JOB' },
        ]
    },
    {
        name: 'status',
        label: i18n.t(LocaleHelper.getStatus()),
        type: 'select',
        options: [
            { label: '待分派', value: 'PENDING' },
            { label: '已分派', value: 'ASSIGNED' },
            { label: '进行中', value: 'IN_PROGRESS' },
            { label: '已完成', value: 'COMPLETED' },
            { label: '已取消', value: 'CANCELLED' },
        ]
    },
    {
        name: 'assignee',
        label: i18n.t(LocaleHelper.getAssignee()),
        type: 'input',
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
    {
        name: 'createTime',
        label: i18n.t(LocaleHelper.getCreatedAt()),
        type: 'dateRange',
    },
];

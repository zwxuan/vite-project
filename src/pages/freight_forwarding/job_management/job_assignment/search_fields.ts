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
            { label: '关务作业', value: 'CUSTOMS_JOB' },
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
    {
        name: 'customerTier',
        label: '客户等级',
        type: 'select',
        options: [
            { label: 'VIP', value: 'VIP' },
            { label: '普通', value: 'REGULAR' },
        ]
    }
];

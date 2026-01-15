import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const fields = [
    {
        name: 'transportMode',
        label: i18n.t(LocaleHelper.getWaybillListTransportMode()),
        type: 'select',
        options: [
            { label: 'SEA', value: 'SEA' },
            { label: 'AIR', value: 'AIR' },
            { label: 'RAIL', value: 'RAIL' },
            { label: 'TRUCK', value: 'TRUCK' },
        ]
    },
    {
        name: 'templateType',
        label: i18n.t(LocaleHelper.getWaybillTemplateTemplateType()),
        type: 'select',
        options: [
            { label: 'BOOKING', value: 'BOOKING' },
            { label: 'LOADING', value: 'LOADING' },
            { label: 'ARRIVAL', value: 'ARRIVAL' },
        ]
    },
    {
        name: 'status',
        label: i18n.t(LocaleHelper.getWaybillTemplateStatus()),
        type: 'select',
        options: [
            { label: 'ENABLED', value: 'ENABLED' },
            { label: 'DISABLED', value: 'DISABLED' },
        ]
    }
];

import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const fields = [
    {
        name: 'waybillNo',
        label: i18n.t(LocaleHelper.getWaybillListWaybillNo()),
        type: 'input',
    },
    {
        name: 'orderNo',
        label: i18n.t(LocaleHelper.getWaybillListOrderNo()),
        type: 'input',
    },
    {
        name: 'jobNo',
        label: i18n.t(LocaleHelper.getWaybillListJobNo()),
        type: 'input',
    },
    {
        name: 'mblNo',
        label: i18n.t(LocaleHelper.getWaybillListMblNo()),
        type: 'input',
    },
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
        name: 'carrier',
        label: i18n.t(LocaleHelper.getWaybillListCarrier()),
        type: 'input',
    },
    {
        name: 'status',
        label: i18n.t(LocaleHelper.getWaybillListStatus()),
        type: 'select',
        options: [
            { label: 'DRAFT', value: 'DRAFT' },
            { label: 'CONFIRMED', value: 'CONFIRMED' },
            { label: 'ISSUED', value: 'ISSUED' },
            { label: 'CANCELLED', value: 'CANCELLED' },
        ]
    },
    {
        name: 'createTime',
        label: i18n.t(LocaleHelper.getWaybillListDateRange()),
        type: 'dateRange',
    }
];

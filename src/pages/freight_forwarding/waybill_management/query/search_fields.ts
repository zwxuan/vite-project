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
        label: i18n.t(LocaleHelper.getWaybillQueryCreationDate()),
        type: 'dateRange',
    },
    {
        name: 'etd',
        label: i18n.t(LocaleHelper.getWaybillQuerySailingDate()),
        type: 'dateRange',
    },
    {
        name: 'origin',
        label: i18n.t(LocaleHelper.getWaybillListOrigin()),
        type: 'input',
    },
    {
        name: 'destination',
        label: i18n.t(LocaleHelper.getWaybillListDestination()),
        type: 'input',
    },
    {
        name: 'customer',
        label: i18n.t(LocaleHelper.getWaybillQueryCustomer()),
        type: 'input',
    },
    {
        name: 'operator',
        label: i18n.t(LocaleHelper.getWaybillQueryOperator()),
        type: 'input',
    }
];

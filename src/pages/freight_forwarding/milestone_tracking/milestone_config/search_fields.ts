import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const searchFields = [
    {
        label: 'Transport Mode',
        name: 'transportMode',
        type: 'select',
        options: [
            { label: 'Sea', value: 'Sea' },
            { label: 'Air', value: 'Air' },
            { label: 'Land', value: 'Land' },
        ],
    },
    {
        label: 'Route Type',
        name: 'routeType',
        type: 'select',
        options: [
            { label: 'All', value: 'All' },
            { label: 'Direct', value: 'Direct' },
            { label: 'Transshipment', value: 'Transshipment' },
        ],
    },
];

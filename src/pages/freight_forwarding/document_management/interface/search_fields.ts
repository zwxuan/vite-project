import { FilterOperator } from '@/components/search-form';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const fields = [
    {
        key: 'name',
        label: i18n.t(LocaleHelper.getDocumentInterfaceName()),
        type: 'input',
        operator: FilterOperator.LIKE
    },
    {
        key: 'provider',
        label: i18n.t(LocaleHelper.getDocumentInterfaceServiceProvider()),
        type: 'input',
        operator: FilterOperator.LIKE
    },
    {
        key: 'type',
        label: i18n.t(LocaleHelper.getDocumentInterfaceType()),
        type: 'select',
        operator: FilterOperator.EQ,
        selectOptions: [
            { label: 'EDI', value: 'EDI' },
            { label: 'API', value: 'API' }
        ]
    },
    {
        key: 'status',
        label: i18n.t(LocaleHelper.getDocumentInterfaceInterfaceStatus()),
        type: 'select',
        operator: FilterOperator.EQ,
        selectOptions: [
            { label: 'Normal', value: 'Normal' },
            { label: 'Abnormal', value: 'Abnormal' }
        ]
    }
];

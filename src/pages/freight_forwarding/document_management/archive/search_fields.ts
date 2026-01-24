import { FilterOperator } from '@/components/search-form';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const fields = [
    {
        key: 'archiveNo',
        label: 'Archive No.',
        type: 'input',
        operator: FilterOperator.LIKE
    },
    {
        key: 'docNo',
        label: 'Document No.',
        type: 'input',
        operator: FilterOperator.LIKE
    },
    {
        key: 'type',
        label: 'Type',
        type: 'select',
        operator: FilterOperator.EQ,
        selectOptions: [
            { label: 'Bill of Lading', value: 'Bill of Lading' },
            { label: 'Invoice', value: 'Invoice' },
            { label: 'Packing List', value: 'Packing List' }
        ]
    },
    {
        key: 'archiveDate',
        label: i18n.t(LocaleHelper.getDocumentArchiveArchiveDate()),
        type: 'rangePicker',
        operator: FilterOperator.EQ // Range picker usually handles logic internally or maps to GTE/LTE
    },
    {
        key: 'location',
        label: 'Location',
        type: 'input',
        operator: FilterOperator.LIKE
    },
    {
        key: 'status',
        label: i18n.t(LocaleHelper.getDocumentArchiveStatus()),
        type: 'select',
        operator: FilterOperator.EQ,
        selectOptions: [
            { label: 'Normal', value: 'Normal' },
            { label: 'Lent', value: 'Lent' },
            { label: 'Lost', value: 'Lost' },
            { label: 'Destroyed', value: 'Destroyed' }
        ]
    }
];

import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const fields = [
    {
        key: 'archiveNo',
        label: i18n.t(LocaleHelper.getDocumentArchiveArchiveNo()),
        type: 'input'
    },
    {
        key: 'docNo',
        label: i18n.t(LocaleHelper.getDocumentArchiveDocumentNo()),
        type: 'input'
    },
    {
        key: 'type',
        label: i18n.t(LocaleHelper.getDocumentArchiveType()),
        type: 'select',
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
    },
    {
        key: 'location',
        label: i18n.t(LocaleHelper.getDocumentArchiveLocation()),
        type: 'input',
    },
    {
        key: 'status',
        label: i18n.t(LocaleHelper.getDocumentArchiveStatus()),
        type: 'select',
        selectOptions: [
            { label: i18n.t(LocaleHelper.getDocumentArchiveNormal()), value: 'Normal' },
            { label: i18n.t(LocaleHelper.getDocumentArchiveLent()), value: 'Lent' },
            { label: i18n.t(LocaleHelper.getDocumentArchiveLost()), value: 'Lost' },
            { label: i18n.t(LocaleHelper.getDocumentArchiveDestroyed()), value: 'Destroyed' }
        ]
    }
];

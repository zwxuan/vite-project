import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrderDocumentFileName()),
        key: 'FileName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrderDocumentVersion()),
        key: 'Version',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrderDocumentFileType()),
        key: 'FileType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrderDocumentFileFormat()),
        key: 'FileFormat',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getOrderDocumentFileSize()),
        key: 'FileSize',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrderDocumentCreatedBy()),
        key: 'CreatedBy',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getOrderDocumentCreatedDate()),
        key: 'CreatedDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrderDocumentFileSource()),
        key: 'FileSource',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrderDocumentAttributeDetails()),
        key: 'AttributeDetails',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrderDocumentSyncStatus()),
        key: 'SyncStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrderDocumentExternalFileType()),
        key: 'ExternalFileType',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getOrderDocumentLastSyncTime()),
        key: 'LastSyncTime',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getOrderDocumentOperation()),
        key: 'Operation',
    },
    
]; 
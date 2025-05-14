import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPhysicalInvoiceInvoiceSerialNumber()),
        key: 'InvoiceSerialNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPhysicalInvoiceInvoiceType()),
        key: 'InvoiceType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPhysicalInvoicePurchaserName()),
        key: 'PurchaserName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPhysicalInvoicePurchaserTaxNumber()),
        key: 'PurchaserTaxNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPhysicalInvoiceInvoiceCode()),
        key: 'InvoiceCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPhysicalInvoiceInvoiceNumber()),
        key: 'InvoiceNumber',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getPhysicalInvoiceInvoiceDate()),
        key: 'InvoiceDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPhysicalInvoiceSellerName()),
        key: 'SellerName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPhysicalInvoiceSellerTaxNumber()),
        key: 'SellerTaxNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPhysicalInvoiceTotalAmount()),
        key: 'TotalAmount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPhysicalInvoiceFileName()),
        key: 'FileName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPhysicalInvoiceFilePath()),
        key: 'FilePath',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getPhysicalInvoiceDownloadCount()),
        key: 'DownloadCount',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    
]; 
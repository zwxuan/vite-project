import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceInvoiceNumber()),
        key: 'InvoiceNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceBillingTitle()),
        key: 'BillingTitle',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceBusinessNumber()),
        key: 'BusinessNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceMbl()),
        key: 'Mbl',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceSettlementUnit()),
        key: 'SettlementUnit',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceInvoiceCreator()),
        key: 'InvoiceCreator',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getInvoiceInvoiceCreateTime()),
        key: 'InvoiceCreateTime',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceReviewStatus()),
        key: 'ReviewStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceReviewer()),
        key: 'Reviewer',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getInvoiceReviewDate()),
        key: 'ReviewDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceInvoiceType()),
        key: 'InvoiceType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoicePaymentTerm()),
        key: 'PaymentTerm',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getInvoiceCustomerDownloadCount()),
        key: 'CustomerDownloadCount',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getInvoiceBillingDate()),
        key: 'BillingDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoicePaymentNoticeNumber()),
        key: 'PaymentNoticeNumber',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getInvoiceEtd()),
        key: 'Etd',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getInvoiceEta()),
        key: 'Eta',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceDestinationPort()),
        key: 'DestinationPort',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceWriteOffStatus()),
        key: 'WriteOffStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceRedCreditStatus()),
        key: 'RedCreditStatus',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getInvoiceIsPrinted()),
        key: 'IsPrinted',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getInvoiceIsVoided()),
        key: 'IsVoided',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceVesselVoyage()),
        key: 'VesselVoyage',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoicePortOfDeparture()),
        key: 'PortOfDeparture',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getInvoiceIsExported()),
        key: 'IsExported',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceInvoiceCategory()),
        key: 'InvoiceCategory',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceBillingMethod()),
        key: 'BillingMethod',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoicePaymentType()),
        key: 'PaymentType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceBillingCurrency()),
        key: 'BillingCurrency',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceInvoiceExchangeRate()),
        key: 'InvoiceExchangeRate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceAmount()),
        key: 'Amount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceWriteOffAmount()),
        key: 'WriteOffAmount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceTaxRate()),
        key: 'TaxRate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceTaxAmount()),
        key: 'TaxAmount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceTaxExcludedAmount()),
        key: 'TaxExcludedAmount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceBillingApplicant()),
        key: 'BillingApplicant',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceCurrencyTotal()),
        key: 'CurrencyTotal',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceOperation()),
        key: 'Operation',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceSales()),
        key: 'Sales',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceSalesUnit()),
        key: 'SalesUnit',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceDeliveryLocation()),
        key: 'DeliveryLocation',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceOurBank()),
        key: 'OurBank',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceOurBankCurrency()),
        key: 'OurBankCurrency',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceEInvoiceSendStatus()),
        key: 'EInvoiceSendStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceEInvoiceEmailStatus()),
        key: 'EInvoiceEmailStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceSpecificConstraintType()),
        key: 'SpecificConstraintType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceRedCreditReason()),
        key: 'RedCreditReason',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceTaxControlRequest()),
        key: 'TaxControlRequest',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceBillingSettlementType()),
        key: 'BillingSettlementType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceInvoiceId()),
        key: 'InvoiceId',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceWriteOffSerialNumber()),
        key: 'WriteOffSerialNumber',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getInvoicePaymentDate()),
        key: 'PaymentDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceCurrencyRate1()),
        key: 'CurrencyRate1',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceCurrencyRate2()),
        key: 'CurrencyRate2',
    },
    
]; 
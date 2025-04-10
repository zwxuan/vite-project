import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationPaymentNotificationNumber()),
        key: 'PaymentNotificationNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationSettlementObject()),
        key: 'SettlementObject',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationSettlementAgent()),
        key: 'SettlementAgent',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationEntrustingUnit()),
        key: 'EntrustingUnit',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getPaymentApplicationModificationTime()),
        key: 'ModificationTime',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationModifier()),
        key: 'Modifier',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationInvoiceTitle()),
        key: 'InvoiceTitle',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationBusinessNumber()),
        key: 'BusinessNumber',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getPaymentApplicationApplicationDate()),
        key: 'ApplicationDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationApplicant()),
        key: 'Applicant',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationApplicantDepartment()),
        key: 'ApplicantDepartment',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getPaymentApplicationPaymentDeadline()),
        key: 'PaymentDeadline',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationPaymentMethod()),
        key: 'PaymentMethod',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationInvoiceNumber()),
        key: 'InvoiceNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationCurrencyCode()),
        key: 'CurrencyCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationAmount()),
        key: 'Amount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationReconciliationAmountByCurrency()),
        key: 'ReconciliationAmountByCurrency',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationApprovalStatus()),
        key: 'ApprovalStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationReconciliationStatus()),
        key: 'ReconciliationStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationRemarks()),
        key: 'Remarks',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationProcessNumber()),
        key: 'ProcessNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationTotalByCurrency()),
        key: 'TotalByCurrency',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationVoucherNumber()),
        key: 'VoucherNumber',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getPaymentApplicationVoucherCreationDate()),
        key: 'VoucherCreationDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationCarrier()),
        key: 'Carrier',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationShippingLocation()),
        key: 'ShippingLocation',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getPaymentApplicationActualTrailerPickupTime()),
        key: 'ActualTrailerPickupTime',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getPaymentApplicationDocumentDate()),
        key: 'DocumentDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationFinancialPayableStatus()),
        key: 'FinancialPayableStatus',
    },
    
]; 

export const fieldsFee: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationFeeBusinessNumber()),
        key: 'BusinessNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationFeeInWarehouseNumber()),
        key: 'InWarehouseNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationFeeBookingNumber()),
        key: 'BookingNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationFeeProjectNumber()),
        key: 'ProjectNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationFeeSono()),
        key: 'Sono',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationFeeSettlementObject()),
        key: 'SettlementObject',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationFeeConsignmentType()),
        key: 'ConsignmentType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationFeeMasterWaybillNumber()),
        key: 'MasterWaybillNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationFeeSubWaybillNumber()),
        key: 'SubWaybillNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationFeeConsignor()),
        key: 'Consignor',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationFeeBusinessType()),
        key: 'BusinessType',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getPaymentApplicationFeeBusinessDate()),
        key: 'BusinessDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationFeeBusinessReferenceNumber()),
        key: 'BusinessReferenceNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationFeeDomesticOrForeign()),
        key: 'DomesticOrForeign',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationFeeConfirmationStatus()),
        key: 'ConfirmationStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationFeeFeeName()),
        key: 'FeeName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationFeeBusinessStatus()),
        key: 'BusinessStatus',
    },
    
];

export const fieldsBusiness: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationBusinessBusinessNumber()),
        key: 'BusinessNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationBusinessMasterOrderNumber()),
        key: 'MasterOrderNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationBusinessConsignor()),
        key: 'Consignor',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationBusinessSettlementObject()),
        key: 'SettlementObject',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationBusinessSono()),
        key: 'Sono',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationBusinessBusinessType()),
        key: 'BusinessType',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getPaymentApplicationBusinessBusinessDate()),
        key: 'BusinessDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationBusinessCurrency()),
        key: 'Currency',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getPaymentApplicationBusinessTaxInclusivePrice()),
        key: 'TaxInclusivePrice',
    },
    
]; 
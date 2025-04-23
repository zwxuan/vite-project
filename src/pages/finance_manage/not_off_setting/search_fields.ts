import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingBusinessNumber()),
        key: 'BusinessNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingSettlementUnit()),
        key: 'SettlementUnit',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingDomesticOrForeign()),
        key: 'DomesticOrForeign',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingMasterOrderNumber()),
        key: 'MasterOrderNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingSubOrderNumber()),
        key: 'SubOrderNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingInvoiceTitle()),
        key: 'InvoiceTitle',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingInvoiceNumber()),
        key: 'InvoiceNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingBillNumber()),
        key: 'BillNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingReconciliationNumber()),
        key: 'ReconciliationNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingCustomer()),
        key: 'Customer',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingBusinessType()),
        key: 'BusinessType',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getNotOffSettingBusinessDate()),
        key: 'BusinessDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingVesselAndVoyage()),
        key: 'VesselAndVoyage',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingPortOfLoading()),
        key: 'PortOfLoading',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingUnitPrice()),
        key: 'UnitPrice',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingPortOfDestination()),
        key: 'PortOfDestination',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getNotOffSettingBillDueDate()),
        key: 'BillDueDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingSales()),
        key: 'Sales',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingProvisionallyAccrued()),
        key: 'ProvisionallyAccrued',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingOverseasCustomerService()),
        key: 'OverseasCustomerService',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingOnSiteOperation()),
        key: 'OnSiteOperation',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingOperation()),
        key: 'Operation',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getNotOffSettingFinanceDate()),
        key: 'FinanceDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingPaymentType()),
        key: 'PaymentType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingFeeStatus()),
        key: 'FeeStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingConfirmationStatus()),
        key: 'ConfirmationStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingFeeName()),
        key: 'FeeName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingCurrency()),
        key: 'Currency',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingCustomBusinessType()),
        key: 'CustomBusinessType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingQuantity()),
        key: 'Quantity',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingTaxInclusivePrice()),
        key: 'TaxInclusivePrice',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingTaxExclusivePrice()),
        key: 'TaxExclusivePrice',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingTaxRate()),
        key: 'TaxRate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingTaxAmount()),
        key: 'TaxAmount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingContactPerson()),
        key: 'ContactPerson',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingWriteOffAmount()),
        key: 'WriteOffAmount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingUnwriteOffAmount()),
        key: 'UnwriteOffAmount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingFeeRemark()),
        key: 'FeeRemark',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingCustomPosition1()),
        key: 'CustomPosition1',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingCustomPosition2()),
        key: 'CustomPosition2',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getNotOffSettingEtd()),
        key: 'Etd',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getNotOffSettingEta()),
        key: 'Eta',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingCarrier()),
        key: 'Carrier',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingPickupDeliveryLocation()),
        key: 'PickupDeliveryLocation',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getNotOffSettingActualPickupTime()),
        key: 'ActualPickupTime',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingSono()),
        key: 'Sono',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getNotOffSettingBusinessStatus()),
        key: 'BusinessStatus',
    },
    
]; 
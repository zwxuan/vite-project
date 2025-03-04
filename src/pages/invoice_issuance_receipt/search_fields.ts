import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptBusinessId()),
        key: 'BusinessId',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptSettlementUnit()),
        key: 'SettlementUnit',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptMasterOrderNo()),
        key: 'MasterOrderNo',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptSubOrderNo()),
        key: 'SubOrderNo',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptInvoiceTitle()),
        key: 'InvoiceTitle',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptReconciliationNo()),
        key: 'ReconciliationNo',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptCustomer()),
        key: 'Customer',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptBusinessType()),
        key: 'BusinessType',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptBusinessDate()),
        key: 'BusinessDate',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptBargeSailingDate()),
        key: 'BargeSailingDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptVesselVoyage()),
        key: 'VesselVoyage',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptPortOfLoading()),
        key: 'PortOfLoading',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptPortOfDestination()),
        key: 'PortOfDestination',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptSales()),
        key: 'Sales',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptAccrued()),
        key: 'Accrued',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptOperator()),
        key: 'Operator',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptFinanceDate()),
        key: 'FinanceDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptDomesticOrForeign()),
        key: 'DomesticOrForeign',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptPaymentType()),
        key: 'PaymentType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptFeeStatus()),
        key: 'FeeStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptConfirmationStatus()),
        key: 'ConfirmationStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptFeeName()),
        key: 'FeeName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptCurrency()),
        key: 'Currency',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptCustomBusinessType()),
        key: 'CustomBusinessType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptQuantity()),
        key: 'Quantity',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptTaxInclusivePrice()),
        key: 'TaxInclusivePrice',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptTaxExclusivePrice()),
        key: 'TaxExclusivePrice',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptTaxRate()),
        key: 'TaxRate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptTaxAmount()),
        key: 'TaxAmount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptContactPerson()),
        key: 'ContactPerson',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptWriteOffAmount()),
        key: 'WriteOffAmount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptUnsettledAmount()),
        key: 'UnsettledAmount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptFeeRemark()),
        key: 'FeeRemark',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptContractStatus()),
        key: 'ContractStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptCustomPosition1()),
        key: 'CustomPosition1',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptCustomPosition2()),
        key: 'CustomPosition2',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptEtd()),
        key: 'Etd',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptEta()),
        key: 'Eta',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptCarrier()),
        key: 'Carrier',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptPickupDeliveryLocation()),
        key: 'PickupDeliveryLocation',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptTruckPickupTime()),
        key: 'TruckPickupTime',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getInvoiceIssuanceReceiptBusinessStatus()),
        key: 'BusinessStatus',
    },
    
]; 
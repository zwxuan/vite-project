import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBillManageBillNumber()),
        key: 'BillNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBillManageStatementNumber()),
        key: 'StatementNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBillManageCounterpartBillNumber()),
        key: 'CounterpartBillNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBillManageBillType()),
        key: 'BillType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBillManagePaymentType()),
        key: 'PaymentType',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getBillManageBillDate()),
        key: 'BillDate',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getBillManageDueDate()),
        key: 'DueDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBillManageInvoiceTitle()),
        key: 'InvoiceTitle',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBillManageInvoiceRequirements()),
        key: 'InvoiceRequirements',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBillManageSettlementParty()),
        key: 'SettlementParty',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBillManageCargoType()),
        key: 'CargoType',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getBillManageEtd()),
        key: 'Etd',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getBillManageEta()),
        key: 'Eta',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getBillManageBillConfirmationTime()),
        key: 'BillConfirmationTime',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBillManageBusinessNumber()),
        key: 'BusinessNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBillManageMasterBillNumber()),
        key: 'MasterBillNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBillManageVesselVoyage()),
        key: 'VesselVoyage',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBillManagePortOfLoading()),
        key: 'PortOfLoading',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBillManagePortOfDischarge()),
        key: 'PortOfDischarge',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBillManageCreatedBy()),
        key: 'CreatedBy',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBillManageBillStatus()),
        key: 'BillStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBillManageInvoiceStatus()),
        key: 'InvoiceStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBillManageWriteOffStatus()),
        key: 'WriteOffStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBillManageCurrency()),
        key: 'Currency',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBillManageAmount()),
        key: 'Amount',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getBillManageAgingDays()),
        key: 'AgingDays',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBillManageWriteOffAmount()),
        key: 'WriteOffAmount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBillManageCurrencyTotal()),
        key: 'CurrencyTotal',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBillManageRemarks()),
        key: 'Remarks',
    },
]; 
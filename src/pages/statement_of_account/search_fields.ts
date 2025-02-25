import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getStatementOfAccountStatementNumber()),
        key: 'StatementNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getStatementOfAccountSettlementObject()),
        key: 'SettlementObject',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getStatementOfAccountCounterpartyStatementNumber()),
        key: 'CounterpartyStatementNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getStatementOfAccountCreator()),
        key: 'Creator',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getStatementOfAccountStatementType()),
        key: 'StatementType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getStatementOfAccountInvoiceTitle()),
        key: 'InvoiceTitle',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getStatementOfAccountTransactionType()),
        key: 'TransactionType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getStatementOfAccountConfirmationStatus()),
        key: 'ConfirmationStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getStatementOfAccountInvoicingStatus()),
        key: 'InvoicingStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getStatementOfAccountStatementWriteoffStatus()),
        key: 'StatementWriteoffStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getStatementOfAccountCurrency()),
        key: 'Currency',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getStatementOfAccountAmount()),
        key: 'Amount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getStatementOfAccountWrittenOffAmount()),
        key: 'WrittenOffAmount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getStatementOfAccountInvoicingInfo()),
        key: 'InvoicingInfo',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getStatementOfAccountRemarks()),
        key: 'Remarks',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getStatementOfAccountCurrencyTotal()),
        key: 'CurrencyTotal',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getStatementOfAccountConfirmationTime()),
        key: 'ConfirmationTime',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getStatementOfAccountConfirmationPerson()),
        key: 'ConfirmationPerson',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getStatementOfAccountBusinessReferenceNumber()),
        key: 'BusinessReferenceNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getStatementOfAccountCarrier()),
        key: 'Carrier',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getStatementOfAccountPickupDeliveryLocation()),
        key: 'PickupDeliveryLocation',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getStatementOfAccountActualPickupTime()),
        key: 'ActualPickupTime',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getStatementOfAccountParentCompany()),
        key: 'ParentCompany',
    },
    
]; 
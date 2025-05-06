import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentSalesAccountNumber()),
        key: 'SalesAccountNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentSettlementObject()),
        key: 'SettlementObject',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentBusinessNumber()),
        key: 'BusinessNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentSettlementAgent()),
        key: 'SettlementAgent',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentCounterparty()),
        key: 'Counterparty',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentOurBank()),
        key: 'OurBank',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentPaymentNotificationNumber()),
        key: 'PaymentNotificationNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentVoucherNumber()),
        key: 'VoucherNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentBankStatementNumber()),
        key: 'BankStatementNumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentSalesAccountPerson()),
        key: 'SalesAccountPerson',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getActualPaymentSalesAccountDate()),
        key: 'SalesAccountDate',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getActualPaymentReceiptPaymentDate()),
        key: 'ReceiptPaymentDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentPaymentType()),
        key: 'PaymentType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentStatementStatus()),
        key: 'StatementStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentReceiptPaymentMethod()),
        key: 'ReceiptPaymentMethod',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getActualPaymentIsAdvancePayment()),
        key: 'IsAdvancePayment',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentCurrency()),
        key: 'Currency',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentAmount()),
        key: 'Amount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentSoldAmount()),
        key: 'SoldAmount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentBalance()),
        key: 'Balance',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentActualReceivedAmount()),
        key: 'ActualReceivedAmount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentActualPaidAmount()),
        key: 'ActualPaidAmount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentFinancialExpenses()),
        key: 'FinancialExpenses',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentExchangeGainLoss()),
        key: 'ExchangeGainLoss',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentMinorShortAccount()),
        key: 'MinorShortAccount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentOriginalCurrencyExchangeDifference()),
        key: 'OriginalCurrencyExchangeDifference',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentCreator()),
        key: 'Creator',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getActualPaymentReview()),
        key: 'Review',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getActualPaymentReviewDate()),
        key: 'ReviewDate',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getActualPaymentVoided()),
        key: 'Voided',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentInvoiceInformation()),
        key: 'InvoiceInformation',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentRemarks()),
        key: 'Remarks',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getActualPaymentAccountPeriodDays()),
        key: 'AccountPeriodDays',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getActualPaymentVoucherDate()),
        key: 'VoucherDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentReviewer()),
        key: 'Reviewer',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentBillSettlementType()),
        key: 'BillSettlementType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentAdvancePaymentRemarks()),
        key: 'AdvancePaymentRemarks',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getActualPaymentReceiptPaymentVoucherNumber()),
        key: 'ReceiptPaymentVoucherNumber',
    },
    
]; 
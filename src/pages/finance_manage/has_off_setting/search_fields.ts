import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingWriteoffserialnumber()),
        key: 'Writeoffserialnumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingSettlementobject()),
        key: 'Settlementobject',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingBusinessnumber()),
        key: 'Businessnumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingSettlementagent()),
        key: 'Settlementagent',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingCounterparty()),
        key: 'Counterparty',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingOurbank()),
        key: 'Ourbank',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingPaymentnoticenumber()),
        key: 'Paymentnoticenumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingVouchernumber()),
        key: 'Vouchernumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingBankslipnumber()),
        key: 'Bankslipnumber',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingWriteoffperson()),
        key: 'Writeoffperson',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getHasOffSettingWriteoffdate()),
        key: 'Writeoffdate',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getHasOffSettingReceiptpaymentdate()),
        key: 'Receiptpaymentdate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingPaymenttype()),
        key: 'Paymenttype',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingSlipstatus()),
        key: 'Slipstatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingReceiptpaymentmethod()),
        key: 'Receiptpaymentmethod',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingIsprepaid()),
        key: 'Isprepaid',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingCurrency()),
        key: 'Currency',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingAmount()),
        key: 'Amount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingWrittenoffamount()),
        key: 'Writtenoffamount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingBalance()),
        key: 'Balance',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingActualreceivedamount()),
        key: 'Actualreceivedamount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingActualpaidamount()),
        key: 'Actualpaidamount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingFinancialcharges()),
        key: 'Financialcharges',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingExchangegainloss()),
        key: 'Exchangegainloss',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingShortchange()),
        key: 'Shortchange',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingOriginalcurrencydifference()),
        key: 'Originalcurrencydifference',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingCreator()),
        key: 'Creator',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingReviewer()),
        key: 'Reviewer',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getHasOffSettingReviewdate()),
        key: 'Reviewdate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingIscancelled()),
        key: 'Iscancelled',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingInvoiceinformation()),
        key: 'Invoiceinformation',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingRemarks()),
        key: 'Remarks',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getHasOffSettingAccountperiod()),
        key: 'Accountperiod',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getHasOffSettingVoucherdate()),
        key: 'Voucherdate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingReviewername()),
        key: 'Reviewername',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingBillsettlementtype()),
        key: 'Billsettlementtype',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingPrereceiptpaymentremarks()),
        key: 'Prereceiptpaymentremarks',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getHasOffSettingReceiptpaymentvouchernumber()),
        key: 'Receiptpaymentvouchernumber',
    },
    
]; 
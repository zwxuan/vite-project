import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'select',
        label: i18n.t(LocaleHelper.getVoucherLogVoucherSerialNo()),
        key: 'VoucherSerialNo',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getVoucherLogVoucherNo()),
        key: 'VoucherNo',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getVoucherLogVoucherType()),
        key: 'VoucherType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getVoucherLogVoucherDebitCreditTotal()),
        key: 'VoucherDebitCreditTotal',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getVoucherLogVoucherStatus()),
        key: 'VoucherStatus',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getVoucherLogVoucherDate()),
        key: 'VoucherDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getVoucherLogVoucherStatus2()),
        key: 'VoucherStatus2',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getVoucherLogCounterpartyVoucherNo()),
        key: 'CounterpartyVoucherNo',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getVoucherLogDebitAmount()),
        key: 'DebitAmount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getVoucherLogCreditAmount()),
        key: 'CreditAmount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getVoucherLogSendStatus()),
        key: 'SendStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getVoucherLogDeleteStatus()),
        key: 'DeleteStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getVoucherLogCreator()),
        key: 'Creator',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getVoucherLogCreateDate()),
        key: 'CreateDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getVoucherLogSender()),
        key: 'Sender',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getVoucherLogSendDate()),
        key: 'SendDate',
    },
    
]; 
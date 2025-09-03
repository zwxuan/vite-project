import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseSettlementMethodMapperOrgName()),
        key: 'OrgName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseSettlementMethodMapperSettlementMode()),
        key: 'SettlementMode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseSettlementMethodMapperCurrencyCode()),
        key: 'CurrencyCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseSettlementMethodMapperBankType()),
        key: 'BankType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseSettlementMethodMapperBankBranch()),
        key: 'BankBranch',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseSettlementMethodMapperBankAccount()),
        key: 'BankAccount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseSettlementMethodMapperCashAccount()),
        key: 'CashAccount',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseSettlementMethodMapperIsDefault()),
        key: 'IsDefault',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseSettlementMethodMapperRemark()),
        key: 'Remark',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseSettlementMethodMapperCreatedBy()),
        key: 'CreatedBy',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getBaseSettlementMethodMapperCreatedTime()),
        key: 'CreatedTime',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseSettlementMethodMapperUpdatedBy()),
        key: 'UpdatedBy',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getBaseSettlementMethodMapperUpdatedTime()),
        key: 'UpdatedTime',
    },
    
]; 
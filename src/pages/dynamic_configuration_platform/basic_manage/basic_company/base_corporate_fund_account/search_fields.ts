import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCorporateFundAccountAccountCode()),
        key: 'AccountCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCorporateFundAccountOpenAccountType()),
        key: 'OpenAccountType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCorporateFundAccountSettlementCenter()),
        key: 'SettlementCenter',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCorporateFundAccountOwningOrg()),
        key: 'OwningOrg',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCorporateFundAccountOpenAccountOrg()),
        key: 'OpenAccountOrg',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCorporateFundAccountAccountName()),
        key: 'AccountName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCorporateFundAccountBankAccountNo()),
        key: 'BankAccountNo',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCorporateFundAccountAccountHolderName()),
        key: 'AccountHolderName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCorporateFundAccountOpeningBank()),
        key: 'OpeningBank',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCorporateFundAccountEbillAgentBank()),
        key: 'EbillAgentBank',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCorporateFundAccountAccountPurpose()),
        key: 'AccountPurpose',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCorporateFundAccountAccountLevel()),
        key: 'AccountLevel',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCorporateFundAccountAccountNature()),
        key: 'AccountNature',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCorporateFundAccountAccountType()),
        key: 'AccountType',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getBaseCorporateFundAccountOpenDate()),
        key: 'OpenDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCorporateFundAccountTaxRegister()),
        key: 'TaxRegister',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCorporateFundAccountAccountStatus()),
        key: 'AccountStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCorporateFundAccountRemark()),
        key: 'Remark',
    },
    
]; 
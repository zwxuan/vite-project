import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getAccountMappingMappingId()),
        key: 'MappingId',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getAccountMappingBookName()),
        key: 'BookName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getAccountMappingRuleName()),
        key: 'RuleName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getAccountMappingEntryName()),
        key: 'EntryName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getAccountMappingAccountName()),
        key: 'AccountName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getAccountMappingAccountGroupBy()),
        key: 'AccountGroupBy',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getAccountMappingFinanceCode()),
        key: 'FinanceCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getAccountMappingRemark()),
        key: 'Remark',
    },
    
]; 
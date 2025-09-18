import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCorporateCashAccountAccountCode()),
        key: 'AccountCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCorporateCashAccountAccountName()),
        key: 'AccountName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCorporateCashAccountOwningOrg()),
        key: 'OwningOrg',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCorporateCashAccountCurrencyCode()),
        key: 'CurrencyCode',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getBaseCorporateCashAccountOpenDate()),
        key: 'OpenDate',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCorporateCashAccountIsDefault()),
        key: 'IsDefault',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCorporateCashAccountAccountStatus()),
        key: 'AccountStatus',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCorporateCashAccountRemark()),
        key: 'Remark',
    },
    
]; 
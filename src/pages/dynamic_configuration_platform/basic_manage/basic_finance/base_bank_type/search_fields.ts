import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseBankTypeBankTypeCode()),
        key: 'BankTypeCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseBankTypeBankTypeName()),
        key: 'BankTypeName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseBankTypeCountryRegion()),
        key: 'CountryRegion',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseBankTypeStatus()),
        key: 'Status',
    },
    
]; 
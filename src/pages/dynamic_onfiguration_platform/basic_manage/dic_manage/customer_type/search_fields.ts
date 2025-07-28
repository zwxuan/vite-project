import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getCustomerTypeCode()),
        key: 'Code',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getCustomerTypeChineseName()),
        key: 'ChineseName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getCustomerTypeEnglishName()),
        key: 'EnglishName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getCustomerTypeRemark()),
        key: 'Remark',
    },
    
]; 
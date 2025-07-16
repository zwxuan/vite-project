import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getCustomerLevelCode()),
        key: 'Code',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getCustomerLevelChineseName()),
        key: 'ChineseName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getCustomerLevelEnglishName()),
        key: 'EnglishName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getCustomerLevelLevel()),
        key: 'Level',
    },
    
]; 
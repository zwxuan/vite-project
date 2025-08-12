import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getFunctionPermissionByUserUserName()),
        key: 'UserName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getFunctionPermissionByUserMenuFullPath()),
        key: 'MenuFullPath',
    },
]; 
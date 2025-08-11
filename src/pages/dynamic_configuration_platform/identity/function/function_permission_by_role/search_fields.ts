import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getFunctionPermissionByRoleRoleName()),
        key: 'RoleName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getFunctionPermissionByRoleFunctionName()),
        key: 'FunctionName',
    },
    
]; 
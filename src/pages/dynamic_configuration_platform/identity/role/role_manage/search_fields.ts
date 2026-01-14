import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getRoleManageRoleCode()),
        key: 'RoleCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getRoleManageRoleName()),
        key: 'RoleName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getRoleManageManageOrg()),
        key: 'ManageOrg',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getRoleManageSystemRole()),
        key: 'SystemRole',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getRoleManageStatus()),
        key: 'Status',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getRoleManageRoleType()),
        key: 'RoleType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getRoleManageRoleTag()),
        key: 'RoleTag',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getRoleManageRoleDesc()),
        key: 'RoleDesc',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getRoleManageRoleGroup()),
        key: 'RoleGroup',
    },
    
]; 
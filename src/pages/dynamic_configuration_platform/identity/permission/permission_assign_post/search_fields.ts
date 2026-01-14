import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getRoleGroupRoleGroupCode()),
        key: 'RoleGroupCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getRoleGroupRoleGroupName()),
        key: 'RoleGroupName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getRoleGroupStatus()),
        key: 'Status',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getRoleGroupRoleType()),
        key: 'RoleType',
    },
    
];
 
export const assignRoleSearchFields: AdvancedSearchFormProps["fields"] = [
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getRoleManageRoleName()),
        key: 'RoleName',
    },
    
];


export const jobPositionAssignRoleSearchFields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getJobPositionJobName()),
        key: 'JobName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getJobPositionDeptBelong()),
        key: 'DeptBelong',

    },
]; 
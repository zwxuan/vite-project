import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getEmployeeManageEmployeeCode()),
        key: 'EmployeeCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getEmployeeManageEmployeeName()),
        key: 'EmployeeName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getEmployeeManageOrganization()),
        key: 'Organization',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getEmployeeManageDepartment()),
        key: 'Department',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getEmployeeManageEmail()),
        key: 'Email',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getEmployeeManageMobile()),
        key: 'Mobile',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getEmployeeManageEmployeeCategory()),
        key: 'EmployeeCategory',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getEmployeeManageRemarks()),
        key: 'Remarks',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getEmployeeManageLastUpdatedBy()),
        key: 'LastUpdatedBy',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getEmployeeManageLastUpdatedTime()),
        key: 'LastUpdatedTime',
    },
    
]; 
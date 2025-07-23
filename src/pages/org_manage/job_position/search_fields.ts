import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getJobPositionJobCode()),
        key: 'JobCode',
    },
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
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getJobPositionParentJob()),
        key: 'ParentJob',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getJobPositionJobStatus()),
        key: 'JobStatus',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getJobPositionJobDuty()),
        key: 'JobDuty',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getJobPositionJobRemark()),
        key: 'JobRemark',
    },
    
]; 
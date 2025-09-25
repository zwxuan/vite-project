import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysWarningTaskAppCode()),
        key: 'AppCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysWarningTaskTaskCode()),
        key: 'TaskCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysWarningTaskTaskName()),
        key: 'TaskName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysWarningTaskWarningType()),
        key: 'WarningType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysWarningTaskTypeSchema()),
        key: 'TypeSchema',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysWarningTaskStatus()),
        key: 'Status',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getSysWarningTaskSuccessCnt()),
        key: 'SuccessCnt',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getSysWarningTaskFailCnt()),
        key: 'FailCnt',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysWarningTaskTaskRemark()),
        key: 'TaskRemark',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getSysWarningTaskCreatedTime()),
        key: 'CreatedTime',
    },
    
]; 
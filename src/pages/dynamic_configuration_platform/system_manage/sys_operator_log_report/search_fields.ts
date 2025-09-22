import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysOperatorLogReportDepartment()),
        key: 'Department',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysOperatorLogReportUserName()),
        key: 'UserName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysOperatorLogReportApplication()),
        key: 'Application',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysOperatorLogReportService()),
        key: 'Service',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysOperatorLogReportOperateDevice()),
        key: 'OperateDevice',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getSysOperatorLogReportVisitCount()),
        key: 'VisitCount',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    
]; 
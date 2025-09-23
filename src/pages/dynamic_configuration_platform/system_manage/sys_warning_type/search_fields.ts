import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysWarningTypeAppCode()),
        key: 'AppCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysWarningTypeTypeCode()),
        key: 'TypeCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysWarningTypeTypeName()),
        key: 'TypeName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysWarningTypeTypeSchema()),
        key: 'TypeSchema',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysWarningTypeReportCenter()),
        key: 'ReportCenter',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysWarningTypeCreatedBy()),
        key: 'CreatedBy',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getSysWarningTypeCreatedTime()),
        key: 'CreatedTime',
    },
    
]; 
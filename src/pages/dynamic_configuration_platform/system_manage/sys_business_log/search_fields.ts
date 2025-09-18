import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysBusinessLogUserCode()),
        key: 'UserCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysBusinessLogUserName()),
        key: 'UserName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysBusinessLogDomain()),
        key: 'Domain',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysBusinessLogApplication()),
        key: 'Application',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysBusinessLogService()),
        key: 'Service',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysBusinessLogLogType()),
        key: 'LogType',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysBusinessLogOperationCat()),
        key: 'OperationCat',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysBusinessLogObjectCode()),
        key: 'ObjectCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysBusinessLogObjectName()),
        key: 'ObjectName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysBusinessLogIpAddress()),
        key: 'IpAddress',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getSysBusinessLogLogTime()),
        key: 'LogTime',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysBusinessLogStatus()),
        key: 'Status',
    },
    
]; 
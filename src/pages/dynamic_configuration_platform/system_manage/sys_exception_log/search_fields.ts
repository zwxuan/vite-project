import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysExceptionLogUserCode()),
        key: 'UserCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysExceptionLogUserName()),
        key: 'UserName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysExceptionLogDomain()),
        key: 'Domain',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysExceptionLogApplication()),
        key: 'Application',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysExceptionLogService()),
        key: 'Service',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysExceptionLogExceptionLvl()),
        key: 'ExceptionLvl',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysExceptionLogExceptionMsg()),
        key: 'ExceptionMsg',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysExceptionLogRequestUrl()),
        key: 'RequestUrl',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysExceptionLogRequestParam()),
        key: 'RequestParam',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysExceptionLogRequestHeader()),
        key: 'RequestHeader',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysExceptionLogIpAddress()),
        key: 'IpAddress',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getSysExceptionLogExceptionTime()),
        key: 'ExceptionTime',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysExceptionLogOperateDevice()),
        key: 'OperateDevice',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysExceptionLogStatus()),
        key: 'Status',
    },
    
]; 
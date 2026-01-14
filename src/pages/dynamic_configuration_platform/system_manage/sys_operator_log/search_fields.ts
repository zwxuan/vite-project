import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysOperatorLogUserCode()),
        key: 'UserCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysOperatorLogUserName()),
        key: 'UserName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysOperatorLogDomain()),
        key: 'Domain',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysOperatorLogApplication()),
        key: 'Application',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysOperatorLogService()),
        key: 'Service',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysOperatorLogOperationBtn()),
        key: 'OperationBtn',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysOperatorLogIpAddress()),
        key: 'IpAddress',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getSysOperatorLogOperateTime()),
        key: 'OperateTime',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysOperatorLogOperateDevice()),
        key: 'OperateDevice',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysOperatorLogStatus()),
        key: 'Status',
    },
    
]; 
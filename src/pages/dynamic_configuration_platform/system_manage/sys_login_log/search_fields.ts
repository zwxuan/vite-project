import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysLoginLogUserCode()),
        key: 'UserCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysLoginLogUserName()),
        key: 'UserName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysLoginLogOperation()),
        key: 'Operation',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysLoginLogIpAddress()),
        key: 'IpAddress',
    },
    {
        type: 'date',
        label: i18n.t(LocaleHelper.getSysLoginLogLoginTime()),
        key: 'LoginTime',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysLoginLogLoginDevice()),
        key: 'LoginDevice',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getSysLoginLogStatus()),
        key: 'Status',
    },
    
]; 
import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getManageOrgOrgCode()),
        key: 'OrgCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getManageOrgOrgName()),
        key: 'OrgName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getManageOrgOrgAbbr()),
        key: 'OrgAbbr',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getManageOrgOrgStatus()),
        key: 'OrgStatus',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getManageOrgOrgRemark()),
        key: 'OrgRemark',
    },
    
]; 
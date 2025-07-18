import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getAdminOrgOrgCode()),
        key: 'OrgCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getAdminOrgOrgName()),
        key: 'OrgName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getAdminOrgOrgAbbr()),
        key: 'OrgAbbr',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getAdminOrgOrgStatus()),
        key: 'OrgStatus',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getAdminOrgOrgRemark()),
        key: 'OrgRemark',
    },
    
]; 
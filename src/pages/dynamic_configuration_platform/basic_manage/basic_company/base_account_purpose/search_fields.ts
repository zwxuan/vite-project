import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseAccountPurposeAccountPurposeCode()),
        key: 'AccountPurposeCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseAccountPurposeAccountPurposeName()),
        key: 'AccountPurposeName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseAccountPurposeIsDefault()),
        key: 'IsDefault',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseAccountPurposeStatus()),
        key: 'Status',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseAccountPurposeRemark()),
        key: 'Remark',
    },
    
]; 
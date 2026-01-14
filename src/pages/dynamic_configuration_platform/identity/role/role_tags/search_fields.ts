import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getRoleTagsTagCode()),
        key: 'TagCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getRoleTagsTagName()),
        key: 'TagName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getRoleTagsStatus()),
        key: 'Status',
    },
    
]; 
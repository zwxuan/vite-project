import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCompanyNatureCompanyNatureCode()),
        key: 'CompanyNatureCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCompanyNatureCompanyNatureName()),
        key: 'CompanyNatureName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCompanyNatureRemark()),
        key: 'Remark',
    },
    
]; 
import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCompanySizeCompanySizeCode()),
        key: 'CompanySizeCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCompanySizeCompanySizeName()),
        key: 'CompanySizeName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getBaseCompanySizeRemark()),
        key: 'Remark',
    },
    
]; 
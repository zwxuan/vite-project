import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getVoucherTypeTypeCode()),
        key: 'TypeCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getVoucherTypeBookName()),
        key: 'BookName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getVoucherTypeTypeName()),
        key: 'TypeName',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getVoucherTypeTypeShortName()),
        key: 'TypeShortName',
    },
    
]; 
import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [

    {
        type: 'input',
        label: i18n.t(LocaleHelper.getEmployeeCategoryCategoryCode()),
        key: 'CategoryCode',
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getEmployeeCategoryCategoryName()),
        key: 'CategoryName',
    },
    {
        type: 'select',
        label: i18n.t(LocaleHelper.getEmployeeCategoryStatus()),
        key: 'Status',
        selectOptions: [{ value: '1', label: 'Value1' }, { value: '2', label: 'Value2' }, { value: '3', label: 'Value3' }]
    },
    {
        type: 'input',
        label: i18n.t(LocaleHelper.getEmployeeCategoryRemarks()),
        key: 'Remarks',
    },
    
]; 
import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [
    {
        type: 'rangepicker',
        label: '开航日期',
        key: 'FlightDate',
    },
    {
        type: 'select',
        label: '客户',
        key: 'Customer',
    },
    {
        type: 'select',
        label: '销售',
        key: 'Sales',
    },
    
]; 
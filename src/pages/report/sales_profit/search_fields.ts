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
        type: 'rangepicker',
        label: '到港日期',
        key: 'ArrivalDate',
    },
    
]; 
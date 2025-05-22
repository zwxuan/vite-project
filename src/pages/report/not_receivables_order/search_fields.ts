import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [
    {
        type: 'rangepicker',
        label: '业务日期',
        key: 'BusinessDate',
    },
    {
        type: 'select',
        label: '结算对象',
        key: 'SettlementObject',
    },
    
]; 
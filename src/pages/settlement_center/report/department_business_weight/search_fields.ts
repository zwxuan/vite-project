import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [
    
    {
        type: 'select',
        label: '客户',
        key: 'Customer',
    },
    {
        type: 'select',
        label: '卸货港',
        key: 'UnloadingPort',
    },
    {
        type: 'select',
        label: '起运港',
        key: 'LoadingPort',
    },
    {
        type: 'select',
        label: '订舱代理',
        key: 'BookingAgent',
    },
    {
        type: 'select',
        label: '客户',
        key: 'Customer',
    },
    {
        type: 'select',
        label: '承运人',
        key: 'Carrier',
    },
    {
        type: 'select',
        label: '客服',
        key: 'CustomerService',
    },
    {
        type: 'select',
        label: '目的港',
        key: 'DestinationPort',
    },
    {
        type: 'rangepicker',
        label: 'ETD',
        key: 'ETD',
    },
    {
        type: 'select',
        label: '销售部门',
        key: 'SalesDepartment',
    },
]; 
import { AdvancedSearchFormProps } from "@/components/search-form";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const fields: AdvancedSearchFormProps["fields"] = [
    {
        type: 'rangepicker',
        label: '开航日期',
        key: 'ETADate',
    },
    {
        type: 'select',
        label: '运费条款',
        key: 'FreightTerms',
    },
    {
        type: 'select',
        label: '船名',
        key: 'ShipName',
    },
    {
        type: 'select',
        label: '承运人',
        key: 'Carrier',
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
        label: '海外代理',
        key: 'OverseasAgent',
    },
    {
        type: 'select',
        label: '起运港',
        key: 'LoadingPort',
    },
    {
        type: 'select',
        label: '卸货港',
        key: 'UnloadingPort',
    },
    {
        type: 'select',
        label: '目的港',
        key: 'DestinationPort',
    },
    
    {
        type: 'select',
        label: '销售',
        key: 'Sales',
    },
    {
        type: 'select',
        label: '操作',
        key: 'Operation',
    },
    {
        type: 'select',
        label: '客服',
        key: 'CustomerService',
    },
    {
        type: 'rangepicker',
        label: '审核日期',
        key: 'AuditDate',
    },
    
]; 
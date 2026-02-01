/**
 * 应付费用管理 - 搜索字段配置
 */
import { CostStatus, ServiceType } from '@/types/freight_forwarding/cost_management';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

// 定义搜索字段类型
type SearchFieldConfig = {
    key: string;
    name: string;
    label: string;
    type: string;
    required?: boolean;
    initialValue?: string;
    prefix?: string;
    suffix?: string;
    selectOptions?: Array<{ label: string; value: string }>;
};

export const payableCostSearchFields: SearchFieldConfig[] = [
    {
        key: 'waybillNo',
        name: 'waybillNo',
        label: i18n.t(LocaleHelper.getPayableCostSearchWaybillNo()),
        type: 'input',
    },
    {
        key: 'supplier',
        name: 'supplier',
        label: i18n.t(LocaleHelper.getPayableCostSearchSupplier()),
        type: 'input',
    },
    {
        key: 'serviceType',
        name: 'serviceType',
        label: i18n.t(LocaleHelper.getPayableCostSearchServiceType()),
        type: 'select',
        selectOptions: [
            { label: i18n.t(LocaleHelper.getPayableCostServiceTypeShipping()), value: ServiceType.SHIPPING },
            { label: i18n.t(LocaleHelper.getPayableCostServiceTypeBooking()), value: ServiceType.BOOKING },
            { label: i18n.t(LocaleHelper.getPayableCostServiceTypeTrucking()), value: ServiceType.TRUCKING },
            { label: i18n.t(LocaleHelper.getPayableCostServiceTypeCustoms()), value: ServiceType.CUSTOMS },
            { label: i18n.t(LocaleHelper.getPayableCostServiceTypeWarehouse()), value: ServiceType.WAREHOUSE },
        ],
    },
    {
        key: 'status',
        name: 'status',
        label: i18n.t(LocaleHelper.getPayableCostSearchStatus()),
        type: 'select',
        selectOptions: [
            { label: i18n.t(LocaleHelper.getPayableCostStatusDraft()), value: CostStatus.DRAFT },
            { label: i18n.t(LocaleHelper.getPayableCostStatusPending()), value: CostStatus.PENDING },
            { label: i18n.t(LocaleHelper.getPayableCostStatusApproved()), value: CostStatus.APPROVED },
            { label: i18n.t(LocaleHelper.getPayableCostStatusRejected()), value: CostStatus.REJECTED },
            { label: i18n.t(LocaleHelper.getPayableCostStatusConfirmed()), value: CostStatus.CONFIRMED },
        ],
    },
    {
        key: 'dateRange',
        name: 'dateRange',
        label: i18n.t(LocaleHelper.getPayableCostSearchDateRange()),
        type: 'dateRange',
    },
];

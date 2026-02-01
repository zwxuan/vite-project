/**
 * 应收费用管理 - 搜索字段配置
 */
import { CostStatus } from '@/types/freight_forwarding/cost_management';
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

export const receivableCostSearchFields: SearchFieldConfig[] = [
    {
        key: 'orderNo',
        name: 'orderNo',
        label: i18n.t(LocaleHelper.getReceivableCostSearchOrderNo()),
        type: 'input',
    },
    {
        key: 'customer',
        name: 'customer',
        label: i18n.t(LocaleHelper.getReceivableCostSearchCustomer()),
        type: 'input',
    },
    {
        key: 'status',
        name: 'status',
        label: i18n.t(LocaleHelper.getReceivableCostSearchStatus()),
        type: 'select',
        selectOptions: [
            { label: i18n.t(LocaleHelper.getReceivableCostStatusDraft()), value: CostStatus.DRAFT },
            { label: i18n.t(LocaleHelper.getReceivableCostStatusPending()), value: CostStatus.PENDING },
            { label: i18n.t(LocaleHelper.getReceivableCostStatusApproved()), value: CostStatus.APPROVED },
            { label: i18n.t(LocaleHelper.getReceivableCostStatusRejected()), value: CostStatus.REJECTED },
            { label: i18n.t(LocaleHelper.getReceivableCostStatusConfirmed()), value: CostStatus.CONFIRMED },
        ],
    },
    {
        key: 'dateRange',
        name: 'dateRange',
        label: i18n.t(LocaleHelper.getReceivableCostSearchDateRange()),
        type: 'dateRange',
    },
];

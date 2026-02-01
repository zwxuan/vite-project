/**
 * 费用审核中心搜索字段配置
 */
import type { SearchFieldConfig as SearchField } from '@/components/search-form';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const costReviewCenterSearchFields: SearchField[] = [
    {
        key: 'costType',
        name: 'costType',
        label: i18n.t(LocaleHelper.getCostReviewCenterSearchCostType()),
        type: 'select',
        selectOptions: [
            { label: i18n.t(LocaleHelper.getCostReviewCenterCostTypeAll()), value: '' },
            { label: i18n.t(LocaleHelper.getCostReviewCenterCostTypeReceivable()), value: 'RECEIVABLE' },
            { label: i18n.t(LocaleHelper.getCostReviewCenterCostTypePayable()), value: 'PAYABLE' },
        ],
    },
    {
        key: 'status',
        name: 'status',
        label: i18n.t(LocaleHelper.getCostReviewCenterSearchStatus()),
        type: 'select',
        selectOptions: [
            { label: '全部', value: '' },
            { label: '待审核', value: 'PENDING' },
            { label: '已审核', value: 'APPROVED' },
            { label: '已驳回', value: 'REJECTED' },
        ],
        initialValue: 'PENDING',
    },
    {
        key: 'urgency',
        name: 'urgency',
        label: i18n.t(LocaleHelper.getCostReviewCenterSearchUrgency()),
        type: 'select',
        selectOptions: [
            { label: '全部', value: '' },
            { label: i18n.t(LocaleHelper.getCostReviewCenterUrgencyNormal()), value: 'NORMAL' },
            { label: i18n.t(LocaleHelper.getCostReviewCenterUrgencyUrgent()), value: 'URGENT' },
            { label: i18n.t(LocaleHelper.getCostReviewCenterUrgencyVeryUrgent()), value: 'VERY_URGENT' },
        ],
    },
    {
        key: 'dateRange',
        name: 'dateRange',
        label: i18n.t(LocaleHelper.getCostReviewCenterSearchDateRange()),
        type: 'dateRange',
    },
    {
        key: 'orderNo',
        name: 'orderNo',
        label: i18n.t(LocaleHelper.getCostReviewCenterSearchOrderNo()),
        type: 'input',
    },
    {
        key: 'customerName',
        name: 'customerName',
        label: i18n.t(LocaleHelper.getCostReviewCenterSearchCustomer()),
        type: 'input',
    },
    {
        key: 'supplierName',
        name: 'supplierName',
        label: i18n.t(LocaleHelper.getCostReviewCenterSearchSupplier()),
        type: 'input',
    },
];

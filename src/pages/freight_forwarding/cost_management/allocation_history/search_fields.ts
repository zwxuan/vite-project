import type { SearchFieldConfig as SearchField } from '@/components/search-form';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getAllocationHistorySearchFields = (): SearchField[] => [
    {
        key: 'allocationNo',
        name: 'allocationNo',
        label: i18n.t(LocaleHelper.getAllocationHistorySearchAllocationNo()),
        type: 'input',
    },
    {
        key: 'orderNo',
        name: 'orderNo',
        label: i18n.t(LocaleHelper.getAllocationHistorySearchOrderNo()),
        type: 'input',
    },
    {
        key: 'customerName',
        name: 'customerName',
        label: i18n.t(LocaleHelper.getAllocationHistorySearchCustomer()),
        type: 'input',
    },
    {
        key: 'operator',
        name: 'operator',
        label: i18n.t(LocaleHelper.getAllocationHistorySearchOperator()),
        type: 'input',
    },
    {
        key: 'allocationType',
        name: 'allocationType',
        label: i18n.t(LocaleHelper.getAllocationHistorySearchAllocationType()),
        type: 'select',
        selectOptions: [
            { label: i18n.t(LocaleHelper.getAllocationHistoryTypeAll()), value: '' },
            { label: i18n.t(LocaleHelper.getAllocationHistoryTypeRule()), value: '规则分配' },
            { label: i18n.t(LocaleHelper.getAllocationHistoryTypeManual()), value: '手动分配' },
        ],
    },
    {
        key: 'status',
        name: 'status',
        label: i18n.t(LocaleHelper.getAllocationHistorySearchStatus()),
        type: 'select',
        selectOptions: [
            { label: i18n.t(LocaleHelper.getAllocationHistoryStatusAll()), value: '' },
            { label: i18n.t(LocaleHelper.getAllocationHistoryStatusSuccess()), value: 'SUCCESS' },
            { label: i18n.t(LocaleHelper.getAllocationHistoryStatusFailed()), value: 'FAILED' },
        ],
    },
    {
        key: 'dateRange',
        name: 'dateRange',
        label: i18n.t(LocaleHelper.getAllocationHistorySearchDateRange()),
        type: 'dateRange',
    },
];

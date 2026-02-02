import type { SearchFieldConfig as SearchField } from '@/components/search-form';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getManualAdjustmentApprovalSearchFields = (): SearchField[] => [
    {
        key: 'adjustmentNo',
        name: 'adjustmentNo',
        label: i18n.t(LocaleHelper.getManualAdjustmentApprovalSearchAdjustmentNo()),
        type: 'input',
    },
    {
        key: 'orderNo',
        name: 'orderNo',
        label: i18n.t(LocaleHelper.getManualAdjustmentApprovalSearchOrderNo()),
        type: 'input',
    },
    {
        key: 'customerName',
        name: 'customerName',
        label: i18n.t(LocaleHelper.getManualAdjustmentApprovalSearchCustomer()),
        type: 'input',
    },
    {
        key: 'applicant',
        name: 'applicant',
        label: i18n.t(LocaleHelper.getManualAdjustmentApprovalSearchApplicant()),
        type: 'input',
    },
    {
        key: 'status',
        name: 'status',
        label: i18n.t(LocaleHelper.getManualAdjustmentApprovalSearchStatus()),
        type: 'select',
        selectOptions: [
            { label: i18n.t(LocaleHelper.getManualAdjustmentApprovalStatusAll()), value: '' },
            { label: i18n.t(LocaleHelper.getManualAdjustmentApprovalStatusPending()), value: 'PENDING' },
            { label: i18n.t(LocaleHelper.getManualAdjustmentApprovalStatusApproved()), value: 'APPROVED' },
            { label: i18n.t(LocaleHelper.getManualAdjustmentApprovalStatusRejected()), value: 'REJECTED' },
        ],
    },
    {
        key: 'dateRange',
        name: 'dateRange',
        label: i18n.t(LocaleHelper.getManualAdjustmentApprovalSearchDateRange()),
        type: 'dateRange',
    },
];

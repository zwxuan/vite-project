import React from 'react';
import { Button, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import {
    ManualAdjustmentApprovalItem,
    ManualAdjustmentApprovalStatus,
} from '@/types/freight_forwarding/cost_management';

export const getManualAdjustmentApprovalColumns = (
    handleApprove: (id: string) => void,
    handleReject: (id: string) => void
): ColumnsType<ManualAdjustmentApprovalItem> => {
    const statusLabelMap = {
        [ManualAdjustmentApprovalStatus.PENDING]: i18n.t(LocaleHelper.getManualAdjustmentApprovalStatusPending()),
        [ManualAdjustmentApprovalStatus.APPROVED]: i18n.t(LocaleHelper.getManualAdjustmentApprovalStatusApproved()),
        [ManualAdjustmentApprovalStatus.REJECTED]: i18n.t(LocaleHelper.getManualAdjustmentApprovalStatusRejected()),
    };

    const statusColorMap = {
        [ManualAdjustmentApprovalStatus.PENDING]: 'processing',
        [ManualAdjustmentApprovalStatus.APPROVED]: 'success',
        [ManualAdjustmentApprovalStatus.REJECTED]: 'error',
    };

    return [
        {
            title: i18n.t(LocaleHelper.getManualAdjustmentApprovalColAdjustmentNo()),
            dataIndex: 'adjustmentNo',
            key: 'adjustmentNo',
        },
        {
            title: i18n.t(LocaleHelper.getManualAdjustmentApprovalColOrderNo()),
            dataIndex: 'orderNo',
            key: 'orderNo',
        },
        {
            title: i18n.t(LocaleHelper.getManualAdjustmentApprovalColCustomer()),
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: i18n.t(LocaleHelper.getManualAdjustmentApprovalColAdjustmentType()),
            dataIndex: 'adjustmentType',
            key: 'adjustmentType',
        },
        {
            title: i18n.t(LocaleHelper.getManualAdjustmentApprovalColAdjustmentAmount()),
            dataIndex: 'adjustmentAmount',
            key: 'adjustmentAmount',
        },
        {
            title: i18n.t(LocaleHelper.getManualAdjustmentApprovalColCurrency()),
            dataIndex: 'currency',
            key: 'currency',
        },
        {
            title: i18n.t(LocaleHelper.getManualAdjustmentApprovalColApplicant()),
            dataIndex: 'applicant',
            key: 'applicant',
        },
        {
            title: i18n.t(LocaleHelper.getManualAdjustmentApprovalColApplyTime()),
            dataIndex: 'applyTime',
            key: 'applyTime',
        },
        {
            title: i18n.t(LocaleHelper.getManualAdjustmentApprovalColStatus()),
            dataIndex: 'status',
            key: 'status',
            render: (value: ManualAdjustmentApprovalStatus) => (
                <Tag color={statusColorMap[value]}>{statusLabelMap[value]}</Tag>
            ),
        },
        {
            title: i18n.t(LocaleHelper.getManualAdjustmentApprovalColAction()),
            key: 'action',
            render: (_, record) => (
                <Space size={8}>
                    <Button type="link" disabled={record.status !== ManualAdjustmentApprovalStatus.PENDING} onClick={() => handleApprove(record.id)}>
                        {i18n.t(LocaleHelper.getManualAdjustmentApprovalActionApprove())}
                    </Button>
                    <Button type="link" danger disabled={record.status !== ManualAdjustmentApprovalStatus.PENDING} onClick={() => handleReject(record.id)}>
                        {i18n.t(LocaleHelper.getManualAdjustmentApprovalActionReject())}
                    </Button>
                </Space>
            ),
        },
    ];
};

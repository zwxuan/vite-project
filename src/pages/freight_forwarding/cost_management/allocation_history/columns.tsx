import React from 'react';
import { Button, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import {
    AllocationHistoryItem,
    AllocationHistoryStatus,
} from '@/types/freight_forwarding/cost_management';

const statusColorMap = {
    [AllocationHistoryStatus.SUCCESS]: 'success',
    [AllocationHistoryStatus.FAILED]: 'error',
};

export const getColumns = (onTrace: (record: AllocationHistoryItem) => void): ColumnsType<AllocationHistoryItem> => {
    const statusLabelMap = {
        [AllocationHistoryStatus.SUCCESS]: i18n.t(LocaleHelper.getAllocationHistoryStatusSuccess()),
        [AllocationHistoryStatus.FAILED]: i18n.t(LocaleHelper.getAllocationHistoryStatusFailed()),
    };

    return [
        {
            title: i18n.t(LocaleHelper.getAllocationHistoryColAllocationNo()),
            dataIndex: 'allocationNo',
            key: 'allocationNo',
        },
        {
            title: i18n.t(LocaleHelper.getAllocationHistoryColOrderNo()),
            dataIndex: 'orderNo',
            key: 'orderNo',
        },
        {
            title: i18n.t(LocaleHelper.getAllocationHistoryColCustomer()),
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: i18n.t(LocaleHelper.getAllocationHistoryColAllocationType()),
            dataIndex: 'allocationType',
            key: 'allocationType',
        },
        {
            title: i18n.t(LocaleHelper.getAllocationHistoryColAllocationBasis()),
            dataIndex: 'allocationBasis',
            key: 'allocationBasis',
        },
        {
            title: i18n.t(LocaleHelper.getAllocationHistoryColAllocationAmount()),
            dataIndex: 'allocationAmount',
            key: 'allocationAmount',
        },
        {
            title: i18n.t(LocaleHelper.getAllocationHistoryColCurrency()),
            dataIndex: 'currency',
            key: 'currency',
        },
        {
            title: i18n.t(LocaleHelper.getAllocationHistoryColOperator()),
            dataIndex: 'operator',
            key: 'operator',
        },
        {
            title: i18n.t(LocaleHelper.getAllocationHistoryColAllocateTime()),
            dataIndex: 'allocateTime',
            key: 'allocateTime',
        },
        {
            title: i18n.t(LocaleHelper.getAllocationHistoryColStatus()),
            dataIndex: 'status',
            key: 'status',
            render: (value: AllocationHistoryStatus) => (
                <Tag color={statusColorMap[value]}>{statusLabelMap[value]}</Tag>
            ),
        },
        {
            title: i18n.t(LocaleHelper.getAllocationHistoryColSource()),
            dataIndex: 'source',
            key: 'source',
        },
        {
            title: i18n.t(LocaleHelper.getAllocationHistoryColAction()),
            key: 'action',
            width: 40,
            render: (_, record) => (
                <a onClick={() => onTrace(record)}>
                    {i18n.t(LocaleHelper.getAllocationHistoryActionTrace())}
                </a>
            ),
        },
    ];
};
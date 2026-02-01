import React from 'react';
import { Space, Button, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { PayableCost, CostStatus } from '@/types/freight_forwarding/cost_management';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

// 获取状态标签
const getStatusTag = (status: CostStatus) => {
    const statusConfig = {
        [CostStatus.DRAFT]: { color: 'default', text: i18n.t(LocaleHelper.getPayableCostStatusDraft()) },
        [CostStatus.PENDING]: { color: 'processing', text: i18n.t(LocaleHelper.getPayableCostStatusPending()) },
        [CostStatus.APPROVED]: { color: 'success', text: i18n.t(LocaleHelper.getPayableCostStatusApproved()) },
        [CostStatus.REJECTED]: { color: 'error', text: i18n.t(LocaleHelper.getPayableCostStatusRejected()) },
        [CostStatus.CONFIRMED]: { color: 'success', text: i18n.t(LocaleHelper.getPayableCostStatusConfirmed()) },
    };
    const config = statusConfig[status] || { color: 'default', text: status };
    return <Tag color={config.color}>{config.text}</Tag>;
};

export const getColumns = (
    handleEdit: (id: string) => void,
    handleDelete: (id: string) => void
): ColumnsType<PayableCost> => [
        {
            title: i18n.t(LocaleHelper.getPayableCostColWaybillNo()),
            dataIndex: 'waybillNo',
            key: 'waybillNo',
            width: 150,
            fixed: 'left',
        },
        {
            title: i18n.t(LocaleHelper.getPayableCostColServiceType()),
            dataIndex: 'serviceType',
            key: 'serviceType',
            width: 100,
            render: (value) => {
                const typeMap: Record<string, string> = {
                    SHIPPING: i18n.t(LocaleHelper.getPayableCostServiceTypeShipping()),
                    BOOKING: i18n.t(LocaleHelper.getPayableCostServiceTypeBooking()),
                    TRUCKING: i18n.t(LocaleHelper.getPayableCostServiceTypeTrucking()),
                    CUSTOMS: i18n.t(LocaleHelper.getPayableCostServiceTypeCustoms()),
                    WAREHOUSE: i18n.t(LocaleHelper.getPayableCostServiceTypeWarehouse()),
                };
                return typeMap[value] || value;
            },
        },
        {
            title: i18n.t(LocaleHelper.getPayableCostColSupplier()),
            dataIndex: 'supplierName',
            key: 'supplierName',
            width: 150,
        },
        {
            title: i18n.t(LocaleHelper.getPayableCostColCostName()),
            dataIndex: 'items',
            key: 'costName',
            width: 200,
            render: (items) => items.map((item: any) => item.costName).join(', '),
        },
        {
            title: i18n.t(LocaleHelper.getPayableCostColAmount()),
            dataIndex: 'grandTotal',
            key: 'grandTotal',
            width: 120,
            align: 'right',
            render: (value, record) => `${record.currency} ${value.toLocaleString()}`,
        },
        {
            title: i18n.t(LocaleHelper.getPayableCostColStatus()),
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (status) => getStatusTag(status),
        },
        {
            title: i18n.t(LocaleHelper.getPayableCostColServiceDate()),
            dataIndex: 'serviceDate',
            key: 'serviceDate',
            width: 120,
        },
        {
            title: i18n.t(LocaleHelper.getPayableCostFormOperator()),
            dataIndex: 'operator',
            key: 'operator',
            width: 100,
        },
        {
            title: i18n.t(LocaleHelper.getPayableCostColAction()),
            key: 'action',
            width: 150,
            fixed: 'right',
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="link"
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record.id)}
                    >
                        {i18n.t(LocaleHelper.getPayableCostBtnEdit())}
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                    >
                        {i18n.t(LocaleHelper.getPayableCostBtnDelete())}
                    </Button>
                </Space>
            ),
        },
    ];

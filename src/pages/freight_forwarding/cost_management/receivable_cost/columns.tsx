import React from 'react';
import { Space, Button, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { ReceivableCost, CostStatus } from '@/types/freight_forwarding/cost_management';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

// 获取状态标签
const getStatusTag = (status: CostStatus) => {
    const statusConfig = {
        [CostStatus.DRAFT]: { color: 'default', text: i18n.t(LocaleHelper.getReceivableCostStatusDraft()) },
        [CostStatus.PENDING]: { color: 'processing', text: i18n.t(LocaleHelper.getReceivableCostStatusPending()) },
        [CostStatus.APPROVED]: { color: 'success', text: i18n.t(LocaleHelper.getReceivableCostStatusApproved()) },
        [CostStatus.REJECTED]: { color: 'error', text: i18n.t(LocaleHelper.getReceivableCostStatusRejected()) },
        [CostStatus.CONFIRMED]: { color: 'success', text: i18n.t(LocaleHelper.getReceivableCostStatusConfirmed()) },
    };
    const config = statusConfig[status] || { color: 'default', text: status };
    return <Tag color={config.color}>{config.text}</Tag>;
};

export const getColumns = (
    handleEdit: (id: string) => void,
    handleDelete: (id: string) => void
): ColumnsType<ReceivableCost> => [
        {
            title: i18n.t(LocaleHelper.getReceivableCostColOrderNo()),
            dataIndex: 'orderNo',
            key: 'orderNo',
            width: 150,
            fixed: 'left',
        },
        {
            title: i18n.t(LocaleHelper.getReceivableCostColCustomer()),
            dataIndex: 'customerName',
            key: 'customerName',
            width: 150,
        },
        {
            title: i18n.t(LocaleHelper.getReceivableCostColCostName()),
            dataIndex: 'items',
            key: 'costName',
            width: 200,
            render: (items) => items.map((item: any) => item.costName).join(', '),
        },
        {
            title: i18n.t(LocaleHelper.getReceivableCostColAmount()),
            dataIndex: 'grandTotal',
            key: 'grandTotal',
            width: 120,
            align: 'right',
            render: (value, record) => `${record.currency} ${value.toLocaleString()}`,
        },
        {
            title: i18n.t(LocaleHelper.getReceivableCostColStatus()),
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (status) => getStatusTag(status),
        },
        {
            title: i18n.t(LocaleHelper.getReceivableCostColBillingDate()),
            dataIndex: 'billingDate',
            key: 'billingDate',
            width: 120,
        },
        {
            title: i18n.t(LocaleHelper.getReceivableCostFormSalesman()),
            dataIndex: 'salesman',
            key: 'salesman',
            width: 100,
        },
        {
            title: i18n.t(LocaleHelper.getReceivableCostColAction()),
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
                        {i18n.t(LocaleHelper.getReceivableCostBtnEdit())}
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                    >
                        {i18n.t(LocaleHelper.getReceivableCostBtnDelete())}
                    </Button>
                </Space>
            ),
        },
    ];

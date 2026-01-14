import React from 'react';
import { ColumnsType } from 'antd/es/table';
import { OrderItem } from "@/types/freight_forwarding/order_management";
import { OrdersLocale } from '@/utils/locale/freight_forwarding/order_management/orders';
import i18n from '@/i18n';
import { Badge, Space } from 'antd';

export const getColumns = (
    handleEdit: (record: OrderItem) => void,
    handleDelete: (record: OrderItem) => void
): ColumnsType<OrderItem> => [
    {
        title: i18n.t(OrdersLocale.getOrderNo()),
        dataIndex: 'orderNo',
        key: 'orderNo',
        width: 150,
    },
    {
        title: i18n.t(OrdersLocale.getCustomerName()),
        dataIndex: 'customerName',
        key: 'customerName',
        width: 200,
    },
    {
        title: i18n.t(OrdersLocale.getOrderType()),
        dataIndex: 'orderType',
        key: 'orderType',
        width: 120,
    },
    {
        title: i18n.t(OrdersLocale.getOrderStatus()),
        dataIndex: 'status',
        key: 'status',
        width: 120,
        render: (status: string) => {
            let color = 'default';
            if (status === 'confirmed') color = 'success';
            if (status === 'processing') color = 'processing';
            if (status === 'cancelled') color = 'error';
            return <Badge status={color as any} text={status} />;
        }
    },
    {
        title: i18n.t(OrdersLocale.getBookingDate()),
        dataIndex: 'bookingDate',
        key: 'bookingDate',
        width: 120,
    },
    {
        title: i18n.t(OrdersLocale.getOrigin()),
        dataIndex: 'origin',
        key: 'origin',
        width: 150,
    },
    {
        title: i18n.t(OrdersLocale.getDestination()),
        dataIndex: 'destination',
        key: 'destination',
        width: 150,
    },
    {
        title: i18n.t(OrdersLocale.getCreateTime()),
        dataIndex: 'createTime',
        key: 'createTime',
        width: 180,
    },
    {
        title: i18n.t(OrdersLocale.getAction()),
        key: 'action',
        fixed: 'right',
        width: 150,
        render: (_, record) => (
            <Space size="middle">
                <a onClick={() => handleEdit(record)}>{i18n.t(OrdersLocale.getButtonEdit())}</a>
                <a onClick={() => handleDelete(record)} style={{ color: 'red' }}>{i18n.t(OrdersLocale.getButtonDelete())}</a>
            </Space>
        ),
    },
];

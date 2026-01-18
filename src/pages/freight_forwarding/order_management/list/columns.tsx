import { TableColumnsType } from 'antd';
import { OrderItem } from '@/types/freight_forwarding/order_management';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { Space } from 'antd';

export const getColumns = (handleEdit: (record: OrderItem) => void, handleDelete: (record: OrderItem) => void, handleDetail: (record: OrderItem) => void): TableColumnsType<OrderItem> => [
    {
        title: i18n.t(LocaleHelper.getOrderManagementOrderNo()),
        dataIndex: 'orderNo',
        key: 'orderNo',
        width: 150,
    },
    {
        title: i18n.t(LocaleHelper.getOrderManagementCustomerName()),
        dataIndex: 'customerName',
        key: 'customerName',
        width: 200,
    },
    {
        title: i18n.t(LocaleHelper.getOrderManagementOrderType()),
        dataIndex: 'orderType',
        key: 'orderType',
        width: 120,
    },
    {
        title: i18n.t(LocaleHelper.getOrderManagementOrderStatus()),
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        width: 100,
    },
    {
        title: i18n.t(LocaleHelper.getOrderManagementBookingDate()),
        dataIndex: 'bookingDate',
        key: 'bookingDate',
        width: 120,
    },
    {
        title: i18n.t(LocaleHelper.getOrderManagementOrigin()),
        dataIndex: 'origin',
        key: 'origin',
        width: 150,
    },
    {
        title: i18n.t(LocaleHelper.getOrderManagementDestination()),
        dataIndex: 'destination',
        key: 'destination',
        width: 150,
    },
    {
        title: i18n.t(LocaleHelper.getOrderManagementCreateTime()),
        dataIndex: 'createTime',
        key: 'createTime',
        width: 180,
    },
    {
        title: i18n.t(LocaleHelper.getOrderListActions()),
        key: 'action',
        fixed: 'right',
        width: 200,
        render: (_, record) => (
            <Space size="middle">
                <a onClick={() => handleDetail(record)}>{i18n.t(LocaleHelper.getOrderListDetail())}</a>
                <a onClick={() => handleEdit(record)}>{i18n.t(LocaleHelper.getOrderListEdit())}</a>
                <a onClick={() => handleDelete(record)} style={{ color: 'red' }}>{i18n.t(LocaleHelper.getOrderListDelete())}</a>
            </Space>
        ),
    },
];

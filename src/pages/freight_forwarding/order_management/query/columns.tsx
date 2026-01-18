import { TableColumnsType } from 'antd';
import { OrderItem } from '@/types/freight_forwarding/order_management';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { Space } from 'antd';

export const getColumns = (handleDetail: (record: OrderItem) => void, handleTrack: (record: OrderItem) => void): TableColumnsType<OrderItem> => [
    {
        title: i18n.t(LocaleHelper.getOrderManagementOrderNo()),
        dataIndex: 'orderNo',
        key: 'orderNo',
        width: 150,
    },
    {
        title: i18n.t(LocaleHelper.getQueryCustomerName()),
        dataIndex: 'customerName',
        key: 'customerName',
        width: 200,
    },
    {
        title: i18n.t(LocaleHelper.getQuerySalesman()),
        dataIndex: 'salesman', // Mock data needs this
        key: 'salesman',
        width: 120,
    },
    {
        title: i18n.t(LocaleHelper.getQueryOrderType()),
        dataIndex: 'orderType',
        key: 'orderType',
        width: 120,
    },
    {
        title: i18n.t(LocaleHelper.getQueryOrderStatus()),
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        width: 100,
    },
    {
        title: i18n.t(LocaleHelper.getOrderManagementCreateTime()),
        dataIndex: 'createTime',
        key: 'createTime',
        width: 150,
    },
    {
        title: i18n.t(LocaleHelper.getOrderListActions()),
        key: 'action',
        fixed: 'right',
        width: 150,
        render: (_, record) => (
            <Space size="middle">
                <a onClick={() => handleDetail(record)}>{i18n.t(LocaleHelper.getOrderListDetail())}</a>
                <a onClick={() => handleTrack(record)}>{i18n.t(LocaleHelper.getQueryTrack())}</a>
            </Space>
        ),
    },
];

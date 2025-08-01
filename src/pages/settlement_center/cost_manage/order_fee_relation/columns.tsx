﻿
import { TableColumnsType, Popconfirm } from 'antd';
import { OrderFeeItemProps } from "@/types/settlement_center/business_manage/order_fee";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';



export const getColumns = (handleEdit: (record: OrderFeeItemProps) => void, handleDelete: (record: OrderFeeItemProps) => void): TableColumnsType<OrderFeeItemProps> => [
    {
        title: '订单编号',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'OrderNumber',
        sorter: true,
        align: 'left',
        fixed: 'left',
    },
    {
        title: '付款部门全名称',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'OrderDepartment',
        sorter: true,
        align: 'left',
        fixed: 'left',
    },
    {
        title: '费用名称',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FeeName',
        sorter: true,
        align: 'left',
    },
    {
        title: '服务编号',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ServiceNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: '收款部门全名称',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ServiceDepartment',
        sorter: true,
        align: 'left',
    },
    {
        title: '币制',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Currency',
        sorter: true,
        align: 'left',
    },
    {
        title: '支付含税金额',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'TaxIncludedAmount',
        sorter: true,
        align: 'right',
    },
    {
        title: '支付不含税金额',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'TaxExcludedAmount',
        sorter: true,
        align: 'left',
    },
    {
        title: '支付含税金额(折RMB)',
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'TaxIncludedAmount',
        sorter: true,
        align: 'right',
    },
    {
        title: '支付不含税金额(折RMB)',
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'TaxExcludedAmount',
        sorter: true,
        align: 'left',
    },
];

export const getColumns2 = (handleEdit: (record: OrderFeeItemProps) => void, handleDelete: (record: OrderFeeItemProps) => void): TableColumnsType<OrderFeeItemProps> => [
    {
        title: '服务编号',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ServiceNumber',
        sorter: true,
        align: 'left',
        fixed: 'left',
    },
    {
        title: '收款部门全名称',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'OrderDepartment',
        sorter: true,
        align: 'left',
        fixed: 'left',
    },
    {
        title: '费用名称',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FeeName',
        sorter: true,
        align: 'left',
    },
    {
        title: '订单编号',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'OrderNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: '付款部门全名称',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ServiceDepartment',
        sorter: true,
        align: 'left',
    },
    {
        title: '币制',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Currency',
        sorter: true,
        align: 'left',
    },
    {
        title: '收入含税金额',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'TaxIncludedAmount',
        sorter: true,
        align: 'right',
    },
    {
        title: '收入不含税金额',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'TaxExcludedAmount',
        sorter: true,
        align: 'left',
    },
    {
        title: '收入含税金额(折RMB)',
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'TaxIncludedAmount',
        sorter: true,
        align: 'right',
    },
    {
        title: '收入不含税金额(折RMB)',
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'TaxExcludedAmount',
        sorter: true,
        align: 'left',
    },
];



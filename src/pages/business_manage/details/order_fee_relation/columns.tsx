
import { TableColumnsType, Popconfirm } from 'antd';
import { OrderFeeItemProps } from "@/types/order_fee/order_fee";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';



export const getColumns = (handleEdit: (record: OrderFeeItemProps) => void, handleDelete: (record: OrderFeeItemProps) => void): TableColumnsType<OrderFeeItemProps> => [
    {
        title: '部门名称',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'OrderDepartment',
        sorter: true,
        align: 'left',
        fixed: 'left',
    },
    {
        title: '收|支',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'PayOrReceive',
        sorter: true,
        align: 'left',
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
        title: '部门名称',
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
        title: '含税金额',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'TaxIncludedAmount',
        sorter: true,
        align: 'right',
    },
    {
        title: '不含税金额',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'TaxExcludedAmount',
        sorter: true,
        align: 'left',
    },
];


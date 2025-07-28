
import { TableColumnsType, Popconfirm } from 'antd';
import { OrderFeeItemProps } from "@/types/settlement_center/business_manage/order_fee";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';



export const getColumns = (handleEdit: (record: OrderFeeItemProps) => void, handleDelete: (record: OrderFeeItemProps) => void): TableColumnsType<OrderFeeItemProps> => [
    {
        title: '部门全路径',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'DepartmentFullPath',
        sorter: true,
        align: 'left',
        fixed: 'left',
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
        title: '收入',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Income',
        sorter: true,
        align: 'right',
    },
    {
        title: '支出',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Expense',
        sorter: true,
        align: 'left',
    },
    {
        title: '含税毛利',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'GrossProfit',
        sorter: true,
        align: 'left',
    },
    {
        title: '不含税毛利',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'GrossProfitExTax',
        sorter: true,
        align: 'left',
    },
];

export const getServiceColumns = (handleEdit: (record: OrderFeeItemProps) => void, handleDelete: (record: OrderFeeItemProps) => void): TableColumnsType<OrderFeeItemProps> => [
    {
        title: '服务类型',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ServiceType',
        sorter: true,
        align: 'left',
        fixed: 'left',
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
        title: '收入',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Income',
        sorter: true,
        align: 'right',
    },
    {
        title: '支出',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Expense',
        sorter: true,
        align: 'left',
    },
    {
        title: '含税毛利',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'GrossProfit',
        sorter: true,
        align: 'left',
    },
    {
        title: '不含税毛利',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'GrossProfitExTax',
        sorter: true,
        align: 'left',
    },
];


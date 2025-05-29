import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { CurrencyItemProps } from "@/types/basic_manage/currency";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';

export const getColumns = (handleEdit: (record: CurrencyItemProps) => void, handleDelete: (record: CurrencyItemProps) => void): TableColumnsType<CurrencyItemProps> => [
    {
        title: i18n.t(LocaleHelper.getCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Code',
        sorter: true,
        fixed: 'left',
        align: 'center',
    },
    {
        title: '币制名称',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CurrencyFullName',
        sorter: true,
        fixed: 'left',
        align: 'left',
    },
    {
        title: '币制简称',
        dataIndex: 'CurrencyShortName',
        sorter: true,
        width: 150,
        onHeaderCell: () => ({ style: { width: '100px' } }),
    },
    {
        title: '币制符号',
        dataIndex: 'CurrencyMark',
        sorter: true,
        width: 150,
        onHeaderCell: () => ({ style: { width: '100px' } }),
    },
    {
        title: '价格精度',
        dataIndex: 'PricePrecision',
        sorter: true,
        align: 'right',
        width: 150,
        onHeaderCell: () => ({ style: { width: '100px' } }),
    },
    {
        title: '价格舍入规则',
        dataIndex: 'PriceRoundingRule',
        sorter: true,
        width: 150,
        onHeaderCell: () => ({ style: { width: '100px' } }),
    },
    {
        title: '金额精度',
        dataIndex: 'AmountPrecision',
        sorter: true,
        align: 'right',
        width: 150,
        onHeaderCell: () => ({ style: { width: '100px' } }),
    },
    {
        title: '金额舍入规则',
        dataIndex: 'AmountRoundingRule',
        sorter: true,
        width: 150,
        onHeaderCell: () => ({ style: { width: '100px' } }),
    },
    {
        title: '备注',
        dataIndex: 'Remark',
        sorter: true,
        width: 150,
        onHeaderCell: () => ({ style: { width: '100px' } }),
    },
    {
        title: '状态',
        dataIndex: 'Status',
        sorter: true,
        align: 'center',
        width: 40,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        render: (text) => {
            if (text === 0) {
                return <Tag color='green'>启用</Tag>;
            } else if (text === 1) {
                return <Tag>停用</Tag>;
            } else {
                return <Tag color='red'>删除</Tag>;
            }
        },
    },
    {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        render: (_, record) => (
        <>
            <a>启用</a>
            <a onClick={()=>handleEdit(record)}>编辑</a>
            <Popconfirm title="确定要删除吗?" cancelText="取消" okText="确定" onConfirm={() => handleDelete(record)}>
                <a>删除</a>
            </Popconfirm>
        </>
        ),
    },
]; 

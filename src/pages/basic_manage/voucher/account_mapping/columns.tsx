
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { AccountMappingItemProps } from "@/types/account_mapping/account_mapping";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: AccountMappingItemProps) => void, handleDelete: (record: AccountMappingItemProps) => void): TableColumnsType<AccountMappingItemProps> => [

    {
        title: i18n.t(LocaleHelper.getAccountMappingMappingId()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'MappingId',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getAccountMappingBookName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BookName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getAccountMappingRuleName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RuleName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getAccountMappingEntryName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'EntryName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getAccountMappingAccountName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'AccountName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getAccountMappingAccountGroupBy()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'AccountGroupBy',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getAccountMappingFinanceCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FinanceCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getAccountMappingRemark()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Remark',
        sorter: true,
        align: 'left',
    },
    {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
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

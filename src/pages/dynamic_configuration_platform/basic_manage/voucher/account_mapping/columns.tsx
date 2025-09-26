
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { AccountMappingItemProps } from "@/types/dynamic_configuration_platform/basic_manage/account_mapping";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: AccountMappingItemProps) => void, handleDelete: (record: AccountMappingItemProps) => void): TableColumnsType<AccountMappingItemProps> => [

    {
        title: i18n.t(LocaleHelper.getAccountMappingMappingId()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'MappingId',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getAccountMappingBookName()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'BookName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getAccountMappingRuleName()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'RuleName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getAccountMappingEntryName()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'EntryName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getAccountMappingAccountName()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'AccountName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getAccountMappingAccountGroupBy()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'AccountGroupBy',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getAccountMappingFinanceCode()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'FinanceCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getAccountMappingRemark()),
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


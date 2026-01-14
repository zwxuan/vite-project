
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { AccountingBookItemProps } from "@/types/dynamic_configuration_platform/basic_manage/accounting_book";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: AccountingBookItemProps) => void, handleDelete: (record: AccountingBookItemProps) => void): TableColumnsType<AccountingBookItemProps> => [

    {
        title: i18n.t(LocaleHelper.getAccountingBookBookId()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BookId',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getAccountingBookCompanyCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CompanyCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getAccountingBookCompanyName()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CompanyName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getAccountingBookBookCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BookCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getAccountingBookBookName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BookName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getAccountingBookFiscalYear()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FiscalYear',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getAccountingBookCurrency()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Currency',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getAccountingBookThirdSystemName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ThirdSystemName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getAccountingBookApiRemark()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ApiRemark',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getAccountingBookIsActive()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'IsActive',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getAccountingBookCreatedAt()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CreatedAt',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getAccountingBookUpdatedAt()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'UpdatedAt',
        sorter: true,
        align: 'center',
    },
    {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 40,
        render: (_, record) => (
        <>
            <a>启用</a>
            <a onClick={()=>handleEdit(record)}>编辑</a>
        </>
        ),
    },
]; 


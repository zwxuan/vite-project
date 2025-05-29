
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { BaseExchangeRateItemProps } from "@/types/basic_manage/base_exchange_rate/base_exchange_rate";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: BaseExchangeRateItemProps) => void, handleDelete: (record: BaseExchangeRateItemProps) => void): TableColumnsType<BaseExchangeRateItemProps> => [

    {
        title: i18n.t(LocaleHelper.getBaseExchangeRatePurposeCurrency()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'PurposeCurrency',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseExchangeRateExchangeRateType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ExchangeRateType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseExchangeRateSourceCurrency()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SourceCurrency',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseExchangeRateQuotationDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'QuotationDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getBaseExchangeRateDirectExchangeRate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'DirectExchangeRate',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getBaseExchangeRateIndirectExchangeRate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'IndirectExchangeRate',
        sorter: true,
        align: 'right',
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

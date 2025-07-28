
import { TableColumnsType, Popconfirm } from 'antd';
import { OrderFeeItemProps } from "@/types/settlement_center/business_manage/order_fee";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';



export const getColumns = (handleEdit: (record: OrderFeeItemProps) => void, handleDelete: (record: OrderFeeItemProps) => void): TableColumnsType<OrderFeeItemProps> => [
    {
        title: i18n.t(LocaleHelper.getOrderFeeFeeName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FeeName',
        sorter: true,
        align: 'left',
        fixed: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderFeeSettlementObject()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SettlementObject',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderFeeSettlementCompany()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SettlementCompany',
        sorter: true,
        align: 'left',
        fixed: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderFeeDomesticForeign()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'DomesticForeign',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderFeeCurrency()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Currency',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderFeeExchangeRate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ExchangeRate',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getOrderFeeUnit()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Unit',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderFeeQuantity()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Quantity',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getOrderFeeUnitPrice()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'UnitPrice',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getOrderFeeTaxIncludedPrice()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'TaxIncludedPrice',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getOrderFeeTaxExcludedPrice()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'TaxExcludedPrice',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getOrderFeeTaxRate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'TaxRate',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getOrderFeeTaxAmount()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'TaxAmount',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getOrderFeeRmbEquivalent()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RmbEquivalent',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getOrderFeeLocalCurrency()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'LocalCurrency',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderFeeRemarks()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Remarks',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderFeeBillNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BillNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderFeeWriteOffAmount()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'UnadjustedAmount',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getOrderFeeUnadjustedAmount()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'UnadjustedAmount',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getOrderFeeWriteOffDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'WriteOffDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getOrderFeeFeeId()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FeeId',
        sorter: true,
        align: 'left',
    },
    {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        render: (_, record) => (
            record.FeeId != '' && record.FeeId != null ? (
                <>
                    <a onClick={() => handleEdit(record)}>编辑</a>
                    <Popconfirm title="确定要删除吗?" cancelText="取消" okText="确定" onConfirm={() => handleDelete(record)}>
                        <a>删除</a>
                    </Popconfirm>
                </>
            ) : ''
        ),
    },
];


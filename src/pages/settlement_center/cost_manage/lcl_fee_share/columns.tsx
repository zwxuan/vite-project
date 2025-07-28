
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { OrderBillItemProps } from "@/types/settlement_center/business_manage/order_bill";
import {OrderFeeItemProps} from "@/types/settlement_center/business_manage/order_fee";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';


export const expandColumns: TableColumnsType<OrderFeeItemProps> = [
    {
        title: i18n.t(LocaleHelper.getOrdersBusinessId()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BusinessId',
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderFeeFeeName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FeeName',
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderBillIncomeExpenseType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'IncomeExpenseType',
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
    
  ];




import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { OrderBillItemProps,ExpandedDataType } from "@/types/order_bill/order_bill";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';



export const getColumns = (handleEdit: (record: OrderBillItemProps) => void, handleDelete: (record: OrderBillItemProps) => void): TableColumnsType<OrderBillItemProps> => [

    {
        title: i18n.t(LocaleHelper.getOrderBillBillNumber()),
        width: 100,
        dataIndex: 'BillNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderBillSettlementObject()),
        width: 100,
        dataIndex: 'SettlementObject',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderBillSettlementAgent()),
        width: 100,
        dataIndex: 'SettlementAgent',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderBillInvoiceTitle()),
        width: 100,
        dataIndex: 'InvoiceTitle',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderBillCurrency()),
        width: 100,
        dataIndex: 'Currency',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderBillAmount()),
        width: 100,
        dataIndex: 'Amount',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getOrderBillCurrencyTotal()),
        width: 100,
        dataIndex: 'CurrencyTotal',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getOrderBillIncomeExpenseType()),
        width: 100,
        dataIndex: 'IncomeExpenseType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderBillStatus()),
        width: 100,
        dataIndex: 'Status',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderBillInvoiceStatus()),
        width: 100,
        dataIndex: 'InvoiceStatus',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderBillVerificationStatus()),
        width: 100,
        dataIndex: 'VerificationStatus',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderBillReconciliationNumber()),
        width: 100,
        dataIndex: 'ReconciliationNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderBillCounterpartBillNumber()),
        width: 100,
        dataIndex: 'CounterpartBillNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderBillInvoiceType()),
        width: 100,
        dataIndex: 'InvoiceType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderBillInvoiceCategory()),
        width: 100,
        dataIndex: 'InvoiceCategory',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderBillCreator()),
        width: 100,
        dataIndex: 'Creator',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderBillBillConfirmationTime()),
        width: 100,
        dataIndex: 'BillConfirmationTime',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getOrderBillBillDueDate()),
        width: 100,
        dataIndex: 'BillDueDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getOrderBillBillConfirmer()),
        width: 100,
        dataIndex: 'BillConfirmer',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderBillIsConfirmed()),
        width: 100,
        dataIndex: 'IsConfirmed',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getOrderBillBillReviewStatus()),
        width: 100,
        dataIndex: 'BillReviewStatus',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderBillBillReviewer()),
        width: 100,
        dataIndex: 'BillReviewer',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderBillBillReviewTime()),
        width: 100,
        dataIndex: 'BillReviewTime',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getOrderBillBillSettlementType()),
        width: 100,
        dataIndex: 'BillSettlementType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderBillApprovalStatus()),
        width: 100,
        dataIndex: 'ApprovalStatus',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderBillIsVoid()),
        width: 100,
        dataIndex: 'IsVoid',
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
            <a onClick={()=>handleEdit(record)}>编辑</a>
            <Popconfirm title="确定要删除吗?" cancelText="取消" okText="确定" onConfirm={() => handleDelete(record)}>
                <a>删除</a>
            </Popconfirm>
        </>
        ),
    },
]; 


export const expandColumns: TableColumnsType<ExpandedDataType> = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Status',
      key: 'state',
    },
    { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    {
      title: 'Action',
      key: 'operation',
    },
  ];


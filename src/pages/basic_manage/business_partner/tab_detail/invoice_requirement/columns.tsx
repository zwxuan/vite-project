
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { InvoiceRequirementItemProps } from "@/types/basic_manage/invoice_requirement";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: InvoiceRequirementItemProps) => void, handleDelete: (record: InvoiceRequirementItemProps) => void): TableColumnsType<InvoiceRequirementItemProps> => [

    {
        title: i18n.t(LocaleHelper.getInvoiceRequirementCustomerNo()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CustomerNo',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getInvoiceRequirementTaxpayerId()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'TaxpayerId',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getInvoiceRequirementInvoiceAddress()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'InvoiceAddress',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getInvoiceRequirementPhone()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Phone',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getInvoiceRequirementIsDefault()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'IsDefault',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getInvoiceRequirementBankAccount()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BankAccount',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getInvoiceRequirementBillingHeadBank()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BillingHeadBank',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getInvoiceRequirementCustomerEmail()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CustomerEmail',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getInvoiceRequirementSystemAutoPush()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SystemAutoPush',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getInvoiceRequirementSystemAutoSendTarget()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SystemAutoSendTarget',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getInvoiceRequirementTaxControlPlatformSend()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'TaxControlPlatformSend',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getInvoiceRequirementTaxControlPlatformSendTarget()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'TaxControlPlatformSendTarget',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getInvoiceRequirementOperation()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Operation',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getInvoiceRequirementInvoiceType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'InvoiceType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getInvoiceRequirementInvoiceKind()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'InvoiceKind',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getInvoiceRequirementDomesticOrAbroad()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'DomesticOrAbroad',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getInvoiceRequirementApplicableWhtTax()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ApplicableWhtTax',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getInvoiceRequirementBillingRequirements()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BillingRequirements',
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


import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { PhysicalInvoiceItemProps } from "@/types/cost_manage/physical_invoice/physical_invoice";
import i18n from '@/i18n';
// import LocaleHelper from '@/utils/localeHelper';
import LocaleHelper from '@/utils/locale';

export const getColumns = (handleEdit: (record: PhysicalInvoiceItemProps) => void, handleDelete: (record: PhysicalInvoiceItemProps) => void): TableColumnsType<PhysicalInvoiceItemProps> => [

    {
        title: i18n.t(LocaleHelper.getPhysicalInvoiceInvoiceSerialNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'InvoiceSerialNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getPhysicalInvoiceInvoiceType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'InvoiceType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getPhysicalInvoicePurchaserName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'PurchaserName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getPhysicalInvoicePurchaserTaxNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'PurchaserTaxNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getPhysicalInvoiceInvoiceCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'InvoiceCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getPhysicalInvoiceInvoiceNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'InvoiceNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getPhysicalInvoiceInvoiceDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'InvoiceDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getPhysicalInvoiceSellerName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SellerName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getPhysicalInvoiceSellerTaxNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SellerTaxNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getPhysicalInvoiceTotalAmount()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'TotalAmount',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getPhysicalInvoiceFileName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FileName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getPhysicalInvoiceFilePath()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FilePath',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getPhysicalInvoiceDownloadCount()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'DownloadCount',
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


import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { OrderDocumentItemProps } from "@/types/business_manage/order_document";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';



export const getColumns = (handleEdit: (record: OrderDocumentItemProps) => void, handleDelete: (record: OrderDocumentItemProps) => void): TableColumnsType<OrderDocumentItemProps> => [

    {
        title: i18n.t(LocaleHelper.getOrderDocumentFileName()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FileName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderDocumentVersion()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Version',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderDocumentFileType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FileType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderDocumentFileFormat()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FileFormat',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderDocumentFileSize()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FileSize',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getOrderDocumentCreatedBy()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CreatedBy',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderDocumentCreatedDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CreatedDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getOrderDocumentFileSource()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FileSource',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderDocumentAttributeDetails()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'AttributeDetails',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderDocumentSyncStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SyncStatus',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderDocumentExternalFileType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ExternalFileType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getOrderDocumentLastSyncTime()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'LastSyncTime',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getOrderDocumentOperation()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Operation',
        sorter: true,
        align: 'left',
    },
    {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 60,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        render: (_, record) => (
        <>
            <a>预览</a>
            <Popconfirm title="确定要删除吗?" cancelText="取消" okText="确定" onConfirm={() => handleDelete(record)}>
                <a>删除</a>
            </Popconfirm>
        </>
        ),
    },
]; 


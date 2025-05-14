
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { VoucherLogItemProps } from "@/types/finance_manage/voucher_log/voucher_log";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: VoucherLogItemProps) => void, handleDelete: (record: VoucherLogItemProps) => void): TableColumnsType<VoucherLogItemProps> => [

    {
        title: i18n.t(LocaleHelper.getVoucherLogVoucherSerialNo()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'VoucherSerialNo',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherLogVoucherNo()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'VoucherNo',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherLogVoucherType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'VoucherType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherLogVoucherDebitCreditTotal()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'VoucherDebitCreditTotal',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherLogVoucherStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'VoucherStatus',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherLogVoucherDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'VoucherDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherLogVoucherStatus2()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'VoucherStatus2',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherLogCounterpartyVoucherNo()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CounterpartyVoucherNo',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherLogDebitAmount()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'DebitAmount',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherLogCreditAmount()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CreditAmount',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherLogSendStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SendStatus',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherLogDeleteStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'DeleteStatus',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherLogCreator()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Creator',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherLogCreateDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CreateDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherLogSender()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Sender',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherLogSendDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SendDate',
        sorter: true,
        align: 'center',
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

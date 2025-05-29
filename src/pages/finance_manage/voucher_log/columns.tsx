
import { TableColumnsType, Tag, Popconfirm, Tooltip } from 'antd';
import { VoucherLogItemProps } from "@/types/finance_manage/voucher_log";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { VoucherDetailItemProps } from '@/types/finance_manage/voucher_log/voucher_detail';



export const getColumns = (handleEdit: (record: VoucherLogItemProps) => void, handleDelete: (record: VoucherLogItemProps) => void): TableColumnsType<VoucherLogItemProps> => [

    {
        title: i18n.t(LocaleHelper.getVoucherLogVoucherSerialNo()),
        width: 120,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'VoucherSerialNo',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherLogVoucherNo()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'VoucherNo',
        sorter: true,
        align: 'left',
        render: (text: string) => {
            return <Tooltip
                title={
                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                            {text && typeof text === 'string' && text.split(/[\uff0c,，]/).map((item, index) => (
                                <li key={index} style={{ marginBottom: '10px' }}>{item.trim()}</li>
                            ))}
                        </ol>
                    </div>
                }
                color='white'>
                <div style={{ maxWidth: '200px', whiteSpace: 'nowrap', wordWrap: 'break-word', wordBreak: 'break-word', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>
            </Tooltip>

        },
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
        width: 160,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'VoucherDebitCreditTotal',
        sorter: true,
        align: 'left',
        render: (text: string) => {
            return <Tooltip
                title={
                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                            {text && typeof text === 'string' && text.split(/[\uff0c,，]/).map((item, index) => (
                                <li key={index} style={{ marginBottom: '10px' }}>{item.trim()}</li>
                            ))}
                        </ol>
                    </div>
                }
                color='white'>
                <div style={{ maxWidth: '200px', whiteSpace: 'nowrap', wordWrap: 'break-word', wordBreak: 'break-word', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>
            </Tooltip>

        },
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
        width: 40,
        render: (_, record) => (
        <>
            <a onClick={()=>handleEdit(record)}>查看</a>
            <Popconfirm title="确定要删除吗?" cancelText="取消" okText="确定" onConfirm={() => handleDelete(record)}>
                <a>删除</a>
            </Popconfirm>
        </>
        ),
    },
]; 


export const getVoucherDetailColumns = (): TableColumnsType<VoucherDetailItemProps> => [

    {
        title: i18n.t(LocaleHelper.getVoucherDetailId()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Id',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherDetailSummary()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Summary',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherDetailSubjectCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SubjectCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherDetailSubjectName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SubjectName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherDetailCurrency()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Currency',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherDetailOriginalAmount()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'OriginalAmount',
        sorter: true,
        align: 'right',
        render: (text:any) => (
            new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(text)
        ),
    },
    {
        title: i18n.t(LocaleHelper.getVoucherDetailExchangeRate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ExchangeRate',
        sorter: true,
        align: 'right',
        render: (text:any) => (
            new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(text)
        ),
    },
    {
        title: i18n.t(LocaleHelper.getVoucherDetailDebitAmount()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'DebitAmount',
        sorter: true,
        align: 'right',
        render: (text:any) => (
            new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(text)
        ),
    },
    {
        title: i18n.t(LocaleHelper.getVoucherDetailCreditAmount()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CreditAmount',
        sorter: true,
        align: 'right',
        render: (text:any) => (
            new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(text)
        ),
    },
    {
        title: i18n.t(LocaleHelper.getVoucherDetailDocumentNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'DocumentNumber',
        sorter: true,
        align: 'left',
    },
]; 


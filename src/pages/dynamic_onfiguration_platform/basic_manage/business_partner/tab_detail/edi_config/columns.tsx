
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { EdiConfigItemProps } from "@/types/dynamic_onfiguration_platform/basic_manage/edi_config";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: EdiConfigItemProps) => void, handleDelete: (record: EdiConfigItemProps) => void): TableColumnsType<EdiConfigItemProps> => [

    {
        title: i18n.t(LocaleHelper.getEdiConfigId()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Id',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEdiConfigBranchOffice()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BranchOffice',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEdiConfigEdiSenderCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'EdiSenderCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEdiConfigEdiReceiverCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'EdiReceiverCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEdiConfigCnCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CnCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEdiConfigBookingAgent()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BookingAgent',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEdiConfigBookingPersonCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BookingPersonCode',
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

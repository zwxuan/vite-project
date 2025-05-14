
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { VoucherTypeItemProps } from "@/types/basic_manage/voucher_type/voucher_type";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: VoucherTypeItemProps) => void, handleDelete: (record: VoucherTypeItemProps) => void): TableColumnsType<VoucherTypeItemProps> => [

    {
        title: i18n.t(LocaleHelper.getVoucherTypeTypeCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'TypeCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherTypeBookName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BookName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherTypeTypeName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'TypeName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherTypeTypeShortName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'TypeShortName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherTypeTypeRemark()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'TypeRemark',
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

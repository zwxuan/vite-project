
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { CustomerTypeItemProps } from "@/types/basic_manage/customer_type";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: CustomerTypeItemProps) => void, handleDelete: (record: CustomerTypeItemProps) => void): TableColumnsType<CustomerTypeItemProps> => [

    {
        title: i18n.t(LocaleHelper.getCustomerTypeCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Code',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getCustomerTypeChineseName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ChineseName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getCustomerTypeEnglishName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'EnglishName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getCustomerTypeRemark()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Remark',
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

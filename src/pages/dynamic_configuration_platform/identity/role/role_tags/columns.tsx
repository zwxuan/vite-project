
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { RoleTagsItemProps } from "@/types/dynamic_configuration_platform/identity/role_tags";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: RoleTagsItemProps) => void, handleDelete: (record: RoleTagsItemProps) => void): TableColumnsType<RoleTagsItemProps> => [

    {
        title: i18n.t(LocaleHelper.getRoleTagsTagCode()),
        width: 260,
        onHeaderCell: () => ({ style: { width: '260px' } }),
        dataIndex: 'TagCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getRoleTagsTagName()),
        dataIndex: 'TagName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getRoleTagsStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Status',
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

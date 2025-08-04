
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { RoleGroupItemProps } from "@/types/dynamic_configuration_platform/identity/role_group";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: RoleGroupItemProps) => void, handleDelete: (record: RoleGroupItemProps) => void,handleAssignRole: (record: RoleGroupItemProps) => void): TableColumnsType<RoleGroupItemProps> => [


    {
        title: i18n.t(LocaleHelper.getRoleGroupRoleGroupCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RoleGroupCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getRoleGroupRoleGroupName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RoleGroupName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getRoleGroupStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Status',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getRoleGroupRoleType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RoleType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getRoleGroupIncludedRoles()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'IncludedRoles',
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
            <a onClick={()=>handleAssignRole(record)}>分配角色</a>
            <Popconfirm title="确定要删除吗?" cancelText="取消" okText="确定" onConfirm={() => handleDelete(record)}>
                <a>删除</a>
            </Popconfirm>
        </>
        ),
    },
]; 

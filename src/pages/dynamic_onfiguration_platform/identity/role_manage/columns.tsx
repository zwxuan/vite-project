
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { RoleManageItemProps } from "@/types/dynamic_onfiguration_platform/identity/role_manage";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { NavLink } from 'react-router-dom';



export const getColumns = (handleEdit: (record: RoleManageItemProps) => void, handleDelete: (record: RoleManageItemProps) => void): TableColumnsType<RoleManageItemProps> => [

    {
        title: i18n.t(LocaleHelper.getRoleManageRoleCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RoleCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getRoleManageRoleName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RoleName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getRoleManageManageOrg()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ManageOrg',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getRoleManageSystemRole()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SystemRole',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getRoleManageStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Status',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getRoleManageRoleType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RoleType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getRoleManageRoleTag()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RoleTag',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getRoleManageRoleDesc()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RoleDesc',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getRoleManageRoleGroup()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RoleGroup',
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
            <NavLink to={`/role/role_manage/detail?roleCode=${record.RoleCode}`}>详情</NavLink>
            <Popconfirm title="确定要删除吗?" cancelText="取消" okText="确定" onConfirm={() => handleDelete(record)}>
                <a>删除</a>
            </Popconfirm>
        </>
        ),
    },
]; 

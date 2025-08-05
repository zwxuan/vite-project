
import { TableColumnsType, Tag, Popconfirm, Input, Select } from 'antd';
import { DataPermissionItemProps, RoleManageItemProps } from "@/types/dynamic_configuration_platform/identity/role_manage";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { NavLink } from 'react-router-dom';
import DatePickerZH from '@/components/date-picker';
import moment from 'moment';
import { EmployeeManageItemProps } from '@/types/dynamic_configuration_platform/org_manage/employee_manage';



export const getColumnsLeft = (): TableColumnsType<RoleManageItemProps> => [

    {
        title: i18n.t(LocaleHelper.getRoleManageRoleCode()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'RoleCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getRoleManageRoleName()),
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
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (_, record) => (
        <>
            <a>分配用户</a>
            <a>复制</a>
            <a>粘贴</a>
        </>
        ),
    },
]; 

export const getColumnsRight = (): TableColumnsType<RoleManageItemProps> => [

    {
        title: i18n.t(LocaleHelper.getRoleManageRoleCode()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'RoleCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getRoleManageRoleName()),
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
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 40,
        render: (_, record) => (
        <>
            <a>删除</a>
        </>
        ),
    },
];

export const getEmoloyeeColumnsRight = (handleEdit: (record: EmployeeManageItemProps) => void, handleDelete: (record: EmployeeManageItemProps) => void): TableColumnsType<EmployeeManageItemProps> => [

    {
        title: i18n.t(LocaleHelper.getEmployeeManageEmployeeCode()),
        width: 120,
        onHeaderCell: () => ({ style: { width: '120px' } }),
        dataIndex: 'EmployeeCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEmployeeManageEmployeeName()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'EmployeeName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEmployeeManageOrganization()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'Organization',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEmployeeManageDepartment()),
        dataIndex: 'Department',
        sorter: true,
        align: 'left',
    },
    {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 40,
        render: (_, record) => (
        <>
            <Popconfirm title="确定要删除吗?" cancelText="取消" okText="确定" onConfirm={() => handleDelete(record)}>
                <a>删除</a>
            </Popconfirm>
        </>
        ),
    },
]; 

export const getEmoloyeeColumnsLeft = (handleEdit: (record: EmployeeManageItemProps) => void, handleDelete: (record: EmployeeManageItemProps) => void): TableColumnsType<EmployeeManageItemProps> => [

    {
        title: i18n.t(LocaleHelper.getEmployeeManageEmployeeCode()),
        width: 120,
        onHeaderCell: () => ({ style: { width: '120px' } }),
        dataIndex: 'EmployeeCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEmployeeManageEmployeeName()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'EmployeeName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEmployeeManageOrganization()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'Organization',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEmployeeManageDepartment()),
        dataIndex: 'Department',
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
            <a>分配角色</a>
            <a>复制</a>
            <a>粘贴</a>
        </>
        ),
    },
]; 
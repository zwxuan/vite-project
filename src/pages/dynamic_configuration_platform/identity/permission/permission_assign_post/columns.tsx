
import { TableColumnsType, Tag, Popconfirm, Input, Select } from 'antd';
import { DataPermissionItemProps, RoleManageItemProps } from "@/types/dynamic_configuration_platform/identity/role_manage";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { NavLink } from 'react-router-dom';
import DatePickerZH from '@/components/date-picker';
import moment from 'moment';
import { JobPositionItemProps } from '@/types/dynamic_configuration_platform/org_manage/job_position';



export const getColumnsLeft = (handleAssignEmployee: (record: RoleManageItemProps) => void): TableColumnsType<RoleManageItemProps> => [
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
            <a onClick={() => handleAssignEmployee(record)}>分配岗位</a>
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

export const getJobPositionColumnsLeft = (handleAssignRole: (record: JobPositionItemProps) => void, handleDelete: (record: JobPositionItemProps) => void): TableColumnsType<JobPositionItemProps> => [

    {
        title: i18n.t(LocaleHelper.getJobPositionJobCode()),
        width: 120,
        onHeaderCell: () => ({ style: { width: '120px' } }),
        dataIndex: 'JobCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getJobPositionJobName()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'JobName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getJobPositionDeptBelong()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'DeptBelong',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getJobPositionJobDuty()),
        dataIndex: 'JobDuty',
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
            <a onClick={() => handleAssignRole(record)}>分配角色</a>
            <a>复制</a>
            <a>粘贴</a>
        </>
        ),
    },
];
export const getJobPositionColumnsRight = (handleEdit: (record: JobPositionItemProps) => void, handleDelete: (record: JobPositionItemProps) => void): TableColumnsType<JobPositionItemProps> => [

    {
        title: i18n.t(LocaleHelper.getJobPositionJobCode()),
        width: 120,
        onHeaderCell: () => ({ style: { width: '120px' } }),
        dataIndex: 'JobCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getJobPositionJobName()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'JobName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getJobPositionDeptBelong()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'DeptBelong',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getJobPositionJobDuty()),
        dataIndex: 'JobDuty',
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


export const getAssignJobPositionColumnsLeft = (): TableColumnsType<JobPositionItemProps> => [

    {
        title: i18n.t(LocaleHelper.getJobPositionJobCode()),
        width: 120,
        onHeaderCell: () => ({ style: { width: '120px' } }),
        dataIndex: 'JobCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getJobPositionJobName()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'JobName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getJobPositionDeptBelong()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'DeptBelong',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getJobPositionJobDuty()),
        dataIndex: 'JobDuty',
        sorter: true,
        align: 'left',
    },
];

export const getAssignJobPositionColumnsRight = (handleDelete: (record: JobPositionItemProps) => void): TableColumnsType<JobPositionItemProps> => [

    {
        title: i18n.t(LocaleHelper.getJobPositionJobCode()),
        width: 120,
        onHeaderCell: () => ({ style: { width: '120px' } }),
        dataIndex: 'JobCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getJobPositionJobName()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'JobName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getJobPositionDeptBelong()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'DeptBelong',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getJobPositionJobDuty()),
        dataIndex: 'JobDuty',
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
            <a>移除</a>
        </>
        ),
    },
];
 
export const getAssignRoleColumnsLeft = (): TableColumnsType<RoleManageItemProps> => [
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
];

export const getAssignRoleColumnsRight = (handleDelete: (record: RoleManageItemProps) => void): TableColumnsType<RoleManageItemProps> => [

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
            <a>移除</a>
        </>
        ),
    },
];
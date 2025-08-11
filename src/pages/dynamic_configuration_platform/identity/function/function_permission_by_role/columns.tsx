
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { FunctionPermissionByRoleItemProps } from "@/types/dynamic_configuration_platform/identity/function_permission_by_role";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: FunctionPermissionByRoleItemProps) => void, handleDelete: (record: FunctionPermissionByRoleItemProps) => void): TableColumnsType<FunctionPermissionByRoleItemProps> => [

    {
        title: i18n.t(LocaleHelper.getFunctionPermissionByRoleRoleCode()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'RoleCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFunctionPermissionByRoleRoleName()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'RoleName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFunctionPermissionByRoleAppName()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'AppName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFunctionPermissionByRoleMenuFullPath()),
        dataIndex: 'MenuFullPath',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFunctionPermissionByRoleFunctionName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FunctionName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFunctionPermissionByRoleBelongOrg()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'BelongOrg',
        sorter: true,
        align: 'left',
    },
]; 

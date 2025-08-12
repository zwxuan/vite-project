
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { FunctionPermissionByUserItemProps } from "@/types/dynamic_configuration_platform/identity/function_permission_by_user";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: FunctionPermissionByUserItemProps) => void, handleDelete: (record: FunctionPermissionByUserItemProps) => void): TableColumnsType<FunctionPermissionByUserItemProps> => [

    {
        title: i18n.t(LocaleHelper.getFunctionPermissionByUserUserCode()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'UserCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFunctionPermissionByUserUserName()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'UserName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFunctionPermissionByUserPositionName()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'PositionName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFunctionPermissionByUserRoleName()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'RoleName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFunctionPermissionByUserAppName()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'AppName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFunctionPermissionByUserMenuFullPath()),
        dataIndex: 'MenuFullPath',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getFunctionPermissionByUserFunctionName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FunctionName',
        sorter: true,
        align: 'left',
    },
    
]; 


import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { SysLoginLogItemProps } from "@/types/dynamic_configuration_platform/system_manage/sys_login_log";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: SysLoginLogItemProps) => void, handleDelete: (record: SysLoginLogItemProps) => void): TableColumnsType<SysLoginLogItemProps> => [

    {
        title: i18n.t(LocaleHelper.getSysLoginLogUserCode()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'UserCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysLoginLogUserName()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'UserName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysLoginLogOperation()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'Operation',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysLoginLogIpAddress()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'IpAddress',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysLoginLogLoginTime()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'LoginTime',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getSysLoginLogLoginDevice()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'LoginDevice',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysLoginLogStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Status',
        sorter: true,
        align: 'left',
    },
    {
        title: '',
        dataIndex: '',
        sorter: true,
        align: 'left',
    },
]; 

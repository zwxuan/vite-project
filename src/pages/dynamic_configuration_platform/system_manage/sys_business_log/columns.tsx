
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { SysBusinessLogItemProps } from "@/types/dynamic_configuration_platform/system_manage/sys_business_log";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: SysBusinessLogItemProps) => void, handleDelete: (record: SysBusinessLogItemProps) => void): TableColumnsType<SysBusinessLogItemProps> => [

    {
        title: i18n.t(LocaleHelper.getSysBusinessLogUserCode()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'UserCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysBusinessLogUserName()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'UserName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysBusinessLogDomain()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'Domain',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysBusinessLogApplication()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'Application',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysBusinessLogService()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'Service',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysBusinessLogLogType()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'LogType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysBusinessLogOperationCat()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'OperationCat',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysBusinessLogObjectCode()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'ObjectCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysBusinessLogObjectName()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'ObjectName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysBusinessLogIpAddress()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'IpAddress',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysBusinessLogLogTime()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'LogTime',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getSysBusinessLogStatus()),
        dataIndex: 'Status',
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
            <a onClick={()=>handleEdit(record)}>详情</a>
        </>
        ),
    },
]; 


import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { SysOperatorLogItemProps } from "@/types/dynamic_configuration_platform/system_manage/sys_operator_log";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: SysOperatorLogItemProps) => void, handleDelete: (record: SysOperatorLogItemProps) => void): TableColumnsType<SysOperatorLogItemProps> => [

    {
        title: i18n.t(LocaleHelper.getSysOperatorLogUserCode()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'UserCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysOperatorLogUserName()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'UserName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysOperatorLogDomain()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'Domain',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysOperatorLogApplication()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'Application',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysOperatorLogService()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'Service',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysOperatorLogOperationBtn()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'OperationBtn',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysOperatorLogIpAddress()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'IpAddress',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysOperatorLogOperateTime()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'OperateTime',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getSysOperatorLogOperateDevice()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'OperateDevice',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysOperatorLogStatus()),
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

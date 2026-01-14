
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { SysOperatorLogReportItemProps } from "@/types/dynamic_configuration_platform/system_manage/sys_operator_log_report";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: SysOperatorLogReportItemProps) => void, handleDelete: (record: SysOperatorLogReportItemProps) => void): TableColumnsType<SysOperatorLogReportItemProps> => [

    {
        title: i18n.t(LocaleHelper.getSysOperatorLogReportDepartment()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'Department',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysOperatorLogReportUserName()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'UserName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysOperatorLogReportApplication()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'Application',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysOperatorLogReportService()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'Service',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysOperatorLogReportOperateDevice()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'OperateDevice',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysOperatorLogReportVisitCount()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'VisitCount',
        sorter: true,
        align: 'right',
    },
    {
        title: '',
        dataIndex: '',
        sorter: true,
        align: 'left',
    },
]; 

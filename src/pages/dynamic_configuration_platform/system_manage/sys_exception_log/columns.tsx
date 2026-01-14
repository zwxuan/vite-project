
import { TableColumnsType, Tag, Popconfirm, Tooltip } from 'antd';
import { SysExceptionLogItemProps } from "@/types/dynamic_configuration_platform/system_manage/sys_exception_log";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: SysExceptionLogItemProps) => void, handleDelete: (record: SysExceptionLogItemProps) => void): TableColumnsType<SysExceptionLogItemProps> => [

    {
        title: i18n.t(LocaleHelper.getSysExceptionLogUserCode()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'UserCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysExceptionLogUserName()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'UserName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysExceptionLogDomain()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'Domain',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysExceptionLogApplication()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'Application',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysExceptionLogService()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'Service',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysExceptionLogExceptionLvl()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ExceptionLvl',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysExceptionLogExceptionMsg()),
        width: 300,
        onHeaderCell: () => ({ style: { width: '300px' } }),
        dataIndex: 'ExceptionMsg',
        sorter: true,
        align: 'left',
        render: (text: string) => {
            return <Tooltip
                title={
                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                            {text && typeof text === 'string' && text.split(/[\uff0c,，]/).map((item, index) => (
                                <li key={index} style={{ marginBottom: '10px' }}>{item.trim()}</li>
                            ))}
                        </ol>
                    </div>
                }
                color='white'>
                <div style={{ maxWidth: '300px', whiteSpace: 'nowrap', wordWrap: 'break-word', wordBreak: 'break-word', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>
            </Tooltip>

        },
    },
    {
        title: i18n.t(LocaleHelper.getSysExceptionLogRequestUrl()),
        width: 260,
        onHeaderCell: () => ({ style: { width: '260px' } }),
        dataIndex: 'RequestUrl',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysExceptionLogRequestParam()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'RequestParam',
        sorter: true,
        align: 'left',
        render: (text: string) => {
            return <Tooltip
                title={
                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                            {text && typeof text === 'string' && text.split(/[\uff0c,，]/).map((item, index) => (
                                <li key={index} style={{ marginBottom: '10px' }}>{item.trim()}</li>
                            ))}
                        </ol>
                    </div>
                }
                color='white'>
                <div style={{ maxWidth: '300px', whiteSpace: 'nowrap', wordWrap: 'break-word', wordBreak: 'break-word', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>
            </Tooltip>

        },
    },
    {
        title: i18n.t(LocaleHelper.getSysExceptionLogRequestHeader()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'RequestHeader',
        sorter: true,
        align: 'left',
        render: (text: string) => {
            return <Tooltip
                title={
                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                            {text && typeof text === 'string' && text.split(/[\uff0c,，]/).map((item, index) => (
                                <li key={index} style={{ marginBottom: '10px' }}>{item.trim()}</li>
                            ))}
                        </ol>
                    </div>
                }
                color='white'>
                <div style={{ maxWidth: '300px', whiteSpace: 'nowrap', wordWrap: 'break-word', wordBreak: 'break-word', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>
            </Tooltip>

        },
    },
    {
        title: i18n.t(LocaleHelper.getSysExceptionLogIpAddress()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'IpAddress',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysExceptionLogExceptionTime()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'ExceptionTime',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getSysExceptionLogOperateDevice()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'OperateDevice',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysExceptionLogStatus()),
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
            <a onClick={()=>handleEdit(record)}>详细</a>
        </>
        ),
    },
]; 

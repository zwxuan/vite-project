
import { TableColumnsType, Tag, Popconfirm, Input, Checkbox, Select } from 'antd';
import { SysWarningTaskCronProps, SysWarningTaskItemProps, SysWarningTaskReviceMessageProps } from "@/types/dynamic_configuration_platform/system_manage/sys_warning_task";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { SysWarningTypeParamItemProps } from '@/types/dynamic_configuration_platform/system_manage/sys_warning_type';



export const getColumns = (handleEdit: (record: SysWarningTaskItemProps) => void, handleDelete: (record: SysWarningTaskItemProps) => void): TableColumnsType<SysWarningTaskItemProps> => [

    {
        title: i18n.t(LocaleHelper.getSysWarningTaskAppCode()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'AppCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysWarningTaskTaskCode()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'TaskCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysWarningTaskTaskName()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'TaskName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysWarningTaskWarningType()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'WarningType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysWarningTaskStatus()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'Status',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysWarningTaskSuccessCnt()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'SuccessCnt',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getSysWarningTaskFailCnt()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'FailCnt',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getSysWarningTaskTaskRemark()),
        dataIndex: 'TaskRemark',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysWarningTaskCreatedTime()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'CreatedTime',
        sorter: true,
        align: 'center',
    },
    {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (_, record) => (
        <>
            <a>{record.Status === '已启用' ? '停用' : '启用'}</a>
            <a onClick={()=>handleEdit(record)}>详情</a>
            <Popconfirm title="确定要删除吗?" cancelText="取消" okText="确定" onConfirm={() => handleDelete(record)}>
                <a>删除</a>
            </Popconfirm>
        </>
        ),
    },
]; 

export const getMessageReviceColumns = (): TableColumnsType<SysWarningTaskReviceMessageProps> => [
    {
        title: i18n.t(LocaleHelper.getSeqNo()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'SeqNo',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getReceiveType()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'ReceiveType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getReceiveObject()),
        width: 460,
        onHeaderCell: () => ({ style: { width: '460px' } }),
        dataIndex: 'ReceiveObject',
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

export const getSysWarningTypeParamColumns = (handleEdit: (record: SysWarningTypeParamItemProps) => void, handleDelete: (record: SysWarningTypeParamItemProps) => void, handleSave: (record: SysWarningTypeParamItemProps) => void, handleCancel: () => void, editingKey:string): TableColumnsType<SysWarningTypeParamItemProps> => [

    {
        title: i18n.t(LocaleHelper.getSeqNo()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SeqNo',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysWarningTypeParamParamName()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'ParamName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysWarningTypeParamParamCode()),
        width: 260,
        onHeaderCell: () => ({ style: { width: '260px' } }),
        dataIndex: 'ParamCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysWarningTypeParamDataType()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'DataType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysWarningTypeParamRequired()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Required',
        sorter: true,
        align: 'center',
        render: (text: string, record: SysWarningTypeParamItemProps) => {
            const editable = record.SeqNo===editingKey;
            const isChecked = record.Required === 'true';
            return  (
                <Checkbox
                    checked={isChecked}
                    disabled
                />
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getSysWarningTypeParamDefaultValue()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'DefaultValue',
        sorter: true,
        align: 'left',
        render: (text: string, record: SysWarningTypeParamItemProps) => {
            const editable = record.SeqNo===editingKey;
            return (
                <Input
                    style={{ width: '100%', textAlign: 'left' }}
                    defaultValue={record.DefaultValue}
                    onChange={e => record.DefaultValue = e.target.value}
                />
            ) ;
        }
    },
    {
        title: i18n.t(LocaleHelper.getSysWarningTypeParamParamDesc()),
        dataIndex: 'ParamDesc',
        sorter: true,
        align: 'left',
        render: (text: string, record: SysWarningTypeParamItemProps) => {
            const editable = record.SeqNo===editingKey;
            return editable ? (
                <Input
                    style={{ width: '100%', textAlign: 'left' }}
                    defaultValue={record.ParamDesc}
                    onChange={e => record.ParamDesc = e.target.value}
                />
            ) : (
                text
            );
        }
    }
];

export const getSysWarningTaskCronColumns = (handleEdit: (record: SysWarningTaskCronProps) => void, handleDelete: (record: SysWarningTaskCronProps) => void, handleSave: (record: SysWarningTaskCronProps) => void, handleCancel: () => void, editingKey:string): TableColumnsType<SysWarningTaskCronProps> => [

    {
        title: i18n.t(LocaleHelper.getSeqNo()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SeqNo',
        sorter: true,
        align: 'left',
        render: (text: string, record: SysWarningTaskCronProps) => {
            const editable = record.SeqNo===editingKey;
            return editable ? (
                <Input
                    style={{ width: '100%', textAlign: 'left' }}
                    defaultValue={record.SeqNo}
                    onChange={e => record.SeqNo = e.target.value}
                />
            ) : (
                text
            );
        }
    },
    {
        title: 'Cron',
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'Cron',
        sorter: true,
        align: 'left',
        render: (text: string, record: SysWarningTaskCronProps) => {
            const editable = record.SeqNo===editingKey;
            return editable ? (
                <Input
                    style={{ width: '100%', textAlign: 'left' }}
                    defaultValue={record.Cron}
                    onChange={e => record.Cron = e.target.value}
                />
            ) : (
                text
            );
        }
    },
    {
        title: 'Cron测试示例',
        dataIndex: 'TestCron',
        sorter: true,
        align: 'left',
        render: (text: string, record: SysWarningTaskCronProps) => {
            return (
                text
            );
        }
    },
    {
        title: '操作',
        dataIndex: 'operation',
        fixed: 'right',
        align:'center',
        width: 60,
        render: (_: any, record: SysWarningTaskCronProps) => {
            const editable = record.SeqNo===editingKey;
            return editable ? (
                <>
                    <i className="iconfont icon-queding" style={{fontSize:'10px',color:'#0073e1',marginRight:'3px',marginLeft:'6px'}} title='保存' onClick={() => handleSave(record)}></i>
                    <i className="iconfont icon-quxiao" style={{fontSize:'10px',color:'#0073e1',marginRight:'3px',marginLeft:'3px'}} title='取消' onClick={handleCancel}></i>
                </>
            ) : (
                <>
                    <i className="iconfont icon-bianji" style={{fontSize:'14px',color:'#EE0F39',marginRight:'3px',marginLeft:'3px'}} title='编辑' onClick={() => handleEdit(record)}></i>
                    <Popconfirm title="确定删除?" onConfirm={() => handleDelete(record)}>
                        <i className="iconfont icon-shanchu" style={{fontSize:'14px',color:'#EE0F39',marginRight:'3px',marginLeft:'3px'}} title='删除'></i>
                    </Popconfirm>
                </>
            );
        },
    },
];
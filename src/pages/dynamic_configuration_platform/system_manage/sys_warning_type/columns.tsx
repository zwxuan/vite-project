
import { TableColumnsType, Tag, Popconfirm, Select, Input, Checkbox } from 'antd';
import { SysWarningTypeItemProps, SysWarningTypeParamItemProps } from "@/types/dynamic_configuration_platform/system_manage/sys_warning_type";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: SysWarningTypeItemProps) => void, handleDelete: (record: SysWarningTypeItemProps) => void): TableColumnsType<SysWarningTypeItemProps> => [

    {
        title: i18n.t(LocaleHelper.getSysWarningTypeAppCode()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'AppCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysWarningTypeTypeCode()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'TypeCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysWarningTypeTypeName()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'TypeName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysWarningTypeTypeSchema()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'TypeSchema',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysWarningTypeReportCenter()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'ReportCenter',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysWarningTypeCreatedBy()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'CreatedBy',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSysWarningTypeCreatedTime()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'CreatedTime',
        sorter: true,
        align: 'center',
    },
    {
        title: '',
        dataIndex: '',
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
            <a>启用</a>
            <a onClick={()=>handleEdit(record)}>编辑</a>
            <Popconfirm title="确定要删除吗?" cancelText="取消" okText="确定" onConfirm={() => handleDelete(record)}>
                <a>删除</a>
            </Popconfirm>
        </>
        ),
    },
]; 


export const getSysWarningTypeParamColumns = (handleEdit: (record: SysWarningTypeParamItemProps) => void, handleDelete: (record: SysWarningTypeParamItemProps) => void, handleSave: (record: SysWarningTypeParamItemProps) => void, handleCancel: () => void, editingKey:string): TableColumnsType<SysWarningTypeParamItemProps> => [

    {
        title: i18n.t(LocaleHelper.getSysWarningTypeParamSeqNo()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SeqNo',
        sorter: true,
        align: 'left',
        render: (text: string, record: SysWarningTypeParamItemProps) => {
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
        title: i18n.t(LocaleHelper.getSysWarningTypeParamParamName()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'ParamName',
        sorter: true,
        align: 'left',
        render: (text: string, record: SysWarningTypeParamItemProps) => {
            const editable = record.SeqNo === editingKey;
            const routeOptions = [
                { value: '1', label: '海运事业部' },
                { value: '2', label: '空运事业部' },
                { value: '3', label: '铁运事业部' },
                { value: '4', label: '青岛分公司' },
            ];
            return editable ? (
                <Select
                    // value={editingRow?.IsControlled}
                    defaultValue={record.ParamName}
                    style={{ width: '100%',textAlign:'left' }}
                    onChange={(value) => record.ParamName = value }
                    options={routeOptions}
                />
            ) : (
                routeOptions.find(option => option.value === record.ParamName)?.label || text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getSysWarningTypeParamParamCode()),
        width: 260,
        onHeaderCell: () => ({ style: { width: '260px' } }),
        dataIndex: 'ParamCode',
        sorter: true,
        align: 'left',
        render: (text: string, record: SysWarningTypeParamItemProps) => {
            const editable = record.SeqNo === editingKey;
            const routeOptions = [
                { value: '1', label: '订舱部' },
                { value: '2', label: '操作部' },
                { value: '3', label: '销售部' },
            ];
            return editable ? (
                <Select
                    // value={editingRow?.IsControlled}
                    defaultValue={record.ParamCode}
                    style={{ width: '100%',textAlign:'left' }}
                    onChange={(value) => record.ParamCode = value }
                    options={routeOptions}
                />
            ) : (
                routeOptions.find(option => option.value === record.ParamCode)?.label || text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getSysWarningTypeParamDataType()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'DataType',
        sorter: true,
        align: 'left',
        render: (text: string, record: SysWarningTypeParamItemProps) => {
            const editable = record.SeqNo === editingKey;
            const routeOptions = [
                { value: 'string', label: '字符串' },
                { value: 'data', label: '日期' },
                { value: 'number', label: '数值' },
                { value: 'reference', label: '参照' },
            ];
            return editable ? (
                <Select
                    // value={editingRow?.IsControlled}
                    defaultValue={record.DataType}
                    style={{ width: '100%',textAlign:'left' }}
                    onChange={(value) => record.DataType = value }
                    options={routeOptions}
                />
            ) : (
                routeOptions.find(option => option.value === record.DataType)?.label || text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getSysWarningTypeParamValueRange()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'ValueRange',
        sorter: true,
        align: 'left',
        render: (text: string, record: SysWarningTypeParamItemProps) => {
            const editable = record.SeqNo===editingKey;
            return editable ? (
                <Input
                    style={{ width: '100%', textAlign: 'left' }}
                    defaultValue={record.ValueRange}
                    onChange={e => record.ValueRange = e.target.value}
                />
            ) : (
                text
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
            return editable ? (
                <Input
                    style={{ width: '100%', textAlign: 'left' }}
                    defaultValue={record.DefaultValue}
                    onChange={e => record.DefaultValue = e.target.value}
                />
            ) : (
                text
            );
        }
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
            return editable ? (
                <Checkbox
                    defaultChecked={isChecked}
                    onChange={e => record.Required = e.target.checked ? 'true' : 'false'}
                />
            ) : (
                <Checkbox
                    checked={isChecked}
                    disabled
                />
            );
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
    },
    {
        title: '操作',
        dataIndex: 'operation',
        fixed: 'right',
        align:'center',
        width: 60,
        render: (_: any, record: SysWarningTypeParamItemProps) => {
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
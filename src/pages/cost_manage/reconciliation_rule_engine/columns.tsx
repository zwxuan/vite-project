
import { TableColumnsType, Tag, Popconfirm, Input, Select, Button, InputNumber } from 'antd';
import { ReconciliationCompareFieldsItemProps,ReconciliationMatchFieldsItemProps,ReconciliationRuleEngineItemProps } from '@/types/fee_reconciliation/reconciliation_rule_engine';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const getRuleEngineColumns = (handleEdit: (record: ReconciliationRuleEngineItemProps) => void, handleDelete: (record: ReconciliationRuleEngineItemProps) => void, handleSave: (record: ReconciliationRuleEngineItemProps) => void, handleCancel: () => void, editingKey: string): TableColumnsType<ReconciliationRuleEngineItemProps> => [
    {
        title: i18n.t(LocaleHelper.getReconciliationRuleEngineCompanyName()),
        width: 180,
        onHeaderCell: () => ({ style: { width: '180px' } }),
        dataIndex: 'CompanyName',
        sorter: true,
        align: 'left',
        render: (text: string, record: ReconciliationRuleEngineItemProps) => {
            const editable = record.RowKey===editingKey;
            return editable ? (
                <Select
                    // value={record.CompanyName}
                    defaultValue={record.CompanyName}
                    style={{ width: '100%', textAlign: 'left' }}
                    onChange={value => record.CompanyName = value}
                    options={[
                        { value: '分公司一', label: '分公司一' },
                        { value: '分公司二', label: '分公司二' }
                    ]}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getReconciliationRuleEngineReconciliationRuleName()),
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ReconciliationRuleName',
        sorter: true,
        align: 'left',
        render: (text: boolean, record: ReconciliationRuleEngineItemProps) => {
            const editable = record.RowKey===editingKey;
            return editable ? (
                <Input
                    style={{ width: '100%', textAlign: 'left' }}
                    defaultValue={record.ReconciliationRuleName}
                    onChange={e => record.ReconciliationRuleName = e.target.value}
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
        width: 40,
        render: (_: any, record: ReconciliationRuleEngineItemProps) => {
            const editable = record.RowKey===editingKey;
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


export const getMatchFieldsColumns = (handleEdit: (record: ReconciliationMatchFieldsItemProps) => void, handleDelete: (record: ReconciliationMatchFieldsItemProps) => void, handleSave: (record: ReconciliationMatchFieldsItemProps) => void, handleCancel: () => void, editingKey:string): TableColumnsType<ReconciliationMatchFieldsItemProps> => [
    {
        title: i18n.t(LocaleHelper.getReconciliationRuleEngineMatchFieldsName()),
        
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'MatchFieldsName',
        sorter: true,
        align: 'left',
        render: (text: string, record: ReconciliationMatchFieldsItemProps) => {
            const editable = record.RowKey===editingKey;
            return editable ? (
                <Select
                    // value={editingRow?.MatchFieldsName}
                    defaultValue={record.MatchFieldsName}
                    style={{ width: '100%', textAlign: 'left' }}
                    onChange={value => record.MatchFieldsName = value}
                    options={[
                        { value: '字段1', label: '字段1' },
                        { value: '字段2', label: '字段2' }
                    ]}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getReconciliationRuleEngineMatchFieldRelation()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'MatchFieldRelation',
        sorter: true,
        align: 'left',
        render: (text: string, record: ReconciliationMatchFieldsItemProps) => {
            const editable = record.RowKey===editingKey;
            return editable ? (
                <Select
                    // value={editingRow?.MatchFieldRelation}
                    defaultValue={record.MatchFieldRelation}
                    style={{ width: '100%', textAlign: 'left' }}
                    onChange={value => record.MatchFieldRelation = value}
                    options={[
                        { value: '00001', label: '与' },
                        { value: '00002', label: '或' }
                    ]}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getReconciliationRuleEngineMatchFieldOrderBy()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'MatchFieldOrderBy',
        sorter: true,
        align: 'left',
        render: (text: boolean, record: ReconciliationMatchFieldsItemProps) => {
            const editable = record.RowKey===editingKey;
            return editable ? (
                <Input
                    // value={editingRow?.MatchFieldOrderBy}
                    defaultValue={record.MatchFieldOrderBy}
                    onChange={e => record.MatchFieldOrderBy = e.target.value}
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
        render: (_: any, record: ReconciliationMatchFieldsItemProps) => {
            const editable = record.RowKey===editingKey;
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

export const getCompareFieldsColumns = (handleEdit: (record: ReconciliationCompareFieldsItemProps) => void, handleDelete: (record: ReconciliationCompareFieldsItemProps) => void, handleSave: (record: ReconciliationCompareFieldsItemProps) => void, handleCancel: () => void, editingKey:string): TableColumnsType<ReconciliationCompareFieldsItemProps> => [
    {
        title: i18n.t(LocaleHelper.getReconciliationRuleEngineCompareFieldsName()),
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CompareFieldsName',
        sorter: true,
        align: 'left',
        render: (text: string, record: ReconciliationCompareFieldsItemProps) => {
            const editable = record.RowKey===editingKey;
            return editable ? (
                <Select
                    // value={editingRow?.CompareFieldsName}
                    defaultValue={record.CompareFieldsName}
                    style={{ width: '100%', textAlign: 'left' }}
                    onChange={value => record.CompareFieldsName = value}
                    options={[
                        { value: '00001', label: '字段1' },
                        { value: '00002', label: '字段2' }
                    ]}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getReconciliationRuleEngineCompareFieldRelation()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CompareFieldRelation',
        sorter: true,
        align: 'left',
        render: (text: string, record: ReconciliationCompareFieldsItemProps) => {
            const editable = record.RowKey===editingKey;
            return editable ? (
                <Select
                    // value={editingRow?.CompareFieldRelation}
                    defaultValue={record.CompareFieldRelation}
                    style={{ width: '100%', textAlign: 'left' }}
                    onChange={value => record.CompareFieldRelation = value}
                    options={[
                        { value: '00001', label: '与' },
                        { value: '00002', label: '或' }
                    ]}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getReconciliationRuleEngineCompareFieldOperator()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CompareFieldOperator',
        sorter: true,
        align: 'left',
        render: (text: boolean, record: ReconciliationCompareFieldsItemProps) => {
            const editable = record.RowKey===editingKey;
            return editable ? (
                <Input
                    // value={editingRow?.CompareFieldOperator}
                    defaultValue={record.CompareFieldOperator}
                    onChange={e => record.CompareFieldOperator = e.target.value}
                    // onChange={e => setEditingRow({ ...editingRow!, CompareFieldOperator: e.target.value })}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getReconciliationRuleEngineMatchFieldOrderBy()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CompareFieldOrderBy',
        sorter: true,
        align: 'left',
        render: (text: boolean, record: ReconciliationCompareFieldsItemProps) => {
            const editable = record.RowKey===editingKey;
            return editable ? (
                <Input
                    // value={editingRow?.CompareFieldOrderBy}
                    defaultValue={record.CompareFieldOrderBy}
                    onChange={e => record.CompareFieldOrderBy = e.target.value}
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
        width: 60,
        align:'center',
        render: (_: any, record: ReconciliationCompareFieldsItemProps) => {
            const editable = record.RowKey===editingKey;
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

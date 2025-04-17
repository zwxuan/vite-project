
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
        width: 60,
        render: (_: any, record: ReconciliationRuleEngineItemProps) => {
            const editable = record.RowKey===editingKey;
            return editable ? (
                <>
                    <a onClick={() => handleSave(record)}>保存</a>
                    <a onClick={handleCancel}>取消</a>
                </>
            ) : (
                <>
                    <a onClick={() => handleEdit(record)}>编辑</a>
                    <Popconfirm title="确定删除?" onConfirm={() => handleDelete(record)}>
                        <a>删除</a>
                    </Popconfirm>
                </>
            );
        },
    },
];


export const getMatchFieldsColumns = (handleEdit: (record: ReconciliationMatchFieldsItemProps) => void, handleDelete: (record: ReconciliationMatchFieldsItemProps) => void, handleSave: (record: ReconciliationMatchFieldsItemProps) => void, handleCancel: () => void, isEditing: (record: ReconciliationMatchFieldsItemProps) => boolean, editingRow: ReconciliationMatchFieldsItemProps | null, setEditingRow: (row: ReconciliationMatchFieldsItemProps | null) => void): TableColumnsType<ReconciliationMatchFieldsItemProps> => [
    {
        title: i18n.t(LocaleHelper.getReconciliationRuleEngineMatchFieldsName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'MatchFieldsName',
        sorter: true,
        align: 'left',
        render: (text: string, record: ReconciliationMatchFieldsItemProps) => {
            const editable = isEditing(record);
            return editable ? (
                <Select
                    value={editingRow?.MatchFieldsName}
                    style={{ width: '100%', textAlign: 'left' }}
                    onChange={value => setEditingRow({ ...editingRow!, MatchFieldsName: value })}
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
        title: i18n.t(LocaleHelper.getReconciliationRuleEngineMatchFieldRelation()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'MatchFieldRelation',
        sorter: true,
        align: 'left',
        render: (text: string, record: ReconciliationMatchFieldsItemProps) => {
            const editable = isEditing(record);
            return editable ? (
                <Select
                    value={editingRow?.MatchFieldRelation}
                    style={{ width: '100%', textAlign: 'left' }}
                    onChange={value => setEditingRow({ ...editingRow!, MatchFieldRelation: value })}
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
            const editable = isEditing(record);
            return editable ? (
                <Input
                    value={editingRow?.MatchFieldOrderBy}
                    onChange={e => setEditingRow({ ...editingRow!, MatchFieldOrderBy: e.target.value })}
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
        width: 80,
        render: (_: any, record: ReconciliationMatchFieldsItemProps) => {
            const editable = isEditing(record);
            return editable ? (
                <>
                    <a onClick={() => handleSave(editingRow!)}>保存</a>
                    <a onClick={handleCancel}>取消</a>
                </>
            ) : (
                <>
                    <a onClick={() => handleEdit(record)}>编辑</a>
                    <Popconfirm title="确定删除?" onConfirm={() => handleDelete(record)}>
                        <a>删除</a>
                    </Popconfirm>
                </>
            );
        },
    },
];

export const getCompareFieldsColumns = (handleEdit: (record: ReconciliationCompareFieldsItemProps) => void, handleDelete: (record: ReconciliationCompareFieldsItemProps) => void, handleSave: (record: ReconciliationCompareFieldsItemProps) => void, handleCancel: () => void, isEditing: (record: ReconciliationCompareFieldsItemProps) => boolean, editingRow: ReconciliationCompareFieldsItemProps | null, setEditingRow: (row: ReconciliationCompareFieldsItemProps | null) => void): TableColumnsType<ReconciliationCompareFieldsItemProps> => [
    {
        title: i18n.t(LocaleHelper.getReconciliationRuleEngineCompareFieldsName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CompareFieldsName',
        sorter: true,
        align: 'left',
        render: (text: string, record: ReconciliationCompareFieldsItemProps) => {
            const editable = isEditing(record);
            return editable ? (
                <Select
                    value={editingRow?.CompareFieldsName}
                    style={{ width: '100%', textAlign: 'left' }}
                    onChange={value => setEditingRow({ ...editingRow!, CompareFieldsName: value })}
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
            const editable = isEditing(record);
            return editable ? (
                <Select
                    value={editingRow?.CompareFieldRelation}
                    style={{ width: '100%', textAlign: 'left' }}
                    onChange={value => setEditingRow({ ...editingRow!, CompareFieldRelation: value })}
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
            const editable = isEditing(record);
            return editable ? (
                <Input
                    value={editingRow?.CompareFieldOperator}
                    onChange={e => setEditingRow({ ...editingRow!, CompareFieldOperator: e.target.value })}
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
            const editable = isEditing(record);
            return editable ? (
                <Input
                    value={editingRow?.CompareFieldOrderBy}
                    onChange={e => setEditingRow({ ...editingRow!, CompareFieldOrderBy: e.target.value })}
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
        width: 80,
        render: (_: any, record: ReconciliationCompareFieldsItemProps) => {
            const editable = isEditing(record);
            return editable ? (
                <>
                    <a onClick={() => handleSave(editingRow!)}>保存</a>
                    <a onClick={handleCancel}>取消</a>
                </>
            ) : (
                <>
                    <a onClick={() => handleEdit(record)}>编辑</a>
                    <Popconfirm title="确定删除?" onConfirm={() => handleDelete(record)}>
                        <a>删除</a>
                    </Popconfirm>
                </>
            );
        },
    },
];

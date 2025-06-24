
import { TableColumnsType, Tag, Popconfirm, Input, Select, Button, InputNumber } from 'antd';
import { ReconciliationCompareFieldsItemProps } from '@/types/cost_manage/reconciliation_rule_engine';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { PartnerPerformanceRuleItemProps } from '@/types/basic_manage/partner_performance_rule';
import DatePickerZH from '@/components/date-picker';
import { KpiDefinitionItemProps } from '@/types/basic_manage/kpi_definition';
import { RuleKpiItemItemProps } from '@/types/basic_manage/rule_kpi_item';
import moment from 'moment';

export const getPartnerPerformanceRuleColumns = (handleEdit: (record: PartnerPerformanceRuleItemProps) => void, handleDelete: (record: PartnerPerformanceRuleItemProps) => void, handleSave: (record: PartnerPerformanceRuleItemProps) => void, handleCancel: () => void, editingKey:string): TableColumnsType<PartnerPerformanceRuleItemProps> => [

    {
        title: i18n.t(LocaleHelper.getPartnerPerformanceRuleRuleId()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RuleId',
        sorter: true,
        align: 'left',
        render: (text: boolean, record: PartnerPerformanceRuleItemProps) => {
            const editable = record.RowKey===editingKey;
            return editable ? (
                <Input
                    style={{ width: '100%', textAlign: 'left' }}
                    defaultValue={record.RuleId}
                    onChange={e => record.RuleId = e.target.value}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getPartnerPerformanceRuleRuleName()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'RuleName',
        sorter: true,
        align: 'left',
        render: (text: boolean, record: PartnerPerformanceRuleItemProps) => {
            const editable = record.RowKey===editingKey;
            return editable ? (
                <Input
                    style={{ width: '100%', textAlign: 'left' }}
                    defaultValue={record.RuleName}
                    onChange={e => record.RuleName = e.target.value}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getPartnerPerformanceRulePartnerType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'PartnerType',
        sorter: true,
        align: 'left',
        render: (text: string, record: PartnerPerformanceRuleItemProps) => {
            const editable = record.RowKey === editingKey;
            const routeOptions = [
                { value: '1', label: '供应商' },
                { value: '2', label: '客户' },
                { value: '3', label: '同行' },
                { value: '4', label: '海外代理' },
            ];
            return editable ? (
                <Select
                    // value={editingRow?.IsControlled}
                    defaultValue={record.PartnerType}
                    style={{ width: '100%',textAlign:'left' }}
                    onChange={(value) => record.PartnerType = value }
                    options={routeOptions}
                />
            ) : (
                routeOptions.find(option => option.value === record.PartnerType)?.label || text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getPartnerPerformanceRuleEffectiveDate()),
        width: 120,
        onHeaderCell: () => ({ style: { width: '120px' } }),
        dataIndex: 'EffectiveDate',
        sorter: true,
        align: 'center',
        render: (text: boolean, record: PartnerPerformanceRuleItemProps) => {
            const editable = record.RowKey===editingKey;
            return editable ? (
                <DatePickerZH
                    style={{ width: '100%', textAlign: 'left' }}
                    defaultValue={record.EffectiveDate ? moment(record.EffectiveDate) : undefined}
                    onChange={(_, dateStrings) => record.EffectiveDate = Array.isArray(dateStrings) ? dateStrings[0] : dateStrings}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getPartnerPerformanceRuleExpireDate()),
        width: 120,
        onHeaderCell: () => ({ style: { width: '120px' } }),
        dataIndex: 'ExpireDate',
        sorter: true,
        align: 'center',
        render: (text: boolean, record: PartnerPerformanceRuleItemProps) => {
            const editable = record.RowKey===editingKey;
            return editable ? (
                <DatePickerZH
                    style={{ width: '100%', textAlign: 'left' }}
                    defaultValue={record.ExpireDate ? moment(record.ExpireDate) : undefined}
                    onChange={(_, dateStrings) => record.ExpireDate = Array.isArray(dateStrings) ? dateStrings[0] : dateStrings}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getPartnerPerformanceRuleIsActive()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'IsActive',
        sorter: true,
        align: 'right',
        render: (text: string, record: PartnerPerformanceRuleItemProps) => {
            const editable = record.RowKey === editingKey;
            const routeOptions = [
                { value: '1', label: '是' },
                { value: '2', label: '否' },
            ];
            return editable ? (
                <Select
                    // value={editingRow?.IsControlled}
                    defaultValue={record.IsActive}
                    style={{ width: '100%',textAlign:'left' }}
                    onChange={(value) => record.IsActive = value }
                    options={routeOptions}
                />
            ) : (
                routeOptions.find(option => option.value === record.IsActive)?.label || text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getPartnerPerformanceRuleCreatedBy()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CreatedBy',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getPartnerPerformanceRuleCreatedAt()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CreatedAt',
        sorter: true,
        align: 'center',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        fixed: 'right',
        align:'center',
        width: 60,
        render: (_: any, record: PartnerPerformanceRuleItemProps) => {
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

export const getKpiDefinitionColumns = (handleEdit: (record: KpiDefinitionItemProps) => void, handleDelete: (record: KpiDefinitionItemProps) => void, handleSave: (record: KpiDefinitionItemProps) => void, handleCancel: () => void, editingKey:string): TableColumnsType<KpiDefinitionItemProps> => [

    {
        title: i18n.t(LocaleHelper.getKpiDefinitionKpiId()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'KpiId',
        sorter: true,
        align: 'left',
        render: (text: boolean, record: KpiDefinitionItemProps) => {
            const editable = record.RowKey===editingKey;
            return editable ? (
                <Input
                    style={{ width: '100%', textAlign: 'left' }}
                    defaultValue={record.KpiId}
                    onChange={e => record.KpiId = e.target.value}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getKpiDefinitionKpiCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'KpiCode',
        sorter: true,
        align: 'left',
        render: (text: boolean, record: KpiDefinitionItemProps) => {
            const editable = record.RowKey===editingKey;
            return editable ? (
                <Input
                    style={{ width: '100%', textAlign: 'left' }}
                    defaultValue={record.KpiCode}
                    onChange={e => record.KpiCode = e.target.value}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getKpiDefinitionKpiName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'KpiName',
        sorter: true,
        align: 'left',
        render: (text: boolean, record: KpiDefinitionItemProps) => {
            const editable = record.RowKey===editingKey;
            return editable ? (
                <Input
                    style={{ width: '100%', textAlign: 'left' }}
                    defaultValue={record.KpiName}
                    onChange={e => record.KpiName = e.target.value}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getKpiDefinitionDescription()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Description',
        sorter: true,
        align: 'left',
        render: (text: boolean, record: KpiDefinitionItemProps) => {
            const editable = record.RowKey===editingKey;
            return editable ? (
                <Input
                    style={{ width: '100%', textAlign: 'left' }}
                    defaultValue={record.Description}
                    onChange={e => record.Description = e.target.value}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getKpiDefinitionDataType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'DataType',
        sorter: true,
        align: 'left',
        render: (text: string, record: KpiDefinitionItemProps) => {
            const editable = record.RowKey === editingKey;
            const routeOptions = [
                { value: '1', label: 'number' },
                { value: '2', label: 'date' },
                { value: '3', label: 'string' },
                { value: '4', label: 'boolean' },
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
        title: i18n.t(LocaleHelper.getKpiDefinitionIsCritical()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'IsCritical',
        sorter: true,
        align: 'right',
        render: (text: string, record: KpiDefinitionItemProps) => {
            const editable = record.RowKey === editingKey;
            const routeOptions = [
                { value: '1', label: '是' },
                { value: '0', label: '否' },
            ];
            return editable ? (
                <Select
                    // value={editingRow?.IsControlled}
                    defaultValue={record.IsCritical}
                    style={{ width: '100%',textAlign:'left' }}
                    onChange={(value) => record.IsCritical = value }
                    options={routeOptions}
                />
            ) : (
                routeOptions.find(option => option.value === record.IsCritical)?.label || text
            );
        }
    },
    {
        title: '操作',
        dataIndex: 'operation',
        fixed: 'right',
        align:'center',
        width: 60,
        render: (_: any, record: KpiDefinitionItemProps) => {
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

export const getRuleKpiItemColumns = (handleEdit: (record: RuleKpiItemItemProps) => void, handleDelete: (record: RuleKpiItemItemProps) => void): TableColumnsType<RuleKpiItemItemProps> => [

    {
        title: i18n.t(LocaleHelper.getRuleKpiItemItemId()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ItemId',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getRuleKpiItemRuleId()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RuleId',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getRuleKpiItemKpiId()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'KpiId',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getRuleKpiItemWeight()),
        width: 120,
        onHeaderCell: () => ({ style: { width: '120px' } }),
        dataIndex: 'Weight',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getRuleKpiItemScoringConfig()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ScoringConfig',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getRuleKpiItemDescription()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Description',
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
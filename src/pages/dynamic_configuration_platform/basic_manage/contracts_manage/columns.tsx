
import { TableColumnsType, Tag, Popconfirm, Select, Input } from 'antd';
import { ContractsManageItemProps, ContractsRuleEngineItemProps,ContractsCompareFieldsItemProps } from "@/types/dynamic_configuration_platform/basic_manage/contracts_manage";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: ContractsManageItemProps) => void, handleDelete: (record: ContractsManageItemProps) => void): TableColumnsType<ContractsManageItemProps> => [

    {
        title: i18n.t(LocaleHelper.getContractsManageContractId()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ContractId',
        sorter: true,
        align: 'left',
        fixed: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getContractsManagePartner()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Partner',
        sorter: true,
        align: 'left',
        fixed: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getContractsManageCustomerLevel()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CustomerLevel',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getContractsManageAuditStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'AuditStatus',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getContractsManageContractStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ContractStatus',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getContractsManageContractType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ContractType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getContractsManageEffectiveDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'EffectiveDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getContractsManageExpirationDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ExpirationDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getContractsManageAttachmentCount()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'AttachmentCount',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getContractsManageOperator()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Operator',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getContractsManageOperationDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'OperationDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getContractsManageContractAgreement()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ContractAgreement',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getContractsManageLogRecord()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'LogRecord',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getContractsManageCreditLimit()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CreditLimit',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getContractsManageCreditCurrency()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CreditCurrency',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getContractsManageDateType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'DateType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getContractsManagePaymentCycle()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'PaymentCycle',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getContractsManageIsExtension()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'IsExtension',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getContractsManageExtensionPeriod()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ExtensionPeriod',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getContractsManageRemarks()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Remarks',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getContractsManageIsShippingChapterUploaded()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'IsShippingChapterUploaded',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getContractsManageIsContractUploaded()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'IsContractUploaded',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getContractsManageIsNeedUpdate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'IsNeedUpdate',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getContractsManageCompanyBranch()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CompanyBranch',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getContractsManageSalesRep()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SalesRep',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getContractsManageSettlementMethod()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SettlementMethod',
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

export const getRuleEngineColumns = (handleEdit: (record: ContractsRuleEngineItemProps) => void, handleDelete: (record: ContractsRuleEngineItemProps) => void, handleSave: (record: ContractsRuleEngineItemProps) => void, handleCancel: () => void, editingKey: string): TableColumnsType<ContractsRuleEngineItemProps> => [
    {
        title: '规则名称',
        width: 180,
        onHeaderCell: () => ({ style: { width: '180px' } }),
        dataIndex: 'ReconciliationRuleName',
        sorter: true,
        align: 'left',
        render: (text: string, record: ContractsRuleEngineItemProps) => {
            const editable = record.SeqNo===editingKey;
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
        title: '应用条件',
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'MatchFieldRelation',
        sorter: true,
        align: 'left',
        render: (text: boolean, record: ContractsRuleEngineItemProps) => {
            const editable = record.SeqNo===editingKey;
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
        title: '操作',
        dataIndex: 'operation',
        fixed: 'right',
        align:'center',
        width: 40,
        render: (_: any, record: ContractsRuleEngineItemProps) => {
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

export const getCompareFieldsColumns = (handleEdit: (record: ContractsCompareFieldsItemProps) => void, handleDelete: (record: ContractsCompareFieldsItemProps) => void, handleSave: (record: ContractsCompareFieldsItemProps) => void, handleCancel: () => void, editingKey:string): TableColumnsType<ContractsCompareFieldsItemProps> => [
    {
        title: '字段类型',
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CompareFieldsName',
        sorter: true,
        align: 'left',
        render: (text: string, record: ContractsCompareFieldsItemProps) => {
            const editable = record.SeqNo===editingKey;
            return editable ? (
                <Select
                    // value={editingRow?.CompareFieldsName}
                    defaultValue={record.CompareFieldsName}
                    style={{ width: '100%', textAlign: 'left' }}
                    onChange={value => record.CompareFieldsName = value}
                    options={[
                        { value: '00001', label: '业务类型' },
                        { value: '00002', label: '操作公司' }
                    ]}
                />
            ) : (
                text
            );
        }
    },
    {
        title: '匹配字段规则',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CompareFieldRelation',
        sorter: true,
        align: 'left',
        render: (text: string, record: ContractsCompareFieldsItemProps) => {
            const editable = record.SeqNo===editingKey;
            return editable ? (
                <Select
                    // value={editingRow?.CompareFieldRelation}
                    defaultValue={record.CompareFieldRelation}
                    style={{ width: '100%', textAlign: 'left' }}
                    onChange={value => record.CompareFieldRelation = value}
                    options={[
                        { value: '00001', label: '等于' },
                        { value: '00002', label: '不等于' }
                    ]}
                />
            ) : (
                text
            );
        }
    },
    {
        title: '匹配字段值',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CompareFieldValue',
        sorter: true,
        align: 'left',
        render: (text: boolean, record: ContractsCompareFieldsItemProps) => {
            const editable = record.SeqNo===editingKey;
            return editable ? (
                <Select
                    // value={editingRow?.CompareFieldRelation}
                    defaultValue={record.CompareFieldRelation}
                    style={{ width: '100%', textAlign: 'left' }}
                    onChange={value => record.CompareFieldRelation = value}
                    options={[
                        { value: '00001', label: '海运出口' },
                        { value: '00002', label: '公司1' }
                    ]}
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
        render: (_: any, record: ContractsCompareFieldsItemProps) => {
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

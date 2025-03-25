
import { TableColumnsType, Tag, Popconfirm,Input,Select,Button,InputNumber } from 'antd';
import { ChargingStandardItemProps } from "@/types/charging_standard/charging_standard";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const getColumns = (handleEdit: (record: ChargingStandardItemProps) => void, handleDelete: (record: ChargingStandardItemProps) => void, handleSave: (record: ChargingStandardItemProps) => void, handleCancel: () => void, isEditing: (record: ChargingStandardItemProps) => boolean, editingRow: ChargingStandardItemProps | null, setEditingRow: (row: ChargingStandardItemProps | null) => void): TableColumnsType<ChargingStandardItemProps> => [
    {
        title: i18n.t(LocaleHelper.getChargingStandardPaymentMethod()),
        width: 60,
        onHeaderCell: () => ({ style: { width: '60px' } }),
        dataIndex: 'PaymentMethod',
        sorter: true,
        align: 'left',
        render: (text: string, record: ChargingStandardItemProps) => {
            const editable = isEditing(record);
            return editable ? (
                <Select
                    value={editingRow?.PaymentMethod}
                    style={{ width: '80px',textAlign:'left' }}
                    onChange={value => setEditingRow({ ...editingRow!, PaymentMethod: value })}
                    options={[
                        { value: true, label: '应收' },
                        { value: false, label: '应付' }
                    ]}
                />
            ) : (
                text ? '应收' : '应付'
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardFeeName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FeeName',
        sorter: true,
        align: 'left',
        render: (text: string, record: ChargingStandardItemProps) => {
            const editable = isEditing(record);
            return editable ? (
                <Input
                    value={editingRow?.FeeName}
                    onChange={e => setEditingRow({ ...editingRow!, FeeName: e.target.value })}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardIsControlled()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'IsControlled',
        sorter: true,
        align: 'center',
        render: (text: boolean, record: ChargingStandardItemProps) => {
            const editable = isEditing(record);
            return editable ? (
                <Select
                    value={editingRow?.IsControlled}
                    style={{ width: '80px',textAlign:'left' }}
                    onChange={value => setEditingRow({ ...editingRow!, IsControlled: value })}
                    options={[
                        { value: true, label: '是' },
                        { value: false, label: '否' }
                    ]}
                />
            ) : (
                text ? '是' : '否'
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardSettlementUnitType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SettlementUnitType',
        sorter: true,
        align: 'left',
        render: (text: string, record: ChargingStandardItemProps) => {
            const editable = isEditing(record);
            return editable ? (
                <Input
                    value={editingRow?.SettlementUnitType}
                    onChange={e => setEditingRow({ ...editingRow!, SettlementUnitType: e.target.value })}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardFixedSettlementUnit()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FixedSettlementUnit',
        sorter: true,
        align: 'left',
        render: (text: string, record: ChargingStandardItemProps) => {
            const editable = isEditing(record);
            return editable ? (
                <Input
                    value={editingRow?.FixedSettlementUnit}
                    onChange={e => setEditingRow({ ...editingRow!, FixedSettlementUnit: e.target.value })}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardCurrency()),
        width: 60,
        onHeaderCell: () => ({ style: { width: '60px' } }),
        dataIndex: 'Currency',
        sorter: true,
        align: 'left',
        render: (text: string, record: ChargingStandardItemProps) => {
            const editable = isEditing(record);
            return editable ? (
                <Input
                    value={editingRow?.Currency}
                    onChange={e => setEditingRow({ ...editingRow!, Currency: e.target.value })}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardCity()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'City',
        sorter: true,
        align: 'left',
        render: (text: string, record: ChargingStandardItemProps) => {
            const editable = isEditing(record);
            return editable ? (
                <Input
                    value={editingRow?.City}
                    onChange={e => setEditingRow({ ...editingRow!, City: e.target.value })}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardBillingUnit()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BillingUnit',
        sorter: true,
        align: 'left',
        render: (text: string, record: ChargingStandardItemProps) => {
            const editable = isEditing(record);
            return editable ? (
                <Input
                    value={editingRow?.BillingUnit}
                    onChange={e => setEditingRow({ ...editingRow!, BillingUnit: e.target.value })}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardValueLowerLimit()),
        width: 120,
        onHeaderCell: () => ({ style: { width: '120px' } }),
        dataIndex: 'ValueLowerLimit',
        align: 'right',
        render: (text: number, record: ChargingStandardItemProps) => {
            const editable = isEditing(record);
            return editable ? (
                <InputNumber
                    value={editingRow?.ValueLowerLimit}
                    onChange={value => setEditingRow({ ...editingRow!, ValueLowerLimit: value || 0 })}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardValueUpperLimit()),
        width: 120,
        onHeaderCell: () => ({ style: { width: '120px' } }),
        dataIndex: 'ValueUpperLimit',
        sorter: true,
        align: 'right',
        render: (text: number, record: ChargingStandardItemProps) => {
            const editable = isEditing(record);
            return editable ? (
                <InputNumber
                    value={editingRow?.ValueUpperLimit}
                    onChange={value => setEditingRow({ ...editingRow!, ValueUpperLimit: value || 0 })}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardContainerType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ContainerType',
        sorter: true,
        align: 'left',
        render: (text: string, record: ChargingStandardItemProps) => {
            const editable = isEditing(record);
            return editable ? (
                <Input
                    value={editingRow?.ContainerType}
                    onChange={e => setEditingRow({ ...editingRow!, ContainerType: e.target.value })}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardContainerCategory()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ContainerCategory',
        sorter: true,
        align: 'left',
        render: (text: string, record: ChargingStandardItemProps) => {
            const editable = isEditing(record);
            return editable ? (
                <Input
                    value={editingRow?.ContainerCategory}
                    onChange={e => setEditingRow({ ...editingRow!, ContainerCategory: e.target.value })}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardQuantity()),
        width: 60,
        onHeaderCell: () => ({ style: { width: '60px' } }),
        dataIndex: 'Quantity',
        sorter: true,
        align: 'right',
        render: (text: number, record: ChargingStandardItemProps) => {
            const editable = isEditing(record);
            return editable ? (
                <InputNumber
                    value={editingRow?.Quantity}
                    onChange={value => setEditingRow({ ...editingRow!, Quantity: value || 0 })}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardBillingUnitPrice()),
        width: 80,
        onHeaderCell: () => ({ style: { width: '80px' } }),
        dataIndex: 'BillingUnitPrice',
        sorter: true,
        align: 'right',
        render: (text: string, record: ChargingStandardItemProps) => {
            const editable = isEditing(record);
            return editable ? (
                <Input
                    value={editingRow?.BillingUnitPrice}
                    onChange={e => setEditingRow({ ...editingRow!, BillingUnitPrice: e.target.value })}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardUnitPrice()),
        width: 60,
        onHeaderCell: () => ({ style: { width: '60px' } }),
        dataIndex: 'UnitPrice',
        sorter: true,
        align: 'right',
        render: (text: number, record: ChargingStandardItemProps) => {
            const editable = isEditing(record);
            return editable ? (
                <InputNumber
                    value={editingRow?.UnitPrice}
                    onChange={value => setEditingRow({ ...editingRow!, UnitPrice: value || 0 })}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardMinimumCharge()),
        width: 80,
        onHeaderCell: () => ({ style: { width: '80px' } }),
        dataIndex: 'MinimumCharge',
        sorter: true,
        align: 'right',
        render: (text: number, record: ChargingStandardItemProps) => {
            const editable = isEditing(record);
            return editable ? (
                <InputNumber
                    value={editingRow?.MinimumCharge}
                    onChange={value => setEditingRow({ ...editingRow!, MinimumCharge: value || 0 })}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardTaxRate()),
        width: 60,
        onHeaderCell: () => ({ style: { width: '60px' } }),
        dataIndex: 'TaxRate',
        sorter: true,
        align: 'right',
        render: (text: number, record: ChargingStandardItemProps) => {
            const editable = isEditing(record);
            return editable ? (
                <InputNumber
                    value={editingRow?.TaxRate}
                    onChange={value => setEditingRow({ ...editingRow!, TaxRate: value || 0 })}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardRemarks()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Remarks',
        sorter: true,
        align: 'left',
        render: (text: string, record: ChargingStandardItemProps) => {
            const editable = isEditing(record);
            return editable ? (
                <Input
                    value={editingRow?.Remarks}
                    onChange={e => setEditingRow({ ...editingRow!, Remarks: e.target.value })}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardRequiresInvoice()),
        width: 80,
        onHeaderCell: () => ({ style: { width: '80px' } }),
        dataIndex: 'RequiresInvoice',
        sorter: true,
        align: 'center',
        render: (text: boolean, record: ChargingStandardItemProps) => {
            const editable = isEditing(record);
            return editable ? (
                <Select
                    value={editingRow?.RequiresInvoice}
                    style={{ width: '60px',textAlign:'left' }}
                    onChange={value => setEditingRow({ ...editingRow!, RequiresInvoice: value })}
                    options={[
                        { value: true, label: '是' },
                        { value: false, label: '否' }
                    ]}
                />
            ) : (
                text ? '是' : '否'
            );
        }
    },
    {
        title: '操作',
        dataIndex: 'operation',
        fixed: 'right',
        width: 80,
        render: (_: any, record: ChargingStandardItemProps) => {
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

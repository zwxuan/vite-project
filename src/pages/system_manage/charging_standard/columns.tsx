
import { TableColumnsType, Tag, Popconfirm,Input,Select,Button,InputNumber } from 'antd';
import { ChargingStandardItemProps } from "@/types/charging_standard/charging_standard";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const getColumns = (handleEdit: (record: ChargingStandardItemProps) => void, handleDelete: (record: ChargingStandardItemProps) => void, handleSave: (record: ChargingStandardItemProps) => void, handleCancel: () => void, editingKey:string): TableColumnsType<ChargingStandardItemProps> => [
    {
        title: i18n.t(LocaleHelper.getChargingStandardPaymentMethod()),
        width: 60,
        onHeaderCell: () => ({ style: { width: '60px' } }),
        dataIndex: 'PaymentMethod',
        sorter: true,
        align: 'left',
        render: (text: string, record: ChargingStandardItemProps) => {
            const editable = record.Id === editingKey;
            return editable ? (
                <Select
                    // value={editingRow?.PaymentMethod}
                    defaultValue={record.PaymentMethod}
                    style={{ width: '80px',textAlign:'left' }}
                    onChange={value => record.PaymentMethod = value }
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
            const editable = record.Id === editingKey;
            return editable ? (
                <Input
                    // value={editingRow?.FeeName}
                    defaultValue={record.FeeName}
                    onChange={e => record.FeeName = e.target.value }
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
            const editable = record.Id === editingKey;
            return editable ? (
                <Select
                    // value={editingRow?.IsControlled}
                    defaultValue={record.IsControlled}
                    style={{ width: '80px',textAlign:'left' }}
                    onChange={value => record.IsControlled = value }
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
            const editable = record.Id === editingKey;
            return editable ? (
                <Input
                    // value={editingRow?.SettlementUnitType}
                    defaultValue={record.SettlementUnitType}
                    onChange={e => record.SettlementUnitType = e.target.value }
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
            const editable = record.Id === editingKey;
            return editable ? (
                <Input
                    // value={editingRow?.FixedSettlementUnit}
                    defaultValue={record.FixedSettlementUnit}
                    onChange={e => record.FixedSettlementUnit = e.target.value }
                    // onChange={e => setEditingRow({ ...editingRow!, FixedSettlementUnit: e.target.value })}
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
            const editable = record.Id === editingKey;
            return editable ? (
                <Input
                    // value={editingRow?.Currency}
                    defaultValue={record.Currency}
                    onChange={e => record.Currency = e.target.value }
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
            const editable = record.Id === editingKey;
            return editable ? (
                <Input
                    // value={editingRow?.City}
                    defaultValue={record.City}
                    onChange={e => record.City = e.target.value }
                    // onChange={e => setEditingRow({ ...editingRow!, City: e.target.value })}
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
            const editable = record.Id === editingKey;
            return editable ? (
                <Input
                    // value={editingRow?.BillingUnit}
                    defaultValue={record.BillingUnit}
                    onChange={e => record.BillingUnit = e.target.value }
                    // onChange={e => setEditingRow({ ...editingRow!, BillingUnit: e.target.value })}
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
            const editable = record.Id === editingKey;
            return editable ? (
                <InputNumber
                    // value={editingRow?.ValueLowerLimit}
                    defaultValue={record.ValueLowerLimit}
                    onChange={value => record.ValueLowerLimit = value || 0 }
                    // onChange={value => setEditingRow({ ...editingRow!, ValueLowerLimit: value || 0 })}
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
            const editable = record.Id === editingKey;
            return editable ? (
                <InputNumber
                    // value={editingRow?.ValueUpperLimit}
                    defaultValue={record.ValueUpperLimit}
                    onChange={value => record.ValueUpperLimit = value || 0 }
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
            const editable = record.Id === editingKey;
            return editable ? (
                <Input
                    // value={editingRow?.ContainerType}
                    defaultValue={record.ContainerType}
                    onChange={e => record.ContainerType = e.target.value }
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
            const editable = record.Id === editingKey;
            return editable ? (
                <Input
                    // value={editingRow?.ContainerCategory}
                    defaultValue={record.ContainerCategory}
                    onChange={e => record.ContainerCategory = e.target.value }
                    // onChange={e => setEditingRow({ ...editingRow!, ContainerCategory: e.target.value })}
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
            const editable = record.Id === editingKey;
            return editable ? (
                <InputNumber
                    // value={editingRow?.Quantity}
                    defaultValue={record.Quantity}
                    onChange={value => record.Quantity = value || 0 }
                    // onChange={value => setEditingRow({ ...editingRow!, Quantity: value || 0 })}
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
            const editable = record.Id === editingKey;
            return editable ? (
                <Input
                    // value={editingRow?.BillingUnitPrice}
                    defaultValue={record.BillingUnitPrice}
                    onChange={e => record.BillingUnitPrice = e.target.value }
                    // onChange={e => setEditingRow({ ...editingRow!, BillingUnitPrice: e.target.value })}
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
            const editable = record.Id === editingKey;
            return editable ? (
                <InputNumber
                    // value={editingRow?.UnitPrice}
                    defaultValue={record.UnitPrice}
                    onChange={value => record.UnitPrice = value || 0 }
                    // onChange={value => setEditingRow({ ...editingRow!, UnitPrice: value || 0 })}
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
            const editable = record.Id === editingKey;
            return editable ? (
                <InputNumber
                    // value={editingRow?.MinimumCharge}
                    defaultValue={record.MinimumCharge}
                    onChange={value => record.MinimumCharge = value || 0 }
                    // onChange={value => setEditingRow({ ...editingRow!, MinimumCharge: value || 0 })}
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
            const editable = record.Id === editingKey;
            return editable ? (
                <InputNumber
                    // value={editingRow?.TaxRate}
                    defaultValue={record.TaxRate}
                    onChange={value => record.TaxRate = value || 0 }
                    // onChange={value => setEditingRow({ ...editingRow!, TaxRate: value || 0 })}
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
            const editable = record.Id === editingKey;
            return editable ? (
                <Input
                    // value={editingRow?.Remarks}
                    defaultValue={record.Remarks}
                    onChange={e => record.Remarks = e.target.value }
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
            const editable = record.Id === editingKey;
            return editable ? (
                <Select
                    // value={editingRow?.RequiresInvoice}
                    defaultValue={record.RequiresInvoice}
                    style={{ width: '60px',textAlign:'left' }}
                    onChange={value => record.RequiresInvoice = value }
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
            const editable = record.Id === editingKey;
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


import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { ChargingStandardItemProps } from "@/types/charging_standard/charging_standard";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: ChargingStandardItemProps) => void, handleDelete: (record: ChargingStandardItemProps) => void): TableColumnsType<ChargingStandardItemProps> => [

    {
        title: i18n.t(LocaleHelper.getChargingStandardId()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Id',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardPaymentMethod()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'PaymentMethod',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardFeeName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FeeName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardIsControlled()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'IsControlled',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardSettlementUnitType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SettlementUnitType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardFixedSettlementUnit()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FixedSettlementUnit',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardCurrency()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Currency',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardCity()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'City',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardBillingUnit()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BillingUnit',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardValueLowerLimit()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ValueLowerLimit',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardValueUpperLimit()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ValueUpperLimit',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardContainerType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ContainerType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardContainerCategory()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ContainerCategory',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardQuantity()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Quantity',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardBillingUnitPrice()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BillingUnitPrice',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardUnitPrice()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'UnitPrice',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardMinimumCharge()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'MinimumCharge',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardTaxRate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'TaxRate',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardRemarks()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Remarks',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getChargingStandardRequiresInvoice()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RequiresInvoice',
        sorter: true,
        align: 'right',
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


import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { BaseTaxTypeItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_tax_type";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: BaseTaxTypeItemProps) => void, handleDelete: (record: BaseTaxTypeItemProps) => void): TableColumnsType<BaseTaxTypeItemProps> => [

    {
        title: i18n.t(LocaleHelper.getBaseTaxTypeTaxTypeCode()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'TaxTypeCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTaxTypeTaxTypeName()),
        width: 260,
        onHeaderCell: () => ({ style: { width: '260px' } }),
        dataIndex: 'TaxTypeName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTaxTypeTaxSystemName()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'TaxSystemName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTaxTypeCountryRegion()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'CountryRegion',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTaxTypeTaxPeriod()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'TaxPeriod',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTaxTypeTaxCurrency()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'TaxCurrency',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTaxTypePrecisionVal()),
        width: 60,
        onHeaderCell: () => ({ style: { width: '60px' } }),
        dataIndex: 'PrecisionVal',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTaxTypeRoundingRule()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'RoundingRule',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTaxTypeExchangeType()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'ExchangeType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTaxTypeEffectiveDate()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'EffectiveDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTaxTypeExpiryDate()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'ExpiryDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTaxTypeCreatedBy()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'CreatedBy',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTaxTypeCreatedTime()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'CreatedTime',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTaxTypeStatus()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'Status',
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

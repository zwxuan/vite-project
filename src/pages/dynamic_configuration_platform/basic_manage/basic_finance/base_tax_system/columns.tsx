
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { BaseTaxSystemItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_tax_system";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: BaseTaxSystemItemProps) => void, handleDelete: (record: BaseTaxSystemItemProps) => void): TableColumnsType<BaseTaxSystemItemProps> => [

    {
        title: i18n.t(LocaleHelper.getBaseTaxSystemTaxSystemCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'TaxSystemCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTaxSystemTaxSystemName()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'TaxSystemName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTaxSystemCountryRegion()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'CountryRegion',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTaxSystemTaxLevel()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'TaxLevel',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTaxSystemDefaultTaxCurrency()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'DefaultTaxCurrency',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTaxSystemDefaultPrecision()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'DefaultPrecision',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTaxSystemDefaultRoundingRule()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'DefaultRoundingRule',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTaxSystemDefaultExchangeType()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'DefaultExchangeType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTaxSystemEffectiveDate()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'EffectiveDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTaxSystemExpiryDate()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'ExpiryDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getBaseTaxSystemStatus()),
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

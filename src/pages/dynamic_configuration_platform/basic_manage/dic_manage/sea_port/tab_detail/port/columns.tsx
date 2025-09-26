
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { BaseSeaportItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_seaport";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: BaseSeaportItemProps) => void, handleDelete: (record: BaseSeaportItemProps) => void): TableColumnsType<BaseSeaportItemProps> => [

    {
        title: i18n.t(LocaleHelper.getBaseSeaportId()),
        width: 60,
        onHeaderCell: () => ({ style: { width: '60px' } }),
        dataIndex: 'Id',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getBaseSeaportCode()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'Code',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseSeaportNameCn()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'NameCn',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseSeaportNameEn()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'NameEn',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseSeaportCountryRegion()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'CountryRegion',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseSeaportCityCode()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'CityCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseSeaportCityName()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'CityName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseSeaportArea()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'Area',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseSeaportBasePort()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'BasePort',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseSeaportExchangeCode()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'ExchangeCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseSeaportIsoCode()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'IsoCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseSeaportPortRequirements()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'PortRequirements',
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

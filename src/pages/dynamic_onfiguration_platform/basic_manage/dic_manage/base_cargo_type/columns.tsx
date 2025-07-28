
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { BaseCargoTypeItemProps } from "@/types/dynamic_onfiguration_platform/basic_manage/base_cargo_type";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: BaseCargoTypeItemProps) => void, handleDelete: (record: BaseCargoTypeItemProps) => void): TableColumnsType<BaseCargoTypeItemProps> => [

    {
        title: i18n.t(LocaleHelper.getBaseCargoTypeId()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Id',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCargoTypeEnglishName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'EnglishName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCargoTypeChineseName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ChineseName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCargoTypeDescription()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Description',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCargoTypeOceanUse()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'OceanUse',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCargoTypeAirUse()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'AirUse',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCargoTypeFbaOceanUse()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FbaOceanUse',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCargoTypeFbaAirUse()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FbaAirUse',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCargoTypeFbaRailUse()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FbaRailUse',
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

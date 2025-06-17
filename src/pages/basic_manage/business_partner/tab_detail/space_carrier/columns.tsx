
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { SpaceCarrierItemProps } from "@/types/basic_manage/space_carrier";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: SpaceCarrierItemProps) => void, handleDelete: (record: SpaceCarrierItemProps) => void): TableColumnsType<SpaceCarrierItemProps> => [

    {
        title: i18n.t(LocaleHelper.getSpaceCarrierId()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Id',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSpaceCarrierCarrierName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CarrierName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSpaceCarrierCarrierType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CarrierType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSpaceCarrierBookingMethod()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BookingMethod',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSpaceCarrierDeparturePort()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'DeparturePort',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSpaceCarrierRoute()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Route',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSpaceCarrierDestinationPort()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'DestinationPort',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSpaceCarrierCountry()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Country',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSpaceCarrierContactPerson()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ContactPerson',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSpaceCarrierContactNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ContactNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSpaceCarrierEmail()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Email',
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

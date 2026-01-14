
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { BaseBankTypeItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_bank_type";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: BaseBankTypeItemProps) => void, handleDelete: (record: BaseBankTypeItemProps) => void): TableColumnsType<BaseBankTypeItemProps> => [

    {
        title: i18n.t(LocaleHelper.getBaseBankTypeBankTypeCode()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'BankTypeCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseBankTypeBankTypeName()),
        width: 260,
        onHeaderCell: () => ({ style: { width: '260px' } }),
        dataIndex: 'BankTypeName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseBankTypeCountryRegion()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'CountryRegion',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseBankTypeStatus()),
        dataIndex: 'Status',
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        sorter: true,
        align: 'left',
    },
    {
        title: '',
        dataIndex: '',
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

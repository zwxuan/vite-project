
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { BaseEdiPortItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_edi_port";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: BaseEdiPortItemProps) => void, handleDelete: (record: BaseEdiPortItemProps) => void): TableColumnsType<BaseEdiPortItemProps> => [

    {
        title: i18n.t(LocaleHelper.getBaseEdiPortShipper()),
        width: 360,
        onHeaderCell: () => ({ style: { width: '360px' } }),
        dataIndex: 'Shipper',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseEdiPortOriginalPortCode()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'OriginalPortCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseEdiPortCurrentPortCode()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'CurrentPortCode',
        sorter: true,
        align: 'left',
    },
    {
        title: '',
        dataIndex: '',
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


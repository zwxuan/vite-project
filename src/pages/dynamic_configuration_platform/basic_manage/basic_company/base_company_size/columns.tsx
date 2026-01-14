
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { BaseCompanySizeItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_company_size";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: BaseCompanySizeItemProps) => void, handleDelete: (record: BaseCompanySizeItemProps) => void): TableColumnsType<BaseCompanySizeItemProps> => [

    {
        title: i18n.t(LocaleHelper.getBaseCompanySizeCompanySizeCode()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'CompanySizeCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCompanySizeCompanySizeName()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'CompanySizeName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCompanySizeRemark()),
        dataIndex: 'Remark',
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

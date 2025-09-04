
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { BaseCompanyNatureItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_company_nature";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: BaseCompanyNatureItemProps) => void, handleDelete: (record: BaseCompanyNatureItemProps) => void): TableColumnsType<BaseCompanyNatureItemProps> => [

    {
        title: i18n.t(LocaleHelper.getBaseCompanyNatureCompanyNatureCode()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'CompanyNatureCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCompanyNatureCompanyNatureName()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'CompanyNatureName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseCompanyNatureRemark()),
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

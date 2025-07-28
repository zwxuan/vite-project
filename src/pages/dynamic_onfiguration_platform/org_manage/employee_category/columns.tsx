
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { EmployeeCategoryItemProps } from "@/types/dynamic_onfiguration_platform/org_manage/employee_category";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: EmployeeCategoryItemProps) => void, handleDelete: (record: EmployeeCategoryItemProps) => void): TableColumnsType<EmployeeCategoryItemProps> => [

    {
        title: i18n.t(LocaleHelper.getEmployeeCategoryCategoryCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CategoryCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEmployeeCategoryCategoryName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CategoryName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEmployeeCategoryStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Status',
        sorter: true,
        align: 'center',
        render: (text) => {
            if (text === '1') {
                return <Tag color='green'>已启用</Tag>;
            } else {
                return <Tag color='red'>已停用</Tag>;
            }
        },
    },
    {
        title: i18n.t(LocaleHelper.getEmployeeCategoryRemarks()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Remarks',
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

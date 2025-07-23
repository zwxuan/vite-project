
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { EmployeeManageItemProps } from "@/types/org_manage/employee_manage";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { NavLink } from 'react-router-dom';



export const getColumns = (handleEdit: (record: EmployeeManageItemProps) => void, handleDelete: (record: EmployeeManageItemProps) => void): TableColumnsType<EmployeeManageItemProps> => [

    {
        title: i18n.t(LocaleHelper.getEmployeeManageEmployeeCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'EmployeeCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEmployeeManageEmployeeName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'EmployeeName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEmployeeManageOrganization()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Organization',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEmployeeManageDepartment()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Department',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEmployeeManageEmail()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Email',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEmployeeManageMobile()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Mobile',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEmployeeManageStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Status',
        sorter: true,
        align: 'left',
        render: (text) => {
            if (text === '1') {
                return <Tag color='green'>已启用</Tag>;
            } else {
                return <Tag color='red'>已停用</Tag>;
            }
        },
    },
    {
        title: i18n.t(LocaleHelper.getEmployeeManageEmployeeCategory()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'EmployeeCategory',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEmployeeManageRemarks()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Remarks',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEmployeeManageLastUpdatedBy()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'LastUpdatedBy',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEmployeeManageLastUpdatedTime()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'LastUpdatedTime',
        sorter: true,
        align: 'center',
    },
    {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (_, record) => (
        <>
            <a>启用</a>
            <NavLink to={`/employee/employee_manage/detail?employeeCode=${record.EmployeeCode}`}>编辑</NavLink>
            <Popconfirm title="确定要删除吗?" cancelText="取消" okText="确定" onConfirm={() => handleDelete(record)}>
                <a>删除</a>
            </Popconfirm>
        </>
        ),
    },
]; 

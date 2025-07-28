
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { AdminOrgItemProps } from "@/types/dynamic_onfiguration_platform/org_manage/admin_org";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { NavLink } from 'react-router-dom';



export const getColumns = (handleEdit: (record: AdminOrgItemProps) => void, handleDelete: (record: AdminOrgItemProps) => void): TableColumnsType<AdminOrgItemProps> => [

    {
        title: i18n.t(LocaleHelper.getAdminOrgOrgCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'OrgCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getAdminOrgOrgName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'OrgName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getAdminOrgOrgAbbr()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'OrgAbbr',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getAdminOrgOrgStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'OrgStatus',
        sorter: true,
        align: 'left',
        render: (text) => {
            if (text === '已启用') {
                return <Tag color='green'>已启用</Tag>;
            } else {
                return <Tag color='red'>已停用</Tag>;
            }
        },
    },
    {
        title: i18n.t(LocaleHelper.getAdminOrgOrgRemark()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'OrgRemark',
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
            <NavLink to={`/org/admin_org/detail?orgCode=${record.OrgCode}`}>编辑</NavLink>
            <Popconfirm title="确定要删除吗?" cancelText="取消" okText="确定" onConfirm={() => handleDelete(record)}>
                <a>删除</a>
            </Popconfirm>
        </>
        ),
    },
]; 

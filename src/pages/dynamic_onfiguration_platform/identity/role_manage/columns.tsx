
import { TableColumnsType, Tag, Popconfirm, Input, Select } from 'antd';
import { DataPermissionItemProps, RoleManageItemProps } from "@/types/dynamic_onfiguration_platform/identity/role_manage";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { NavLink } from 'react-router-dom';
import DatePickerZH from '@/components/date-picker';
import moment from 'moment';



export const getColumns = (handleEdit: (record: RoleManageItemProps) => void, handleDelete: (record: RoleManageItemProps) => void): TableColumnsType<RoleManageItemProps> => [

    {
        title: i18n.t(LocaleHelper.getRoleManageRoleCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RoleCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getRoleManageRoleName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RoleName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getRoleManageManageOrg()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ManageOrg',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getRoleManageSystemRole()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SystemRole',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getRoleManageStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Status',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getRoleManageRoleType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RoleType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getRoleManageRoleTag()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RoleTag',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getRoleManageRoleDesc()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RoleDesc',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getRoleManageRoleGroup()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RoleGroup',
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
            <NavLink to={`/role/role_manage/detail?roleCode=${record.RoleCode}`}>详情</NavLink>
            <Popconfirm title="确定要删除吗?" cancelText="取消" okText="确定" onConfirm={() => handleDelete(record)}>
                <a>删除</a>
            </Popconfirm>
        </>
        ),
    },
]; 

export const getDataPermissionColumns = (handleEdit: (record: DataPermissionItemProps) => void, handleDelete: (record: DataPermissionItemProps) => void, handleSave: (record: DataPermissionItemProps) => void, handleCancel: () => void, editingKey:string): TableColumnsType<DataPermissionItemProps> => [

    {
        title: '序号',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SeqNo',
        sorter: true,
        align: 'left',
        render: (text: string, record: DataPermissionItemProps) => {
            const editable = record.SeqNo===editingKey;
            return editable ? (
                <Input
                    style={{ width: '100%', textAlign: 'left' }}
                    defaultValue={record.SeqNo}
                    onChange={e => record.SeqNo = e.target.value}
                />
            ) : (
                text
            );
        }
    },
    {
        title: '全路径',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'DataFullPaths',
        sorter: true,
        align: 'left',
        render: (text: string, record: DataPermissionItemProps) => {
            const editable = record.SeqNo === editingKey;
            const routeOptions = [
                { value: '1', label: '集团总部/海运事业部/订舱部' },
                { value: '2', label: '集团总部/海运事业部/订舱部/张珊珊' },
                { value: '3', label: '集团总部/铁运事业部' },
            ];
            return editable ? (
                <Select
                    // value={editingRow?.IsControlled}
                    defaultValue={record.DataFullPaths}
                    style={{ width: '100%',textAlign:'left' }}
                    onChange={(value) => record.DataFullPaths = value }
                    options={routeOptions}
                />
            ) : (
                routeOptions.find(option => option.value === record.DataFullPaths)?.label || text
            );
        }
    },
    {
        title: '状态',
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Status',
        sorter: true,
        align: 'left',
        render: (text: string, record: DataPermissionItemProps) => {
            const editable = record.SeqNo === editingKey;
            const routeOptions = [
                { value: '1', label: '启用' },
                { value: '2', label: '停用' },
            ];
            return editable ? (
                <Select
                    defaultValue={record.Status}
                    style={{ width: '100%',textAlign:'left' }}
                    onChange={(value) => record.Status = value }
                    options={routeOptions}
                />
            ) : (
                routeOptions.find(option => option.value === record.Status)?.label || text
            );
        }
    },
    {
        title: '操作',
        dataIndex: 'operation',
        fixed: 'right',
        align:'center',
        width: 60,
        render: (_: any, record: DataPermissionItemProps) => {
            const editable = record.SeqNo===editingKey;
            return editable ? (
                <>
                    <i className="iconfont icon-queding" style={{fontSize:'10px',color:'#0073e1',marginRight:'3px',marginLeft:'6px'}} title='保存' onClick={() => handleSave(record)}></i>
                    <i className="iconfont icon-quxiao" style={{fontSize:'10px',color:'#0073e1',marginRight:'3px',marginLeft:'3px'}} title='取消' onClick={handleCancel}></i>
                </>
            ) : (
                <>
                    <i className="iconfont icon-bianji" style={{fontSize:'14px',color:'#EE0F39',marginRight:'3px',marginLeft:'3px'}} title='编辑' onClick={() => handleEdit(record)}></i>
                    <Popconfirm title="确定删除?" onConfirm={() => handleDelete(record)}>
                        <i className="iconfont icon-shanchu" style={{fontSize:'14px',color:'#EE0F39',marginRight:'3px',marginLeft:'3px'}} title='删除'></i>
                    </Popconfirm>
                </>
            );
        },
    },
]; 
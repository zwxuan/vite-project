
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
        title: i18n.t(LocaleHelper.getPrimaryJobSeqNo()),
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
        title: i18n.t(LocaleHelper.getPrimaryJobOrganization()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Organization',
        sorter: true,
        align: 'left',
        render: (text: string, record: DataPermissionItemProps) => {
            const editable = record.SeqNo === editingKey;
            const routeOptions = [
                { value: '1', label: '海运事业部' },
                { value: '2', label: '空运事业部' },
                { value: '3', label: '铁运事业部' },
                { value: '4', label: '青岛分公司' },
            ];
            return editable ? (
                <Select
                    // value={editingRow?.IsControlled}
                    defaultValue={record.Organization}
                    style={{ width: '100%',textAlign:'left' }}
                    onChange={(value) => record.Organization = value }
                    options={routeOptions}
                />
            ) : (
                routeOptions.find(option => option.value === record.Organization)?.label || text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getPrimaryJobDepartment()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Department',
        sorter: true,
        align: 'left',
        render: (text: string, record: DataPermissionItemProps) => {
            const editable = record.SeqNo === editingKey;
            const routeOptions = [
                { value: '1', label: '订舱部' },
                { value: '2', label: '操作部' },
                { value: '3', label: '销售部' },
            ];
            return editable ? (
                <Select
                    // value={editingRow?.IsControlled}
                    defaultValue={record.Department}
                    style={{ width: '100%',textAlign:'left' }}
                    onChange={(value) => record.Department = value }
                    options={routeOptions}
                />
            ) : (
                routeOptions.find(option => option.value === record.Department)?.label || text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getPrimaryJobEmployeeCategory()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'EmployeeCategory',
        sorter: true,
        align: 'left',
        render: (text: string, record: DataPermissionItemProps) => {
            const editable = record.SeqNo === editingKey;
            const routeOptions = [
                { value: '1', label: '正式员工' },
                { value: '2', label: '合同工' },
                { value: '3', label: '临时工' },
                { value: '4', label: '外包工' },
            ];
            return editable ? (
                <Select
                    // value={editingRow?.IsControlled}
                    defaultValue={record.EmployeeCategory}
                    style={{ width: '100%',textAlign:'left' }}
                    onChange={(value) => record.EmployeeCategory = value }
                    options={routeOptions}
                />
            ) : (
                routeOptions.find(option => option.value === record.EmployeeCategory)?.label || text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getPrimaryJobPosition()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Position',
        sorter: true,
        align: 'left',
        render: (text: string, record: DataPermissionItemProps) => {
            const editable = record.SeqNo === editingKey;
            const routeOptions = [
                { value: '1', label: '销售代表' },
                { value: '2', label: '人力专员' },
                { value: '3', label: '开发工程师' },
                { value: '4', label: '销售工程师' },
            ];
            return editable ? (
                <Select
                    // value={editingRow?.IsControlled}
                    defaultValue={record.Position}
                    style={{ width: '100%',textAlign:'left' }}
                    onChange={(value) => record.Position = value }
                    options={routeOptions}
                />
            ) : (
                routeOptions.find(option => option.value === record.Position)?.label || text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getPrimaryJobSupervisor()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Supervisor',
        sorter: true,
        align: 'left',
        render: (text: string, record: DataPermissionItemProps) => {
            const editable = record.SeqNo === editingKey;
            const routeOptions = [
                { value: '1', label: '张三' },
                { value: '2', label: '李四' },
                { value: '3', label: '王五' },
                { value: '4', label: '赵六' },
            ];
            return editable ? (
                <Select
                    // value={editingRow?.IsControlled}
                    defaultValue={record.Supervisor}
                    style={{ width: '100%',textAlign:'left' }}
                    onChange={(value) => record.Supervisor = value }
                    options={routeOptions}
                />
            ) : (
                routeOptions.find(option => option.value === record.Supervisor)?.label || text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getPrimaryJobStartDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'StartDate',
        sorter: true,
        align: 'center',
        render: (text: string, record: DataPermissionItemProps) => {
            const editable = record.SeqNo===editingKey;
            return editable ? (
                <DatePickerZH
                    style={{ width: '100%', textAlign: 'left' }}
                    defaultValue={record.StartDate ? moment(record.StartDate) : undefined}
                    onChange={(_, dateStrings) => record.StartDate = Array.isArray(dateStrings) ? dateStrings[0] : dateStrings}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getPrimaryJobEndDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'EndDate',
        sorter: true,
        align: 'center',
        render: (text: string, record: DataPermissionItemProps) => {
            const editable = record.SeqNo===editingKey;
            return editable ? (
                <DatePickerZH
                    style={{ width: '100%', textAlign: 'left' }}
                    defaultValue={record.EndDate ? moment(record.EndDate) : undefined}
                    onChange={(_, dateStrings) => record.EndDate = Array.isArray(dateStrings) ? dateStrings[0] : dateStrings}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getPrimaryJobJobDuty()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'JobDuty',
        sorter: true,
        align: 'left',
        render: (text: string, record: DataPermissionItemProps) => {
            const editable = record.SeqNo===editingKey;
            return editable ? (
                <Input
                    style={{ width: '100%', textAlign: 'left' }}
                    defaultValue={record.JobDuty}
                    onChange={e => record.JobDuty = e.target.value}
                />
            ) : (
                text
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

import { TableColumnsType, Tag, Popconfirm, Input, Select } from 'antd';
import { EmployeeBankAccountItemProps, EmployeeManageItemProps, PartTimeJobItemProps, PrimaryJobItemProps } from "@/types/dynamic_configuration_platform/org_manage/employee_manage";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { NavLink } from 'react-router-dom';
import DatePickerZH from '@/components/date-picker';
import moment from 'moment';



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

export const getPrimaryJobColumns = (handleEdit: (record: PrimaryJobItemProps) => void, handleDelete: (record: PrimaryJobItemProps) => void, handleSave: (record: PrimaryJobItemProps) => void, handleCancel: () => void, editingKey:string): TableColumnsType<PrimaryJobItemProps> => [

    {
        title: i18n.t(LocaleHelper.getPrimaryJobSeqNo()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SeqNo',
        sorter: true,
        align: 'left',
        render: (text: string, record: PrimaryJobItemProps) => {
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
        render: (text: string, record: PrimaryJobItemProps) => {
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
        render: (text: string, record: PrimaryJobItemProps) => {
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
        render: (text: string, record: PrimaryJobItemProps) => {
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
        render: (text: string, record: PrimaryJobItemProps) => {
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
        render: (text: string, record: PrimaryJobItemProps) => {
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
        render: (text: string, record: PrimaryJobItemProps) => {
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
        render: (text: string, record: PrimaryJobItemProps) => {
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
        render: (text: string, record: PrimaryJobItemProps) => {
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
        render: (_: any, record: PrimaryJobItemProps) => {
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

export const getPartTimeJobColumns = (handleEdit: (record: PartTimeJobItemProps) => void, handleDelete: (record: PartTimeJobItemProps) => void, handleSave: (record: PartTimeJobItemProps) => void, handleCancel: () => void, editingKey:string): TableColumnsType<PartTimeJobItemProps> => [

    {
        title: i18n.t(LocaleHelper.getPrimaryJobSeqNo()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SeqNo',
        sorter: true,
        align: 'left',
        render: (text: string, record: PartTimeJobItemProps) => {
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
        render: (text: string, record: PartTimeJobItemProps) => {
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
        render: (text: string, record: PartTimeJobItemProps) => {
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
        render: (text: string, record: PartTimeJobItemProps) => {
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
        render: (text: string, record: PartTimeJobItemProps) => {
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
        render: (text: string, record: PartTimeJobItemProps) => {
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
        render: (text: string, record: PartTimeJobItemProps) => {
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
        render: (text: string, record: PartTimeJobItemProps) => {
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
        render: (text: string, record: PartTimeJobItemProps) => {
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
        render: (_: any, record: PartTimeJobItemProps) => {
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

export const getBankAccountColumns = (handleEdit: (record: EmployeeBankAccountItemProps) => void, handleDelete: (record: EmployeeBankAccountItemProps) => void, handleSave: (record: EmployeeBankAccountItemProps) => void, handleCancel: () => void, editingKey:string): TableColumnsType<EmployeeBankAccountItemProps> => [

    {
        title: i18n.t(LocaleHelper.getEmployeeBankAccountSeqNo()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SeqNo',
        sorter: true,
        align: 'left',
        render: (text: string, record: EmployeeBankAccountItemProps) => {
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
        title: i18n.t(LocaleHelper.getEmployeeBankAccountBankAccount()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BankAccount',
        sorter: true,
        align: 'left',
        render: (text: string, record: EmployeeBankAccountItemProps) => {
            const editable = record.SeqNo===editingKey;
            return editable ? (
                <Input
                    style={{ width: '100%', textAlign: 'left' }}
                    defaultValue={record.BankAccount}
                    onChange={e => record.BankAccount = e.target.value}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getEmployeeBankAccountBankType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BankType',
        sorter: true,
        align: 'left',
        render: (text: string, record: EmployeeBankAccountItemProps) => {
            const editable = record.SeqNo === editingKey;
            const routeOptions = [
                { value: '1', label: '中国银行' },
                { value: '2', label: '中国建设银行' },
                { value: '3', label: '中国工商银行' },
                { value: '4', label: '中国农业银行' },
                { value: '5', label: '中国招商银行' },
            ];
            return editable ? (
                <Select
                    // value={editingRow?.IsControlled}
                    defaultValue={record.BankType}
                    style={{ width: '100%',textAlign:'left' }}
                    onChange={(value) => record.BankType = value }
                    options={routeOptions}
                />
            ) : (
                routeOptions.find(option => option.value === record.BankType)?.label || text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getEmployeeBankAccountBankBranch()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BankBranch',
        sorter: true,
        align: 'left',
        render: (text: string, record: EmployeeBankAccountItemProps) => {
            const editable = record.SeqNo===editingKey;
            return editable ? (
                <Input
                    style={{ width: '100%', textAlign: 'left' }}
                    defaultValue={record.BankBranch}
                    onChange={e => record.BankBranch = e.target.value}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getEmployeeBankAccountAccountType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'AccountType',
        sorter: true,
        align: 'left',
        render: (text: string, record: EmployeeBankAccountItemProps) => {
            const editable = record.SeqNo === editingKey;
            const routeOptions = [
                { value: '1', label: '工资卡' },
                { value: '2', label: '福利卡' },
                { value: '3', label: '奖金卡' },
                { value: '4', label: '报销卡' },
                { value: '5', label: '公务卡' },
            ];
            return editable ? (
                <Select
                    defaultValue={record.AccountType}
                    style={{ width: '100%',textAlign:'left' }}
                    onChange={(value) => record.AccountType = value }
                    options={routeOptions}
                />
            ) : (
                routeOptions.find(option => option.value === record.AccountType)?.label || text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getEmployeeBankAccountCurrency()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Currency',
        sorter: true,
        align: 'left',
        render: (text: string, record: EmployeeBankAccountItemProps) => {
            const editable = record.SeqNo === editingKey;
            const routeOptions = [
                { value: '1', label: '人民币' },
                { value: '2', label: '美元' },
                { value: '3', label: '日元' },
                { value: '4', label: '欧元' },
                { value: '5', label: '英镑' },
            ];
            return editable ? (
                <Select
                    defaultValue={record.Currency}
                    style={{ width: '100%',textAlign:'left' }}
                    onChange={(value) => record.Currency = value }
                    options={routeOptions}
                />
            ) : (
                routeOptions.find(option => option.value === record.Currency)?.label || text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getEmployeeBankAccountIsDefault()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'IsDefault',
        sorter: true,
        align: 'right',
        render: (text: string, record: EmployeeBankAccountItemProps) => {
            const editable = record.SeqNo === editingKey;
            const routeOptions = [
                { value: '1', label: '是' },
                { value: '0', label: '否' },
            ];
            return editable ? (
                <Select
                    defaultValue={record.IsDefault}
                    style={{ width: '100%',textAlign:'left' }}
                    onChange={(value) => record.IsDefault = value }
                    options={routeOptions}
                />
            ) : (
                routeOptions.find(option => option.value === record.IsDefault.toString())?.label || text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getEmployeeBankAccountRemarks()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Remarks',
        sorter: true,
        align: 'left',
        render: (text: string, record: EmployeeBankAccountItemProps) => {
            const editable = record.SeqNo===editingKey;
            return editable ? (
                <Input
                    style={{ width: '100%', textAlign: 'left' }}
                    defaultValue={record.Remarks}
                    onChange={e => record.Remarks = e.target.value}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getEmployeeBankAccountAccountName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'AccountName',
        sorter: true,
        align: 'left',
        render: (text: string, record: EmployeeBankAccountItemProps) => {
            const editable = record.SeqNo===editingKey;
            return editable ? (
                <Input
                    style={{ width: '100%', textAlign: 'left' }}
                    defaultValue={record.AccountName}
                    onChange={e => record.AccountName = e.target.value}
                />
            ) : (
                text
            );
        }
    },
    {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (_: any, record: EmployeeBankAccountItemProps) => {
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
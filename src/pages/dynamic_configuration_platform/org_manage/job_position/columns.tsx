
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { JobPositionItemProps } from "@/types/dynamic_configuration_platform/org_manage/job_position";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: JobPositionItemProps) => void, handleDelete: (record: JobPositionItemProps) => void): TableColumnsType<JobPositionItemProps> => [

    {
        title: i18n.t(LocaleHelper.getJobPositionJobCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'JobCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getJobPositionJobName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'JobName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getJobPositionDeptBelong()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'DeptBelong',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getJobPositionParentJob()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ParentJob',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getJobPositionJobStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'JobStatus',
        sorter: true,
        align: 'center',
        render: (text) => {
            if (text === '0') {
                return <Tag>未启用</Tag>;
            } else if (text === '1') {
                return <Tag color='green'>已启用</Tag>;
            } 
            else {
                return <Tag color='red'>已停用</Tag>;
            }
        },
    },
    {
        title: i18n.t(LocaleHelper.getJobPositionJobDuty()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'JobDuty',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getJobPositionJobRemark()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'JobRemark',
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

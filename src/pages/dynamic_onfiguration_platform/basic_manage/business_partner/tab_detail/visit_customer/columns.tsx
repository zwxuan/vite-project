
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { VisitCustomerItemProps } from "@/types/dynamic_onfiguration_platform/basic_manage/visit_customer";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: VisitCustomerItemProps) => void, handleDelete: (record: VisitCustomerItemProps) => void): TableColumnsType<VisitCustomerItemProps> => [

    {
        title: i18n.t(LocaleHelper.getVisitCustomerId()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Id',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVisitCustomerTheme()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Theme',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVisitCustomerVisitTime()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'VisitTime',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getVisitCustomerRecorder()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Recorder',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVisitCustomerRecordTime()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RecordTime',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getVisitCustomerStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Status',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVisitCustomerLocation()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Location',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVisitCustomerParticipants()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Participants',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVisitCustomerContent()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Content',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVisitCustomerResult()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Result',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVisitCustomerNextTask()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'NextTask',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVisitCustomerReportTo()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ReportTo',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVisitCustomerRemarks()),
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

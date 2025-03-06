
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { SetFeeScheduleItemProps } from "@/types/set_fee_schedule/set_fee_schedule";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: SetFeeScheduleItemProps) => void, handleDelete: (record: SetFeeScheduleItemProps) => void): TableColumnsType<SetFeeScheduleItemProps> => [

    {
        title: i18n.t(LocaleHelper.getSetFeeScheduleBusinessType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BusinessType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSetFeeSchedulePlanName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'PlanName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSetFeeScheduleClient()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Client',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSetFeeScheduleCarrier()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Carrier',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSetFeeScheduleBookingAgent()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BookingAgent',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSetFeeScheduleCargoType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CargoType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSetFeeScheduleLclFclType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'LclFclType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSetFeeScheduleRouteRegion()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RouteRegion',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSetFeeScheduleInputPerson()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'InputPerson',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSetFeeScheduleInputDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'InputDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getSetFeeScheduleEffectiveDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'EffectiveDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getSetFeeScheduleExpirationDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ExpirationDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getSetFeeScheduleAuditStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'AuditStatus',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSetFeeScheduleAuditor()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Auditor',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSetFeeScheduleAuditTime()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'AuditTime',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getSetFeeSchedulePlanDescription()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'PlanDescription',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSetFeeScheduleDestinationAgent()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'DestinationAgent',
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

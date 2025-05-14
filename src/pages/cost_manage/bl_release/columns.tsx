
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { BlReleaseItemProps } from "@/types/cost_manage/bl_release/bl_release";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { NavLink } from 'react-router-dom';



export const getColumns = (handleEdit: (record: BlReleaseItemProps) => void, handleDelete: (record: BlReleaseItemProps) => void): TableColumnsType<BlReleaseItemProps> => [

    {
        title: i18n.t(LocaleHelper.getBlReleaseBusinessId()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BusinessId',
        sorter: true,
        align: 'right',
        fixed: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBlReleaseConsignor()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Consignor',
        sorter: true,
        align: 'left',
        fixed: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBlReleaseBookingAgent()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BookingAgent',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBlReleaseShippingCompany()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ShippingCompany',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBlReleasePostOfDestination()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'PostOfDestination',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBlReleaseSailingDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SailingDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getBlReleaseVesselVoyage()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'VesselVoyage',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBlReleaseMblNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'MblNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBlReleaseReleaseAuditStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ReleaseAuditStatus',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBlReleaseBlStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BlStatus',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBlReleaseAuditTime()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'AuditTime',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getBlReleaseSalesPerson()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SalesPerson',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBlReleaseReleaseNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ReleaseNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBlReleaseContractValid()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ContractValid',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getBlReleaseInvoiced()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Invoiced',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getBlReleaseFullyWrittenOff()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FullyWrittenOff',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getBlReleaseOverdue()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Overdue',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getBlReleaseOverLimit()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'OverLimit',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getBlReleaseRemarks()),
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
        width: 40,
        render: (_, record) => (
        <>
            <NavLink to={`/orders/detail?businessId=${record.BusinessId}`}>详细</NavLink>
        </>
        ),
    },
]; 

﻿
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { ReleaseOrderVerificationItemProps,ReleaseOrderVerificationFeeItemProps } from "@/types/settlement_center/cost_manage/release_order_verification";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { NavLink } from 'react-router-dom';



export const getColumns = (handleEdit: (record: ReleaseOrderVerificationItemProps) => void, handleDelete: (record: ReleaseOrderVerificationItemProps) => void): TableColumnsType<ReleaseOrderVerificationItemProps> => [

    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationBusinessId()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BusinessId',
        sorter: true,
        align: 'left',
        fixed: 'left',
        render: (text) => <a>{text}</a>,
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationConsignor()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Consignor',
        sorter: true,
        align: 'left',
        fixed: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationBookingAgent()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BookingAgent',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationShippingCompany()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ShippingCompany',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationSailingDate()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SailingDate',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationVesselVoyage()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'VesselVoyage',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationMblNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'MblNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationMblType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'MblType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationBusinessStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BusinessStatus',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationSalesPerson()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SalesPerson',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationBlStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BlStatus',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationSysAuditStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SysAuditStatus',
        sorter: true,
        align: 'center',
        render: (text) => {
            if (text === '正常') {
                return <Tag color='green'>{text}</Tag>;
            }
            else {
                return <Tag color='red'>{text}</Tag>;
            }
        },
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationReleaseAuditStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ReleaseAuditStatus',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationAuditTime()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'AuditTime',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationHoldTime()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'HoldTime',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationHoldReason()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'HoldReason',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationContractValid()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ContractValid',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationInvoiced()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Invoiced',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationFullyWrittenOff()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FullyWrittenOff',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationOverdue()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Overdue',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationOverLimit()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'OverLimit',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationRemarks()),
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
            <NavLink to={`/entrust_manage/orders/detail?businessId=${record.BusinessId}`}>详细</NavLink>
        </>
        ),
    },
]; 

export const getFeeColumns = (handleEdit: (record: ReleaseOrderVerificationFeeItemProps) => void, handleDelete: (record: ReleaseOrderVerificationFeeItemProps) => void): TableColumnsType<ReleaseOrderVerificationFeeItemProps> => [

    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationFeeSettlementUnitCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SettlementUnitCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationFeeSettlementUnitName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SettlementUnitName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationFeeFeeName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'FeeName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationFeeTransactionType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'TransactionType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationFeeCurrencyCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CurrencyCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationFeeAmount()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Amount',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationFeeDomesticForeign()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'DomesticForeign',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationFeeSettledAmount()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SettledAmount',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationFeeUnsettledAmount()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'UnsettledAmount',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationFeePayableAmount()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'PayableAmount',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationFeeRelatedBlNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RelatedBlNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationFeeBillType()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BillType',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getReleaseOrderVerificationFeeSettlementNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SettlementNumber',
        sorter: true,
        align: 'left',
    },
]; 

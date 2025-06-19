
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { InternalAgentSettlementItemProps } from "@/types/cost_manage/internal_agent_settlement";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: InternalAgentSettlementItemProps) => void, handleDelete: (record: InternalAgentSettlementItemProps) => void): TableColumnsType<InternalAgentSettlementItemProps> => [

    {
        title: i18n.t(LocaleHelper.getInternalAgentSettlementId()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Id',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getInternalAgentSettlementSettlementNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SettlementNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getInternalAgentSettlementOrderNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'OrderNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getInternalAgentSettlementServiceNumber()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ServiceNumber',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getInternalAgentSettlementCostId()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CostId',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getInternalAgentSettlementCostName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CostName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getInternalAgentSettlementCurrency()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Currency',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getInternalAgentSettlementDomesticToHk()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'DomesticToHk',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getInternalAgentSettlementHkReceiveDomestic()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'HkReceiveDomestic',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getInternalAgentSettlementHkAgentPayment()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'HkAgentPayment',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getInternalAgentSettlementStatus()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Status',
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
            <a onClick={()=>handleEdit(record)}>详细</a>
        </>
        ),
    },
]; 

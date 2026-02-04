import type { ColumnsType } from 'antd/es/table';
import { Tag, Button, Space } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { CostOverviewItem, CostStatus } from '@/types/freight_forwarding/cost_management';

// --- For Detail Page ---

export interface CostItem {
    id: string;
    itemName: string;
    quantity: number;
    unitPrice: number;
    amount: number;
    taxRate: number;
    taxAmount: number;
    totalAmount: number;
    remark?: string;
}

export const getItemColumns = (): ColumnsType<CostItem> => [
    {
        title: i18n.t(LocaleHelper.getCostOverviewColItemName()),
        dataIndex: 'itemName',
        key: 'itemName',
        width: 150,
    },
    {
        title: i18n.t(LocaleHelper.getCostOverviewColQuantity()),
        dataIndex: 'quantity',
        key: 'quantity',
        width: 100,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getCostOverviewColUnitPrice()),
        dataIndex: 'unitPrice',
        key: 'unitPrice',
        width: 120,
        align: 'right',
        render: (value) => `¥${value.toLocaleString()}`,
    },
    {
        title: i18n.t(LocaleHelper.getCostOverviewColAmount()),
        dataIndex: 'amount',
        key: 'amount',
        width: 120,
        align: 'right',
        render: (value) => `¥${value.toLocaleString()}`,
    },
    {
        title: i18n.t(LocaleHelper.getCostOverviewColTaxRate()),
        dataIndex: 'taxRate',
        key: 'taxRate',
        width: 100,
        align: 'right',
        render: (value) => `${value}%`,
    },
    {
        title: i18n.t(LocaleHelper.getCostOverviewColTaxAmount()),
        dataIndex: 'taxAmount',
        key: 'taxAmount',
        width: 120,
        align: 'right',
        render: (value) => `¥${value.toLocaleString()}`,
    },
    {
        title: i18n.t(LocaleHelper.getCostOverviewColTotalAmount()),
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        width: 120,
        align: 'right',
        render: (value) => `¥${value.toLocaleString()}`,
    },
    {
        title: i18n.t(LocaleHelper.getCostOverviewLabelRemark()),
        dataIndex: 'remark',
        key: 'remark',
        ellipsis: true,
    },
];

// --- For Index Page ---

export const getColumns = (onViewDetail: (record: CostOverviewItem) => void): ColumnsType<CostOverviewItem> => [
    {
        title: i18n.t(LocaleHelper.getCostOverviewColOrderNo()),
        dataIndex: 'orderNo',
        key: 'orderNo',
        width: 150,
    },
    {
        title: i18n.t(LocaleHelper.getCostOverviewColWaybillNo()),
        dataIndex: 'waybillNo',
        key: 'waybillNo',
        width: 150,
    },
    {
        title: i18n.t(LocaleHelper.getCostOverviewColCostType()),
        dataIndex: 'costType',
        key: 'costType',
        width: 100,
        render: (text) => (
            <Tag color={text === 'RECEIVABLE' ? 'green' : 'orange'}>
                {text === 'RECEIVABLE' 
                    ? i18n.t(LocaleHelper.getCostOverviewTypeReceivable()) 
                    : i18n.t(LocaleHelper.getCostOverviewTypePayable())}
            </Tag>
        ),
    },
    {
        title: i18n.t(LocaleHelper.getCostOverviewColCostName()),
        dataIndex: 'costName',
        key: 'costName',
        width: 150,
    },
    {
        title: i18n.t(LocaleHelper.getCostOverviewColAmount()),
        dataIndex: 'amount',
        key: 'amount',
        width: 120,
        align: 'right',
        render: (value, record) => `${record.currency} ${value.toLocaleString()}`,
    },
    {
        title: i18n.t(LocaleHelper.getCostOverviewColStatus()),
        dataIndex: 'status',
        key: 'status',
        width: 100,
        render: (status: CostStatus) => {
             const statusConfig = {
                [CostStatus.DRAFT]: { color: 'default', text: i18n.t(LocaleHelper.getCostOverviewStatusDraft()) },
                [CostStatus.PENDING]: { color: 'processing', text: i18n.t(LocaleHelper.getCostOverviewStatusPending()) },
                [CostStatus.APPROVED]: { color: 'success', text: i18n.t(LocaleHelper.getCostOverviewStatusApproved()) },
                [CostStatus.REJECTED]: { color: 'error', text: i18n.t(LocaleHelper.getCostOverviewStatusRejected()) },
                [CostStatus.CONFIRMED]: { color: 'success', text: i18n.t(LocaleHelper.getCostOverviewStatusConfirmed()) },
            };
            const config = statusConfig[status] || { color: 'default', text: status };
            return <Tag color={config.color}>{config.text}</Tag>;
        },
    },
    {
        title: i18n.t(LocaleHelper.getCostOverviewColCustomer()) + '/' + i18n.t(LocaleHelper.getCostOverviewLabelSupplier()),
        key: 'customerSupplier',
        width: 200,
        render: (_, record) => record.customer || record.supplier || '-',
    },
    {
        title: i18n.t(LocaleHelper.getCostOverviewLabelCreateTime()),
        dataIndex: 'createTime',
        key: 'createTime',
        width: 160,
    },
    {
        title: i18n.t(LocaleHelper.getCostOverviewBtnDetail()),
        key: 'action',
        fixed: 'right',
        width: 100,
        render: (_, record) => (
            <Button 
                type="link" 
                size="small"
                icon={<EyeOutlined />} 
                onClick={() => onViewDetail(record)}
            >
                {i18n.t(LocaleHelper.getCostOverviewBtnDetail())}
            </Button>
        ),
    },
];

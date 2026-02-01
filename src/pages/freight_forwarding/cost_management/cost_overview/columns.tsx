import React from 'react';
import { Space, Button, Tag } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { CostOverviewItem, CostStatus } from '@/types/freight_forwarding/cost_management';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

// 获取状态标签
const getStatusTag = (status: CostStatus) => {
    const statusConfig = {
        [CostStatus.DRAFT]: { color: 'default', text: i18n.t(LocaleHelper.getCostOverviewStatusDraft()) },
        [CostStatus.PENDING]: { color: 'processing', text: i18n.t(LocaleHelper.getCostOverviewStatusPending()) },
        [CostStatus.APPROVED]: { color: 'success', text: i18n.t(LocaleHelper.getCostOverviewStatusConfirmed()) },
        [CostStatus.REJECTED]: { color: 'error', text: i18n.t(LocaleHelper.getCostOverviewStatusRejected()) },
        [CostStatus.CONFIRMED]: { color: 'success', text: i18n.t(LocaleHelper.getCostOverviewStatusConfirmed()) },
    };
    const config = statusConfig[status] || { color: 'default', text: status };
    return <Tag color={config.color}>{config.text}</Tag>;
};

// 获取费用类型标签
const getCostTypeTag = (costType: 'RECEIVABLE' | 'PAYABLE') => {
    return costType === 'RECEIVABLE'
        ? <Tag color="green">{i18n.t(LocaleHelper.getCostOverviewTypeReceivable())}</Tag>
        : <Tag color="orange">{i18n.t(LocaleHelper.getCostOverviewTypePayable())}</Tag>;
};

export const getColumns = (
    handleViewDetail: (record: CostOverviewItem) => void
): ColumnsType<CostOverviewItem> => [
        {
            title: i18n.t(LocaleHelper.getCostOverviewColOrderNo()),
            dataIndex: 'orderNo',
            key: 'orderNo',
            width: 150,
            fixed: 'left',
            render: (text) => text || '-',
        },
        {
            title: i18n.t(LocaleHelper.getCostOverviewColWaybillNo()),
            dataIndex: 'waybillNo',
            key: 'waybillNo',
            width: 150,
            render: (text) => text || '-',
        },
        {
            title: i18n.t(LocaleHelper.getCostOverviewColCostType()),
            dataIndex: 'costType',
            key: 'costType',
            width: 100,
            render: (value) => getCostTypeTag(value),
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
            render: (status) => getStatusTag(status),
        },
        {
            title: i18n.t(LocaleHelper.getCostOverviewColCustomer()),
            key: 'partner',
            width: 150,
            render: (_, record) => record.customer || record.supplier || '-',
        },
        {
            title: i18n.t(LocaleHelper.getReceivableCostFormCreateTime()),
            dataIndex: 'createTime',
            key: 'createTime',
            width: 150,
        },
        {
            title: i18n.t(LocaleHelper.getCostOverviewColAction()),
            key: 'action',
            width: 120,
            fixed: 'right',
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="link"
                        size="small"
                        icon={<FileSearchOutlined />}
                        onClick={() => handleViewDetail(record)}
                    >
                        {i18n.t(LocaleHelper.getCostOverviewBtnDetail())}
                    </Button>
                </Space>
            ),
        },
    ];

import React from 'react';
import { Space, Button, Tag } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { CostReviewItem, CostStatus, CostUrgency } from '@/types/freight_forwarding/cost_management';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

// 获取紧急程度标签
const getUrgencyTag = (urgency: CostUrgency) => {
    const urgencyConfig = {
        [CostUrgency.NORMAL]: { color: 'default', text: i18n.t(LocaleHelper.getCostReviewCenterUrgencyNormal()) },
        [CostUrgency.URGENT]: { color: 'warning', text: i18n.t(LocaleHelper.getCostReviewCenterUrgencyUrgent()) },
        [CostUrgency.VERY_URGENT]: { color: 'error', text: i18n.t(LocaleHelper.getCostReviewCenterUrgencyVeryUrgent()) },
    };
    const config = urgencyConfig[urgency] || { color: 'default', text: urgency };
    return <Tag color={config.color}>{config.text}</Tag>;
};

// 获取状态标签
const getStatusTag = (status: CostStatus) => {
    const statusConfig = {
        [CostStatus.DRAFT]: { color: 'default', text: '草稿' },
        [CostStatus.PENDING]: { color: 'processing', text: '待审核' },
        [CostStatus.APPROVED]: { color: 'success', text: '已审核' },
        [CostStatus.REJECTED]: { color: 'error', text: '已驳回' },
        [CostStatus.CONFIRMED]: { color: 'success', text: '已确认' },
    };
    const config = statusConfig[status] || { color: 'default', text: status };
    return <Tag color={config.color}>{config.text}</Tag>;
};

// 获取费用类型标签
const getCostTypeTag = (costType: string) => {
    const typeConfig: Record<string, { color: string; text: string }> = {
        'RECEIVABLE': { color: 'blue', text: i18n.t(LocaleHelper.getCostReviewCenterCostTypeReceivable()) },
        'PAYABLE': { color: 'orange', text: i18n.t(LocaleHelper.getCostReviewCenterCostTypePayable()) },
    };
    const config = typeConfig[costType] || { color: 'default', text: costType };
    return <Tag color={config.color}>{config.text}</Tag>;
};

export const getColumns = (
    handleReview: (record: CostReviewItem, action: 'approve' | 'reject') => void
): ColumnsType<CostReviewItem> => [
        {
            title: i18n.t(LocaleHelper.getCostReviewCenterColCostType()),
            dataIndex: 'costType',
            key: 'costType',
            width: 100,
            fixed: 'left',
            render: (costType) => getCostTypeTag(costType),
        },
        {
            title: i18n.t(LocaleHelper.getCostReviewCenterColOrderNo()),
            dataIndex: 'orderNo',
            key: 'orderNo',
            width: 150,
        },
        {
            title: i18n.t(LocaleHelper.getCostReviewCenterColCustomer()),
            dataIndex: 'customerName',
            key: 'customerName',
            width: 150,
            render: (text, record) => record.costType === 'RECEIVABLE' ? text : '-',
        },
        {
            title: i18n.t(LocaleHelper.getCostReviewCenterColSupplier()),
            dataIndex: 'supplierName',
            key: 'supplierName',
            width: 150,
            render: (text, record) => record.costType === 'PAYABLE' ? text : '-',
        },
        {
            title: i18n.t(LocaleHelper.getCostReviewCenterColAmount()),
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            width: 120,
            align: 'right',
            render: (value, record) => `${record.currency} ${value.toLocaleString()}`,
        },
        {
            title: i18n.t(LocaleHelper.getCostReviewCenterColSubmitTime()),
            dataIndex: 'submitTime',
            key: 'submitTime',
            width: 150,
        },
        {
            title: i18n.t(LocaleHelper.getCostReviewCenterColUrgency()),
            dataIndex: 'urgency',
            key: 'urgency',
            width: 100,
            render: (urgency) => getUrgencyTag(urgency),
        },
        {
            title: i18n.t(LocaleHelper.getCostReviewCenterColStatus()),
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (status) => getStatusTag(status),
        },
        {
            title: i18n.t(LocaleHelper.getCostReviewCenterColAction()),
            key: 'action',
            width: 180,
            fixed: 'right',
            render: (_, record) => (
                <Space size="small">
                    {record.status === CostStatus.PENDING && (
                        <>
                            <Button
                                type="link"
                                size="small"
                                icon={<CheckOutlined />}
                                onClick={() => handleReview(record, 'approve')}
                            >
                                {i18n.t(LocaleHelper.getCostReviewCenterBtnApprove())}
                            </Button>
                            <Button
                                type="link"
                                size="small"
                                danger
                                icon={<CloseOutlined />}
                                onClick={() => handleReview(record, 'reject')}
                            >
                                {i18n.t(LocaleHelper.getCostReviewCenterBtnReject())}
                            </Button>
                        </>
                    )}
                    {record.status !== CostStatus.PENDING && (
                        <span style={{ color: '#999' }}>已处理</span>
                    )}
                </Space>
            ),
        },
    ];

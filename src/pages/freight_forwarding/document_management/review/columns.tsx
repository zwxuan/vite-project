import React from 'react';
import { Space, Tag } from 'antd';
import { DocumentItem } from '@/types/freight_forwarding/document_management';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getReviewColumns = (
    handleReview: (record: DocumentItem) => void,
) => [
        {
            title: i18n.t(LocaleHelper.getDocumentListCode()),
            dataIndex: 'code',
            key: 'code',
            width: 150,
        },
        {
            title: i18n.t(LocaleHelper.getDocumentListType()),
            dataIndex: 'type',
            key: 'type',
            width: 120,
        },
        {
            title: i18n.t(LocaleHelper.getDocumentListWaybillNo()),
            dataIndex: 'waybill_no',
            key: 'waybill_no',
            width: 150,
        },
        {
            title: i18n.t(LocaleHelper.getDocumentReviewSubmitter()),
            dataIndex: 'creator',
            key: 'creator',
            width: 120,
        },
        {
            title: i18n.t(LocaleHelper.getDocumentReviewSubmitTime()),
            dataIndex: 'create_time',
            key: 'create_time',
            width: 180,
        },
        {
            title: i18n.t(LocaleHelper.getDocumentListStatus()),
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (status: string) => {
                return <Tag color="warning">{status}</Tag>;
            },
        },
        {
            title: i18n.t(LocaleHelper.getAction()),
            key: 'action',
            fixed: 'right' as const,
            width: 100,
            render: (_: unknown, record: DocumentItem) => (
                <Space size="middle">
                    <a onClick={() => handleReview(record)}>{i18n.t(LocaleHelper.getDocumentReviewDetail())}</a>
                </Space>
            ),
        },
    ];

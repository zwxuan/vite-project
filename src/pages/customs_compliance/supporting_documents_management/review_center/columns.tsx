import React from 'react';
import { ColumnsType } from 'antd/es/table';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { ReviewItem } from '@/api/customs_compliance/supporting_documents_management/review_service';
import { Space, Tag } from 'antd';

export const getColumns = (
  onReview: (record: ReviewItem) => void,
): ColumnsType<ReviewItem> => [
  {
    title: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementReviewCenterTablePreEntryNo()),
    dataIndex: 'preEntryNo',
    key: 'preEntryNo',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementReviewCenterTableBusinessType()),
    dataIndex: 'businessType',
    key: 'businessType',
    width: 100,
    render: (text) => text === 'import' ? '进口' : '出口',
  },
  {
    title: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementReviewCenterTableDocCount()),
    dataIndex: 'docCount',
    key: 'docCount',
    width: 100,
  },
  {
    title: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementReviewCenterTableSubmitTime()),
    dataIndex: 'submitTime',
    key: 'submitTime',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementReviewCenterTableReviewer()),
    dataIndex: 'reviewer',
    key: 'reviewer',
    width: 100,
  },
  {
    title: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementReviewCenterTableStatus()),
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: (status) => {
        let color = 'default';
        let text = status;
        if (status === 'reviewing') { color = 'processing'; text = '审核中'; }
        else if (status === 'pending_review') { color = 'warning'; text = '待审核'; }
        else if (status === 'approved') { color = 'success'; text = '审核通过'; }
        return <Tag color={color}>{text}</Tag>;
    }
  },
  {
    title: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementReviewCenterTableAction()),
    key: 'action',
    fixed: 'right',
    width: 100,
    render: (_, record) => (
      <Space size="middle">
        <a onClick={() => onReview(record)}>审核</a>
      </Space>
    ),
  },
];

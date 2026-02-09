import React from 'react';
import { ColumnsType } from 'antd/es/table';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { DocumentWorkbenchItem } from '@/api/customs_compliance/supporting_documents_management/workbench_service';
import { Space, Tag } from 'antd';

export const getColumns = (
  onManage: (record: DocumentWorkbenchItem) => void,
  onUrge: (record: DocumentWorkbenchItem) => void,
  onReview: (record: DocumentWorkbenchItem) => void,
  onView: (record: DocumentWorkbenchItem) => void,
): ColumnsType<DocumentWorkbenchItem> => [
  {
    title: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementDocumentWorkbenchTablePreEntryNo()),
    dataIndex: 'preEntryNo',
    key: 'preEntryNo',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementDocumentWorkbenchTableBusinessType()),
    dataIndex: 'businessType',
    key: 'businessType',
    width: 100,
    render: (text) => text === 'import' ? '进口' : '出口',
  },
  {
    title: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementDocumentWorkbenchTableTotalDocs()),
    dataIndex: 'totalDocs',
    key: 'totalDocs',
    width: 100,
  },
  {
    title: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementDocumentWorkbenchTableCollected()),
    dataIndex: 'collectedDocs',
    key: 'collectedDocs',
    width: 100,
  },
  {
    title: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementDocumentWorkbenchTablePendingReview()),
    dataIndex: 'pendingReviewDocs',
    key: 'pendingReviewDocs',
    width: 100,
  },
  {
    title: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementDocumentWorkbenchTableStatus()),
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: (status) => {
        let color = 'default';
        let text = status;
        if (status === 'collecting') { color = 'processing'; text = '收集中'; }
        else if (status === 'pending_review') { color = 'warning'; text = '待审核'; }
        else if (status === 'approved') { color = 'success'; text = '审核通过'; }
        else if (status === 'pending_collection') { color = 'default'; text = '待收集'; }
        else if (status === 'reviewing') { color = 'processing'; text = '审核中'; }
        else if (status === 'needs_correction') { color = 'error'; text = '需补充'; }
        else if (status === 'archived') { color = 'default'; text = '已归档'; }
        return <Tag color={color}>{text}</Tag>;
    }
  },
  {
    title: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementDocumentWorkbenchTableOwner()),
    dataIndex: 'owner',
    key: 'owner',
    width: 100,
  },
  {
    title: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementDocumentWorkbenchTableAction()),
    key: 'action',
    fixed: 'right',
    width: 200,
    render: (_, record) => (
      <Space size="middle">
        {record.status === 'collecting' || record.status === 'pending_collection' || record.status === 'needs_correction' ? (
            <>
                <a onClick={() => onManage(record)}>管理</a>
                <a onClick={() => onUrge(record)}>催办</a>
            </>
        ) : null}
        {record.status === 'pending_review' || record.status === 'reviewing' ? (
            <>
                <a onClick={() => onReview(record)}>审核</a>
                <a onClick={() => onView(record)}>查看</a>
            </>
        ) : null}
        {record.status === 'approved' || record.status === 'archived' ? (
            <a onClick={() => onView(record)}>查看</a>
        ) : null}
      </Space>
    ),
  },
];

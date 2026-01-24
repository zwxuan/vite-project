
import React from 'react';
import { Button, Space, Tag } from 'antd';
import { DocumentItem } from '@/types/freight_forwarding/document_management';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getColumns = (
  handleEdit: (record: DocumentItem) => void,
  handleDelete: (record: DocumentItem) => void,
  handleDetail: (record: DocumentItem) => void,
  isQuery: boolean = false
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
    title: i18n.t(LocaleHelper.getDocumentListCustomer()),
    dataIndex: 'customer',
    key: 'customer',
    width: 200,
  },
  {
    title: i18n.t(LocaleHelper.getDocumentListStatus()),
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (status: string) => {
      let color = 'default';
      if (status === 'Approved') color = 'success';
      if (status === 'Rejected') color = 'error';
      if (status === 'Issued') color = 'processing';
      if (status === 'PendingReview') color = 'warning';
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: i18n.t(LocaleHelper.getDocumentListCreateTime()),
    dataIndex: 'create_time',
    key: 'create_time',
    width: 180,
  },
  {
    title: i18n.t(LocaleHelper.getDocumentListCarrier()),
    dataIndex: 'carrier',
    key: 'carrier',
    width: 150,
  },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right' as const,
    width: 200,
    render: (_: any, record: DocumentItem) => (
      <Space size="middle">
        <a onClick={() => handleDetail(record)}>{i18n.t(LocaleHelper.getDocumentListDetail())}</a>
        {!isQuery && (
          <>
            <a onClick={() => handleEdit(record)}>{i18n.t(LocaleHelper.getDocumentListEdit())}</a>
            <a onClick={() => handleDelete(record)} style={{ color: 'red' }}>{i18n.t(LocaleHelper.getDocumentListDelete())}</a>
          </>
        )}
      </Space>
    ),
  },
];

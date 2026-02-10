import React from 'react';
import { ColumnsType } from 'antd/es/table';
import i18n from '@/i18n';
import { ArchiveManagementLocale } from '@/utils/locale/customs_compliance/supporting_documents_management/archive_management';
import { ArchiveItem } from '@/api/customs_compliance/supporting_documents_management/archive_service';
import { Space, Tag } from 'antd';

export const getColumns = (
  onRestore: (record: ArchiveItem) => void,
  onDelete: (record: ArchiveItem) => void,
): ColumnsType<ArchiveItem> => [
  {
    title: i18n.t(ArchiveManagementLocale.getTablePreEntryNo()),
    dataIndex: 'preEntryNo',
    key: 'preEntryNo',
  },
  {
    title: i18n.t(ArchiveManagementLocale.getTableDeclarationNo()),
    dataIndex: 'declarationNo',
    key: 'declarationNo',
  },
  {
    title: i18n.t(ArchiveManagementLocale.getTableBusinessType()),
    dataIndex: 'businessType',
    key: 'businessType',
  },
  {
    title: i18n.t(ArchiveManagementLocale.getTableClientName()),
    dataIndex: 'clientName',
    key: 'clientName',
  },
  {
    title: i18n.t(ArchiveManagementLocale.getTableDocType()),
    dataIndex: 'docType',
    key: 'docType',
  },
  {
    title: i18n.t(ArchiveManagementLocale.getTableDeclarationDate()),
    dataIndex: 'declarationDate',
    key: 'declarationDate',
  },
  {
    title: i18n.t(ArchiveManagementLocale.getTableArchiveDate()),
    dataIndex: 'archiveDate',
    key: 'archiveDate',
  },
  {
    title: i18n.t(ArchiveManagementLocale.getTableArchivist()),
    dataIndex: 'archivist',
    key: 'archivist',
  },
  {
    title: i18n.t(ArchiveManagementLocale.getTableArchiveReason()),
    dataIndex: 'archiveReason',
    key: 'archiveReason',
  },
  {
    title: i18n.t(ArchiveManagementLocale.getTableStatus()),
    dataIndex: 'status',
    key: 'status',
    render: (status) => <Tag color="default">{status}</Tag>,
  },
  {
    title: i18n.t(ArchiveManagementLocale.getTableAction()),
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a onClick={() => onRestore(record)}>{i18n.t(ArchiveManagementLocale.getActionRestore())}</a>
        <a onClick={() => onDelete(record)} style={{ color: 'red' }}>{i18n.t(ArchiveManagementLocale.getActionDelete())}</a>
      </Space>
    ),
  },
];

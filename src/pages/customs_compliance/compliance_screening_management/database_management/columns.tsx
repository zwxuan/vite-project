import React from 'react';
import { Tag, Space, Button } from 'antd';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getColumns = (
  updatingKeys: string[],
  handleRowUpdate: (key: string) => void,
  handleShowDetail: (record: any) => void
) => [
  { 
      title: i18n.t(LocaleHelper.getDatabaseManagementColName()), 
      dataIndex: 'name', 
      key: 'name',
      width: 200,
  },
  {
      title: i18n.t(LocaleHelper.getDatabaseManagementColIssuingAuthority()),
      dataIndex: 'issuingAuthority',
      key: 'issuingAuthority',
      width: 150,
  },
  {
      title: i18n.t(LocaleHelper.getDatabaseManagementColType()),
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (text: string) => <Tag>{text}</Tag>
  },
  { 
      title: i18n.t(LocaleHelper.getDatabaseManagementColVersion()), 
      dataIndex: 'version', 
      key: 'version',
      width: 120,
  },
  { 
      title: i18n.t(LocaleHelper.getDatabaseManagementColCount()), 
      dataIndex: 'count', 
      key: 'count',
      align: 'right' as const,
      width: 100,
  },
  { 
      title: i18n.t(LocaleHelper.getDatabaseManagementColLastUpdate()), 
      dataIndex: 'lastUpdate', 
      key: 'lastUpdate',
      width: 120,
  },
  { 
      title: i18n.t(LocaleHelper.getDatabaseManagementColStatus()), 
      dataIndex: 'status', 
      key: 'status', 
      width: 100,
      render: (text: string) => {
        let color = 'blue';
        if (text === i18n.t(LocaleHelper.getDatabaseManagementStatusNormal())) color = 'green';
        if (text === i18n.t(LocaleHelper.getDatabaseManagementStatusUpdating())) color = 'orange';
        if (text === i18n.t(LocaleHelper.getDatabaseManagementStatusError())) color = 'red';
        return <Tag color={color}>{text}</Tag>;
      }
  },
  {
    title: i18n.t(LocaleHelper.getDatabaseManagementColAction()),
    key: 'action',
    fixed: 'right' as const,
    width: 150,
    render: (_: any, record: any) => (
      <Space size="middle">
        <a onClick={() => handleRowUpdate(record.key)}>
          {updatingKeys.includes(record.key) ? i18n.t(LocaleHelper.getDatabaseManagementStatusUpdating()) : i18n.t(LocaleHelper.getDatabaseManagementBtnUpdate())}
        </a>
        <a onClick={() => handleShowDetail(record)}>{i18n.t(LocaleHelper.getDatabaseManagementBtnDetails())}</a>
      </Space>
    ),
  },
];

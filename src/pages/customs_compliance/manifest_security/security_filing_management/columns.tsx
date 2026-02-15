import React from 'react';
import { Tag, Button, Space, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/es/table';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const getColumns = (onAction: (key: string, record: any) => void): ColumnsType<any> => [
  {
    title: i18n.t(LocaleHelper.getSecurityFilingManagementColumnsFilingNo()),
    dataIndex: 'filing_no',
    key: 'filing_no',
  },
  {
    title: i18n.t(LocaleHelper.getSecurityFilingManagementColumnsType()),
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: i18n.t(LocaleHelper.getSecurityFilingManagementColumnsStatus()),
    dataIndex: 'status',
    key: 'status',
     render: (status) => {
        let color = 'default';
        if (status === '已接受') color = 'success';
        if (status === '处理中') color = 'processing';
        if (status === '被拒绝') color = 'error';
        return <Tag color={color}>{status}</Tag>;
    }
  },
  {
    title: i18n.t(LocaleHelper.getSecurityFilingManagementColumnsSubmissionTime()),
    dataIndex: 'submission_time',
    key: 'submission_time',
  },
  {
    title: i18n.t(LocaleHelper.getSecurityFilingManagementColumnsOperation()),
    key: 'operation',
    render: (_, record) => (
      <Space size="middle">
        <a onClick={() => onAction('view', record)}>详情</a>
        <a onClick={() => onAction('track', record)}>状态</a>
      </Space>
    ),
  },
];

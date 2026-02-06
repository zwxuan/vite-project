import React from 'react';
import { Tag, Space } from 'antd';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getColumns = (handleApprove: (record: any) => void, handleDetail: (record: any) => void) => [
  {
    title: i18n.t(LocaleHelper.getExemptionRequestColRequestId()),
    dataIndex: 'id',
    key: 'id',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getExemptionRequestColScreeningId()),
    dataIndex: 'screeningId',
    key: 'screeningId',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getExemptionRequestColEntity()),
    dataIndex: 'entity',
    key: 'entity',
    width: 200,
  },
  {
    title: i18n.t(LocaleHelper.getExemptionRequestColRiskLevel()),
    dataIndex: 'risk',
    key: 'risk',
    width: 100,
    render: (text: string) => <Tag color={text === 'High' ? 'red' : 'orange'}>{text}</Tag>,
  },
  {
    title: i18n.t(LocaleHelper.getExemptionRequestColApplicant()),
    dataIndex: 'applicant',
    key: 'applicant',
    width: 120,
  },
  {
    title: i18n.t(LocaleHelper.getExemptionRequestColStatus()),
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: (text: string) => (
      <Tag color={text === 'Pending' ? 'blue' : text === 'Approved' ? 'green' : 'red'}>
        {text}
      </Tag>
    ),
  },
  {
    title: i18n.t(LocaleHelper.getExemptionRequestColCreateTime()),
    dataIndex: 'createTime',
    key: 'createTime',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getExemptionRequestColAction()),
    key: 'action',
    fixed: 'right' as const,
    width: 60,
    render: (_: any, record: any) => (
      <>
        <a onClick={() => handleApprove(record)}>{i18n.t(LocaleHelper.getExemptionRequestBtnApprove())}</a>
        <a onClick={() => handleDetail(record)}>{i18n.t(LocaleHelper.getExemptionRequestBtnDetail())}</a>
      </>
    ),
  },
];

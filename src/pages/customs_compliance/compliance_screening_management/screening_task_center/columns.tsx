import React from 'react';
import { ColumnsType } from 'antd/es/table';
import { Tag, Space } from 'antd';
import { ScreeningTask } from '@/api/customs_compliance/compliance_screening_management/screening_service';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getColumns = (
  handleDetail: (record: ScreeningTask) => void,
  handleReport: (record: ScreeningTask) => void,
  handleProcess: (record: ScreeningTask) => void
): ColumnsType<ScreeningTask> => [
  {
    title: i18n.t(LocaleHelper.getScreeningTaskCenterColScreeningId()),
    dataIndex: 'screeningId',
    key: 'screeningId',
    width: 180,
    fixed: 'left',
  },
  {
    title: i18n.t(LocaleHelper.getScreeningTaskCenterColJobId()),
    dataIndex: 'jobId',
    key: 'jobId',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getScreeningTaskCenterColType()),
    dataIndex: 'type',
    key: 'type',
    width: 120,
    render: (type) => {
      const typeMap: Record<string, string> = {
        'COMPREHENSIVE': '全面筛查',
        'QUICK': '快速筛查',
        'TARGETED': '定向筛查',
      };
      return typeMap[type] || type;
    },
  },
  {
    title: i18n.t(LocaleHelper.getScreeningTaskCenterColRiskLevel()),
    dataIndex: 'riskLevel',
    key: 'riskLevel',
    width: 100,
    render: (level) => {
      const colorMap: Record<string, string> = {
        'HIGH': 'red',
        'MEDIUM': 'orange',
        'LOW': 'green',
      };
      const textMap: Record<string, string> = {
        'HIGH': '高风险',
        'MEDIUM': '中风险',
        'LOW': '低风险',
      };
      return <Tag color={colorMap[level]}>{textMap[level] || level}</Tag>;
    },
  },
  {
    title: i18n.t(LocaleHelper.getScreeningTaskCenterColHits()),
    dataIndex: 'hits',
    key: 'hits',
    width: 100,
  },
  {
    title: i18n.t(LocaleHelper.getScreeningTaskCenterColStatus()),
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: (status) => {
      const statusMap: Record<string, string> = {
        'COMPLETED': '已完成',
        'PENDING': '待处理',
        'PROCESSING': '执行中',
      };
      return statusMap[status] || status;
    },
  },
  {
    title: i18n.t(LocaleHelper.getScreeningTaskCenterColProcessor()),
    dataIndex: 'processor',
    key: 'processor',
    width: 120,
  },
  {
    title: i18n.t(LocaleHelper.getScreeningTaskCenterColCreateTime()),
    dataIndex: 'createTime',
    key: 'createTime',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getScreeningTaskCenterColAction()),
    key: 'action',
    fixed: 'right',
    width: 60,
    render: (_, record) => (
      <>
        <a onClick={() => handleDetail(record)}>{i18n.t(LocaleHelper.getScreeningTaskCenterBtnDetail())}</a>
        {record.status === 'COMPLETED' && (
          <a onClick={() => handleReport(record)}>{i18n.t(LocaleHelper.getScreeningTaskCenterBtnReport())}</a>
        )}
        {record.status === 'PENDING' && (
          <a onClick={() => handleProcess(record)}>{i18n.t(LocaleHelper.getScreeningTaskCenterBtnProcess())}</a>
        )}
      </>
    ),
  },
];

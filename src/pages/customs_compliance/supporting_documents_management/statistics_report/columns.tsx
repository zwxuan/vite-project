import React from 'react';
import { ColumnsType } from 'antd/es/table';
import { Tag } from 'antd';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { DetailItem } from '@/types/customs_compliance/supporting_documents_management/statistics';

export const getColumns = (): ColumnsType<DetailItem> => [
  {
    title: i18n.t(LocaleHelper.getCcsdmStatisticsReportTableJobNo()),
    dataIndex: 'jobNo',
    key: 'jobNo',
  },
  {
    title: i18n.t(LocaleHelper.getCcsdmStatisticsReportTableCustomer()),
    dataIndex: 'customer',
    key: 'customer',
  },
  {
    title: i18n.t(LocaleHelper.getCcsdmStatisticsReportTableDocType()),
    dataIndex: 'docType',
    key: 'docType',
  },
  {
    title: i18n.t(LocaleHelper.getCcsdmStatisticsReportTableStatus()),
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
        let color = 'default';
        let text = status;
        switch(status) {
            case 'completed': 
                color = 'success'; 
                text = i18n.t(LocaleHelper.getCcsdmStatisticsReportStatusCompleted());
                break;
            case 'missing': 
                color = 'error'; 
                text = i18n.t(LocaleHelper.getCcsdmStatisticsReportStatusMissing());
                break;
            case 'overdue': 
                color = 'warning'; 
                text = i18n.t(LocaleHelper.getCcsdmStatisticsReportStatusOverdue());
                break;
        }
        return <Tag color={color}>{text}</Tag>;
    }
  },
  {
    title: i18n.t(LocaleHelper.getCcsdmStatisticsReportTableDueDate()),
    dataIndex: 'dueDate',
    key: 'dueDate',
  },
  {
    title: i18n.t(LocaleHelper.getCcsdmStatisticsReportTableCollectedDate()),
    dataIndex: 'collectedDate',
    key: 'collectedDate',
  },
];

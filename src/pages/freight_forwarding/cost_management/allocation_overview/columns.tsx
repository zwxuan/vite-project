import React from 'react';
import { Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AllocationItem } from '@/api/freight_forwarding/cost_management/allocation_service';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getColumns = (
  handleViewDetail: (record: AllocationItem) => void,
  handleAllocate: (record: AllocationItem) => void
): ColumnsType<AllocationItem> => [
    {
      title: i18n.t(LocaleHelper.getAllocationOverviewColAllocationNo()),
      dataIndex: 'allocationNo',
      key: 'allocationNo',
      width: 180,
    },
    {
      title: i18n.t(LocaleHelper.getAllocationOverviewColOrderNo()),
      dataIndex: 'orderNo',
      key: 'orderNo',
      width: 150,
    },
    {
      title: i18n.t(LocaleHelper.getAllocationOverviewColCustomer()),
      dataIndex: 'customerName',
      key: 'customerName',
      width: 200,
    },
    {
      title: i18n.t(LocaleHelper.getAllocationOverviewColTotalIncome()),
      dataIndex: 'totalIncome',
      key: 'totalIncome',
      align: 'right',
      render: (val) => `¥${val.toLocaleString()}`,
    },
    {
      title: i18n.t(LocaleHelper.getAllocationOverviewColSalesIncome()),
      dataIndex: 'salesIncome',
      key: 'salesIncome',
      align: 'right',
      render: (val) => `¥${val.toLocaleString()}`,
    },
    {
      title: i18n.t(LocaleHelper.getAllocationOverviewColOpsIncome()),
      dataIndex: 'opsIncome',
      key: 'opsIncome',
      align: 'right',
      render: (val) => `¥${val.toLocaleString()}`,
    },
    {
      title: i18n.t(LocaleHelper.getAllocationOverviewColRuleName()),
      dataIndex: 'ruleName',
      key: 'ruleName',
      width: 150,
    },
    {
      title: i18n.t(LocaleHelper.getAllocationOverviewColStatus()),
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'default';
        let text = status;
        if (status === 'allocated') {
          color = 'success';
          text = i18n.t(LocaleHelper.getAllocationOverviewStatusAllocated());
        } else if (status === 'pending') {
          color = 'warning';
          text = i18n.t(LocaleHelper.getAllocationOverviewStatusPending());
        } else if (status === 'exception') {
          color = 'error';
          text = i18n.t(LocaleHelper.getAllocationOverviewStatusException());
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: i18n.t(LocaleHelper.getAllocationOverviewColSalesman()),
      dataIndex: 'salesman',
      key: 'salesman',
    },
    {
      title: i18n.t(LocaleHelper.getOperation()),
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleViewDetail(record)}>{i18n.t(LocaleHelper.getAllocationOverviewActionDetail())}</a>
          {record.status === 'pending' && (
            <a onClick={() => handleAllocate(record)}>{i18n.t(LocaleHelper.getAllocationOverviewActionAllocate())}</a>
          )}
        </Space>
      ),
    },
  ];

export const getRecordColumns = (): ColumnsType<AllocationItem> => [
  {
    title: i18n.t(LocaleHelper.getAllocationOverviewColAllocationNo()),
    dataIndex: 'allocationNo',
    key: 'allocationNo',
    width: 180,
  },
  {
    title: i18n.t(LocaleHelper.getAllocationOverviewColOrderNo()),
    dataIndex: 'orderNo',
    key: 'orderNo',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getAllocationOverviewColCustomer()),
    dataIndex: 'customerName',
    key: 'customerName',
    width: 200,
  },
  {
    title: i18n.t(LocaleHelper.getAllocationOverviewColTotalIncome()),
    dataIndex: 'totalIncome',
    key: 'totalIncome',
    align: 'right',
    render: (val) => `¥${val.toLocaleString()}`,
  },
  {
    title: i18n.t(LocaleHelper.getAllocationOverviewColSalesIncome()),
    dataIndex: 'salesIncome',
    key: 'salesIncome',
    align: 'right',
    render: (val) => `¥${val.toLocaleString()}`,
  },
  {
    title: i18n.t(LocaleHelper.getAllocationOverviewColOpsIncome()),
    dataIndex: 'opsIncome',
    key: 'opsIncome',
    align: 'right',
    render: (val) => `¥${val.toLocaleString()}`,
  },
  {
    title: i18n.t(LocaleHelper.getAllocationOverviewColStatus()),
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      let color: 'success' | 'warning' | 'error' | 'processing' | undefined;
      let text = status;
      if (status === 'allocated') {
        color = 'success';
        text = i18n.t(LocaleHelper.getAllocationOverviewStatusAllocated());
      } else if (status === 'pending') {
        color = 'warning';
        text = i18n.t(LocaleHelper.getAllocationOverviewStatusPending());
      } else if (status === 'exception') {
        color = 'error';
        text = i18n.t(LocaleHelper.getAllocationOverviewStatusException());
      }
      return <Tag color={color}>{text}</Tag>;
    },
  },
  {
    title: i18n.t(LocaleHelper.getAllocationOverviewColSalesman()),
    dataIndex: 'salesman',
    key: 'salesman',
  },
];

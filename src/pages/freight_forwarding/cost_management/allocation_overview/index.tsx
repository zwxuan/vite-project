import '@/pages/page_list.less';
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Card, Row, Col, Statistic, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import CustomIcon from "@/components/custom-icon";
import AdvancedSearchForm from "@/components/search-form";
import { getSearchFields } from './search_fields';
import { queryAllocationList, queryAllocationStats, AllocationItem, AllocationStats } from '@/api/freight_forwarding/cost_management/allocation_service';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

const AllocationOverview: React.FC = () => {
  const [data, setData] = useState<AllocationItem[]>([]);
  const [stats, setStats] = useState<AllocationStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 20, total: 0 });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [listRes, statsRes] = await Promise.all([
        queryAllocationList({}),
        queryAllocationStats()
      ]);
      setData(listRes.data);
      setPagination({ ...pagination, total: listRes.total });
      setStats(statsRes);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns: ColumnsType<AllocationItem> = [
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
          <a>{i18n.t(LocaleHelper.getAllocationOverviewActionDetail())}</a>
          {record.status === 'pending' && <a>{i18n.t(LocaleHelper.getAllocationOverviewActionAllocate())}</a>}
        </Space>
      ),
    },
  ];

  const onSearch = (values: any) => {
    console.log('Search values:', values);
    fetchData();
  };

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <CustomIcon type="icon-Currency" className="page-title-Icon" />
            <span className="bill-info-title">{i18n.t(LocaleHelper.getAllocationOverviewPageTitle())}</span>
          </div>
        </div>
        <div className="header-button-area">
          <span className="buttonGroup-component">
            <div className="u-button-group">
              <Button type="primary" danger>{i18n.t(LocaleHelper.getAllocationOverviewActionBatchReallocate())}</Button>
              <Button>{i18n.t(LocaleHelper.getAllocationOverviewActionExportReport())}</Button>
            </div>
          </span>
        </div>
      </div>

      <div className="nc-bill-search-area">
        <AdvancedSearchForm
          fields={getSearchFields() as any}
          onSearch={onSearch}
        />
      </div>

      <div style={{ padding: '10px 10px 0' }}>
        <Card size="small" bordered={false}>
          <Row gutter={16}>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getAllocationOverviewStatTotalIncome())}
                value={stats?.totalIncome}
                precision={2}
                prefix="¥"
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getAllocationOverviewStatSalesIncome())}
                value={stats?.salesIncome}
                precision={2}
                prefix="¥"
                valueStyle={{ color: '#cf1322' }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getAllocationOverviewStatOpsIncome())}
                value={stats?.opsIncome}
                precision={2}
                prefix="¥"
                valueStyle={{ color: '#3f8600' }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getAllocationOverviewStatCompletionRate())}
                value={stats?.completionRate}
                precision={1}
                suffix="%"
                prefix={<ArrowUpOutlined />}
              />
            </Col>
          </Row>
          <div style={{ marginTop: 16 }}>
            <Row gutter={16}>
               <Col span={6}><Statistic title={i18n.t(LocaleHelper.getAllocationOverviewStatPending())} value={stats?.pendingCount} /></Col>
               <Col span={6}><Statistic title={i18n.t(LocaleHelper.getAllocationOverviewStatException())} value={stats?.exceptionCount} valueStyle={{ color: '#cf1322' }} /></Col>
               <Col span={6}><Statistic title={i18n.t(LocaleHelper.getAllocationOverviewStatManual())} value={stats?.manualCount} /></Col>
               <Col span={6}><Statistic title={i18n.t(LocaleHelper.getAllocationOverviewStatNew())} value={stats?.newCount} prefix={<ArrowUpOutlined />} valueStyle={{ color: '#3f8600' }} /></Col>
            </Row>
          </div>
        </Card>
      </div>

      <div className="nc-bill-table-area">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
          pagination={pagination}
          size="small"
          bordered
          scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
          onChange={(p) => setPagination({ ...pagination, current: p.current || 1, pageSize: p.pageSize || 20 })}
        />
      </div>
    </div>
  );
};

export default AllocationOverview;

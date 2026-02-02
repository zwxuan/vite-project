import '@/pages/page_list.less';
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Card, Row, Col, Statistic, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import CustomIcon from "@/components/custom-icon";
import AdvancedSearchForm from "@/components/search-form";
import { getSearchFields } from './search_fields';
import { queryRuleList, queryRuleStats, RuleItem, RuleStats } from '@/api/freight_forwarding/cost_management/allocation_service';
import { useNavigate } from 'react-router-dom';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

const AllocationRules: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<RuleItem[]>([]);
  const [stats, setStats] = useState<RuleStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 20, total: 0 });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [listRes, statsRes] = await Promise.all([
        queryRuleList({}),
        queryRuleStats()
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

  const columns: ColumnsType<RuleItem> = [
    {
      title: i18n.t(LocaleHelper.getAllocationRulesColRuleId()),
      dataIndex: 'ruleId',
      key: 'ruleId',
      width: 100,
    },
    {
      title: i18n.t(LocaleHelper.getAllocationRulesColRuleName()),
      dataIndex: 'ruleName',
      key: 'ruleName',
      width: 200,
    },
    {
      title: i18n.t(LocaleHelper.getAllocationRulesColRuleType()),
      dataIndex: 'ruleType',
      key: 'ruleType',
      width: 120,
    },
    {
      title: i18n.t(LocaleHelper.getAllocationRulesColStatus()),
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'default';
        let text = status;
        if (status === 'active') {
          color = 'success';
          text = i18n.t(LocaleHelper.getAllocationRulesStatusActive());
        } else if (status === 'pending') {
          color = 'processing';
          text = i18n.t(LocaleHelper.getAllocationRulesStatusPending());
        } else if (status === 'draft') {
          color = 'default';
          text = i18n.t(LocaleHelper.getAllocationRulesStatusDraft());
        } else if (status === 'disabled') {
          color = 'error';
          text = i18n.t(LocaleHelper.getAllocationRulesStatusDisabled());
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: i18n.t(LocaleHelper.getAllocationRulesColCreator()),
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: i18n.t(LocaleHelper.getAllocationRulesColCreateTime()),
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: i18n.t(LocaleHelper.getOperation()),
      key: 'action',
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate(`/cost_management/allocation_rules/detail?id=${record.id}`)}>{i18n.t(LocaleHelper.getAllocationRulesActionEdit())}</a>
          {record.status === 'pending' && <a>{i18n.t(LocaleHelper.getAllocationRulesActionApprove())}</a>}
          {record.status === 'disabled' && <a>{i18n.t(LocaleHelper.getAllocationRulesActionEnable())}</a>}
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
            <span className="bill-info-title">{i18n.t(LocaleHelper.getAllocationRulesPageTitle())}</span>
          </div>
        </div>
        <div className="header-button-area">
          <span className="buttonGroup-component">
            <div className="u-button-group">
              <Button type="primary" danger onClick={() => navigate('/cost_management/allocation_rules/detail')}>{i18n.t(LocaleHelper.getAllocationRulesActionCreate())}</Button>
              <Button>{i18n.t(LocaleHelper.getAllocationRulesActionBatchApprove())}</Button>
              <Button>{i18n.t(LocaleHelper.getAllocationRulesActionExport())}</Button>
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
            <Col span={6}><Statistic title={i18n.t(LocaleHelper.getAllocationRulesStatActive())} value={stats?.activeCount} valueStyle={{ color: '#3f8600' }} /></Col>
            <Col span={6}><Statistic title={i18n.t(LocaleHelper.getAllocationRulesStatPending())} value={stats?.pendingCount} valueStyle={{ color: '#1890ff' }} /></Col>
            <Col span={6}><Statistic title={i18n.t(LocaleHelper.getAllocationRulesStatDraft())} value={stats?.draftCount} /></Col>
            <Col span={6}><Statistic title={i18n.t(LocaleHelper.getAllocationRulesStatDisabled())} value={stats?.disabledCount} valueStyle={{ color: '#cf1322' }} /></Col>
          </Row>
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

export default AllocationRules;

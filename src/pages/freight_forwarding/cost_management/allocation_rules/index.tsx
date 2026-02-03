import '@/pages/page_list.less';
import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Statistic } from 'antd';
import CustomIcon from "@/components/custom-icon";
import AdvancedSearchForm from "@/components/search-form";
import { getSearchFields } from './search_fields';
import { queryRuleList, queryRuleStats, RuleItem, RuleStats } from '@/api/freight_forwarding/cost_management/allocation_service';
import { useNavigate } from 'react-router-dom';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getColumns } from './columns';

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

  const columns = getColumns(navigate);

  const onSearch = (values: any) => {
    console.log('Search values:', values);
    fetchData();
  };

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <span className="bill-info-title" style={{ marginLeft: '10px' }}>
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
              {i18n.t(LocaleHelper.getAllocationRulesPageTitle())}
            </span>
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

import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Row, Space, Statistic, Table, Tag, Tooltip, message } from 'antd';
import { ReloadOutlined, ExportOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined, ThunderboltOutlined, SyncOutlined, RedoOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AdvancedSearchForm from '@/components/search-form';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getStatusMonitoringSearchFields } from './search_fields';
import { getColumns } from './columns';
import {
  querySyncStatusList,
  querySyncStatusStats,
} from '@/api/freight_forwarding/cost_management/financial_data_sync_service';
import {
  SyncStatusItem,
  SyncStatusStats,
} from '@/types/freight_forwarding/cost_management';
import '@/pages/page_list.less';

const StatusMonitoring: React.FC = () => {
  const [data, setData] = useState<SyncStatusItem[]>([]);
  const [stats, setStats] = useState<SyncStatusStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const fetchData = async () => {
    setLoading(true);
    const queryParams = {
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      ...filters,
    };
    const [listRes, statsRes] = await Promise.all([
      querySyncStatusList(queryParams),
      querySyncStatusStats(queryParams),
    ]);
    setData(listRes.list);
    setPagination((prev) => ({ ...prev, total: listRes.total }));
    setStats(statsRes);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, filters]);

  const onSearch = (values: any) => {
    const nextFilters = Array.isArray(values)
      ? values.reduce((acc, item) => {
          acc[item.field] = item.value;
          return acc;
        }, {} as Record<string, any>)
      : values || {};
    setFilters(nextFilters);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const columns = useMemo(() => getColumns(), []);

  const handleManualSync = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择需要同步的记录');
      return;
    }
    message.success(`已触发 ${selectedRowKeys.length} 条记录的手动同步`);
  };

  const handleBatchRetry = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择需要重试的记录');
      return;
    }
    message.success(`已触发 ${selectedRowKeys.length} 条记录的批量重试`);
  };

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <span className="bill-info-title">
              <CustomIcon type="icon-Currency" style={{ fontSize: 24, color: 'red' }} />
              {i18n.t(LocaleHelper.getFinancialDataSyncStatusMonitoringPageTitle())}
              <Tooltip
                title={
                  <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                    <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                      <li style={{ marginBottom: '10px' }}>
                        <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                          <b>说明</b>
                        </span>
                        <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                          <li><b>角色：</b>实时监控财务数据同步状态，确保数据准确传输。</li>
                          <li><b>数据来源：</b>财务数据同步服务实时状态。</li>
                          <li><b>同步类型：</b>包括费用分摊、订单费用、账单、发票等数据的同步。</li>
                          <li><b>操作：</b>支持手动触发同步和失败任务的批量重试。</li>
                        </ul>
                      </li>
                    </ol>
                  </div>
                }
                color='white'
              >
                <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
              </Tooltip>
            </span>
          </div>
        </div>
        <div className="header-button-area">
          <span className="buttonGroup-component">
            <div className="u-button-group">
              <Button icon={<SyncOutlined />} onClick={handleManualSync}>
                手动同步
              </Button>
              <Button icon={<RedoOutlined />} onClick={handleBatchRetry}>
                批量重试
              </Button>
              <Button type="primary" danger icon={<ExportOutlined />}>
                {i18n.t(LocaleHelper.getFinancialDataSyncStatusMonitoringActionExport())}
              </Button>
              <Button icon={<ReloadOutlined />}>
                {i18n.t(LocaleHelper.getFinancialDataSyncStatusMonitoringActionRefresh())}
              </Button>
            </div>
          </span>
        </div>
      </div>

      <div className="nc-bill-search-area">
        <AdvancedSearchForm fields={getStatusMonitoringSearchFields()} onSearch={onSearch} />
      </div>

      <div style={{ padding: '10px 10px 0' }}>
        <Card size="small" bordered={false}>
          <Row gutter={16}>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getFinancialDataSyncStatusMonitoringStatTodayCount())}
                value={stats?.todayCount || 0}
                prefix={<ThunderboltOutlined />}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getFinancialDataSyncStatusMonitoringStatSuccessCount())}
                value={stats?.successCount || 0}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getFinancialDataSyncStatusMonitoringStatFailedCount())}
                value={stats?.failedCount || 0}
                prefix={<CloseCircleOutlined />}
                valueStyle={{ color: '#ff4d4f' }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getFinancialDataSyncStatusMonitoringStatPendingCount())}
                value={stats?.pendingCount || 0}
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: '#faad14' }}
              />
            </Col>
          </Row>
        </Card>
      </div>

      <div className="nc-bill-table-area">
        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys),
          }}
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
          size="small"
          bordered={true}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showTotal: (total) =>
              `${i18n.t(LocaleHelper.getTotal())}${total}${i18n.t(LocaleHelper.getItems())}`,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
          scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
          onChange={(page) =>
            setPagination((prev) => ({
              ...prev,
              current: page.current || 1,
              pageSize: page.pageSize || 10,
            }))
          }
        />
      </div>
    </div>
  );
};

export default StatusMonitoring;

import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Row, Statistic, Table, Tooltip } from 'antd';
import { ReloadOutlined, ExportOutlined, CheckCircleOutlined, CloseCircleOutlined, FieldTimeOutlined, FileTextOutlined } from '@ant-design/icons';
import AdvancedSearchForm from '@/components/search-form';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getLogQuerySearchFields } from './search_fields';
import { getColumns } from './columns';
import {
  querySyncLogList,
  querySyncLogStats,
} from '@/api/freight_forwarding/cost_management/financial_data_sync_service';
import {
  SyncLogItem,
  SyncLogStats,
} from '@/types/freight_forwarding/cost_management';
import '@/pages/page_list.less';

const LogQuery: React.FC = () => {
  const [data, setData] = useState<SyncLogItem[]>([]);
  const [stats, setStats] = useState<SyncLogStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  const fetchData = async () => {
    setLoading(true);
    const queryParams = {
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      ...filters,
    };
    const [listRes, statsRes] = await Promise.all([
      querySyncLogList(queryParams),
      querySyncLogStats(queryParams),
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

  const columns = getColumns();

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <span className="bill-info-title">
              <CustomIcon type="icon-Currency" style={{ fontSize: 24, color: 'red' }} />
              {i18n.t(LocaleHelper.getFinancialDataSyncLogQueryPageTitle())}
              <Tooltip
                title={
                  <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                    <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                      <li style={{ marginBottom: '10px' }}>
                        <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                          <b>说明</b>
                        </span>
                        <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                          <li><b>角色：</b>查询财务数据同步的历史记录，用于问题排查和审计。</li>
                          <li><b>数据来源：</b>系统自动生成的同步日志。</li>
                          <li><b>日志级别：</b>包括信息、警告、错误。</li>
                          <li><b>操作：</b>支持按时间、状态、类型筛选日志，以及导出日志数据。</li>
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
              <Button type="primary" danger icon={<ExportOutlined />}>
                {i18n.t(LocaleHelper.getFinancialDataSyncLogQueryActionExport())}
              </Button>
              <Button icon={<ReloadOutlined />}>
                {i18n.t(LocaleHelper.getFinancialDataSyncLogQueryActionRefresh())}
              </Button>
            </div>
          </span>
        </div>
      </div>

      <div className="nc-bill-search-area">
        <AdvancedSearchForm fields={getLogQuerySearchFields()} onSearch={onSearch} />
      </div>

      <div style={{ padding: '10px 10px 0' }}>
        <Card size="small" bordered={false}>
          <Row gutter={16}>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getFinancialDataSyncLogQueryStatTotalCount())}
                value={stats?.totalCount || 0}
                prefix={<FileTextOutlined />}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getFinancialDataSyncLogQueryStatSuccessCount())}
                value={stats?.successCount || 0}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getFinancialDataSyncLogQueryStatFailedCount())}
                value={stats?.failedCount || 0}
                prefix={<CloseCircleOutlined />}
                valueStyle={{ color: '#ff4d4f' }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getFinancialDataSyncLogQueryStatAverageDuration())}
                value={stats?.averageDuration || 0}
                prefix={<FieldTimeOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Col>
          </Row>
        </Card>
      </div>

      <div className="nc-bill-table-area">
        <Table
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

export default LogQuery;

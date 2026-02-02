import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Row, Space, Statistic, Table, Tag } from 'antd';
import { ReloadOutlined, ExportOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined, ProfileOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AdvancedSearchForm from '@/components/search-form';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getTaskManagementSearchFields } from './search_fields';
import {
  querySyncTaskList,
  querySyncTaskStats,
} from '@/api/freight_forwarding/cost_management/financial_data_sync_service';
import {
  SyncScheduleType,
  SyncStatus,
  SyncTaskItem,
  SyncTaskStats,
  SyncType,
} from '@/types/freight_forwarding/cost_management';
import '@/pages/page_list.less';

const TaskManagement: React.FC = () => {
  const [data, setData] = useState<SyncTaskItem[]>([]);
  const [stats, setStats] = useState<SyncTaskStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  const syncTypeLabelMap = useMemo(
    () => ({
      [SyncType.COST_ALLOCATION]: i18n.t(LocaleHelper.getFinancialDataSyncCommonTypeCostAllocation()),
      [SyncType.ORDER_FEE]: i18n.t(LocaleHelper.getFinancialDataSyncCommonTypeOrderFee()),
      [SyncType.BILLING]: i18n.t(LocaleHelper.getFinancialDataSyncCommonTypeBilling()),
      [SyncType.INVOICE]: i18n.t(LocaleHelper.getFinancialDataSyncCommonTypeInvoice()),
    }),
    []
  );

  const scheduleLabelMap = useMemo(
    () => ({
      [SyncScheduleType.REAL_TIME]: i18n.t(LocaleHelper.getFinancialDataSyncCommonScheduleRealTime()),
      [SyncScheduleType.HOURLY]: i18n.t(LocaleHelper.getFinancialDataSyncCommonScheduleHourly()),
      [SyncScheduleType.DAILY]: i18n.t(LocaleHelper.getFinancialDataSyncCommonScheduleDaily()),
      [SyncScheduleType.WEEKLY]: i18n.t(LocaleHelper.getFinancialDataSyncCommonScheduleWeekly()),
    }),
    []
  );

  const statusLabelMap = useMemo(
    () => ({
      [SyncStatus.PENDING]: i18n.t(LocaleHelper.getFinancialDataSyncCommonStatusPending()),
      [SyncStatus.RUNNING]: i18n.t(LocaleHelper.getFinancialDataSyncCommonStatusRunning()),
      [SyncStatus.SUCCESS]: i18n.t(LocaleHelper.getFinancialDataSyncCommonStatusSuccess()),
      [SyncStatus.FAILED]: i18n.t(LocaleHelper.getFinancialDataSyncCommonStatusFailed()),
    }),
    []
  );

  const statusColorMap = {
    [SyncStatus.PENDING]: 'default',
    [SyncStatus.RUNNING]: 'processing',
    [SyncStatus.SUCCESS]: 'success',
    [SyncStatus.FAILED]: 'error',
  };

  const fetchData = async () => {
    setLoading(true);
    const queryParams = {
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      ...filters,
    };
    const [listRes, statsRes] = await Promise.all([
      querySyncTaskList(queryParams),
      querySyncTaskStats(queryParams),
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

  const columns: ColumnsType<SyncTaskItem> = [
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementColTaskNo()),
      dataIndex: 'taskNo',
      key: 'taskNo',
      width: 160,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementColSyncType()),
      dataIndex: 'syncType',
      key: 'syncType',
      render: (value: SyncType) => syncTypeLabelMap[value],
      width: 140,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementColScheduleType()),
      dataIndex: 'scheduleType',
      key: 'scheduleType',
      render: (value: SyncScheduleType) => scheduleLabelMap[value],
      width: 140,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementColStatus()),
      dataIndex: 'status',
      key: 'status',
      render: (value: SyncStatus) => <Tag color={statusColorMap[value]}>{statusLabelMap[value]}</Tag>,
      width: 120,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementColLastRunTime()),
      dataIndex: 'lastRunTime',
      key: 'lastRunTime',
      width: 180,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementColNextRunTime()),
      dataIndex: 'nextRunTime',
      key: 'nextRunTime',
      width: 180,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementColOwner()),
      dataIndex: 'owner',
      key: 'owner',
      width: 120,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementColCreatedTime()),
      dataIndex: 'createdTime',
      key: 'createdTime',
      width: 180,
    },
  ];

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <CustomIcon type="icon-Currency" className="page-title-Icon" />
            <span className="bill-info-title">
              {i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementPageTitle())}
            </span>
          </div>
        </div>
        <div className="header-button-area">
          <span className="buttonGroup-component">
            <div className="u-button-group">
              <Button type="primary" danger icon={<ExportOutlined />}>
                {i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementActionExport())}
              </Button>
              <Button icon={<ReloadOutlined />}>
                {i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementActionRefresh())}
              </Button>
            </div>
          </span>
        </div>
      </div>

      <div className="nc-bill-search-area">
        <AdvancedSearchForm fields={getTaskManagementSearchFields()} onSearch={onSearch} />
      </div>

      <div style={{ padding: '10px 10px 0' }}>
        <Card size="small" bordered={false}>
          <Row gutter={16}>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementStatTotalCount())}
                value={stats?.totalCount || 0}
                prefix={<ProfileOutlined />}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementStatPendingCount())}
                value={stats?.pendingCount || 0}
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: '#faad14' }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementStatSuccessCount())}
                value={stats?.successCount || 0}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementStatFailedCount())}
                value={stats?.failedCount || 0}
                prefix={<CloseCircleOutlined />}
                valueStyle={{ color: '#ff4d4f' }}
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

export default TaskManagement;

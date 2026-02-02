import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Row, Statistic, Table, Tag } from 'antd';
import { ReloadOutlined, ExportOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined, WarningOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AdvancedSearchForm from '@/components/search-form';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getExceptionCenterSearchFields } from './search_fields';
import {
  querySyncExceptionList,
  querySyncExceptionStats,
} from '@/api/freight_forwarding/cost_management/financial_data_sync_service';
import {
  SyncExceptionItem,
  SyncExceptionStats,
  SyncExceptionStatus,
  SyncType,
} from '@/types/freight_forwarding/cost_management';
import '@/pages/page_list.less';

const ExceptionCenter: React.FC = () => {
  const [data, setData] = useState<SyncExceptionItem[]>([]);
  const [stats, setStats] = useState<SyncExceptionStats | null>(null);
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

  const statusLabelMap = useMemo(
    () => ({
      [SyncExceptionStatus.PENDING]: i18n.t(LocaleHelper.getFinancialDataSyncCommonExceptionPending()),
      [SyncExceptionStatus.PROCESSING]: i18n.t(LocaleHelper.getFinancialDataSyncCommonExceptionProcessing()),
      [SyncExceptionStatus.RESOLVED]: i18n.t(LocaleHelper.getFinancialDataSyncCommonExceptionResolved()),
    }),
    []
  );

  const statusColorMap = {
    [SyncExceptionStatus.PENDING]: 'default',
    [SyncExceptionStatus.PROCESSING]: 'processing',
    [SyncExceptionStatus.RESOLVED]: 'success',
  };

  const fetchData = async () => {
    setLoading(true);
    const queryParams = {
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      ...filters,
    };
    const [listRes, statsRes] = await Promise.all([
      querySyncExceptionList(queryParams),
      querySyncExceptionStats(queryParams),
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

  const columns: ColumnsType<SyncExceptionItem> = [
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterColExceptionNo()),
      dataIndex: 'exceptionNo',
      key: 'exceptionNo',
      width: 160,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterColSyncId()),
      dataIndex: 'syncId',
      key: 'syncId',
      width: 160,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterColSyncType()),
      dataIndex: 'syncType',
      key: 'syncType',
      render: (value: SyncType) => syncTypeLabelMap[value],
      width: 140,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterColErrorType()),
      dataIndex: 'errorType',
      key: 'errorType',
      width: 140,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterColErrorMessage()),
      dataIndex: 'errorMessage',
      key: 'errorMessage',
      width: 220,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterColStatus()),
      dataIndex: 'status',
      key: 'status',
      render: (value: SyncExceptionStatus) => <Tag color={statusColorMap[value]}>{statusLabelMap[value]}</Tag>,
      width: 120,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterColOccurredTime()),
      dataIndex: 'occurredTime',
      key: 'occurredTime',
      width: 180,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterColHandler()),
      dataIndex: 'handler',
      key: 'handler',
      width: 120,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterColHandleTime()),
      dataIndex: 'handleTime',
      key: 'handleTime',
      width: 180,
    },
    {
      title: i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterColRetryCount()),
      dataIndex: 'retryCount',
      key: 'retryCount',
      align: 'right',
      width: 120,
    },
  ];

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <CustomIcon type="icon-Currency" className="page-title-Icon" />
            <span className="bill-info-title">
              {i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterPageTitle())}
            </span>
          </div>
        </div>
        <div className="header-button-area">
          <span className="buttonGroup-component">
            <div className="u-button-group">
              <Button type="primary" danger icon={<ExportOutlined />}>
                {i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterActionExport())}
              </Button>
              <Button icon={<ReloadOutlined />}>
                {i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterActionRefresh())}
              </Button>
            </div>
          </span>
        </div>
      </div>

      <div className="nc-bill-search-area">
        <AdvancedSearchForm fields={getExceptionCenterSearchFields()} onSearch={onSearch} />
      </div>

      <div style={{ padding: '10px 10px 0' }}>
        <Card size="small" bordered={false}>
          <Row gutter={16}>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterStatTotalCount())}
                value={stats?.totalCount || 0}
                prefix={<WarningOutlined />}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterStatPendingCount())}
                value={stats?.pendingCount || 0}
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: '#faad14' }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterStatProcessingCount())}
                value={stats?.processingCount || 0}
                prefix={<CloseCircleOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterStatResolvedCount())}
                value={stats?.resolvedCount || 0}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#52c41a' }}
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

export default ExceptionCenter;

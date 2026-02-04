import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Row, Statistic, Table, Tag, Tooltip, message, Modal } from 'antd';
import { ReloadOutlined, ExportOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined, WarningOutlined, RedoOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AdvancedSearchForm from '@/components/search-form';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getExceptionCenterSearchFields } from './search_fields';
import { getColumns } from './columns';
import {
  querySyncExceptionList,
  querySyncExceptionStats,
  retrySyncException,
  resolveSyncException,
} from '@/api/freight_forwarding/cost_management/financial_data_sync_service';
import {
  SyncExceptionItem,
  SyncExceptionStats,
} from '@/types/freight_forwarding/cost_management';
import '@/pages/page_list.less';

const ExceptionCenter: React.FC = () => {
  const [data, setData] = useState<SyncExceptionItem[]>([]);
  const [stats, setStats] = useState<SyncExceptionStats | null>(null);
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
    setSelectedRowKeys([]);
  };

  const handleRetry = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请至少选择一条记录');
      return;
    }
    
    Modal.confirm({
      title: '确认重试',
      content: `确定要重试选中的 ${selectedRowKeys.length} 条记录吗？`,
      onOk: async () => {
        try {
          setLoading(true);
          await retrySyncException(selectedRowKeys as string[]);
          message.success('重试指令已发送');
          setSelectedRowKeys([]);
          fetchData();
        } catch (error) {
          message.error('重试失败');
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleResolve = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请至少选择一条记录');
      return;
    }

    Modal.confirm({
      title: '确认处理',
      content: `确定要将选中的 ${selectedRowKeys.length} 条记录标记为已处理吗？`,
      onOk: async () => {
        try {
          setLoading(true);
          await resolveSyncException(selectedRowKeys as string[]);
          message.success('处理成功');
          setSelectedRowKeys([]);
          fetchData();
        } catch (error) {
          message.error('处理失败');
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const columns = useMemo(() => getColumns(), []);

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <span className="bill-info-title">
              <CustomIcon type="icon-Currency" style={{ fontSize: 24, color: 'red' }} />
              {i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterPageTitle())}
              <Tooltip
                title={
                  <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                    <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                      <li style={{ marginBottom: '10px' }}>
                        <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                          <b>说明</b>
                        </span>
                        <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                          <li><b>角色：</b>集中处理财务数据同步过程中产生的异常。</li>
                          <li><b>数据来源：</b>同步异常记录。</li>
                          <li><b>异常状态：</b>包括待处理、处理中、已解决。</li>
                          <li><b>操作：</b>支持异常重试、手动标记解决和查看错误详情。</li>
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
              <Button icon={<RedoOutlined />} onClick={handleRetry} disabled={loading}>
                重试
              </Button>
              <Button icon={<CheckCircleOutlined />} onClick={handleResolve} disabled={loading}>
                处理
              </Button>
              <Button type="primary" danger icon={<ExportOutlined />}>
                {i18n.t(LocaleHelper.getFinancialDataSyncExceptionCenterActionExport())}
              </Button>
              <Button icon={<ReloadOutlined />} onClick={fetchData}>
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
          rowSelection={{
            selectedRowKeys,
            onChange: (keys) => setSelectedRowKeys(keys),
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

export default ExceptionCenter;

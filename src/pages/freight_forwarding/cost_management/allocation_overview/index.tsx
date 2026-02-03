import '@/pages/page_list.less';
import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Statistic, Tooltip, Modal } from 'antd';
import CustomIcon from "@/components/custom-icon";
import AdvancedSearchForm from "@/components/search-form";
import { getSearchFields } from './search_fields';
import { getColumns } from './columns';
import { queryAllocationList, queryAllocationStats, AllocationItem, AllocationStats } from '@/api/freight_forwarding/cost_management/allocation_service';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { useNavigate } from 'react-router-dom';

const AllocationOverview: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<AllocationItem[]>([]);
  const [stats, setStats] = useState<AllocationStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 20, total: 0 });
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<AllocationItem[]>([]);
  const [batchModalOpen, setBatchModalOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [listRes, statsRes] = await Promise.all([
        queryAllocationList({ pageNum: pagination.current, pageSize: pagination.pageSize, ...filters }),
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
  }, [pagination.current, pagination.pageSize, filters]);

  const handleViewDetail = (record: AllocationItem) => {
    navigate(`/cost_management/allocation_overview/detail/${record.id}`);
  };

  const handleAllocate = (record: AllocationItem) => {
    navigate(`/cost_management/allocation_overview/detail/${record.id}?mode=allocate`);
  };

  const columns = getColumns(handleViewDetail, handleAllocate);
  const batchColumns = columns.filter((column) => column.key !== 'action');

  const onSearch = (values: any) => {
    setFilters(values || {});
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleBatchReallocate = () => {
    if (!selectedRowKeys.length) {
      return;
    }
    setBatchModalOpen(true);
  };

  const handleBatchConfirm = () => {
    setData((prev) =>
      prev.map((item) =>
        selectedRowKeys.includes(item.id) ? { ...item, status: 'pending' } : item
      )
    );
    setSelectedRowKeys([]);
    setSelectedRows([]);
    setBatchModalOpen(false);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[], rows: AllocationItem[]) => {
      setSelectedRowKeys(keys);
      setSelectedRows(rows);
    },
    type: 'checkbox' as const,
    columnWidth: '20px',
  };

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap">
            <span className="bill-info-title" style={{ marginLeft: '10px' }}>
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
              {i18n.t(LocaleHelper.getAllocationOverviewPageTitle())}
              <Tooltip
                title={
                  <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                    <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                      <li style={{ marginBottom: '10px' }}>
                        <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                          <b>说明</b>
                        </span>
                        <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                          <li><b>角色：</b>本页面是<b>“查看结果”</b>的地方，相当于系统的<b>“报表”</b>或<b>“成绩单”</b>。</li>
                          <li><b>时机：</b>数据产生于<b>“费用确认”</b>步骤之后。</li>
                          <li><b>逻辑：</b>当应收/应付费用被确认时，系统自动触发计算引擎，根据生效规则生成分配结果并展示。</li>
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
          <div className="buttonGroup-component">
            <div className="u-button-group">
              <Button type="primary" danger onClick={handleBatchReallocate}>{i18n.t(LocaleHelper.getAllocationOverviewActionBatchReallocate())}</Button>
              <Button>{i18n.t(LocaleHelper.getAllocationOverviewActionExportReport())}</Button>
            </div>
          </div>
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
          rowSelection={rowSelection}
          dataSource={data}
          rowKey="id"
          loading={loading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showTotal: (total) =>
              `${i18n.t(LocaleHelper.getTotal())}${total}${i18n.t(LocaleHelper.getItems())}`,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
          size="small"
          bordered
          scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
          onChange={(p) =>
            setPagination((prev) => ({
              ...prev,
              current: p.current || 1,
              pageSize: p.pageSize || 20,
            }))
          }
        />
      </div>
      <Modal
        open={batchModalOpen}
        title={i18n.t(LocaleHelper.getAllocationOverviewActionBatchReallocate())}
        onCancel={() => setBatchModalOpen(false)}
        footer={[
          <Button key="back" onClick={() => setBatchModalOpen(false)}>
            {i18n.t(LocaleHelper.getAllocationOverviewDetailActionBack())}
          </Button>,
          <Button key="submit" type="primary" danger onClick={handleBatchConfirm}>
            {i18n.t(LocaleHelper.getAllocationOverviewDetailActionReallocate())}
          </Button>,
        ]}
        width={900}
      >
        <Table
          columns={batchColumns}
          dataSource={selectedRows}
          rowKey="id"
          pagination={false}
          size="small"
          bordered
          scroll={{ x: 'max-content', y: 360 }}
        />
      </Modal>
    </div>
  );
};

export default AllocationOverview;

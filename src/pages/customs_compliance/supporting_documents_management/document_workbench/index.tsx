import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Button, Tooltip, Table, message } from 'antd';
import CustomIcon from '@/components/custom-icon';
import AdvancedSearchForm from '@/components/search-form';
import { getFields } from './search_fields';
import { getColumns } from './columns';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getDocumentWorkbenchList, batchReview, getWorkbenchStats } from '@/api/customs_compliance/supporting_documents_management/workbench_service';
import { DocumentWorkbenchItem, WorkbenchStats, EmergencyAlert } from '@/types/customs_compliance/supporting_documents_management/workbench';
import { useNavigate } from 'react-router-dom';
import '@/pages/page_list.less';
import { Card, Col, Row, Statistic, Alert } from 'antd';

const DocumentWorkbench: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DocumentWorkbenchItem[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [stats, setStats] = useState<WorkbenchStats | null>(null);
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([]);
  const navigate = useNavigate();
  const searchFormRef = useRef<any>(null);
  const fields = useMemo(() => getFields(), []);

  const fetchData = async (params: any) => {
    setLoading(true);
    try {
      const res = await getDocumentWorkbenchList(params);
      if (res.success) {
        setData(res.data);
        setTotal(res.total);
      }
      const statsRes = await getWorkbenchStats();
      if (statsRes.success) {
          setStats(statsRes.data.stats);
          setAlerts(statsRes.data.alerts);
      }
    } catch (error) {
      message.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData({});
  }, []);

  const handleSearch = (values: any) => {
    fetchData(values);
  };

  const handleReset = () => {
    searchFormRef.current?.resetFields();
    fetchData({});
  };

  const handleGenerate = () => {
      navigate('/supporting_documents_management/checklist_generation');
  };

  const handleBatchCollect = () => {
      if (selectedRowKeys.length === 0) {
          message.warning('请选择需要批量收集的记录');
          return;
      }
      message.info('批量收集功能开发中');
  };

  const handleBatchReview = async () => {
      if (selectedRowKeys.length === 0) {
          message.warning('请选择需要批量审核的记录');
          return;
      }
      setLoading(true);
      try {
          await batchReview(selectedRowKeys);
          message.success('批量审核成功');
          setSelectedRowKeys([]);
          fetchData({});
      } finally {
          setLoading(false);
      }
  };

  const handleExport = () => {
      message.info('导出功能开发中');
  };

  const onManage = (record: DocumentWorkbenchItem) => {
      navigate(`/supporting_documents_management/collection_management?id=${record.id}`);
  };

  const onUrge = (record: DocumentWorkbenchItem) => {
      message.success(`已发送催办通知: ${record.preEntryNo}`);
  };

  const onReview = (record: DocumentWorkbenchItem) => {
      navigate(`/supporting_documents_management/collection_management?id=${record.id}&mode=review`);
  };

  const onView = (record: DocumentWorkbenchItem) => {
      navigate(`/supporting_documents_management/collection_management?id=${record.id}&readonly=true`);
  };

  return (
    <div style={{overflowY: 'auto',overflowX:'hidden', height: 'calc(100vh - 80px)'}}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <span className="bill-info-title">
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px', marginRight: '8px' }} />
              {i18n.t(LocaleHelper.getCcsdmDocumentWorkbenchPageTitle())}
              <Tooltip title={
                  <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                      <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                          <li style={{ marginBottom: '10px' }}>
                              <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                                  <b>说明</b>
                              </span>
                              <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                                  <li><b>Role: </b>关务操作员, 单证专员</li>
                                  <li><b>Origin: </b>预录入系统, 外部上传</li>
                                  <li><b>Functionality: </b>管理所有随附单证任务，包括生成清单、收集、审核等状态监控。</li>
                              </ul>
                          </li>
                      </ol>
                  </div>
              } color='white' overlayInnerStyle={{ color: 'black' }}>
                  <i className='iconfont icon-bangzhutishi' style={{ marginLeft: '8px', cursor: 'pointer' }} />
              </Tooltip>
            </span>
          </div>
        </div>
        <div className="header-button-area">
             <span className="button-app-wrapper"></span>
             <div className="buttonGroup-component">
                <div className="u-button-group">
                    <Button type="primary" danger onClick={handleGenerate}>{i18n.t(LocaleHelper.getCcsdmDocumentWorkbenchBtnGenerate())}</Button>
                    <Button onClick={handleBatchCollect}>{i18n.t(LocaleHelper.getCcsdmDocumentWorkbenchBtnBatchCollect())}</Button>
                    <Button onClick={handleBatchReview}>{i18n.t(LocaleHelper.getCcsdmDocumentWorkbenchBtnBatchReview())}</Button>
                    <Button onClick={handleExport}>{i18n.t(LocaleHelper.getCcsdmDocumentWorkbenchBtnExport())}</Button>
                </div>
             </div>
        </div>
      </div>
      <AdvancedSearchForm
        fields={fields}
        onSearch={handleSearch}
      />
      <div className='nc-bill-table-area'>
          <Table<DocumentWorkbenchItem>
            columns={getColumns(onManage, onUrge, onReview, onView) as any}
            dataSource={data}
            loading={loading}
            rowKey="id"
            pagination={{
                total,
                showTotal: (total) => `Total ${total} items`,
                showQuickJumper: true,
                showSizeChanger: true,
            }}
            rowSelection={{
                selectedRowKeys,
                onChange: (keys) => setSelectedRowKeys(keys),
            }}
            scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
            size="small"
            bordered
            footer={() => (
                <div style={{ padding: '0 16px' }}>
                    {/* Stats Overview */}
                    {stats && (
                        <div style={{ marginBottom: 16, borderBottom: '1px solid #f0f0f0', paddingBottom: 16 }}>
                            <h4 style={{ marginBottom: 16, fontWeight: 'bold' }}>{i18n.t(LocaleHelper.getCcsdmDocumentWorkbenchStatsTitle())}</h4>
                            <Row gutter={16}>
                                <Col span={4}>
                                    <Statistic title={i18n.t(LocaleHelper.getCcsdmDocumentWorkbenchStatsTodayNew())} value={stats.todayNew} valueStyle={{ color: '#1890ff' }} />
                                </Col>
                                <Col span={4}>
                                    <Statistic title={i18n.t(LocaleHelper.getCcsdmDocumentWorkbenchStatsCollecting())} value={stats.collecting} valueStyle={{ color: '#faad14' }} />
                                </Col>
                                <Col span={4}>
                                    <Statistic title={i18n.t(LocaleHelper.getCcsdmDocumentWorkbenchStatsPendingReview())} value={stats.pendingReview} valueStyle={{ color: '#faad14' }} />
                                </Col>
                                <Col span={4}>
                                    <Statistic title={i18n.t(LocaleHelper.getCcsdmDocumentWorkbenchStatsCompleted())} value={stats.completed} valueStyle={{ color: '#52c41a' }} />
                                </Col>
                                <Col span={4}>
                                    <Statistic title={i18n.t(LocaleHelper.getCcsdmDocumentWorkbenchStatsOverdue())} value={stats.overdue} valueStyle={{ color: '#ff4d4f' }} />
                                </Col>
                            </Row>
                        </div>
                    )}
                    
                    {/* Emergency Alerts */}
                    {alerts.length > 0 && (
                        <div>
                            <h4 style={{ marginBottom: 8, fontWeight: 'bold', color: '#ff4d4f' }}>{i18n.t(LocaleHelper.getCcsdmDocumentWorkbenchAlertsTitle())}</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {alerts.map(alert => (
                                    <Alert
                                        key={alert.id}
                                        message={alert.content}
                                        type="error"
                                        showIcon
                                        style={{ border: 'none', backgroundColor: '#fff1f0' }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
          />
      </div>
    </div>
  );
};

export default DocumentWorkbench;

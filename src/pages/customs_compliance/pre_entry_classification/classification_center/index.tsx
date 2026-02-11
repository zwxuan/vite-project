import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Button, Tooltip, Table, message, Row, Col, Statistic } from 'antd';
import CustomIcon from '@/components/custom-icon';
import AdvancedSearchForm from '@/components/search-form';
import { getFields } from './search_fields';
import { getColumns } from './columns';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getClassificationList, ClassificationTask, batchClassify, getClassificationStats, ClassificationStats } from '@/api/customs_compliance/pre_entry_classification/classification_center_service';
import { useNavigate } from 'react-router-dom';
import '@/pages/page_list.less';

const ClassificationCenter: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ClassificationTask[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [stats, setStats] = useState<ClassificationStats | null>(null);
  const navigate = useNavigate();
  const searchFormRef = useRef<any>(null);
  const fields = useMemo(() => getFields(), []);

  const fetchData = async (params: any) => {
    setLoading(true);
    try {
      const res = await getClassificationList(params);
      if (res.success) {
        setData(res.data);
        setTotal(res.total);
      }
      const statsRes = await getClassificationStats();
      if (statsRes.success) {
          setStats(statsRes.data);
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

  const handleBatchClassify = async () => {
    if (selectedRowKeys.length === 0) {
        message.warning('请选择需要批量归类的记录');
        return;
    }
    try {
        await batchClassify(selectedRowKeys as string[]);
        message.success('批量归类任务已提交');
        setSelectedRowKeys([]);
        fetchData({});
    } catch (error) {
        message.error('批量归类失败');
    }
  };

  const handleExport = () => {
    message.success('导出成功');
  };

  const handleClassify = (record: ClassificationTask) => {
    navigate(`/pre_entry_classification/classification_detail?id=${record.id}&mode=edit`);
  };

  const handleView = (record: ClassificationTask) => {
    navigate(`/pre_entry_classification/classification_detail?id=${record.id}&mode=view`);
  };

  const handleReview = (record: ClassificationTask) => {
    navigate(`/pre_entry_classification/classification_detail?id=${record.id}&mode=review`);
  };

  return (
    <div style={{overflowY: 'auto',overflowX:'hidden', height: 'calc(100vh - 80px)'}}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <span className="bill-info-title">
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px', marginRight: '8px' }} />
              {i18n.t(LocaleHelper.getClassificationCenterPageTitle())}
              <Tooltip title={
                  <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                      <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                          <li style={{ marginBottom: '10px' }}>
                              <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                                  <b>{i18n.t(LocaleHelper.getClassificationCenterHelpLabel())}</b>
                              </span>
                              <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                                  <li><b>角色：</b>{i18n.t(LocaleHelper.getClassificationCenterHelpRole())} - {i18n.t(LocaleHelper.getClassificationCenterHelpRoleDesc())}</li>
                                  <li><b>数据来源：</b>{i18n.t(LocaleHelper.getClassificationCenterHelpOrigin())} - {i18n.t(LocaleHelper.getClassificationCenterHelpOriginDesc())}</li>
                                  <li><b>功能说明：</b>{i18n.t(LocaleHelper.getClassificationCenterHelpFunc())} - {i18n.t(LocaleHelper.getClassificationCenterHelpFuncDesc())}</li>
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
                    <Button type="primary" onClick={handleBatchClassify}>{i18n.t(LocaleHelper.getClassificationCenterBatchClassify())}</Button>
                    <Button onClick={handleExport}>{i18n.t(LocaleHelper.getClassificationCenterExport())}</Button>
                </div>
             </div>
        </div>
      </div>
      <AdvancedSearchForm
        fields={fields as any}
        onSearch={handleSearch}
      />
      <div className='nc-bill-table-area'>
          <Table<ClassificationTask>
            columns={getColumns({
                onClassify: handleClassify,
                onView: handleView,
                onReview: handleReview
            }) as any}
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
            footer={() => stats && (
                <div style={{ padding: '0 16px' }}>
                     <div style={{ marginBottom: 16, borderBottom: '1px solid #f0f0f0', paddingBottom: 16 }}>
                        <h4 style={{ marginBottom: 16, fontWeight: 'bold' }}>归类统计</h4>
                        <Row gutter={16}>
                            <Col span={4}>
                                <Statistic title={i18n.t(LocaleHelper.getClassificationCenterStatsPending())} value={stats.pending} valueStyle={{ color: '#1890ff' }} />
                            </Col>
                            <Col span={4}>
                                <Statistic title={i18n.t(LocaleHelper.getClassificationCenterStatsClassifying())} value={stats.classifying} valueStyle={{ color: '#faad14' }} />
                            </Col>
                            <Col span={4}>
                                <Statistic title={i18n.t(LocaleHelper.getClassificationCenterStatsPendingReview())} value={stats.pendingReview} valueStyle={{ color: '#faad14' }} />
                            </Col>
                            <Col span={4}>
                                <Statistic title={i18n.t(LocaleHelper.getClassificationCenterStatsCompleted())} value={stats.completed} valueStyle={{ color: '#52c41a' }} />
                            </Col>
                            <Col span={4}>
                                <Statistic title={i18n.t(LocaleHelper.getClassificationCenterStatsRevision())} value={stats.revision} valueStyle={{ color: '#ff4d4f' }} />
                            </Col>
                        </Row>
                    </div>
                </div>
            )}
          />
      </div>
    </div>
  );
};

export default ClassificationCenter;

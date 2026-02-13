import React, { useState, useEffect, useMemo } from 'react';
import { Table, message, Tooltip, Button, Modal } from 'antd';
import CustomIcon from '@/components/custom-icon';
import AdvancedSearchForm from '@/components/search-form';
import { getFields } from './search_fields';
import { getColumns } from './columns';
import { ClassificationReviewLocale } from '@/utils/locale/customs_compliance/pre_entry_classification/classification_review';
import i18n from '@/i18n';
import { searchReviewTasks, batchApproveReview, batchRejectReview } from '@/api/customs_compliance/pre_entry_classification/classification_review_service';
import { ReviewTask } from '@/types/customs_compliance/pre_entry_classification/classification_review';
import { useNavigate } from 'react-router-dom';
import '@/pages/page_list.less';

const ClassificationReview: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ReviewTask[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const navigate = useNavigate();

  const fetchData = async (params: any = {}) => {
    setLoading(true);
    try {
      const res = await searchReviewTasks(params);
      if (res.success) {
        setData(res.data);
        setTotal(res.total);
      }
    } catch (error) {
      message.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (values: any) => {
    fetchData(values);
  };

  const handleReview = (record: ReviewTask) => {
     navigate(`/pre_entry_classification/classification_detail?id=${record.id}&mode=review`);
  };

  const handleBatchApprove = async () => {
      if (selectedRowKeys.length === 0) {
          message.warning(i18n.t('common.select_one'));
          return;
      }
      Modal.confirm({
          title: i18n.t('common.confirm'),
          content: `Are you sure to approve ${selectedRowKeys.length} items?`,
          onOk: async () => {
              try {
                  await batchApproveReview(selectedRowKeys);
                  message.success(i18n.t('common.success'));
                  setSelectedRowKeys([]);
                  fetchData();
              } catch (error) {
                  message.error(i18n.t('common.fail'));
              }
          }
      });
  };

  const handleBatchReject = async () => {
      if (selectedRowKeys.length === 0) {
          message.warning(i18n.t('common.select_one'));
          return;
      }
      Modal.confirm({
          title: i18n.t('common.confirm'),
          content: `Are you sure to reject ${selectedRowKeys.length} items?`,
          onOk: async () => {
              try {
                  await batchRejectReview(selectedRowKeys);
                  message.success(i18n.t('common.success'));
                  setSelectedRowKeys([]);
                  fetchData();
              } catch (error) {
                  message.error(i18n.t('common.fail'));
              }
          }
      });
  };

  const columns = useMemo(() => getColumns(handleReview), []);

  return (
    <div style={{overflowY: 'auto',overflowX:'hidden', height: 'calc(100vh - 80px)'}}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <span className="bill-info-title">
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px', marginRight: '8px' }} />
              {i18n.t(ClassificationReviewLocale.getClassificationReviewPageTitle())}
              <Tooltip title={
                  <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                      <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                          <li style={{ marginBottom: '10px' }}>
                              <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                                  <b>{i18n.t(ClassificationReviewLocale.getClassificationReviewHelpLabel())}</b>
                              </span>
                              <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                                  <li><b>角色：</b>{i18n.t(ClassificationReviewLocale.getClassificationReviewHelpRole())} - {i18n.t(ClassificationReviewLocale.getClassificationReviewHelpRoleDesc())}</li>
                                  <li><b>数据来源：</b>{i18n.t(ClassificationReviewLocale.getClassificationReviewHelpOrigin())} - {i18n.t(ClassificationReviewLocale.getClassificationReviewHelpOriginDesc())}</li>
                                  <li><b>功能说明：</b>{i18n.t(ClassificationReviewLocale.getClassificationReviewHelpFunc())} - {i18n.t(ClassificationReviewLocale.getClassificationReviewHelpFuncDesc())}</li>
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
                      <Button type="primary" onClick={handleBatchApprove}>{i18n.t(ClassificationReviewLocale.getClassificationReviewBatchApprove())}</Button>
                      <Button type="primary" onClick={handleBatchReject}>{i18n.t(ClassificationReviewLocale.getClassificationReviewBatchReject())}</Button>
                  </div>
               </div>
          </div>
      </div>
      <AdvancedSearchForm fields={getFields() as any} onSearch={handleSearch} />
      <div className="nc-bill-table-area">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
          bordered={true}
          rowSelection={{
              selectedRowKeys,
              onChange: (keys) => setSelectedRowKeys(keys),
          }}
          pagination={{ total, showSizeChanger: true, showQuickJumper: true }}
          scroll={{ x: 'max-content', y: 'calc(100vh - 310px)' }}
        />
      </div>
    </div>
  );
};

export default ClassificationReview;

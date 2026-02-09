import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Button, Tooltip, Table, message } from 'antd';
import CustomIcon from '@/components/custom-icon';
import AdvancedSearchForm from '@/components/search-form';
import { getFields } from './search_fields';
import { getColumns } from './columns';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getDocumentWorkbenchList, DocumentWorkbenchItem } from '@/api/customs_compliance/supporting_documents_management/workbench_service';
import { useNavigate } from 'react-router-dom';
import '@/pages/page_list.less';

const DocumentWorkbench: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DocumentWorkbenchItem[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
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
      navigate(`/supporting_documents_management/review_center?id=${record.id}`);
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
              {i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementDocumentWorkbenchPageTitle())}
              <Tooltip title={
                  <div className='rul_title_tooltip'>
                      <ol>
                          <li>
                              <span>Role: </span>
                              <ul><li>关务操作员, 单证专员</li></ul>
                          </li>
                          <li>
                              <span>Origin: </span>
                              <ul><li>预录入系统, 外部上传</li></ul>
                          </li>
                          <li>
                              <span>Functionality: </span>
                              <ul><li>管理所有随附单证任务，包括生成清单、收集、审核等状态监控。</li></ul>
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
                    <Button type="primary" danger onClick={handleGenerate}>{i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementDocumentWorkbenchBtnGenerate())}</Button>
                    <Button onClick={handleBatchCollect}>{i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementDocumentWorkbenchBtnBatchCollect())}</Button>
                    <Button onClick={handleExport}>{i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementDocumentWorkbenchBtnExport())}</Button>
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
          />
      </div>
    </div>
  );
};

export default DocumentWorkbench;

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Button, Tooltip, Table, message } from 'antd';
import CustomIcon from '@/components/custom-icon';
import AdvancedSearchForm from '@/components/search-form';
import { getFields } from './search_fields';
import { getColumns } from './columns';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getPreEntryList, PreEntryTask, batchDeletePreEntry, batchSubmitPreEntry } from '@/api/customs_compliance/pre_entry_classification/pre_entry_workbench_service';
import { useNavigate } from 'react-router-dom';
import '@/pages/page_list.less';

const PreEntryWorkbench: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PreEntryTask[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const navigate = useNavigate();
  const searchFormRef = useRef<any>(null);
  const fields = useMemo(() => getFields(), []);

  const fetchData = async (params: any) => {
    setLoading(true);
    try {
      const res = await getPreEntryList(params);
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

  const handleNew = () => {
    navigate('/pre_entry_classification/new_pre_entry');
  };

  const handleView = (record: PreEntryTask) => {
    navigate(`/pre_entry_classification/new_pre_entry?id=${record.id}&mode=view`);
  };

  const handleEdit = (record: PreEntryTask) => {
    navigate(`/pre_entry_classification/new_pre_entry?id=${record.id}&mode=edit`);
  };

  const handleClassify = (record: PreEntryTask) => {
     navigate(`/pre_entry_classification/classification_center?pre_entry_id=${record.id}`);
  };

  const handleArchive = (record: PreEntryTask) => {
     message.success(`归档成功: ${record.pre_entry_no}`);
  };

  const columns = useMemo(() => getColumns({
      onView: handleView,
      onEdit: handleEdit,
      onClassify: handleClassify,
      onArchive: handleArchive
  }), []);

  const handleBatchImport = () => {
    message.info('批量导入功能开发中');
  };

  const handleExport = () => {
    message.info('导出功能开发中');
  };

  return (
    <div style={{overflowY: 'auto',overflowX:'hidden', height: 'calc(100vh - 80px)'}}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <span className="bill-info-title">
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px', marginRight: '8px' }} />
              {i18n.t(LocaleHelper.getPreEntryWorkbenchPageTitle())}
              <Tooltip title={
                  <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                      <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                          <li style={{ marginBottom: '10px' }}>
                              <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                                  <b>{i18n.t(LocaleHelper.getPreEntryWorkbenchHelpLabel())}</b>
                              </span>
                              <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                                  <li><b>角色：</b>{i18n.t(LocaleHelper.getPreEntryWorkbenchHelpRole())} - {i18n.t(LocaleHelper.getPreEntryWorkbenchHelpRoleDesc())}</li>
                                  <li><b>数据来源：</b>{i18n.t(LocaleHelper.getPreEntryWorkbenchHelpOrigin())} - {i18n.t(LocaleHelper.getPreEntryWorkbenchHelpOriginDesc())}</li>
                                  <li><b>功能说明：</b>{i18n.t(LocaleHelper.getPreEntryWorkbenchHelpFunc())} - {i18n.t(LocaleHelper.getPreEntryWorkbenchHelpFuncDesc())}</li>
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
                    <Button type="primary" onClick={handleNew}>{i18n.t(LocaleHelper.getPreEntryWorkbenchNew())}</Button>
                    <Button onClick={handleBatchImport}>{i18n.t(LocaleHelper.getPreEntryWorkbenchBatchImport())}</Button>
                    <Button onClick={handleExport}>{i18n.t(LocaleHelper.getPreEntryWorkbenchExport())}</Button>
                </div>
             </div>
        </div>
      </div>
      <AdvancedSearchForm
        fields={fields as any}
        onSearch={handleSearch}
      />
      <div className='nc-bill-table-area'>
          <Table<PreEntryTask>
            columns={columns}
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

export default PreEntryWorkbench;

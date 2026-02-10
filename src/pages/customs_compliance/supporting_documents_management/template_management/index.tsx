import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Button, Tooltip, Table, message } from 'antd';
import CustomIcon from '@/components/custom-icon';
import AdvancedSearchForm from '@/components/search-form';
import { getFields } from './search_fields';
import { getColumns } from './columns';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getTemplateList, deleteTemplate, copyTemplate, createTemplate, updateTemplate, TemplateItem } from '@/api/customs_compliance/supporting_documents_management/template_service';
import '@/pages/page_list.less';
import TemplateModal from './components/TemplateModal';

const TemplateManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TemplateItem[]>([]);
  const [total, setTotal] = useState(0);
  const searchFormRef = useRef<any>(null);
  const fields = useMemo(() => getFields(), []);

  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<TemplateItem | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  const fetchData = async (params: any) => {
    setLoading(true);
    try {
      const res = await getTemplateList(params);
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

  const handleCreate = () => {
      setCurrentRecord(null);
      setModalVisible(true);
  };

  const handleEdit = (record: TemplateItem) => {
      setCurrentRecord(record);
      setModalVisible(true);
  };

  const handleModalOk = async (values: any) => {
      setModalLoading(true);
      try {
          if (currentRecord) {
              await updateTemplate(currentRecord.id, values);
              message.success('更新成功');
          } else {
              await createTemplate(values);
              message.success('创建成功');
          }
          setModalVisible(false);
          fetchData({});
      } catch (error) {
          message.error('操作失败');
      } finally {
          setModalLoading(false);
      }
  };

  const handleCopy = async (record: TemplateItem) => {
      try {
          await copyTemplate(record.id);
          message.success('复制成功');
          fetchData({});
      } catch (error) {
          message.error('复制失败');
      }
  };

  const handleDelete = async (record: TemplateItem) => {
      try {
          await deleteTemplate(record.id);
          message.success('删除成功');
          fetchData({});
      } catch (error) {
          message.error('删除失败');
      }
  };

  return (
    <div style={{overflowY: 'auto',overflowX:'hidden', height: 'calc(100vh - 80px)'}}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <span className="bill-info-title">
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px', marginRight: '8px' }} />
              {i18n.t(LocaleHelper.getCcsdmTemplateManagementPageTitle())}
              <Tooltip title={
                  <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                      <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                          <li style={{ marginBottom: '10px' }}>
                              <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                                  <b>{i18n.t(LocaleHelper.getCcsdmTemplateManagementHelpLabel())}</b>
                              </span>
                              <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                                  <li><b>{i18n.t(LocaleHelper.getCcsdmTemplateManagementHelpRole())}</b>{i18n.t(LocaleHelper.getCcsdmTemplateManagementHelpRoleDesc())}</li>
                                  <li><b>{i18n.t(LocaleHelper.getCcsdmTemplateManagementHelpOrigin())}</b>{i18n.t(LocaleHelper.getCcsdmTemplateManagementHelpOriginDesc())}</li>
                                  <li><b>{i18n.t(LocaleHelper.getCcsdmTemplateManagementHelpFunc())}</b>{i18n.t(LocaleHelper.getCcsdmTemplateManagementHelpFuncDesc())}</li>
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
                    <Button type="primary" danger onClick={handleCreate}>{i18n.t(LocaleHelper.getCcsdmTemplateManagementBtnCreate())}</Button>
                </div>
             </div>
        </div>
      </div>
      <AdvancedSearchForm
        fields={fields}
        onSearch={handleSearch}
      />
      <div className='nc-bill-table-area'>
          <Table<TemplateItem>
            columns={getColumns(handleEdit, handleCopy, handleDelete) as any}
            dataSource={data}
            loading={loading}
            rowKey="id"
            pagination={{
                total,
                showTotal: (total) => `Total ${total} items`,
                showQuickJumper: true,
                showSizeChanger: true,
            }}
            scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
            size="small"
            bordered
          />
      </div>
      <TemplateModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleModalOk}
        initialValues={currentRecord}
        loading={modalLoading}
      />
    </div>
  );
};

export default TemplateManagement;

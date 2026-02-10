import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Button, Tooltip, Table, message, Modal } from 'antd';
import CustomIcon from '@/components/custom-icon';
import AdvancedSearchForm from '@/components/search-form';
import { getFields } from './search_fields';
import { getColumns } from './columns';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { 
    getReminderRuleList, 
    batchDeleteReminderRules, 
    deleteReminderRule, 
    createReminderRule, 
    updateReminderRule,
    ReminderRuleItem 
} from '@/api/customs_compliance/supporting_documents_management/reminder_service';
import ReminderModal from './components/ReminderModal';
import '@/pages/page_list.less';

const ReminderSettings: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ReminderRuleItem[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRule, setCurrentRule] = useState<ReminderRuleItem | null>(null);
  
  const searchFormRef = useRef<any>(null);
  const fields = useMemo(() => getFields(), []);

  const fetchData = async (params: any) => {
    setLoading(true);
    try {
      const res = await getReminderRuleList(params);
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
      setCurrentRule(null);
      setModalVisible(true);
  };

  const handleEdit = (record: ReminderRuleItem) => {
      setCurrentRule(record);
      setModalVisible(true);
  };

  const handleDelete = (record: ReminderRuleItem) => {
      Modal.confirm({
          title: i18n.t(LocaleHelper.getCcsdmReminderSettingsMsgConfirmDeleteTitle()),
          content: i18n.t(LocaleHelper.getCcsdmReminderSettingsMsgConfirmDeleteContent(), { count: 1 }),
          onOk: async () => {
              await deleteReminderRule(record.id);
              message.success(i18n.t(LocaleHelper.getCcsdmReminderSettingsMsgDeleteSuccess()));
              fetchData({});
          }
      });
  };

  const handleBatchDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning(i18n.t(LocaleHelper.getCcsdmReminderSettingsMsgSelectDelete()));
      return;
    }
    Modal.confirm({
        title: i18n.t(LocaleHelper.getCcsdmReminderSettingsMsgConfirmDeleteTitle()),
        content: i18n.t(LocaleHelper.getCcsdmReminderSettingsMsgConfirmDeleteContent(), { count: selectedRowKeys.length }),
        onOk: async () => {
            setLoading(true);
            try {
                await batchDeleteReminderRules(selectedRowKeys);
                message.success(i18n.t(LocaleHelper.getCcsdmReminderSettingsMsgBatchDeleteSuccess()));
                setSelectedRowKeys([]);
                fetchData({});
            } finally {
                setLoading(false);
            }
        }
    });
  };

  const handleModalOk = async (values: any) => {
      setLoading(true);
      try {
          if (currentRule) {
              await updateReminderRule(currentRule.id, values);
          } else {
              await createReminderRule(values);
          }
          setModalVisible(false);
          fetchData({});
          message.success('Success');
      } finally {
          setLoading(false);
      }
  };

  return (
    <div style={{overflowY: 'auto',overflowX:'hidden', height: 'calc(100vh - 80px)'}}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <span className="bill-info-title">
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px', marginRight: '8px' }} />
              {i18n.t(LocaleHelper.getCcsdmReminderSettingsPageTitle())}
              <Tooltip title={
                  <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                      <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                          <li style={{ marginBottom: '10px' }}>
                              <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                                  <b>说明</b>
                              </span>
                              <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                                  <li><b>角色：</b>关务经理, 系统管理员</li>
                                  <li><b>数据来源：</b>用户配置</li>
                                  <li><b>功能说明：</b>配置单证相关的提醒规则，包括到期提醒、缺失提醒等。</li>
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
                    <Button type="primary" danger onClick={handleCreate}>{i18n.t(LocaleHelper.getCcsdmReminderSettingsBtnCreate())}</Button>
                    <Button onClick={handleBatchDelete}>{i18n.t(LocaleHelper.getCcsdmReminderSettingsBtnBatchDelete())}</Button>
                </div>
             </div>
        </div>
      </div>
      <AdvancedSearchForm
        fields={fields}
        onSearch={handleSearch}
      />
      <div className='nc-bill-table-area'>
          <Table<ReminderRuleItem>
            columns={getColumns(handleEdit, handleDelete) as any}
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
      <ReminderModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleModalOk}
        initialValues={currentRule}
        loading={loading}
      />
    </div>
  );
};

export default ReminderSettings;

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Button, Tooltip, Table, message, Modal, Form, Input, Select, Descriptions, Card, Divider, Space } from 'antd';
import CustomIcon from '@/components/custom-icon';
import AdvancedSearchForm from '@/components/search-form';
import { getFields } from './search_fields';
import { getColumns } from './columns';
import LocaleHelper from '@/utils/locale';
import { ClassificationKnowledgeBaseLocale } from '@/utils/locale/customs_compliance/pre_entry_classification/knowledge_base';
import i18n from '@/i18n';
import { getKnowledgeList, importKnowledge, createKnowledge, updateKnowledge } from '@/api/customs_compliance/pre_entry_classification/knowledge_base_service';
import { KnowledgeItem } from '@/types/customs_compliance/pre_entry_classification/knowledge_base';
import { useNavigate } from 'react-router-dom';
import '@/pages/page_list.less';

const KnowledgeBase: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<KnowledgeItem[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [currentRecord, setCurrentRecord] = useState<KnowledgeItem | null>(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const searchFormRef = useRef<any>(null);
  const fields = useMemo(() => getFields(), []);

  const fetchData = async (params: any = {}) => {
    setLoading(true);
    try {
      const res = await getKnowledgeList(params);
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

  const handleNew = () => {
    setModalMode('create');
    setCurrentRecord(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: KnowledgeItem) => {
    setModalMode('edit');
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleView = (record: KnowledgeItem) => {
    setModalMode('view');
    setCurrentRecord(record);
    setModalVisible(true);
  };

  const handleModalOk = async () => {
    if (modalMode === 'view') {
        setModalVisible(false);
        return;
    }
    try {
        const values = await form.validateFields();
        if (modalMode === 'create') {
            await createKnowledge(values);
            message.success(i18n.t('common.success'));
        } else {
            await updateKnowledge({ ...currentRecord, ...values } as KnowledgeItem);
            message.success(i18n.t('common.success'));
        }
        setModalVisible(false);
        fetchData();
    } catch (error) {
        // Validation failed or API error
    }
  };

  const handleImport = () => {
    message.info('导入知识功能开发中');
  };

  const handleUseTemplate = () => {
      const template = `适用范围：\n\n关键要点：\n1. \n2. \n3. \n\n典型案例：\n案例1：\n案例2：\n\n常见问题：\nQ: \nA: `;
      form.setFieldValue('content', template);
  };

  return (
    <div style={{overflowY: 'auto',overflowX:'hidden', height: 'calc(100vh - 80px)'}}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <span className="bill-info-title">
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px', marginRight: '8px' }} />
              {i18n.t(LocaleHelper.getClassificationKnowledgeBasePageTitle())}
              <Tooltip title={
                  <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                      <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                          <li style={{ marginBottom: '10px' }}>
                              <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                                  <b>{i18n.t(LocaleHelper.getClassificationKnowledgeBaseHelpLabel())}</b>
                              </span>
                              <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                                  <li><b>角色：</b>{i18n.t(LocaleHelper.getClassificationKnowledgeBaseHelpRole())} - {i18n.t(LocaleHelper.getClassificationKnowledgeBaseHelpRoleDesc())}</li>
                                  <li><b>数据来源：</b>{i18n.t(LocaleHelper.getClassificationKnowledgeBaseHelpOrigin())} - {i18n.t(LocaleHelper.getClassificationKnowledgeBaseHelpOriginDesc())}</li>
                                  <li><b>功能说明：</b>{i18n.t(LocaleHelper.getClassificationKnowledgeBaseHelpFunc())} - {i18n.t(LocaleHelper.getClassificationKnowledgeBaseHelpFuncDesc())}</li>
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
                    <Button type="primary" onClick={handleNew}>{i18n.t(LocaleHelper.getClassificationKnowledgeBaseNew())}</Button>
                    <Button onClick={handleImport}>{i18n.t(LocaleHelper.getClassificationKnowledgeBaseImport())}</Button>
                </div>
             </div>
        </div>
      </div>
      <AdvancedSearchForm
        fields={fields as any}
        onSearch={handleSearch}
      />
      <div className='nc-bill-table-area'>
          <Table<KnowledgeItem>
            columns={getColumns(handleView, handleEdit) as any}
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
      <Modal
        title={
            modalMode === 'create' ? i18n.t(ClassificationKnowledgeBaseLocale.getClassificationKnowledgeBaseNew()) :
            modalMode === 'edit' ? i18n.t(ClassificationKnowledgeBaseLocale.getClassificationKnowledgeBaseEdit()) :
            i18n.t(ClassificationKnowledgeBaseLocale.getClassificationKnowledgeBaseView())
        }
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={800}
        footer={modalMode === 'view' ? null : undefined}
      >
        {modalMode === 'view' && currentRecord ? (
            <div>
                <Descriptions bordered column={2} size="small">
                    <Descriptions.Item label={i18n.t(ClassificationKnowledgeBaseLocale.getClassificationKnowledgeBaseTitle())} span={2}>
                        {currentRecord.title}
                    </Descriptions.Item>
                    <Descriptions.Item label={i18n.t(ClassificationKnowledgeBaseLocale.getClassificationKnowledgeBaseType())}>
                        {currentRecord.type === 'case' ? '案例' : currentRecord.type === 'guide' ? '指南' : '法规'}
                    </Descriptions.Item>
                    <Descriptions.Item label={i18n.t(ClassificationKnowledgeBaseLocale.getClassificationKnowledgeBaseCategory())}>
                        {currentRecord.category}
                    </Descriptions.Item>
                    <Descriptions.Item label={i18n.t(ClassificationKnowledgeBaseLocale.getClassificationKnowledgeBaseApplicableGoods())}>
                        {currentRecord.applicable_goods}
                    </Descriptions.Item>
                    <Descriptions.Item label={i18n.t(ClassificationKnowledgeBaseLocale.getClassificationKnowledgeBaseHSCode())}>
                        {currentRecord.hs_code}
                    </Descriptions.Item>
                </Descriptions>
                <Divider orientation='vertical'>{i18n.t(ClassificationKnowledgeBaseLocale.getClassificationKnowledgeBaseContent())}</Divider>
                <Card style={{ padding: 0 }}>
                    <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
                        {currentRecord.content || '暂无内容'}
                    </div>
                </Card>
            </div>
        ) : (
            <Form form={form} layout="vertical">
                <Form.Item name="title" label={i18n.t(ClassificationKnowledgeBaseLocale.getClassificationKnowledgeBaseTitle())} rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <Form.Item style={{ flex: 1 }} name="type" label={i18n.t(ClassificationKnowledgeBaseLocale.getClassificationKnowledgeBaseType())} rules={[{ required: true }]}>
                        <Select options={[
                            { label: '案例', value: 'case' },
                            { label: '指南', value: 'guide' },
                            { label: '法规', value: 'rule' },
                        ]} />
                    </Form.Item>
                    <Form.Item style={{ flex: 1 }} name="category" label={i18n.t(ClassificationKnowledgeBaseLocale.getClassificationKnowledgeBaseCategory())}>
                         <Select options={[
                            { label: '第84章', value: '84' },
                            { label: '第85章', value: '85' },
                            { label: '第90章', value: '90' },
                        ]} />
                    </Form.Item>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <Form.Item style={{ flex: 1 }} name="applicable_goods" label={i18n.t(ClassificationKnowledgeBaseLocale.getClassificationKnowledgeBaseApplicableGoods())}>
                        <Input />
                    </Form.Item>
                    <Form.Item style={{ flex: 1 }} name="hs_code" label={i18n.t(ClassificationKnowledgeBaseLocale.getClassificationKnowledgeBaseHSCode())}>
                        <Input />
                    </Form.Item>
                </div>
                 <Form.Item 
                    label={
                        <Space>
                            {i18n.t(ClassificationKnowledgeBaseLocale.getClassificationKnowledgeBaseContent())}
                            <Button type="link" size="small" onClick={handleUseTemplate} style={{ padding: 0 }}>
                                使用模板
                            </Button>
                        </Space>
                    }
                    name="content"
                 >
                    <Input.TextArea rows={12} placeholder="输入知识内容..." />
                </Form.Item>
            </Form>
        )}
      </Modal>
    </div>
  );
};

export default KnowledgeBase;

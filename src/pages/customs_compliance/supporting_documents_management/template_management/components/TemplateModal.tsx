import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Radio, Checkbox, Row, Col, Divider, Space } from 'antd';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { TemplateItem } from '@/types/customs_compliance/supporting_documents_management/template';

interface TemplateModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: any) => void;
  initialValues?: TemplateItem | null;
  loading?: boolean;
}

const TemplateModal: React.FC<TemplateModalProps> = ({
  visible,
  onCancel,
  onOk,
  initialValues,
  loading
}) => {
  const [form] = Form.useForm();
  
  // Mock document types grouped by category
  const documentGroups = [
      {
          title: i18n.t(LocaleHelper.getCcsdmTemplateManagementFormGroupBasic()),
          options: [
              { label: '合同 (Contract)', value: 'contract' },
              { label: '发票 (Invoice)', value: 'invoice' },
              { label: '装箱单 (Packing List)', value: 'packing_list' },
              { label: '提单 (Bill of Lading)', value: 'bill_of_lading' },
          ]
      },
      {
          title: i18n.t(LocaleHelper.getCcsdmTemplateManagementFormGroupLicense()),
          options: [
              { label: '自动进口许可证', value: 'auto_import_license' },
              { label: '两用物项许可证', value: 'dual_use_license' },
              { label: '濒危物种证明', value: 'endangered_species_cert' },
          ]
      },
      {
          title: i18n.t(LocaleHelper.getCcsdmTemplateManagementFormGroupOrigin()),
          options: [
              { label: '原产地证书 (Certificate of Origin)', value: 'co' },
              { label: '优惠原产地证', value: 'preferential_co' },
          ]
      },
      {
          title: i18n.t(LocaleHelper.getCcsdmTemplateManagementFormGroupInspection()),
          options: [
              { label: '植物检疫证书', value: 'phytosanitary_cert' },
              { label: '卫生证书', value: 'health_cert' },
              { label: '品质证书', value: 'quality_cert' },
          ]
      },
      {
          title: i18n.t(LocaleHelper.getCcsdmTemplateManagementFormGroupOther()),
          options: [
              { label: '保险单 (Insurance Policy)', value: 'insurance' },
              { label: '3C证书', value: 'ccc_cert' },
              { label: '情况说明', value: 'statement' },
          ]
      }
  ];

  useEffect(() => {
    if (visible) {
      if (initialValues) {
        form.setFieldsValue({
            ...initialValues,
            // Mock selected documents for edit mode
            documents: ['contract', 'invoice', 'packing_list'] 
        });
      } else {
        form.resetFields();
        form.setFieldsValue({
            status: 'active',
            businessType: 'import',
            tradeMode: 'general'
        });
      }
    }
  }, [visible, initialValues, form]);

  return (
    <Modal
      title={initialValues ? i18n.t(LocaleHelper.getCcsdmTemplateManagementModalTitleEdit()) : i18n.t(LocaleHelper.getCcsdmTemplateManagementModalTitleCreate())}
      open={visible}
      onOk={() => form.validateFields().then(onOk)}
      onCancel={onCancel}
      confirmLoading={loading}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Row gutter={16}>
            <Col span={12}>
                <Form.Item
                  name="templateName"
                  label={i18n.t(LocaleHelper.getCcsdmTemplateManagementFormLabelTemplateName())}
                  rules={[{ required: true, message: 'Please input template name' }]}
                >
                  <Input placeholder="请输入模板名称" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                  name="status"
                  label={i18n.t(LocaleHelper.getCcsdmTemplateManagementFormLabelStatus())}
                  rules={[{ required: true }]}
                >
                  <Radio.Group>
                      <Radio value="active">启用</Radio>
                      <Radio value="inactive">禁用</Radio>
                  </Radio.Group>
                </Form.Item>
            </Col>
        </Row>

        <Row gutter={16}>
            <Col span={12}>
                <Form.Item
                  name="businessType"
                  label={i18n.t(LocaleHelper.getCcsdmTemplateManagementFormLabelBusinessType())}
                  rules={[{ required: true }]}
                >
                  <Select>
                      <Select.Option value="import">进口</Select.Option>
                      <Select.Option value="export">出口</Select.Option>
                  </Select>
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                  name="tradeMode"
                  label={i18n.t(LocaleHelper.getCcsdmTemplateManagementFormLabelTradeMode())}
                  rules={[{ required: true }]}
                >
                  <Select>
                      <Select.Option value="general">一般贸易</Select.Option>
                      <Select.Option value="processing">加工贸易</Select.Option>
                      <Select.Option value="temporary">暂时进出口</Select.Option>
                      <Select.Option value="e_commerce">跨境电商</Select.Option>
                  </Select>
                </Form.Item>
            </Col>
        </Row>

        <Form.Item
          name="description"
          label={i18n.t(LocaleHelper.getCcsdmTemplateManagementFormLabelDescription())}
        >
          <Input.TextArea rows={2} placeholder="请输入模板描述" />
        </Form.Item>

        <Divider orientation="horizontal">{i18n.t(LocaleHelper.getCcsdmTemplateManagementFormLabelDocuments())}</Divider>
        
        <Form.Item name="documents">
            <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}>
                {documentGroups.map((group, index) => (
                    <div key={index} style={{ marginBottom: '16px' }}>
                        <h4 style={{ marginBottom: '8px', color: '#1890ff', fontWeight: 'bold' }}>{group.title}</h4>
                        <Checkbox.Group style={{ width: '100%' }}>
                            <Row gutter={[8, 8]}>
                                {group.options.map(opt => (
                                    <Col span={8} key={opt.value}>
                                        <Checkbox value={opt.value}>{opt.label}</Checkbox>
                                    </Col>
                                ))}
                            </Row>
                        </Checkbox.Group>
                    </div>
                ))}
            </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TemplateModal;

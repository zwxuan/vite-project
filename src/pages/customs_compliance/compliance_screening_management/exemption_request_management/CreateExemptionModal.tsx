import React, { useState } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { createExemption } from '@/api/customs_compliance/compliance_screening_management/exemption_service';

interface CreateExemptionModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const CreateExemptionModal: React.FC<CreateExemptionModalProps> = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await createExemption(values);
      message.success(i18n.t(LocaleHelper.getSuccess()));
      form.resetFields();
      onSuccess();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={i18n.t(LocaleHelper.getExemptionRequestBtnNew())}
      open={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="screeningId"
          label={i18n.t(LocaleHelper.getExemptionRequestColScreeningId())}
          rules={[{ required: true, message: i18n.t(LocaleHelper.getInputPlaceholder()) }]}
        >
          <Input placeholder={i18n.t(LocaleHelper.getInputPlaceholder())} />
        </Form.Item>
        <Form.Item
          name="entity"
          label={i18n.t(LocaleHelper.getExemptionRequestColEntity())}
          rules={[{ required: true, message: i18n.t(LocaleHelper.getInputPlaceholder()) }]}
        >
          <Input placeholder={i18n.t(LocaleHelper.getInputPlaceholder())} />
        </Form.Item>
        <Form.Item
          name="risk"
          label={i18n.t(LocaleHelper.getExemptionRequestColRiskLevel())}
          rules={[{ required: true, message: i18n.t(LocaleHelper.getSelectPlaceholder()) }]}
        >
          <Select placeholder={i18n.t(LocaleHelper.getSelectPlaceholder())}>
            <Select.Option value="High">High</Select.Option>
            <Select.Option value="Medium">Medium</Select.Option>
            <Select.Option value="Low">Low</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="reason"
          label={i18n.t(LocaleHelper.getExemptionRequestFieldReason())}
          rules={[{ required: true, message: i18n.t(LocaleHelper.getInputPlaceholder()) }]}
        >
          <Input.TextArea rows={4} placeholder={i18n.t(LocaleHelper.getInputPlaceholder())} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateExemptionModal;

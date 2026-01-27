import React from 'react';
import { Modal, Form, Input, Switch } from 'antd';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

type RuleConfigValues = {
  ruleVersion: string;
  addressFormatCheck: boolean;
  requireHsCode: boolean;
  sensitiveWordsCheck: boolean;
};

const RuleConfigModal: React.FC<{
  open: boolean;
  initialValues?: Partial<RuleConfigValues>;
  onCancel: () => void;
  onApply: (values: RuleConfigValues) => void;
}> = ({ open, initialValues, onCancel, onApply }) => {
  const [form] = Form.useForm<RuleConfigValues>();

  return (
    <Modal
      open={open}
      title={i18n.t(LocaleHelper.getDocumentComplianceRuleConfig())}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            onApply(values);
          });
      }}
      destroyOnClose
      maskClosable={false}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          ruleVersion: initialValues?.ruleVersion ?? 'v1.2.0',
          addressFormatCheck: initialValues?.addressFormatCheck ?? true,
          requireHsCode: initialValues?.requireHsCode ?? true,
          sensitiveWordsCheck: initialValues?.sensitiveWordsCheck ?? true,
        }}
      >
        <Form.Item
          name="ruleVersion"
          label={i18n.t(LocaleHelper.getDocumentComplianceRuleVersion())}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="addressFormatCheck"
          label={i18n.t(LocaleHelper.getDocumentComplianceAddressFormatCheck())}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          name="requireHsCode"
          label={i18n.t(LocaleHelper.getDocumentComplianceRequireHsCode())}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          name="sensitiveWordsCheck"
          label={i18n.t(LocaleHelper.getDocumentComplianceSensitiveWordsCheck())}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RuleConfigModal;

import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Checkbox, Radio, message } from 'antd';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { ReminderRuleItem } from '@/api/customs_compliance/supporting_documents_management/reminder_service';

interface ReminderModalProps {
    visible: boolean;
    onCancel: () => void;
    onOk: (values: any) => void;
    initialValues?: ReminderRuleItem | null;
    loading?: boolean;
}

const ReminderModal: React.FC<ReminderModalProps> = ({
    visible,
    onCancel,
    onOk,
    initialValues,
    loading
}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            if (initialValues) {
                form.setFieldsValue(initialValues);
            } else {
                form.resetFields();
                form.setFieldsValue({
                    status: 'active',
                    reminderType: 'system'
                });
            }
        }
    }, [visible, initialValues, form]);

    return (
        <Modal
            title={initialValues ? i18n.t(LocaleHelper.getCcsdmReminderSettingsModalTitleEdit()) : i18n.t(LocaleHelper.getCcsdmReminderSettingsModalTitleCreate())}
            open={visible}
            onOk={() => form.validateFields().then(onOk)}
            onCancel={onCancel}
            confirmLoading={loading}
            width={600}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="ruleName"
                    label={i18n.t(LocaleHelper.getCcsdmReminderSettingsFormLabelRuleName())}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="reminderType"
                    label={i18n.t(LocaleHelper.getCcsdmReminderSettingsFormLabelReminderType())}
                    rules={[{ required: true }]}
                >
                    <Radio.Group>
                        <Radio value="system">{i18n.t(LocaleHelper.getCcsdmReminderSettingsOptionSystem())}</Radio>
                        <Radio value="email">{i18n.t(LocaleHelper.getCcsdmReminderSettingsOptionEmail())}</Radio>
                        <Radio value="sms">{i18n.t(LocaleHelper.getCcsdmReminderSettingsOptionSMS())}</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name="triggerCondition"
                    label={i18n.t(LocaleHelper.getCcsdmReminderSettingsFormLabelTriggerCondition())}
                    rules={[{ required: true }]}
                >
                    <Input placeholder="e.g. 申报前 2 天" />
                </Form.Item>
                <Form.Item
                    name="recipients"
                    label={i18n.t(LocaleHelper.getCcsdmReminderSettingsFormLabelRecipients())}
                    rules={[{ required: true }]}
                >
                    <Select mode="tags" placeholder="Enter recipients" />
                </Form.Item>
                <Form.Item
                    name="description"
                    label={i18n.t(LocaleHelper.getCcsdmReminderSettingsFormLabelDescription())}
                >
                    <Input.TextArea rows={3} />
                </Form.Item>
                <Form.Item
                    name="status"
                    label={i18n.t(LocaleHelper.getCcsdmReminderSettingsSearchStatus())}
                    rules={[{ required: true }]}
                >
                     <Radio.Group>
                        <Radio value="active">{i18n.t(LocaleHelper.getCcsdmReminderSettingsStatusActive())}</Radio>
                        <Radio value="inactive">{i18n.t(LocaleHelper.getCcsdmReminderSettingsStatusInactive())}</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ReminderModal;

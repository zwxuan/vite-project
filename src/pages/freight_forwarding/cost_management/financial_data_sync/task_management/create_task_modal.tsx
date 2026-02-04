import React, { useState } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { SyncType, SyncScheduleType } from '@/types/freight_forwarding/cost_management';

interface CreateTaskModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const scheduleType = Form.useWatch('scheduleType', form);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setConfirmLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Create task values:', values);
      message.success('新建任务成功');
      setConfirmLoading(false);
      form.resetFields();
      onSuccess();
    } catch (error) {
      console.error('Validate Failed:', error);
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="新建任务"
      open={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          syncType: SyncType.COST_ALLOCATION,
          scheduleType: SyncScheduleType.DAILY,
        }}
      >
        <Form.Item
          name="taskNo"
          label={i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementColTaskNo())}
          rules={[{ required: true, message: '请输入任务编号' }]}
        >
          <Input placeholder="请输入任务编号" />
        </Form.Item>
        <Form.Item
          name="syncType"
          label={i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementColSyncType())}
          rules={[{ required: true, message: '请选择同步类型' }]}
        >
          <Select>
            <Select.Option value={SyncType.COST_ALLOCATION}>{i18n.t(LocaleHelper.getFinancialDataSyncCommonTypeCostAllocation())}</Select.Option>
            <Select.Option value={SyncType.ORDER_FEE}>{i18n.t(LocaleHelper.getFinancialDataSyncCommonTypeOrderFee())}</Select.Option>
            <Select.Option value={SyncType.BILLING}>{i18n.t(LocaleHelper.getFinancialDataSyncCommonTypeBilling())}</Select.Option>
            <Select.Option value={SyncType.INVOICE}>{i18n.t(LocaleHelper.getFinancialDataSyncCommonTypeInvoice())}</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="scheduleType"
          label={i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementColScheduleType())}
          rules={[{ required: true, message: '请选择调度类型' }]}
        >
          <Select>
            <Select.Option value={SyncScheduleType.REAL_TIME}>{i18n.t(LocaleHelper.getFinancialDataSyncCommonScheduleRealTime())}</Select.Option>
            <Select.Option value={SyncScheduleType.HOURLY}>{i18n.t(LocaleHelper.getFinancialDataSyncCommonScheduleHourly())}</Select.Option>
            <Select.Option value={SyncScheduleType.DAILY}>{i18n.t(LocaleHelper.getFinancialDataSyncCommonScheduleDaily())}</Select.Option>
            <Select.Option value={SyncScheduleType.WEEKLY}>{i18n.t(LocaleHelper.getFinancialDataSyncCommonScheduleWeekly())}</Select.Option>
            <Select.Option value={SyncScheduleType.CRON}>Cron表达式</Select.Option>
          </Select>
        </Form.Item>
        {scheduleType === SyncScheduleType.CRON && (
          <Form.Item
            name="cronExpression"
            label="Cron表达式"
            rules={[{ required: true, message: '请输入Cron表达式' }]}
          >
            <Input placeholder="请输入Cron表达式，如：0 0 12 * * ?" />
          </Form.Item>
        )}
        <Form.Item
          name="owner"
          label={i18n.t(LocaleHelper.getFinancialDataSyncTaskManagementColOwner())}
          rules={[{ required: true, message: '请输入负责人' }]}
        >
          <Input placeholder="请输入负责人" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTaskModal;

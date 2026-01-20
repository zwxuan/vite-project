import React from 'react';
import { Button, Card, Checkbox, Col, Form, Input, Modal, Row, Select, Space } from 'antd';
import type { FormInstance } from 'antd';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

type AdjustPlanModalProps = {
  open: boolean;
  onCancel: () => void;
  form: FormInstance;
  adjustReasonTypeOptions: { label: string; value: string }[];
  adjustReasonOptions: { label: string; value: string }[];
  onAdjust: () => void;
  onReoptimize: () => void;
  onAdjustCancel: () => void;
};

const modalBodyStyle = { maxHeight: '70vh', overflowY: 'auto', overflowX: 'hidden' } as const;

const AdjustPlanModal: React.FC<AdjustPlanModalProps> = ({
  open,
  onCancel,
  form,
  adjustReasonTypeOptions,
  adjustReasonOptions,
  onAdjust,
  onReoptimize,
  onAdjustCancel,
}) => (
  <Modal
    title={i18n.t(LocaleHelper.getPickupPlanAdjustFormTitle())}
    width={1000}
    open={open}
    onCancel={onCancel}
    styles={{ body: modalBodyStyle }}
    footer={
      <Space>
        <Button type="primary" onClick={onAdjust}>
          {i18n.t(LocaleHelper.getPickupPlanAdjustSave())}
        </Button>
        <Button onClick={onReoptimize}>
          {i18n.t(LocaleHelper.getPickupPlanAdjustReoptimize())}
        </Button>
        <Button onClick={onAdjustCancel}>
          {i18n.t(LocaleHelper.getPickupPlanAdjustCancel())}
        </Button>
      </Space>
    }
  >
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        originalPickupDate: '2024-03-18',
        originalPickupTime: '09:00-11:00',
        originalDepot: i18n.t(LocaleHelper.getPickupPlanGenerateSampleDepot()),
        originalContact: i18n.t(LocaleHelper.getPickupPlanGenerateSampleContactName()),
        originalContainer: '40HQ × 2',
        originalStatus: i18n.t(LocaleHelper.getPickupPlanAdjustStatusConfirmed()),
        adjustReasonType: 'time',
        adjustReason: 'maintenance',
        adjustReasonDetail: i18n.t(LocaleHelper.getPickupPlanAdjustReasonDetailSample()),
        newPickupDate: '2024-03-18',
        newPickupTimeStart: '14:00',
        newPickupTimeEnd: '16:00',
        newDepot: i18n.t(LocaleHelper.getPickupPlanGenerateSampleDepot()),
        newContactName: i18n.t(LocaleHelper.getPickupPlanGenerateSampleContactName()),
        newContactPhone: '138****1234',
        newContactEmail: 'zhang@company.com',
        impactBooking: i18n.t(LocaleHelper.getPickupPlanAdjustImpactBookingSample()),
        impactCustomer: i18n.t(LocaleHelper.getPickupPlanAdjustImpactCustomerSample()),
        impactCost: i18n.t(LocaleHelper.getPickupPlanAdjustImpactCostSample()),
        impactRisk: i18n.t(LocaleHelper.getPickupPlanAdjustImpactRiskSample()),
        notificationTypes: ['tms', 'operator', 'customer', 'calendar'],
        approvalCurrent: i18n.t(LocaleHelper.getPickupPlanAdjustApprovalCurrentSample()),
        approvalStatus: i18n.t(LocaleHelper.getPickupPlanAdjustApprovalStatusSample()),
        approvalComment: i18n.t(LocaleHelper.getPickupPlanAdjustApprovalCommentSample()),
        approvalTime: i18n.t(LocaleHelper.getPickupPlanAdjustApprovalTimeSample()),
        approvalNext: i18n.t(LocaleHelper.getPickupPlanAdjustApprovalNextSample()),
      }}
    >
      <Card title={i18n.t(LocaleHelper.getPickupPlanAdjustOriginalInfo())} bordered={false} style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanAdjustOriginalPickupDate())} name="originalPickupDate">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanAdjustOriginalPickupTime())} name="originalPickupTime">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanAdjustOriginalDepot())} name="originalDepot">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanAdjustOriginalContact())} name="originalContact">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanAdjustOriginalContainer())} name="originalContainer">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanAdjustOriginalStatus())} name="originalStatus">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card title={i18n.t(LocaleHelper.getPickupPlanAdjustReasonTitle())} bordered={false} style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanAdjustReasonType())} name="adjustReasonType">
              <Select options={adjustReasonTypeOptions} />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanAdjustReasonValue())} name="adjustReason">
              <Select options={adjustReasonOptions} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanAdjustReasonDetail())} name="adjustReasonDetail">
              <Input.TextArea rows={3} />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card title={i18n.t(LocaleHelper.getPickupPlanAdjustNewPlan())} bordered={false} style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanAdjustNewPickupDate())} name="newPickupDate">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanAdjustNewPickupTime())} name="newPickupTimeStart">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanAdjustNewPickupTimeEnd())} name="newPickupTimeEnd">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanAdjustNewDepot())} name="newDepot">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanAdjustNewContactName())} name="newContactName">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanAdjustNewContactPhone())} name="newContactPhone">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanAdjustNewContactEmail())} name="newContactEmail">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card title={i18n.t(LocaleHelper.getPickupPlanAdjustImpactTitle())} bordered={false} style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanAdjustImpactBooking())} name="impactBooking">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanAdjustImpactCustomer())} name="impactCustomer">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanAdjustImpactCost())} name="impactCost">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanAdjustImpactRisk())} name="impactRisk">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card title={i18n.t(LocaleHelper.getPickupPlanAdjustNotificationTitle())} bordered={false} style={{ marginBottom: 16 }}>
        <Form.Item name="notificationTypes">
          <Checkbox.Group
            options={[
              { label: i18n.t(LocaleHelper.getPickupPlanAdjustNotifyTms()), value: 'tms' },
              { label: i18n.t(LocaleHelper.getPickupPlanAdjustNotifyOperator()), value: 'operator' },
              { label: i18n.t(LocaleHelper.getPickupPlanAdjustNotifyCustomer()), value: 'customer' },
              { label: i18n.t(LocaleHelper.getPickupPlanAdjustNotifyCalendar()), value: 'calendar' },
            ]}
          />
        </Form.Item>
      </Card>
      <Card title={i18n.t(LocaleHelper.getPickupPlanAdjustApprovalTitle())} bordered={false}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanAdjustApprovalCurrent())} name="approvalCurrent">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanAdjustApprovalStatus())} name="approvalStatus">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanAdjustApprovalTime())} name="approvalTime">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanAdjustApprovalComment())} name="approvalComment">
              <Input.TextArea rows={2} disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanAdjustApprovalNext())} name="approvalNext">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  </Modal>
);

export type { AdjustPlanModalProps };
export default AdjustPlanModal;

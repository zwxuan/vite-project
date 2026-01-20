import React from 'react';
import { Button, Card, Col, Form, Input, InputNumber, List, Modal, Row, Space, Table } from 'antd';
import type { FormInstance } from 'antd';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

type ContainerRequirement = {
  key: string;
  containerType: string;
  quantity: number;
  condition: string;
  specialRequirement: string;
};

type GeneratePlanModalProps = {
  open: boolean;
  onCancel: () => void;
  form: FormInstance;
  containerRequirements: ContainerRequirement[];
  containerRequirementColumns: any[];
  onGenerate: () => void;
  onSave: () => void;
  onAddRequirement: () => void;
};

const modalBodyStyle = { maxHeight: '70vh', overflowY: 'auto', overflowX: 'hidden' } as const;

const GeneratePlanModal: React.FC<GeneratePlanModalProps> = ({
  open,
  onCancel,
  form,
  containerRequirements,
  containerRequirementColumns,
  onGenerate,
  onSave,
  onAddRequirement,
}) => (
  <Modal
    title={i18n.t(LocaleHelper.getPickupPlanGenerateFormTitle())}
    width={1000}
    open={open}
    onCancel={onCancel}
    styles={{ body: modalBodyStyle }}
    footer={
      <Space>
        <Button type="primary" onClick={onGenerate}>
          {i18n.t(LocaleHelper.getPickupPlanGenerateSmart())}
        </Button>
        <Button onClick={onSave}>{i18n.t(LocaleHelper.getPickupPlanGenerateSave())}</Button>
      </Space>
    }
  >
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        bookingNo: 'BKG-20240315-001',
        carrier: 'COSCO',
        vesselVoyage: 'MSC OSCAR / 240320E',
        sailingDate: '2024-03-20',
        route: i18n.t(LocaleHelper.getPickupPlanGenerateSampleRoute()),
        containerSummary: '40HQ × 2',
        depot: i18n.t(LocaleHelper.getPickupPlanGenerateSampleDepot()),
        depotAddress: i18n.t(LocaleHelper.getPickupPlanGenerateSampleDepotAddress()),
        pickupDate: '2024-03-18',
        pickupTime: '09:00',
        cutoffTime: '2024-03-18 16:00',
        estimatedDuration: 120,
        contactName: i18n.t(LocaleHelper.getPickupPlanGenerateSampleContactName()),
        contactPhone: '138****1234',
        contactEmail: 'zhang@company.com',
        remark: i18n.t(LocaleHelper.getPickupPlanGenerateSampleRemark()),
      }}
    >
      <Card title={i18n.t(LocaleHelper.getPickupPlanGenerateBookingInfo())} bordered={false} style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanBookingNo())} name="bookingNo">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanGenerateCarrier())} name="carrier">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanGenerateVesselVoyage())} name="vesselVoyage">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanGenerateSailingDate())} name="sailingDate">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanGenerateRoute())} name="route">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanGenerateContainerSummary())} name="containerSummary">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card title={i18n.t(LocaleHelper.getPickupPlanGeneratePickupArrangement())} bordered={false} style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanGenerateDepot())} name="depot">
              <Input />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanGenerateDepotAddress())} name="depotAddress">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanGeneratePickupDate())} name="pickupDate">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanGeneratePickupTime())} name="pickupTime">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanGenerateCutoffTime())} name="cutoffTime">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanGenerateEstimatedDuration())} name="estimatedDuration">
              <InputNumber min={10} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card
        title={i18n.t(LocaleHelper.getPickupPlanGenerateContainerRequirements())}
        bordered={false}
        style={{ marginBottom: 16 }}
        extra={
          <Button type="link" onClick={onAddRequirement}>
            {i18n.t(LocaleHelper.getPickupPlanGenerateAddRequirement())}
          </Button>
        }
      >
        <Table
          columns={containerRequirementColumns as any}
          dataSource={containerRequirements}
          rowKey="key"
          size="small"
          bordered
          pagination={false}
        />
      </Card>
      <Card title={i18n.t(LocaleHelper.getPickupPlanGenerateContactInfo())} bordered={false} style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanGenerateContactName())} name="contactName">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanGenerateContactPhone())} name="contactPhone">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={i18n.t(LocaleHelper.getPickupPlanGenerateContactEmail())} name="contactEmail">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card title={i18n.t(LocaleHelper.getPickupPlanGenerateSpecialInstructions())} bordered={false} style={{ marginBottom: 16 }}>
        <Form.Item label={i18n.t(LocaleHelper.getPickupPlanGenerateRemarks())} name="remark">
          <Input.TextArea rows={3} />
        </Form.Item>
      </Card>
      <Card title={i18n.t(LocaleHelper.getPickupPlanGenerateOptimizationSuggestions())} bordered={false}>
        <List
          dataSource={[
            i18n.t(LocaleHelper.getPickupPlanGenerateSuggestion1()),
            i18n.t(LocaleHelper.getPickupPlanGenerateSuggestion2()),
            i18n.t(LocaleHelper.getPickupPlanGenerateSuggestion3()),
          ]}
          renderItem={(item) => <List.Item>✓ {item}</List.Item>}
        />
      </Card>
    </Form>
  </Modal>
);

export type { ContainerRequirement, GeneratePlanModalProps };
export default GeneratePlanModal;

import React from 'react';
import { Button, Card, Descriptions, Modal, Space, Table } from 'antd';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import type { PickupPlanItem } from '@/types/freight_forwarding/booking_management';

type PlanDetailModalProps = {
  open: boolean;
  onCancel: () => void;
  selectedPlan: PickupPlanItem | null;
  planStatusTextMap: Record<PickupPlanItem['status'], string>;
};

const modalBodyStyle = { maxHeight: '70vh', overflowY: 'auto', overflowX: 'hidden' } as const;

const PlanDetailModal: React.FC<PlanDetailModalProps> = ({ open, onCancel, selectedPlan, planStatusTextMap }) => (
  <Modal
    title={i18n.t(LocaleHelper.getPickupPlanDetailFormTitle())}
    width={1000}
    open={open}
    onCancel={onCancel}
    styles={{ body: modalBodyStyle }}
    footer={
      <Space>
        <Button>{i18n.t(LocaleHelper.getPickupPlanDetailEdit())}</Button>
        <Button type="primary">{i18n.t(LocaleHelper.getPickupPlanDetailPush())}</Button>
        <Button danger>{i18n.t(LocaleHelper.getPickupPlanDetailCancel())}</Button>
        <Button>{i18n.t(LocaleHelper.getPickupPlanDetailPrint())}</Button>
      </Space>
    }
  >
    {selectedPlan && (
      <div>
        <Card title={i18n.t(LocaleHelper.getPickupPlanDetailBasicInfo())} bordered={false} style={{ marginBottom: 12 }}>
          <Descriptions size="small" column={2}>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailPlanId())}>{selectedPlan.planNo}</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailCreateTime())}>2024-03-15 14:30</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailBookingNo())}>{selectedPlan.bookingNo}</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailOperator())}>李操作员</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailPlanStatus())}>{planStatusTextMap[selectedPlan.status]}</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailPushStatus())}>已推送</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailOptimizationScore())}>92.5</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailTmsTask())}>TMS-240315-001</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card title={i18n.t(LocaleHelper.getPickupPlanDetailBookingInfo())} bordered={false} style={{ marginBottom: 12 }}>
          <Descriptions size="small" column={2}>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailCarrier())}>COSCO</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailVesselVoyage())}>MSC OSCAR/240320E</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailRoute())}>上海港 → 洛杉矶港</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailSailingDate())}>2024-03-20</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailServiceType())}>CY-CY</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailTransportTerms())}>FCL</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card title={i18n.t(LocaleHelper.getPickupPlanDetailPickupArrangement())} bordered={false} style={{ marginBottom: 12 }}>
          <Descriptions size="small" column={2}>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailDepotName())}>{selectedPlan.depot}</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailDepotCode())}>CNSHA-WGQ</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailDepotAddress())}>上海市浦东新区外高桥保税区富特北路211号</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailPlannedDate())}>{selectedPlan.plannedDate}</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailPlannedTime())}>09:00-11:00</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailCutoffTime())}>2024-03-18 16:00</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailEstimatedDuration())}>120分钟</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card title={i18n.t(LocaleHelper.getPickupPlanDetailContainerRequirements())} bordered={false} style={{ marginBottom: 12 }}>
          <Table
            size="small"
            bordered
            pagination={false}
            rowKey="serial"
            columns={[
              { title: i18n.t(LocaleHelper.getPickupPlanDetailContainerSerialNo()), dataIndex: 'serial', width: 70 },
              { title: i18n.t(LocaleHelper.getPickupPlanDetailContainerType()), dataIndex: 'type', width: 100 },
              { title: i18n.t(LocaleHelper.getPickupPlanDetailContainerSize()), dataIndex: 'size', width: 100 },
              { title: i18n.t(LocaleHelper.getPickupPlanDetailContainerQuantity()), dataIndex: 'quantity', width: 100 },
              { title: i18n.t(LocaleHelper.getPickupPlanDetailContainerCondition()), dataIndex: 'condition', width: 100 },
              { title: i18n.t(LocaleHelper.getPickupPlanDetailContainerTemperatureControl()), dataIndex: 'temperature', width: 100 },
              { title: i18n.t(LocaleHelper.getPickupPlanDetailContainerDangerousGoods()), dataIndex: 'dangerous', width: 100 },
              { title: i18n.t(LocaleHelper.getPickupPlanDetailContainerSpecialRequirement()), dataIndex: 'special', width: 140 },
            ]}
            dataSource={[
              { serial: 1, type: '40HQ', size: '40尺', quantity: 2, condition: '适货', temperature: '否', dangerous: '否', special: '清洁无异味' },
            ]}
            footer={() => `${i18n.t(LocaleHelper.getPickupPlanDetailContainerTotal())}：2`}
          />
        </Card>
        <Card title={i18n.t(LocaleHelper.getPickupPlanDetailContactInfo())} bordered={false} style={{ marginBottom: 12 }}>
          <Descriptions size="small" column={2}>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailContactName())}>张师傅</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailContactPhone())}>138****1234</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailContactEmail())}>zhang@company.com</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailBackupPhone())}>021-58****567</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card title={i18n.t(LocaleHelper.getPickupPlanDetailExecutionTracking())} bordered={false} style={{ marginBottom: 12 }}>
          <Descriptions size="small" column={2}>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailPushTime())}>2024-03-15 15:30</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailPushResult())}>成功</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailTmsTask())}>TMS-240315-001</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailTaskStatus())}>已接收</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailLatestStatus())}>等待执行</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanDetailUpdateTime())}>2024-03-15 16:00</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card title={i18n.t(LocaleHelper.getPickupPlanDetailOperationLogs())} bordered={false}>
          <Table
            size="small"
            bordered
            pagination={false}
            rowKey="time"
            columns={[
              { title: i18n.t(LocaleHelper.getPickupPlanDetailLogTime()), dataIndex: 'time', width: 140 },
              { title: i18n.t(LocaleHelper.getPickupPlanDetailLogUser()), dataIndex: 'user', width: 120 },
              { title: i18n.t(LocaleHelper.getPickupPlanDetailLogType()), dataIndex: 'type', width: 100 },
              { title: i18n.t(LocaleHelper.getPickupPlanDetailLogContent()), dataIndex: 'content' },
            ]}
            dataSource={[
              { time: '15:30', user: '系统', type: '推送', content: '推送至运输管理系统' },
              { time: '15:00', user: '李操作员', type: '确认', content: '确认提箱计划' },
              { time: '14:30', user: '系统', type: '生成', content: '自动生成提箱计划' },
            ]}
          />
        </Card>
      </div>
    )}
  </Modal>
);

export type { PlanDetailModalProps };
export default PlanDetailModal;

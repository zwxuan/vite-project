import React from 'react';
import { Card, Descriptions, Modal, Timeline } from 'antd';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import type { PickupTrackingItem } from '@/types/freight_forwarding/booking_management';

type TrackingDetailModalProps = {
  open: boolean;
  onCancel: () => void;
  selectedTracking: PickupTrackingItem | null;
  trackingStatusTextMap: Record<PickupTrackingItem['status'], string>;
};

const modalBodyStyle = { maxHeight: '70vh', overflowY: 'auto', overflowX: 'hidden' } as const;

const TrackingDetailModal: React.FC<TrackingDetailModalProps> = ({
  open,
  onCancel,
  selectedTracking,
  trackingStatusTextMap,
}) => (
  <Modal
    title={i18n.t(LocaleHelper.getPickupPlanTrackingDetailTitle())}
    width={800}
    open={open}
    onCancel={onCancel}
    styles={{ body: modalBodyStyle }}
    footer={null}
  >
    {selectedTracking && (
      <div>
        <Card bordered={false} style={{ marginBottom: 12 }}>
          <Descriptions size="small" column={1} title={`${selectedTracking.planNo} - ${trackingStatusTextMap[selectedTracking.status]}`} />
          <div style={{ padding: '8px 0' }}>{i18n.t(LocaleHelper.getPickupPlanTrackingExecutionTimeline())}</div>
          <Timeline mode="left" items={[
            { label: '08:45', children: '车辆到达场站 司机：王师傅 车牌：沪A12345' },
            { label: '09:00', children: '开始办理提箱手续 办理人：场站操作员' },
            { label: '09:15', children: '集装箱检查完成 箱号：COSU1234567' },
            { label: '09:30', children: '正在装载集装箱 预计完成：10:00' },
          ]} />
        </Card>
        <Card title={i18n.t(LocaleHelper.getPickupPlanTrackingExceptionHandling())} bordered={false}>
          <Descriptions size="small" column={2}>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanTrackingExceptionType())}>场站系统故障</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanTrackingOccurTime())}>14:30</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanTrackingImpactScope())}>PKP-004等3个计划</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanTrackingEstimatedRecovery())}>16:00</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanTrackingMeasure())}>联系场站技术部门，协调备用通道</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanTrackingResponsible())}>李主管</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getPickupPlanTrackingResponsiblePhone())}>138****5678</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    )}
  </Modal>
);

export type { TrackingDetailModalProps };
export default TrackingDetailModal;

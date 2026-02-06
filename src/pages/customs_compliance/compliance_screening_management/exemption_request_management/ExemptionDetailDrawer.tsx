import React from 'react';
import { Drawer, Descriptions, Tag, Button, Space, Divider } from 'antd';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { ExemptionRequest } from '@/api/customs_compliance/compliance_screening_management/exemption_service';

interface ExemptionDetailDrawerProps {
  visible: boolean;
  data: ExemptionRequest | null;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const ExemptionDetailDrawer: React.FC<ExemptionDetailDrawerProps> = ({ visible, data, onClose, onApprove, onReject }) => {
  if (!data) return null;

  return (
    <Drawer
      title={i18n.t(LocaleHelper.getDetail())}
      open={visible}
      onClose={onClose}
      width={600}
      extra={
        <Space>
          {data.status === 'Pending' && (
            <>
              <Button type="primary" onClick={() => onApprove(data.id)}>
                {i18n.t(LocaleHelper.getExemptionRequestBtnApprove())}
              </Button>
              <Button danger onClick={() => onReject(data.id)}>
                {i18n.t(LocaleHelper.getExemptionRequestBtnReject())}
              </Button>
            </>
          )}
        </Space>
      }
    >
      <Descriptions column={1} bordered>
        <Descriptions.Item label={i18n.t(LocaleHelper.getExemptionRequestColRequestId())}>
          {data.id}
        </Descriptions.Item>
        <Descriptions.Item label={i18n.t(LocaleHelper.getExemptionRequestColScreeningId())}>
          {data.screeningId}
        </Descriptions.Item>
        <Descriptions.Item label={i18n.t(LocaleHelper.getExemptionRequestColEntity())}>
          {data.entity}
        </Descriptions.Item>
        <Descriptions.Item label={i18n.t(LocaleHelper.getExemptionRequestColRiskLevel())}>
          <Tag color={data.risk === 'High' ? 'red' : data.risk === 'Medium' ? 'orange' : 'green'}>
            {data.risk}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label={i18n.t(LocaleHelper.getExemptionRequestColApplicant())}>
          {data.applicant}
        </Descriptions.Item>
        <Descriptions.Item label={i18n.t(LocaleHelper.getExemptionRequestColStatus())}>
          <Tag color={data.status === 'Pending' ? 'blue' : data.status === 'Approved' ? 'green' : 'red'}>
            {data.status}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label={i18n.t(LocaleHelper.getExemptionRequestColCreateTime())}>
          {data.createTime}
        </Descriptions.Item>
        <Descriptions.Item label={i18n.t(LocaleHelper.getExemptionRequestFieldReason())}>
          {data.reason || '-'}
        </Descriptions.Item>
        {data.comments && (
          <Descriptions.Item label={i18n.t(LocaleHelper.getExemptionRequestFieldComments())}>
            {data.comments}
          </Descriptions.Item>
        )}
      </Descriptions>
    </Drawer>
  );
};

export default ExemptionDetailDrawer;

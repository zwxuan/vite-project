
import React from 'react';
import { Descriptions, Card } from 'antd';
import { DocumentDetail } from '@/types/freight_forwarding/document_management';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

interface Props {
  data: DocumentDetail;
}

const BasicInfo: React.FC<Props> = ({ data }) => {
  return (
    <Card bordered={false}>
      <Descriptions title={i18n.t(LocaleHelper.getDocumentDetailBasic())} column={3}>
        <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentListCode())}>{data.code}</Descriptions.Item>
        <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentListType())}>{data.type}</Descriptions.Item>
        <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentListWaybillNo())}>{data.waybill_no}</Descriptions.Item>
        <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentListCustomer())}>{data.customer}</Descriptions.Item>
        <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentListStatus())}>{data.status}</Descriptions.Item>
        <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentListCreateTime())}>{data.create_time}</Descriptions.Item>
        <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentListCarrier())}>{data.carrier}</Descriptions.Item>
        <Descriptions.Item label="Creator">{data.creator}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default BasicInfo;

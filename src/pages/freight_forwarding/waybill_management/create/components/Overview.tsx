import React from 'react';
import { Card, Descriptions, Steps, Timeline, Row, Col, Tag, Statistic } from 'antd';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

const Overview: React.FC = () => {
    return (
        <div style={{ padding: '0 20px' }}>
            <Card title={i18n.t(LocaleHelper.getWaybillCreateRoute())} size="small" style={{ marginBottom: 16 }}>
                <Descriptions column={4} size="small" style={{ marginBottom: 16 }}>
                    <Descriptions.Item label="Route">Shanghai (CNSHA) → Los Angeles (USLAX)</Descriptions.Item>
                    <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillCreateEtd())}>2024-03-20</Descriptions.Item>
                    <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillCreateEta())}>2024-04-15</Descriptions.Item>
                </Descriptions>
                <Steps current={1} size="small">
                    <Steps.Step title="Booking Confirmed" description="2024-03-15 10:00" status="finish" />
                    <Steps.Step title="Cargo Picked Up" description="2024-03-16 14:30" status="finish" />
                    <Steps.Step title="Gate In" description="2024-03-18" status="process" />
                    <Steps.Step title="Loaded on Vessel" description="2024-03-20" status="wait" />
                    <Steps.Step title="Arrival" description="2024-04-15" status="wait" />
                </Steps>
            </Card>

            <Row gutter={16}>
                <Col span={16}>
                    <Card title={i18n.t(LocaleHelper.getWaybillCreateSummary())} size="small">
                         <Row gutter={16}>
                            <Col span={4}><Statistic title={i18n.t(LocaleHelper.getWaybillCreatePackages())} value={100} /></Col>
                            <Col span={5}><Statistic title={i18n.t(LocaleHelper.getWaybillCreateGrossWeight())} value={5000} suffix="KG" /></Col>
                            <Col span={5}><Statistic title={i18n.t(LocaleHelper.getWaybillCreateVolume())} value={20} suffix="CBM" /></Col>
                            <Col span={5}><Statistic title="Containers" value="2*40HQ" /></Col>
                            <Col span={5}><Statistic title={i18n.t(LocaleHelper.getWaybillCreateValue())} value={100000} prefix="$" /></Col>
                         </Row>
                         <div style={{ marginTop: 16 }}>
                            <span>{i18n.t(LocaleHelper.getWaybillCreateRiskFlags())}: </span>
                            <Tag color="green">Arrears: No</Tag>
                            <Tag color="green">Overdue: No</Tag>
                            <Tag color="red">Exception: 1</Tag>
                            <Tag color="green">Unsynced: No</Tag>
                         </div>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title={i18n.t(LocaleHelper.getWaybillCreateLatestUpdates())} size="small">
                        <Timeline>
                            <Timeline.Item color="green">2024-03-18 15:20 VGM Backfilled</Timeline.Item>
                            <Timeline.Item color="green">2024-03-19 09:10 BL Draft Uploaded</Timeline.Item>
                        </Timeline>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Overview;

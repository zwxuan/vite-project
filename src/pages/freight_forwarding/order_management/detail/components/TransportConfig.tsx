import React from 'react';
import { Form, Input, Row, Col, DatePicker, Radio, Card } from 'antd';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const TransportConfig: React.FC = () => {
    return (
        <Card title={i18n.t(LocaleHelper.getOrderDetailTransportConfig())} style={{ marginBottom: 16 }}>
            <Form layout="vertical">
                <Form.Item label={i18n.t(LocaleHelper.getOrderDetailTransportType())}>
                    <Radio.Group defaultValue="Sea Export">
                        <Radio value="Sea Export">Sea Export</Radio>
                        <Radio value="Sea Import">Sea Import</Radio>
                        <Radio value="Air Export">Air Export</Radio>
                        <Radio value="Air Import">Air Import</Radio>
                        <Radio value="Land">Land</Radio>
                        <Radio value="Rail">Rail</Radio>
                    </Radio.Group>
                </Form.Item>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label={i18n.t(LocaleHelper.getOrderDetailRouteInfo())}>
                             <Input.Group compact>
                                <Input style={{ width: '45%' }} placeholder={i18n.t(LocaleHelper.getOrderManagementOrigin())} />
                                <span style={{ width: '10%', textAlign: 'center', lineHeight: '32px' }}>→</span>
                                <Input style={{ width: '45%' }} placeholder={i18n.t(LocaleHelper.getOrderManagementDestination())} />
                            </Input.Group>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={i18n.t(LocaleHelper.getOrderDetailSchedule())}>
                            <Input.Group compact>
                                <DatePicker style={{ width: '45%' }} placeholder={i18n.t(LocaleHelper.getOrderDetailETD())} />
                                <span style={{ width: '10%', textAlign: 'center', lineHeight: '32px' }}>-</span>
                                <DatePicker style={{ width: '45%' }} placeholder={i18n.t(LocaleHelper.getOrderDetailETA())} />
                            </Input.Group>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};

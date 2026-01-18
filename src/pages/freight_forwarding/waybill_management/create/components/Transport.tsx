import React from 'react';
import { Form, Row, Col, Input, Select, Card } from 'antd';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

const { Option } = Select;

const Transport: React.FC = () => {
    return (
        <Form layout="vertical" style={{ padding: '0 20px' }}>
            <Card title="Sea Freight (FCL)" size="small" style={{ marginBottom: 16 }}>
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateVesselName())} name="vessel">
                            <Input defaultValue="MSC OSCAR" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateVoyage())} name="voyage">
                            <Input defaultValue="240315E" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateCarrier())} name="carrier">
                            <Input defaultValue="COSCO" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item label="Container Info">
                            <Input.TextArea rows={2} defaultValue="40HQ * 2 | MSCU1234567/SEAL123456 | VGM: 25000KG" />
                        </Form.Item>
                    </Col>
                </Row>
            </Card>
        </Form>
    );
};

export default Transport;

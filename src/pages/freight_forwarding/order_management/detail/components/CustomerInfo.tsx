import React from 'react';
import { Form, Input, Row, Col, Select, Card } from 'antd';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const CustomerInfo: React.FC = () => {
    return (
        <Card title={i18n.t(LocaleHelper.getOrderDetailCustomerInfo())} style={{ marginBottom: 16 }}>
            <Form layout="vertical">
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label={i18n.t(LocaleHelper.getOrderManagementCustomerName())}>
                            <Select showSearch placeholder="Select Customer">
                                <Select.Option value="ABC">ABC Trading Co.</Select.Option>
                                <Select.Option value="XYZ">XYZ Logistics</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={i18n.t(LocaleHelper.getOrderDetailContactPerson())}>
                            <Input defaultValue="Manager Zhang" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={i18n.t(LocaleHelper.getOrderDetailPhone())}>
                            <Input defaultValue="138****8888" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={i18n.t(LocaleHelper.getOrderDetailTradeTerms())}>
                            <Select defaultValue="FOB">
                                <Select.Option value="FOB">FOB</Select.Option>
                                <Select.Option value="CIF">CIF</Select.Option>
                                <Select.Option value="EXW">EXW</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={i18n.t(LocaleHelper.getOrderDetailCurrency())}>
                            <Select defaultValue="USD">
                                <Select.Option value="USD">USD</Select.Option>
                                <Select.Option value="CNY">CNY</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label={i18n.t(LocaleHelper.getOrderDetailCreditLimit())}>
                            <Input disabled defaultValue="500,000" />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label={i18n.t(LocaleHelper.getOrderDetailAvailableLimit())}>
                            <Input disabled defaultValue="320,000" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};

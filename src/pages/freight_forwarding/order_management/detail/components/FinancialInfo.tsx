import React from 'react';
import { Form, Input, Row, Col, Select, Radio, Button, Card } from 'antd';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const FinancialInfo: React.FC = () => {
    return (
        <Card title={i18n.t(LocaleHelper.getOrderDetailCostInfo())} style={{ marginBottom: 16 }}>
            <Form layout="vertical">
                <Form.Item label={i18n.t(LocaleHelper.getOrderDetailBillingMethod())}>
                    <Radio.Group defaultValue="Fixed">
                        <Radio value="Fixed">Fixed Fee</Radio>
                        <Radio value="Ratio">By Ratio</Radio>
                        <Radio value="Hourly">Hourly</Radio>
                        <Radio value="Combined">Combined</Radio>
                    </Radio.Group>
                </Form.Item>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label={i18n.t(LocaleHelper.getOrderDetailEstimatedTotal())}>
                             <Input suffix="USD" defaultValue="6,100" />
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
                    <Col span={8}>
                        <Form.Item label={i18n.t(LocaleHelper.getOrderDetailPaymentCondition())}>
                            <Select defaultValue="Prepaid 50%">
                                <Select.Option value="Prepaid 50%">Prepaid 50%</Select.Option>
                                <Select.Option value="Credit 30 Days">Credit 30 Days</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <div>
                    <Button type="link">View Detailed Quote</Button>
                    <Button type="link">Cost Comparison</Button>
                    <Button type="link">Historical Price</Button>
                </div>
            </Form>
        </Card>
    );
};

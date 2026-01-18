import React from 'react';
import { Form, Input, Row, Col, DatePicker, Checkbox, Card } from 'antd';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const StandaloneConfig: React.FC = () => {
    return (
        <Card title={i18n.t(LocaleHelper.getOrderDetailStandaloneConfig())} style={{ marginBottom: 16 }}>
            <Form layout="vertical">
                <Form.Item label={i18n.t(LocaleHelper.getOrderDetailServiceType())}>
                    <Checkbox.Group>
                        <Checkbox value="Customs">{i18n.t(LocaleHelper.getStandaloneServiceCustomsClearance())}</Checkbox>
                        <Checkbox value="Warehouse">{i18n.t(LocaleHelper.getStandaloneServiceWarehousing())}</Checkbox>
                        <Checkbox value="Document">{i18n.t(LocaleHelper.getStandaloneServiceDocumentation())}</Checkbox>
                        <Checkbox value="Insurance">{i18n.t(LocaleHelper.getStandaloneServiceInsurance())}</Checkbox>
                        <Checkbox value="Consulting">{i18n.t(LocaleHelper.getStandaloneServiceConsulting())}</Checkbox>
                    </Checkbox.Group>
                </Form.Item>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label={i18n.t(LocaleHelper.getOrderDetailServiceLocation())}>
                            <Input placeholder="e.g. Shanghai Bonded Warehouse" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={i18n.t(LocaleHelper.getOrderDetailServiceTime())}>
                            <DatePicker.RangePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};

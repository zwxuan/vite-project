import React from 'react';
import { Form, Input, Row, Col, InputNumber, Radio, Card,Select } from 'antd';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const CargoInfo: React.FC = () => {
    return (
        <Card title={i18n.t(LocaleHelper.getOrderDetailCargoInfo())} style={{ marginBottom: 16 }}>
            <Form layout="vertical">
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label={i18n.t(LocaleHelper.getOrderDetailCommodity())}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={i18n.t(LocaleHelper.getOrderDetailHSCode())}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={i18n.t(LocaleHelper.getOrderDetailCargoValue())}>
                            <InputNumber style={{ width: '100%' }} formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={i18n.t(LocaleHelper.getOrderDetailPieces())}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={i18n.t(LocaleHelper.getOrderDetailGrossWeight())}>
                            <InputNumber style={{ width: '100%' }} addonAfter="KGS" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={i18n.t(LocaleHelper.getOrderDetailVolume())}>
                            <InputNumber style={{ width: '100%' }} addonAfter="CBM" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={i18n.t(LocaleHelper.getOrderDetailPackagingRequirement())}>
                            <Select defaultValue="Carton">
                                <Select.Option value="Carton">Carton</Select.Option>
                                <Select.Option value="Pallet">Pallet</Select.Option>
                                <Select.Option value="Wooden Case">Wooden Case</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={i18n.t(LocaleHelper.getOrderDetailDangerousGoods())}>
                            <Radio.Group defaultValue="no">
                                <Radio value="yes">{i18n.t(LocaleHelper.getOrderDetailYes())}</Radio>
                                <Radio value="no">{i18n.t(LocaleHelper.getOrderDetailNo())}</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={i18n.t(LocaleHelper.getOrderDetailTempControl())}>
                            <Radio.Group defaultValue="normal">
                                <Radio value="normal">Normal</Radio>
                                <Radio value="refrigerated">Refrigerated</Radio>
                                <Radio value="frozen">Frozen</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};

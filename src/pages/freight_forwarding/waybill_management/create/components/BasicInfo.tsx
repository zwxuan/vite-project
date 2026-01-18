import React from 'react';
import { Form, Row, Col, Input, Select, DatePicker, Radio } from 'antd';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

const { Option } = Select;
const { TextArea } = Input;

const BasicInfo: React.FC = () => {
    return (
        <Form layout="vertical" style={{ padding: '0 20px' }}>
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateTransportMode())} name="transportMode">
                        <Radio.Group>
                            <Radio value="SEA">SEA</Radio>
                            <Radio value="AIR">AIR</Radio>
                            <Radio value="LAND">LAND</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateBusinessType())} name="businessType">
                        <Select defaultValue="FCL">
                            <Option value="FCL">FCL</Option>
                            <Option value="LCL">LCL</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateTradeTerms())} name="tradeTerms">
                        <Select defaultValue="FOB">
                            <Option value="FOB">FOB</Option>
                            <Option value="CIF">CIF</Option>
                            <Option value="DDP">DDP</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={6}>
                    <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateCustomer())} name="customer">
                        <Select placeholder="Select Customer">
                            <Option value="ABC">ABC Trading Co.</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateSales())} name="sales">
                        <Input defaultValue="Zhang San" />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateOperator())} name="operator">
                        <Input defaultValue="Li Si" />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateServiceTeam())} name="serviceTeam">
                        <Input defaultValue="CS Team A" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={6}>
                    <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateOrigin())} name="origin">
                        <Input defaultValue="Shanghai" />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateDestination())} name="destination">
                        <Input defaultValue="Los Angeles" />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateTransshipment())} name="transshipment">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateDestCountry())} name="destCountry">
                        <Input defaultValue="USA" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={6}>
                    <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateEtd())} name="etd">
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateEta())} name="eta">
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateAtd())} name="atd">
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateAta())} name="ata">
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateRemarks())} name="remarks">
                        <TextArea rows={4} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default BasicInfo;

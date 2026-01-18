import React from 'react';
import { Form, Row, Col, Input, Select } from 'antd';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

const { TextArea } = Input;
const { Option } = Select;

const Parties: React.FC = () => {
    return (
        <Form layout="vertical" style={{ padding: '0 20px' }}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateShipper())} name="shipper">
                        <Select showSearch placeholder="Select Shipper" style={{ marginBottom: 8 }}>
                            <Option value="ClientA">Client A</Option>
                        </Select>
                        <TextArea rows={4} placeholder="Name/Address/Contact/Tel/Email" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateConsignee())} name="consignee">
                        <Select showSearch placeholder="Select Consignee" style={{ marginBottom: 8 }}>
                            <Option value="ClientB">Client B</Option>
                        </Select>
                        <TextArea rows={4} placeholder="Name/Address/Contact/Tel/Email" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateNotify())} name="notify">
                        <Select showSearch placeholder="Select Notify Party" style={{ marginBottom: 8 }}>
                            <Option value="SameAsConsignee">Same as Consignee</Option>
                        </Select>
                        <TextArea rows={4} placeholder="Name/Address/Contact/Tel/Email" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateBookingAgent())} name="bookingAgent">
                        <TextArea rows={5} placeholder="Name/Contact/Email/Requirements" />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default Parties;

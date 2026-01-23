import React, { useEffect } from 'react';
import { Button, Card, Col, Form, Input, Row, Select, Checkbox, InputNumber, Radio } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import '@/pages/page_list.less';

const { Option } = Select;

const InterfaceConfigEdit: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();
    const isEdit = !!id;

    const handleBack = () => {
        navigate(-1);
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
        navigate(-1);
    };

    useEffect(() => {
        if (isEdit) {
            form.setFieldsValue({
                interfaceName: 'COSCO API',
                interfaceAddress: 'https://api.cosco.com/tracking',
                authType: 'apiKey',
                syncFrequency: 15,
                autoSync: true,
            });
        }
    }, [isEdit, form]);

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                            <Button icon={<ArrowLeftOutlined />} onClick={handleBack} style={{ marginRight: 8 }} />
                            {isEdit ? 'Interface Configuration' : 'New Interface'}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary" onClick={() => form.submit()}>Save</Button>
                            <Button>Test Connection</Button>
                            <Button onClick={handleBack}>Cancel</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '16px' }}>
                <Card title="Interface Details" bordered={false}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={{
                            authType: 'apiKey',
                            autoSync: true,
                            syncFrequency: 15
                        }}
                    >
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name="interfaceName"
                                    label={i18n.t(LocaleHelper.getInterfaceName())}
                                    rules={[{ required: true, message: 'Please enter interface name' }]}
                                >
                                    <Input placeholder="e.g. COSCO API" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="interfaceType"
                                    label={i18n.t(LocaleHelper.getInterfaceType())}
                                    rules={[{ required: true, message: 'Please select interface type' }]}
                                >
                                    <Select>
                                        <Option value="carrier">Carrier System</Option>
                                        <Option value="government">Government/Customs</Option>
                                        <Option value="port">Port System</Option>
                                        <Option value="gps">GPS Provider</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item
                                    name="interfaceAddress"
                                    label="Interface Address (URL)"
                                    rules={[{ required: true, message: 'Please enter interface address' }]}
                                >
                                    <Input placeholder="https://api.example.com/v1/tracking" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item
                                    name="authType"
                                    label="Authentication Type"
                                >
                                    <Radio.Group>
                                        <Radio value="apiKey">API Key</Radio>
                                        <Radio value="oauth2">OAuth 2.0</Radio>
                                        <Radio value="basic">Basic Auth</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    label="Sync Frequency"
                                    style={{ marginBottom: 0 }}
                                >
                                    <Form.Item
                                        name="syncFrequency"
                                        style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginRight: 8 }}
                                    >
                                        <InputNumber min={1} addonAfter="Minutes" style={{ width: '100%' }} />
                                    </Form.Item>
                                    <Form.Item
                                        name="autoSync"
                                        valuePropName="checked"
                                        style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                                    >
                                        <Checkbox>Enable Auto Sync</Checkbox>
                                    </Form.Item>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default InterfaceConfigEdit;

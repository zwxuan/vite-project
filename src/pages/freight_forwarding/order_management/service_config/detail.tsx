import React, { useState } from 'react';
import { Form, Input, Card, Button, Select, Row, Col, InputNumber, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import CustomIcon from "@/components/custom-icon";
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

const ServiceConfigDetail: React.FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [category, setCategory] = useState('customs');

    const handleCategoryChange = (value: string) => {
        setCategory(value);
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getServiceConfigTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div style={{ display: "flex" }}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button type="primary">{i18n.t(LocaleHelper.getServiceTemplateSave())}</Button>
                                <Button onClick={() => navigate(-1)}>{i18n.t(LocaleHelper.getServiceTemplateCancel())}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '20px' }}>
                <Card title={i18n.t(LocaleHelper.getServiceConfigTitle())} style={{ marginBottom: 16 }}>
                    <Form 
                        form={form}
                        layout="vertical" 
                        initialValues={{ 
                            category: 'customs',
                            status: 'Enabled',
                            currency: 'USD'
                        }}
                    >
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item label={i18n.t(LocaleHelper.getServiceConfigConfigCategory())} name="category">
                                    <Select onChange={handleCategoryChange}>
                                        <Select.Option value="customs">{i18n.t(LocaleHelper.getServiceConfigCustomsConfig())}</Select.Option>
                                        <Select.Option value="warehouse">{i18n.t(LocaleHelper.getServiceConfigWarehouseConfig())}</Select.Option>
                                        <Select.Option value="document">{i18n.t(LocaleHelper.getServiceConfigDocConfig())}</Select.Option>
                                        <Select.Option value="insurance">{i18n.t(LocaleHelper.getServiceConfigInsuranceConfig())}</Select.Option>
                                        <Select.Option value="consulting">{i18n.t(LocaleHelper.getServiceConfigConsultingConfig())}</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={i18n.t(LocaleHelper.getServiceConfigConfigName())} name="configName" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={i18n.t(LocaleHelper.getServiceConfigStatus())} name="status">
                                    <Select>
                                        <Select.Option value="Enabled">{i18n.t(LocaleHelper.getServiceConfigEnable())}</Select.Option>
                                        <Select.Option value="Disabled">{i18n.t(LocaleHelper.getServiceConfigDisable())}</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item label={i18n.t(LocaleHelper.getServiceConfigBaseFee())} name="baseFee">
                                    <InputNumber style={{ width: '100%' }} formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                                </Form.Item>
                            </Col>
                            {/* Conditional Fields based on Category */}
                            {category === 'customs' && (
                                <>
                                    <Col span={8}>
                                        <Form.Item label={i18n.t(LocaleHelper.getServiceConfigScope())} name="scope">
                                            <Select mode="multiple">
                                                <Select.Option value="general">General Trade</Select.Option>
                                                <Select.Option value="processing">Processing Trade</Select.Option>
                                                <Select.Option value="bonded">Bonded Trade</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label={i18n.t(LocaleHelper.getServiceConfigProcessingTime())} name="processingTime">
                                            <Input placeholder="e.g. 3 Days" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label={i18n.t(LocaleHelper.getServiceConfigRequiredDocs())} name="requiredDocs">
                                            <Checkbox.Group>
                                                <Checkbox value="invoice">Invoice</Checkbox>
                                                <Checkbox value="packingList">Packing List</Checkbox>
                                                <Checkbox value="contract">Contract</Checkbox>
                                                <Checkbox value="proxy">Power of Attorney</Checkbox>
                                            </Checkbox.Group>
                                        </Form.Item>
                                    </Col>
                                </>
                            )}

                            {category === 'warehouse' && (
                                <>
                                    <Col span={8}>
                                        <Form.Item label="Warehouse Type" name="warehouseType">
                                            <Select>
                                                <Select.Option value="bonded">Bonded Warehouse</Select.Option>
                                                <Select.Option value="general">General Warehouse</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label="Billing Mode" name="billingMode">
                                            <Select>
                                                <Select.Option value="daily">Daily</Select.Option>
                                                <Select.Option value="area">Area</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label="Value Added Services" name="vas">
                                            <Checkbox.Group>
                                                <Checkbox value="sorting">Sorting</Checkbox>
                                                <Checkbox value="packing">Packing</Checkbox>
                                                <Checkbox value="labeling">Labeling</Checkbox>
                                            </Checkbox.Group>
                                        </Form.Item>
                                    </Col>
                                </>
                            )}
                        </Row>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default ServiceConfigDetail;

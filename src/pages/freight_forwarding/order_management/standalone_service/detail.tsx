import React from 'react';
import { Form, Input, Card, Button, Select, Row, Col, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import CustomIcon from "@/components/custom-icon";
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

const StandaloneServiceDetail: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getStandaloneServiceDetail())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div style={{ display: "flex" }}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button type="primary">{i18n.t(LocaleHelper.getStandaloneServiceSave())}</Button>
                                <Button onClick={() => navigate(-1)}>{i18n.t(LocaleHelper.getStandaloneServiceCancel())}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '20px' }}>
                <Card title={i18n.t(LocaleHelper.getStandaloneServiceDetail())} style={{ marginBottom: 16 }}>
                    <Form layout="vertical" initialValues={{ 
                        serviceId: 'SRV-001',
                        customerName: 'ABC Company',
                        serviceType: 'Customs',
                        serviceContent: 'Export Clearance',
                        status: 'In Progress',
                        fee: 2800
                    }}>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item label={i18n.t(LocaleHelper.getStandaloneServiceServiceId())} name="serviceId">
                                    <Input disabled />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={i18n.t(LocaleHelper.getQueryCustomerName())} name="customerName">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={i18n.t(LocaleHelper.getStandaloneServiceServiceType())} name="serviceType">
                                    <Select>
                                        <Select.Option value="Customs">{i18n.t(LocaleHelper.getStandaloneServiceCustomsClearance())}</Select.Option>
                                        <Select.Option value="Warehouse">{i18n.t(LocaleHelper.getStandaloneServiceWarehousing())}</Select.Option>
                                        <Select.Option value="Document">{i18n.t(LocaleHelper.getStandaloneServiceDocumentation())}</Select.Option>
                                        <Select.Option value="Insurance">{i18n.t(LocaleHelper.getStandaloneServiceInsurance())}</Select.Option>
                                        <Select.Option value="Consulting">{i18n.t(LocaleHelper.getStandaloneServiceConsulting())}</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={i18n.t(LocaleHelper.getStandaloneServiceServiceContent())} name="serviceContent">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={i18n.t(LocaleHelper.getStandaloneServiceServiceStatus())} name="status">
                                    <Select>
                                        <Select.Option value="Pending">Pending</Select.Option>
                                        <Select.Option value="In Progress">In Progress</Select.Option>
                                        <Select.Option value="Completed">Completed</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={i18n.t(LocaleHelper.getStandaloneServiceFee())} name="fee">
                                    <InputNumber style={{ width: '100%' }} formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default StandaloneServiceDetail;

import React, { useState } from 'react';
import { Form, Input, Card, Button, Table, Space, Select, Checkbox, Row, Col, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

interface ServiceItem {
    key: string;
    serviceName: string;
    baseFee: number;
    duration: string;
}

const ServiceTemplateDetail: React.FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    
    // Mock available services (simulating data from Service Config)
    const availableServices: ServiceItem[] = [
        { key: '1', serviceName: 'Import Customs Clearance', baseFee: 3000, duration: '3 Days' },
        { key: '2', serviceName: 'Bonded Warehouse', baseFee: 150, duration: '7 Days Free' },
        { key: '3', serviceName: 'Cargo Insurance', baseFee: 200, duration: '-' },
        { key: '4', serviceName: 'Document Handling', baseFee: 100, duration: '1 Day' },
        { key: '5', serviceName: 'Consulting', baseFee: 500, duration: '-' },
    ];

    const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([
        availableServices[0],
        availableServices[1],
        availableServices[2]
    ]);

    const handleAddService = (value: string) => {
        const service = availableServices.find(s => s.key === value);
        if (service && !selectedServices.find(s => s.key === value)) {
            setSelectedServices([...selectedServices, service]);
        }
    };

    const handleRemoveService = (key: string) => {
        setSelectedServices(selectedServices.filter(s => s.key !== key));
    };

    const columns = [
        { title: 'Service Name', dataIndex: 'serviceName', key: 'serviceName' },
        { title: i18n.t(LocaleHelper.getServiceTemplateBaseFee()), dataIndex: 'baseFee', key: 'baseFee', render: (val: number) => `$${val}` },
        { title: i18n.t(LocaleHelper.getServiceTemplateDuration()), dataIndex: 'duration', key: 'duration' },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: ServiceItem) => (
                <Popconfirm title="Remove this service?" onConfirm={() => handleRemoveService(record.key)}>
                    <Button type="text" danger icon={<DeleteOutlined />} />
                </Popconfirm>
            )
        }
    ];

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getServiceTemplateTemplateDetail())}
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
                <Card title={i18n.t(LocaleHelper.getServiceTemplateTemplateDetail())} style={{ marginBottom: 16 }}>
                    <Form form={form} layout="vertical" initialValues={{ 
                        templateName: 'Standard Import Package', 
                        status: 'Enabled',
                        scenario: 'Import Trade',
                        recommendedCustomer: 'General Customer',
                        discountLevel: 'Standard'
                    }}>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item label={i18n.t(LocaleHelper.getServiceTemplateTemplateName())} name="templateName">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={i18n.t(LocaleHelper.getServiceTemplateStatus())} name="status">
                                    <Select>
                                        <Select.Option value="Enabled">Enabled</Select.Option>
                                        <Select.Option value="Disabled">Disabled</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={i18n.t(LocaleHelper.getServiceTemplateApplicableScenario())} name="scenario">
                                    <Select>
                                        <Select.Option value="Import Trade">Import Trade</Select.Option>
                                        <Select.Option value="Export Trade">Export Trade</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={i18n.t(LocaleHelper.getServiceTemplateRecommendedCustomer())} name="recommendedCustomer">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={i18n.t(LocaleHelper.getServiceTemplateDiscountLevel())} name="discountLevel">
                                    <Select>
                                        <Select.Option value="Standard">Standard</Select.Option>
                                        <Select.Option value="VIP">VIP</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>

                <Card title={i18n.t(LocaleHelper.getServiceTemplateIncludedServices())} style={{ marginBottom: 16 }}>
                    <div style={{textAlign: 'left',padding: '5px' }}>
                        <Select
                            style={{ width: 300 }}
                            placeholder="Select service to add"
                            onChange={handleAddService}
                            value={null}
                        >
                            {availableServices.filter(s => !selectedServices.find(sel => sel.key === s.key)).map(service => (
                                <Select.Option key={service.key} value={service.key}>
                                    {service.serviceName} (${service.baseFee})
                                </Select.Option>
                            ))}
                        </Select>
                        <Button type="dashed" icon={<PlusOutlined />} style={{ marginLeft: 8 }} onClick={() => navigate('/order_management/service_config/detail')}>
                            Create New Service Config
                        </Button>
                    </div>
                    <Table<ServiceItem>
                        columns={columns}
                        dataSource={selectedServices}
                        pagination={false}
                        size="small"
                        bordered
                    />
                </Card>


                <Card title="Package Info">
                    <Form layout="vertical" initialValues={{ 
                        packageDiscount: 'Total Fee 5% Off, VIP 10% Off',
                        commitment: ['tracking', 'warning', 'dedicated']
                    }}>
                        <Form.Item label={i18n.t(LocaleHelper.getServiceTemplatePackageDiscount())} name="packageDiscount">
                            <Input />
                        </Form.Item>
                        <Form.Item label={i18n.t(LocaleHelper.getServiceTemplateServiceCommitment())} name="commitment">
                            <Checkbox.Group>
                                <Checkbox value="tracking">Full Tracking</Checkbox>
                                <Checkbox value="warning">Exception Warning</Checkbox>
                                <Checkbox value="dedicated">Dedicated Service</Checkbox>
                            </Checkbox.Group>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default ServiceTemplateDetail;

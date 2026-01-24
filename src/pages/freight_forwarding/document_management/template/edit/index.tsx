import React, { useEffect } from 'react';
import { Form, Input, Button, Card, Space, Select, message, Tabs, Row, Col, Table, Checkbox } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import '@/pages/page_list.less';

const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;

const DocumentTemplateEdit: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();
    const isEdit = !!id;

    useEffect(() => {
        if (isEdit) {
            // Mock fetch data
            form.setFieldsValue({
                name: 'Bill of Lading Template A',
                category: 'Ocean Freight',
                version: '1.0',
                status: 'Active',
                description: 'Standard BOL template for outgoing shipments.',
                transportMode: 'Sea',
                customer: 'Global Logistics Inc.',
                route: 'Asia-US',
                paperSize: 'A4',
                orientation: 'Portrait',
                fields: [
                    { name: 'Shipper', visible: true, mandatory: true, defaultValue: '' },
                    { name: 'Consignee', visible: true, mandatory: true, defaultValue: '' },
                    { name: 'Notify Party', visible: true, mandatory: false, defaultValue: '' },
                    { name: 'Port of Loading', visible: true, mandatory: true, defaultValue: '' },
                    { name: 'Port of Discharge', visible: true, mandatory: true, defaultValue: '' },
                ]
            });
        } else {
             form.setFieldsValue({
                status: 'Active',
                fields: [
                    { name: 'Shipper', visible: true, mandatory: true, defaultValue: '' },
                    { name: 'Consignee', visible: true, mandatory: true, defaultValue: '' },
                ]
             });
        }
    }, [isEdit, form]);

    const onFinish = (values: any) => {
        console.log('Success:', values);
        message.success(i18n.t(LocaleHelper.getDocumentTemplateSave()) + ' ' + i18n.t(LocaleHelper.getSuccess()));
        navigate(-1);
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {isEdit ? i18n.t(LocaleHelper.getDocumentTemplateEditTitle()) : i18n.t(LocaleHelper.getDocumentTemplateNew())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Space>
                                <Button onClick={() => navigate(-1)}>{i18n.t(LocaleHelper.getDocumentTemplateCancel())}</Button>
                                <Button type="primary" onClick={() => form.submit()}>{i18n.t(LocaleHelper.getDocumentTemplateSave())}</Button>
                            </Space>
                        </div>
                    </div>
                </div>
            </div>

            <div className='nc-bill-table-area'>
                <Card bordered={false}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Tabs defaultActiveKey="1">
                            <TabPane tab={i18n.t(LocaleHelper.getDocumentTemplateTabBasic())} key="1">
                                <Row gutter={24}>
                                    <Col span={8}>
                                        <Form.Item name="name" label={i18n.t(LocaleHelper.getDocumentTemplateName())} rules={[{ required: true }]}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item name="category" label={i18n.t(LocaleHelper.getDocumentTemplateCategory())} rules={[{ required: true }]}>
                                            <Select>
                                                <Option value="Ocean Freight">{i18n.t(LocaleHelper.getDocumentTemplateTransportModeSea())}</Option>
                                                <Option value="Air Freight">{i18n.t(LocaleHelper.getDocumentTemplateTransportModeAir())}</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item name="version" label={i18n.t(LocaleHelper.getDocumentTemplateVersion())}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item name="status" label={i18n.t(LocaleHelper.getDocumentTemplateStatus())}>
                                            <Select>
                                                <Option value="Active">{i18n.t(LocaleHelper.getDocumentTemplateStatusActive())}</Option>
                                                <Option value="Inactive">{i18n.t(LocaleHelper.getDocumentTemplateStatusInactive())}</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item name="description" label={i18n.t(LocaleHelper.getDocumentTemplateDescription())}>
                                            <TextArea rows={4} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </TabPane>
                            
                            <TabPane tab={i18n.t(LocaleHelper.getDocumentTemplateTabRules())} key="2">
                                <Row gutter={24}>
                                    <Col span={8}>
                                        <Form.Item name="transportMode" label={i18n.t(LocaleHelper.getDocumentTemplateTransportMode())}>
                                            <Select>
                                                <Option value="Sea">{i18n.t(LocaleHelper.getDocumentTemplateTransportModeSea())}</Option>
                                                <Option value="Air">{i18n.t(LocaleHelper.getDocumentTemplateTransportModeAir())}</Option>
                                                <Option value="Rail">{i18n.t(LocaleHelper.getDocumentTemplateTransportModeRail())}</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item name="customer" label={i18n.t(LocaleHelper.getDocumentTemplateCustomer())}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item name="route" label={i18n.t(LocaleHelper.getDocumentTemplateRoute())}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </TabPane>

                            <TabPane tab={i18n.t(LocaleHelper.getDocumentTemplateTabFields())} key="3">
                                <Form.List name="fields">
                                    {(fields, { add, remove }) => (
                                        <Table
                                            dataSource={fields}
                                            pagination={false}
                                            columns={[
                                                {
                                                    title: i18n.t(LocaleHelper.getDocumentTemplateFieldName()),
                                                    dataIndex: 'name',
                                                    render: (_, field) => (
                                                        <Form.Item {...field} name={[field.name, 'name']} noStyle>
                                                            <Input />
                                                        </Form.Item>
                                                    )
                                                },
                                                {
                                                    title: i18n.t(LocaleHelper.getDocumentTemplateFieldVisible()),
                                                    dataIndex: 'visible',
                                                    render: (_, field) => (
                                                        <Form.Item {...field} name={[field.name, 'visible']} valuePropName="checked" noStyle>
                                                            <Checkbox />
                                                        </Form.Item>
                                                    )
                                                },
                                                {
                                                    title: i18n.t(LocaleHelper.getDocumentTemplateFieldMandatory()),
                                                    dataIndex: 'mandatory',
                                                    render: (_, field) => (
                                                        <Form.Item {...field} name={[field.name, 'mandatory']} valuePropName="checked" noStyle>
                                                            <Checkbox />
                                                        </Form.Item>
                                                    )
                                                },
                                                {
                                                    title: i18n.t(LocaleHelper.getDocumentTemplateFieldDefault()),
                                                    dataIndex: 'defaultValue',
                                                    render: (_, field) => (
                                                        <Form.Item {...field} name={[field.name, 'defaultValue']} noStyle>
                                                            <Input />
                                                        </Form.Item>
                                                    )
                                                },
                                                 {
                                                    title: i18n.t(LocaleHelper.getDocumentTemplateAction()),
                                                    render: (_, field) => (
                                                        <a onClick={() => remove(field.name)}>{i18n.t(LocaleHelper.getDelete())}</a>
                                                    )
                                                }
                                            ]}
                                            footer={() => <Button type="dashed" onClick={() => add()} block>+ {i18n.t(LocaleHelper.getDocumentTemplateAddField())}</Button>}
                                        />
                                    )}
                                </Form.List>
                            </TabPane>

                            <TabPane tab={i18n.t(LocaleHelper.getDocumentTemplateTabPrint())} key="4">
                                <Row gutter={24}>
                                    <Col span={8}>
                                        <Form.Item name="paperSize" label={i18n.t(LocaleHelper.getDocumentTemplatePaperSize())}>
                                            <Select>
                                                <Option value="A4">A4</Option>
                                                <Option value="Letter">Letter</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item name="orientation" label={i18n.t(LocaleHelper.getDocumentTemplateOrientation())}>
                                            <Select>
                                                <Option value="Portrait">Portrait</Option>
                                                <Option value="Landscape">Landscape</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </TabPane>
                        </Tabs>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default DocumentTemplateEdit;
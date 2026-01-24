import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Select, Button, Tabs, Row, Col, Upload, message, Radio, Space } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftOutlined, UploadOutlined, SaveOutlined } from '@ant-design/icons';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import CustomIcon from "@/components/custom-icon";
import '@/pages/page_list.less';

const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;

const SignatureEdit: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
        if (id && id !== 'new') {
            // Mock fetch data
            setLoading(true);
            setTimeout(() => {
                form.setFieldsValue({
                    name: 'Company Official Seal',
                    type: 'Company',
                    status: 'Active',
                    authorizedUsers: ['Admin', 'Manager'],
                    remark: 'For official documents only'
                });
                setImageUrl('https://via.placeholder.com/150'); // Mock image
                setLoading(false);
            }, 500);
        }
    }, [id, form]);

    const onFinish = (values: any) => {
        setLoading(true);
        console.log('Success:', values);
        setTimeout(() => {
            setLoading(false);
            message.success(i18n.t(LocaleHelper.getSuccess()));
            navigate('/document_management/signature');
        }, 1000);
    };

    const handleUpload = (info: any) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            // Mock image url
            setImageUrl('https://via.placeholder.com/150');
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    return (
        <div style={{ height: 'calc(100vh - 80px)', overflowY: 'auto' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {id ? i18n.t(LocaleHelper.getDocumentSignatureEditTitle()) : i18n.t(LocaleHelper.getDocumentSignatureNew())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Space>
                                    <Button onClick={() => navigate(-1)} icon={<ArrowLeftOutlined />}>
                                        {i18n.t(LocaleHelper.getDocumentSignatureBack())}
                                    </Button>
                                    <Button type="primary" onClick={() => form.submit()} icon={<SaveOutlined />} loading={loading}>
                                        {i18n.t(LocaleHelper.getDocumentSignatureSave())}
                                    </Button>
                                </Space>
                            </div>
                        </div>
                    </div>
            </div>

            <div style={{ padding: '20px' }}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ status: 'Active', type: 'Company' }}
                >
                    <Card bordered={false}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab={i18n.t(LocaleHelper.getDocumentSignatureTabBasic())} key="1">
                                <Row gutter={24}>
                                    <Col span={12}>
                                        <Form.Item name="name" label={i18n.t(LocaleHelper.getDocumentSignatureName())} rules={[{ required: true }]}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="type" label={i18n.t(LocaleHelper.getDocumentSignatureType())} rules={[{ required: true }]}>
                                            <Radio.Group>
                                                <Radio value="Company">{i18n.t(LocaleHelper.getDocumentSignatureTypeCompany())}</Radio>
                                                <Radio value="Personal">{i18n.t(LocaleHelper.getDocumentSignatureTypePersonal())}</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={12}>
                                        <Form.Item name="status" label={i18n.t(LocaleHelper.getDocumentSignatureStatus())}>
                                            <Select>
                                                <Option value="Active">{i18n.t(LocaleHelper.getDocumentTemplateStatusActive())}</Option>
                                                <Option value="Inactive">{i18n.t(LocaleHelper.getDocumentTemplateStatusInactive())}</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="image" label={i18n.t(LocaleHelper.getDocumentSignatureImage())}>
                                            <Upload
                                                name="file"
                                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                onChange={handleUpload}
                                                showUploadList={false}
                                            >
                                                <Button icon={<UploadOutlined />}>{i18n.t(LocaleHelper.getDocumentSignatureUpload())}</Button>
                                            </Upload>
                                            <div style={{ marginTop: '10px', color: '#888' }}>
                                                {i18n.t(LocaleHelper.getDocumentSignatureUploadTip())}
                                            </div>
                                            {imageUrl && (
                                                <div style={{ marginTop: '10px', border: '1px dashed #d9d9d9', padding: '10px', display: 'inline-block' }}>
                                                    <img src={imageUrl} alt="Seal" style={{ maxWidth: '100px' }} />
                                                </div>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={24}>
                                        <Form.Item name="remark" label={i18n.t(LocaleHelper.getDocumentSignatureRemark())}>
                                            <TextArea rows={4} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab={i18n.t(LocaleHelper.getDocumentSignatureTabAuth())} key="2">
                                <Row gutter={24}>
                                    <Col span={12}>
                                        <Form.Item name="authorizedUsers" label={i18n.t(LocaleHelper.getDocumentSignatureAuthorizedUser())}>
                                            <Select mode="tags" style={{ width: '100%' }} placeholder="Select users">
                                                <Option value="Admin">Admin</Option>
                                                <Option value="Manager">Manager</Option>
                                                <Option value="John Doe">John Doe</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="password" label={i18n.t(LocaleHelper.getDocumentSignaturePassword())}>
                                            <Input.Password placeholder="Leave empty if no password required" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </TabPane>
                        </Tabs>
                    </Card>
                </Form>
            </div>
        </div>
    );
};

export default SignatureEdit;

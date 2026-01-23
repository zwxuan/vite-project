import React, { useMemo, useState } from 'react';
import { Button, Form, Input, Select, Checkbox, Tabs, Switch, Row, Col, message, Modal, Descriptions } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import CustomIcon from '@/components/custom-icon';
import '@/pages/page_list.less';

const { Option } = Select;

const templateDataMap = {
    '1': {
        name: '里程碑更新模板',
        type: '里程碑更新',
        scene: '海运出口',
        methods: ['email', 'sms', 'wechat'],
        status: true,
        emailSubject: '运单里程碑更新通知',
        emailContent: '尊敬的客户，您的运单已更新至【起运】阶段，运单号：{{waybill}}。',
        smsContent: '运单{{waybill}}已起运。',
        wechatContent: '运单{{waybill}}里程碑更新：起运。',
    },
    '2': {
        name: '延迟通知模板',
        type: '延迟通知',
        scene: '海运出口',
        methods: ['sms'],
        status: true,
        emailSubject: '运单延迟通知',
        emailContent: '运单{{waybill}}发生延迟，请关注最新动态。',
        smsContent: '运单{{waybill}}延迟，请留意最新进展。',
        wechatContent: '运单{{waybill}}延迟，请关注。',
    },
    '3': {
        name: '到港通知模板',
        type: '到港通知',
        scene: '海运进口',
        methods: ['wechat'],
        status: false,
        emailSubject: '运单到港通知',
        emailContent: '运单{{waybill}}已到港，请安排后续提货。',
        smsContent: '运单{{waybill}}已到港。',
        wechatContent: '运单{{waybill}}到港通知。',
    },
};

const TemplateDetail: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [baseForm] = Form.useForm();
    const [groupForm] = Form.useForm();
    const [emailForm] = Form.useForm();
    const [smsForm] = Form.useForm();
    const [wechatForm] = Form.useForm();
    const [testForm] = Form.useForm();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [testOpen, setTestOpen] = useState(false);
    const [previewData, setPreviewData] = useState<{
        name: string;
        type: string;
        scene: string;
        methods: string[];
        customerGroup: string;
        emailSubject: string;
        emailContent: string;
        smsContent: string;
        wechatContent: string;
    } | null>(null);
    const template = useMemo(() => {
        const key = id as keyof typeof templateDataMap;
        return templateDataMap[key] || {
            name: '新建模板',
            type: '里程碑更新',
            scene: '海运出口',
            methods: ['email'],
            status: true,
            emailSubject: '运单里程碑更新通知',
            emailContent: '尊敬的客户，您的运单已更新至【起运】阶段，运单号：{{waybill}}。',
            smsContent: '运单{{waybill}}已起运。',
            wechatContent: '运单{{waybill}}里程碑更新：起运。',
        };
    }, [id]);

    const handleBack = () => {
        navigate(-1);
    };

    const handlePreview = () => {
        const baseValues = baseForm.getFieldsValue();
        const groupValues = groupForm.getFieldsValue();
        const emailValues = emailForm.getFieldsValue();
        const smsValues = smsForm.getFieldsValue();
        const wechatValues = wechatForm.getFieldsValue();
        setPreviewData({
            name: baseValues.name,
            type: baseValues.type,
            scene: baseValues.scene,
            methods: baseValues.methods || [],
            customerGroup: groupValues.customerGroup,
            emailSubject: emailValues.emailSubject,
            emailContent: emailValues.emailContent,
            smsContent: smsValues.smsContent,
            wechatContent: wechatValues.wechatContent,
        });
        setPreviewOpen(true);
    };

    const handleTest = () => {
        setTestOpen(true);
    };

    const renderTemplate = (content: string | undefined, waybill: string, customer: string) => {
        const safeContent = content ?? '';
        return safeContent.replace(/{{waybill}}/g, waybill).replace(/{{customer}}/g, customer);
    };

    const handleTestSubmit = () => {
        testForm.validateFields().then(() => {
            message.success('测试已发送');
            setTestOpen(false);
        });
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            模板详情
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button onClick={handleBack}>返回</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '8px 16px' }}>
                <Form
                    form={baseForm}
                    layout="vertical"
                    initialValues={{
                        name: template.name,
                        type: template.type,
                        scene: template.scene,
                        methods: template.methods,
                        status: template.status,
                    }}
                >
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item name="name" label="模板名称">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="type" label="通知类型">
                                <Select>
                                    <Option value="里程碑更新">里程碑更新</Option>
                                    <Option value="起运通知">起运通知</Option>
                                    <Option value="到港通知">到港通知</Option>
                                    <Option value="延迟通知">延迟通知</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="scene" label="适用场景">
                                <Select>
                                    <Option value="海运出口">海运出口</Option>
                                    <Option value="海运进口">海运进口</Option>
                                    <Option value="空运出口">空运出口</Option>
                                    <Option value="空运进口">空运进口</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={2}>
                            <Form.Item name="status" label="启用" valuePropName="checked">
                                <Switch />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item name="methods" label="默认渠道">
                                <Checkbox.Group
                                    options={[
                                        { label: '邮件', value: 'email' },
                                        { label: '短信', value: 'sms' },
                                        { label: '微信', value: 'wechat' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>

            <div style={{ padding: '0 16px 8px 16px' }}>
                <Form form={groupForm} layout="vertical" initialValues={{ customerGroup: 'vip' }}>
                    <Row gutter={16} align="middle">
                        <Col span={8}>
                            <Form.Item name="customerGroup" label="客户群组">
                                <Select>
                                    <Option value="vip">VIP客户</Option>
                                    <Option value="normal">普通客户</Option>
                                    <Option value="new">新客户</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={16} style={{ textAlign: 'right' }}>
                            <Button onClick={handlePreview}>预览</Button>
                            <Button type="primary" onClick={handleTest} style={{ marginLeft: 8 }}>测试</Button>
                        </Col>
                    </Row>
                </Form>
            </div>

            <div style={{ padding: '0 16px 16px 16px' }}>
                <Tabs
                    items={[
                        {
                            key: 'email',
                            label: '邮件模板',
                            children: (
                                <Form form={emailForm} layout="vertical" initialValues={{ emailSubject: template.emailSubject, emailContent: template.emailContent }}>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item name="emailSubject" label="邮件标题">
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item name="emailContent" label="邮件内容">
                                                <Input.TextArea rows={4} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            ),
                        },
                        {
                            key: 'sms',
                            label: '短信模板',
                            children: (
                                <Form form={smsForm} layout="vertical" initialValues={{ smsContent: template.smsContent }}>
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <Form.Item name="smsContent" label="短信内容">
                                                <Input.TextArea rows={4} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            ),
                        },
                        {
                            key: 'wechat',
                            label: '微信模板',
                            children: (
                                <Form form={wechatForm} layout="vertical" initialValues={{ wechatContent: template.wechatContent }}>
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <Form.Item name="wechatContent" label="微信内容">
                                                <Input.TextArea rows={4} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            ),
                        },
                    ]}
                />
            </div>
            <Modal
                title="模板预览"
                open={previewOpen}
                onCancel={() => setPreviewOpen(false)}
                footer={null}
                destroyOnClose={true}
                width={720}
            >
                {previewData ? (
                    <>
                        <Descriptions
                            size="small"
                            bordered
                            column={2}
                            items={[
                                { label: '模板名称', children: previewData.name },
                                { label: '通知类型', children: previewData.type },
                                { label: '适用场景', children: previewData.scene },
                                { label: '客户群组', children: previewData.customerGroup },
                                { label: '默认渠道', children: previewData.methods.join('、') },
                            ]}
                        />
                        <Tabs
                            style={{ marginTop: 12 }}
                            items={[
                                {
                                    key: 'email',
                                    label: '邮件内容',
                                    children: (
                                        <>
                                            <div style={{ marginBottom: 8 }}>标题：{renderTemplate(previewData.emailSubject, 'WAY-001', '客户A')}</div>
                                            <Input.TextArea rows={4} value={renderTemplate(previewData.emailContent, 'WAY-001', '客户A')} readOnly />
                                        </>
                                    ),
                                },
                                {
                                    key: 'sms',
                                    label: '短信内容',
                                    children: (
                                        <Input.TextArea rows={4} value={renderTemplate(previewData.smsContent, 'WAY-001', '客户A')} readOnly />
                                    ),
                                },
                                {
                                    key: 'wechat',
                                    label: '微信内容',
                                    children: (
                                        <Input.TextArea rows={4} value={renderTemplate(previewData.wechatContent, 'WAY-001', '客户A')} readOnly />
                                    ),
                                },
                            ]}
                        />
                    </>
                ) : null}
            </Modal>
            <Modal
                title="测试发送"
                open={testOpen}
                onOk={handleTestSubmit}
                onCancel={() => setTestOpen(false)}
                okText="发送"
                destroyOnClose={true}
                width={640}
            >
                <Form form={testForm} layout="vertical" initialValues={{ customer: '客户A', waybill: 'WAY-001', methods: template.methods }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="customer" label="测试客户" rules={[{ required: true }]}>
                                <Select>
                                    <Option value="客户A">客户A</Option>
                                    <Option value="客户B">客户B</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="waybill" label="测试运单" rules={[{ required: true }]}>
                                <Select>
                                    <Option value="WAY-001">WAY-001</Option>
                                    <Option value="WAY-002">WAY-002</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="methods" label="发送方式">
                                <Checkbox.Group
                                    options={[
                                        { label: '邮件', value: 'email' },
                                        { label: '短信', value: 'sms' },
                                        { label: '微信', value: 'wechat' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default TemplateDetail;

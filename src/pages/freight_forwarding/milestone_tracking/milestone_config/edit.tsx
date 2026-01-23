import React, { useEffect } from 'react';
import { Button, Card, Col, Form, Input, Row, Select, Switch, InputNumber, Checkbox } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import CustomIcon from '@/components/custom-icon';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import '@/pages/page_list.less';

const { Option } = Select;

const MilestoneConfigEdit: React.FC = () => {
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
            // Mock data for edit mode
            form.setFieldsValue({
                milestoneName: 'Booking Confirmation',
                sequenceOrder: 1,
                triggerMethod: 'auto',
                notificationSettings: ['customer', 'internal'],
                delayThreshold: 2,
                alertEnabled: true,
                status: true,
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
                            {isEdit ? 'Edit Milestone Config' : 'New Milestone Config'}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary" onClick={() => form.submit()}>Save</Button>
                            <Button onClick={handleBack}>Cancel</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '16px' }}>
                <Card title="Configuration Details" bordered={false}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={{
                            triggerMethod: 'auto',
                            status: true,
                            alertEnabled: false
                        }}
                    >
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name="milestoneName"
                                    label={i18n.t(LocaleHelper.getMilestoneName())}
                                    rules={[{ required: true, message: 'Please enter milestone name' }]}
                                >
                                    <Input placeholder="e.g. Booking Confirmation" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="sequenceOrder"
                                    label="Sequence Order"
                                    rules={[{ required: true, message: 'Please enter sequence order' }]}
                                >
                                    <InputNumber style={{ width: '100%' }} min={1} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name="triggerMethod"
                                    label={i18n.t(LocaleHelper.getTriggerCondition())}
                                    rules={[{ required: true, message: 'Please select trigger method' }]}
                                >
                                    <Select>
                                        <Option value="auto">Auto Trigger</Option>
                                        <Option value="manual">Manual Entry</Option>
                                        <Option value="edi">EDI Receive</Option>
                                        <Option value="api">API Push</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="notificationSettings"
                                    label={i18n.t(LocaleHelper.getNotificationSettings())}
                                >
                                    <Checkbox.Group>
                                        <Checkbox value="customer">Customer Notification</Checkbox>
                                        <Checkbox value="internal">Internal Notification</Checkbox>
                                        <Checkbox value="supplier">Supplier Notification</Checkbox>
                                    </Checkbox.Group>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    label="Alert Settings"
                                    style={{ marginBottom: 0 }}
                                >
                                    <Form.Item
                                        name="alertEnabled"
                                        valuePropName="checked"
                                        style={{ display: 'inline-block', marginRight: 16 }}
                                    >
                                        <Switch checkedChildren="On" unCheckedChildren="Off" />
                                    </Form.Item>
                                    <span style={{ marginRight: 8 }}>Delay Threshold:</span>
                                    <Form.Item
                                        name="delayThreshold"
                                        style={{ display: 'inline-block', width: 100 }}
                                    >
                                        <InputNumber min={0} addonAfter="Hours" />
                                    </Form.Item>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="status"
                                    label="Status"
                                    valuePropName="checked"
                                >
                                    <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default MilestoneConfigEdit;

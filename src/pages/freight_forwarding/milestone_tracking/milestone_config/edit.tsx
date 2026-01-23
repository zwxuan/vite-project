import React, { useEffect } from 'react';
import { Button, Card, Checkbox, Col, Form, Input, InputNumber, Radio, Row, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import '@/pages/page_list.less';

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
            form.setFieldsValue({
                milestoneName: '订舱确认',
                sequenceOrder: 1,
                triggerMethod: '自动触发',
                notificationSettings: ['客户通知', '内部通知'],
                delayThreshold: 2,
                alertEnabled: true,
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
                            {isEdit ? '编辑配置' : '新增配置'}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group" />
                    </div>
                </div>
            </div>

            <div style={{ padding: '16px' }}>
                <Card title="配置详情" bordered={false}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={{
                            triggerMethod: '自动触发',
                            alertEnabled: false
                        }}
                    >
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name="milestoneName"
                                    label={i18n.t(LocaleHelper.getMilestoneName())}
                                    rules={[{ required: true, message: '请输入里程碑名称' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="sequenceOrder"
                                    label="显示顺序"
                                    rules={[{ required: true, message: '请输入显示顺序' }]}
                                >
                                    <InputNumber style={{ width: '100%' }} min={1} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name="triggerMethod"
                                    label="触发方式"
                                    rules={[{ required: true, message: '请选择触发方式' }]}
                                >
                                    <Radio.Group>
                                        <Radio value="自动触发">自动触发</Radio>
                                        <Radio value="手动录入">手动录入</Radio>
                                        <Radio value="EDI接收">EDI接收</Radio>
                                        <Radio value="API推送">API推送</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="notificationSettings"
                                    label="通知设置"
                                >
                                    <Checkbox.Group>
                                        <Checkbox value="客户通知">客户通知</Checkbox>
                                        <Checkbox value="内部通知">内部通知</Checkbox>
                                        <Checkbox value="供应商通知">供应商通知</Checkbox>
                                    </Checkbox.Group>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="预警设置">
                                    <Space>
                                        <span>延迟阈值</span>
                                        <Form.Item name="delayThreshold" noStyle>
                                            <InputNumber min={0} />
                                        </Form.Item>
                                        <span>小时</span>
                                        <Form.Item name="alertEnabled" valuePropName="checked" noStyle>
                                            <Checkbox>启用预警</Checkbox>
                                        </Form.Item>
                                    </Space>
                                </Form.Item>
                            </Col>
                        </Row>
                        <div style={{ textAlign: 'right' }}>
                            <Button type="primary" onClick={() => form.submit()}>保存</Button>
                            <Button style={{ marginLeft: 8 }} onClick={() => form.resetFields()}>重置</Button>
                            <Button style={{ marginLeft: 8 }} danger onClick={handleBack}>删除</Button>
                        </div>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default MilestoneConfigEdit;

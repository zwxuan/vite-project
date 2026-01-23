import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Input, Select, Checkbox, message, Row, Col, Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import CustomIcon from '@/components/custom-icon';
import { getCustomerNotificationList } from '@/api/freight_forwarding/milestone_tracking/service';
import { CustomerNotificationItem } from '@/types/freight_forwarding/milestone_tracking';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getColumns } from './columns';
import '@/pages/page_list.less';

const { Option } = Select;

const CustomerNotification: React.FC = () => {
    const [data, setData] = useState<CustomerNotificationItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [sendForm] = Form.useForm();
    const [activeTab, setActiveTab] = useState('records');
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
            const result = await getCustomerNotificationList();
            setData(result);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleTemplateManage = () => {
        navigate('/milestone_tracking/customer_notification/templates');
    };

    const handleSendSubmit = () => {
        sendForm.validateFields().then(values => {
            console.log('Send Notification:', values);
            message.success('发送成功！');
            sendForm.resetFields();
        });
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getCustomerNotificationTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button onClick={handleTemplateManage}>模板管理</Button>
                        </div>
                    </div>
                </div>
            </div>

            <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={[
                    {
                        key: 'records',
                        label: '发送记录',
                        children: (
                            <>
                                <div style={{ padding: '0 16px 8px 16px', color: '#888' }}>
                                    展示基于模板或即时发送产生的历史记录，便于追踪通知效果。
                                </div>
                                <div className="nc-bill-table-area">
                                    <Table
                                        columns={getColumns()}
                                        dataSource={data}
                                        rowKey="id"
                                        loading={loading}
                                        size="small"
                                        bordered={true}
                                        scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
                                        pagination={{
                                            showTotal: (total) => `总共 ${total} 条`,
                                            showQuickJumper: true,
                                            showSizeChanger: true,
                                        }}
                                    />
                                </div>
                            </>
                        ),
                    },
                    {
                        key: 'instant',
                        label: '即时发送',
                        children: (
                            <div style={{ padding: '8px 16px' }}>
                                <div style={{ color: '#888', marginBottom: 8 }}>
                                    用于单票紧急或临时通知，不影响模板配置，可直接选客户与运单发送。
                                </div>
                                <Form
                                    form={sendForm}
                                    layout="vertical"
                                    initialValues={{ methods: ['email', 'sms'] }}
                                >
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <Form.Item name="template" label="使用模板">
                                                <Select placeholder="可选模板">
                                                    <Option value="milestone">里程碑更新模板</Option>
                                                    <Option value="departure">起运通知模板</Option>
                                                    <Option value="arrival">到港通知模板</Option>
                                                    <Option value="delay">延迟通知模板</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item name="customer" label="选择客户" rules={[{ required: true }]}>
                                                <Select placeholder="请选择客户">
                                                    <Option value="cust1">客户A</Option>
                                                    <Option value="cust2">客户B</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item name="waybill" label="选择运单" rules={[{ required: true }]}>
                                                <Select placeholder="请选择运单">
                                                    <Option value="way1">WAY-001</Option>
                                                    <Option value="way2">WAY-002</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item name="content" label="通知内容" rules={[{ required: true }]}>
                                                <Input placeholder="请输入通知内容" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16} align="middle">
                                        <Col span={16}>
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
                                        <Col span={8} style={{ textAlign: 'right' }}>
                                            <Button type="primary" danger onClick={handleSendSubmit}>立即发送</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        ),
                    },
                ]}
            />
        </div>
    );
};

export default CustomerNotification;

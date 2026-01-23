import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, Input, Select, Checkbox, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import CustomIcon from '@/components/custom-icon';
import AdvancedSearchForm from '@/components/search-form';
import { getCustomerNotificationList } from '@/api/freight_forwarding/milestone_tracking/service';
import { CustomerNotificationItem } from '@/types/freight_forwarding/milestone_tracking';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { searchFields } from './search_fields';
import { getColumns } from './columns';
import '@/pages/page_list.less';

const { Option } = Select;
const { TextArea } = Input;

const CustomerNotification: React.FC = () => {
    const [data, setData] = useState<CustomerNotificationItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [isSendModalVisible, setIsSendModalVisible] = useState(false);
    const [sendForm] = Form.useForm();
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

    const handleSearch = (values: any) => {
        console.log('Search:', values);
        fetchData();
    };

    const handleTemplateManage = () => {
        navigate('/milestone_tracking/customer_notification/templates');
    };

    const handleSendClick = () => {
        setIsSendModalVisible(true);
    };

    const handleSendSubmit = () => {
        sendForm.validateFields().then(values => {
            console.log('Send Notification:', values);
            message.success('Notification sent successfully!');
            setIsSendModalVisible(false);
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
                            <Button onClick={handleTemplateManage}>Template Management</Button>
                            <Button type="primary" danger onClick={handleSendClick}>Send</Button>
                        </div>
                    </div>
                </div>
            </div>
            <AdvancedSearchForm
                fields={searchFields as any}
                onSearch={handleSearch}
            />
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
                        showTotal: (total) => `Total ${total} items`,
                        showQuickJumper: true,
                        showSizeChanger: true,
                    }}
                />
            </div>

            <Modal
                title="Instant Notification"
                open={isSendModalVisible}
                onOk={handleSendSubmit}
                onCancel={() => setIsSendModalVisible(false)}
                okText="Send Now"
            >
                <Form form={sendForm} layout="vertical">
                    <Form.Item name="customer" label="Select Customer" rules={[{ required: true }]}>
                        <Select placeholder="Select a customer">
                            <Option value="cust1">ABC Trading Co.</Option>
                            <Option value="cust2">XYZ Logistics</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="waybill" label="Select Waybill" rules={[{ required: true }]}>
                        <Select placeholder="Select a waybill">
                            <Option value="way1">WAY-001</Option>
                            <Option value="way2">WAY-002</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="content" label="Notification Content" rules={[{ required: true }]}>
                        <TextArea rows={4} placeholder="Enter notification content..." />
                    </Form.Item>
                    <Form.Item name="methods" label="Send Method">
                        <Checkbox.Group>
                            <Checkbox value="email">Email</Checkbox>
                            <Checkbox value="sms">SMS</Checkbox>
                            <Checkbox value="wechat">WeChat</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CustomerNotification;

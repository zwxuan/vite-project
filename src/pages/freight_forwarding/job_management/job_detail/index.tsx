import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Descriptions, Button, Form, Input, Checkbox, Space, Tag, message, Timeline } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import '@/pages/page_list.less';

const { TextArea } = Input;

const JobDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            form.setFieldsValue({
                description: '处理上海至洛杉矶海运出口业务',
                tasks: ['confirm', 'carrier']
            });
            setLoading(false);
        }, 500);
    }, [id, form]);

    const handleUpdateStatus = () => {
        message.success(i18n.t(LocaleHelper.getStatusUpdated()));
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
             <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                         <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getJobDetailTitle())} - {id}
                        </span>
                    </div>
                </div>
                 <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                             <Button onClick={() => message.info(i18n.t(LocaleHelper.getEditMode()))}>
                                {i18n.t(LocaleHelper.getEdit())}
                            </Button>
                             <Button type="primary" danger onClick={handleUpdateStatus}>
                                {i18n.t(LocaleHelper.getSave())} {/* Using Save as Update Status for now or add new key */}
                            </Button>
                            <Button onClick={() => navigate(-1)}>
                                {i18n.t(LocaleHelper.getBack())}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '10px' }}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Card title={i18n.t(LocaleHelper.getBasicInfo())} bordered={false} className="nc-bill-card">
                            <Descriptions column={4}>
                                <Descriptions.Item label={i18n.t(LocaleHelper.getJobId())}>{id}</Descriptions.Item>
                                <Descriptions.Item label={i18n.t(LocaleHelper.getJobType())}>BOOKING_JOB</Descriptions.Item>
                                <Descriptions.Item label={i18n.t(LocaleHelper.getOrderNo())}>ORD-001</Descriptions.Item>
                                <Descriptions.Item label={i18n.t(LocaleHelper.getPriority())}><Tag color="red">HIGH</Tag></Descriptions.Item>
                                <Descriptions.Item label={i18n.t(LocaleHelper.getAssignee())}>User A</Descriptions.Item>
                                <Descriptions.Item label={i18n.t(LocaleHelper.getCreateTime())}>2024-03-15 15:00</Descriptions.Item>
                                <Descriptions.Item label={i18n.t(LocaleHelper.getDeadline())}>2024-03-25 18:00</Descriptions.Item>
                                <Descriptions.Item label={i18n.t(LocaleHelper.getStatus())}><Tag color="blue">IN_PROGRESS</Tag></Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>
                </Row>
                
                <div style={{ marginTop: '10px' }}>
                    <Card title={i18n.t(LocaleHelper.getJobContent())} bordered={false}>
                        <Form form={form} layout="vertical">
                            <Form.Item label={i18n.t(LocaleHelper.getDescription())} name="description">
                                <TextArea rows={2} readOnly />
                            </Form.Item>
                            <Form.Item label="Specific Tasks" name="tasks">
                                <Checkbox.Group style={{ width: '100%' }}>
                                    <Space direction="horizontal" wrap>
                                        <Checkbox value="waybill">运单建档</Checkbox>
                                        <Checkbox value="booking">订舱申请</Checkbox>
                                        <Checkbox value="doc">单证制作</Checkbox>
                                        <Checkbox value="fee">费用核算</Checkbox>
                                        <Checkbox value="confirm">客户确认</Checkbox>
                                        <Checkbox value="carrier">承运商联系</Checkbox>
                                    </Space>
                                </Checkbox.Group>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>

                 <div style={{ marginTop: '10px' }}>
                    <Card title={i18n.t(LocaleHelper.getExecutionRecord())} bordered={false}>
                        <Timeline>
                            <Timeline.Item color="green">2024-03-15 15:30 {i18n.t(LocaleHelper.getStartedJob(), { user: 'User A' })}</Timeline.Item>
                            <Timeline.Item color="green">2024-03-16 09:00 {i18n.t(LocaleHelper.getCompletedWaybillCreation(), { user: 'User A' })}</Timeline.Item>
                            <Timeline.Item color="blue">2024-03-16 14:00 {i18n.t(LocaleHelper.getSubmittedBookingApplication(), { user: 'User A' })}</Timeline.Item>
                        </Timeline>
                    </Card>
                 </div>

                 <div style={{ marginTop: '10px' }}>
                    <Card title={i18n.t(LocaleHelper.getRelatedInfo())} bordered={false}>
                        <Descriptions column={2}>
                            <Descriptions.Item label="Waybill No">WAY-20240315-001</Descriptions.Item>
                            <Descriptions.Item label="Booking No">BKG-20240315-001</Descriptions.Item>
                        </Descriptions>
                    </Card>
                 </div>
            </div>
        </div>
    );
};

export default JobDetail;

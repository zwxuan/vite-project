import React, { useState } from 'react';
import { Card, Button, Table, Row, Col, Progress, List, Form, Select, DatePicker, Input, message, Divider } from 'antd';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import AdvancedSearchForm from "@/components/search-form";
import { getColumns } from './columns';
import { fields } from './search_fields';
import '@/pages/page_list.less';

const JobAssignment: React.FC = () => {
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [form] = Form.useForm();

    // Mock Data
    const dataSource = [
        { jobId: 'JOB-001', jobType: 'BOOKING_JOB', orderNo: 'ORD-001', priority: 'HIGH', status: 'PENDING' },
        { jobId: 'JOB-002', jobType: 'CUSTOMS_JOB', orderNo: 'ORD-002', priority: 'MEDIUM', status: 'PENDING' },
    ];

    const handleAssign = (record: any) => {
        setSelectedJob(record);
        form.setFieldsValue({
            assignee: 'User A', // Auto recommend
            reason: 'Best skill match'
        });
    };

    const handleConfirmAssign = () => {
        message.success(i18n.t(LocaleHelper.getAssignedSuccessfully(), { jobId: selectedJob?.jobId }));
        setSelectedJob(null);
    };

    const columns = getColumns(handleAssign);

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getJobAssignmentTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button>{i18n.t(LocaleHelper.getBatchAssign()) || '批量分派'}</Button>
                            <Button>{i18n.t(LocaleHelper.getAssignRules()) || '分派规则'}</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '10px' }}>
                <Card title="待分派作业列表" size="small" bordered={false}>
                    <AdvancedSearchForm fields={fields as any} onSearch={() => {}} />
                    <Table
                        columns={columns as any}
                        dataSource={dataSource}
                        rowKey="jobId"
                        size="small"
                        pagination={false}
                        rowSelection={{ type: 'checkbox' }}
                    />
                </Card>

                <Row gutter={16} style={{ marginTop: '10px' }}>
                    <Col span={12}>
                        <Card title={i18n.t(LocaleHelper.getTeamResourceStatus())} size="small" bordered={false}>
                            <List itemLayout="horizontal">
                                <List.Item>
                                    <List.Item.Meta
                                        title={i18n.t(LocaleHelper.getTeamA())}
                                        description={
                                            <div>
                                                <div>{i18n.t(LocaleHelper.getCurrentLoad(), { percent: 75, current: 15, max: 20 })}</div>
                                                <Progress percent={75} status="active" size="small" />
                                                <div style={{ fontSize: '12px', color: '#999' }}>{i18n.t(LocaleHelper.getAvailableMembers(), { members: '小王、小李、小张' })}</div>
                                            </div>
                                        }
                                    />
                                </List.Item>
                                <List.Item>
                                    <List.Item.Meta
                                        title={i18n.t(LocaleHelper.getTeamB())}
                                        description={
                                            <div>
                                                <div>{i18n.t(LocaleHelper.getCurrentLoad(), { percent: 60, current: 12, max: 20 })}</div>
                                                <Progress percent={60} size="small" />
                                                <div style={{ fontSize: '12px', color: '#999' }}>{i18n.t(LocaleHelper.getAvailableMembers(), { members: '小陈、小刘、小赵' })}</div>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            </List>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title={i18n.t(LocaleHelper.getAssignmentOperation())} size="small" bordered={false}>
                            {selectedJob ? (
                                <Form form={form} layout="vertical">
                                    <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                                        {i18n.t(LocaleHelper.getCurrentJob(), { jobId: selectedJob.jobId, jobType: selectedJob.jobType })}
                                    </div>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item label={i18n.t(LocaleHelper.getSelectAssignee())} name="assignee">
                                                <Select options={[{ label: '操作员小王', value: 'User A' }, { label: '操作员小李', value: 'User B' }]} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label={i18n.t(LocaleHelper.getEstCompletion())} name="estCompletion">
                                                <DatePicker style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Form.Item label={i18n.t(LocaleHelper.getAssignReason())} name="reason">
                                        <Input.TextArea rows={2} />
                                    </Form.Item>
                                    <Button type="primary" onClick={handleConfirmAssign} block>
                                        {i18n.t(LocaleHelper.getConfirmAssign())}
                                    </Button>
                                </Form>
                            ) : (
                                <div style={{ textAlign: 'center', color: '#999', padding: '40px' }}>
                                    {i18n.t(LocaleHelper.getSelectJobHint())}
                                </div>
                            )}
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default JobAssignment;

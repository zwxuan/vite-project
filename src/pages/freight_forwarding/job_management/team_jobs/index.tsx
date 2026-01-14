import React, { useState } from 'react';
import { Card, Row, Col, Button, Table, Progress, Avatar, List, Space, message, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import AdvancedSearchForm from "@/components/search-form";
import { getColumns } from './columns';
import { fields } from './search_fields';
import '@/pages/page_list.less';

const TeamJobs: React.FC = () => {
    // Mock Data
    const members = [
        { name: '小王', count: 5, load: 90, status: 'busy' },
        { name: '小李', count: 3, load: 60, status: 'normal' },
        { name: '小张', count: 4, load: 80, status: 'busy' },
    ];

    const jobs = [
        { jobId: 'JOB-001', assignee: '小王', jobType: 'BOOKING_JOB', priority: 'HIGH', progress: 65, status: 'IN_PROGRESS', deadline: '03-25' },
        { jobId: 'JOB-002', assignee: '小李', jobType: 'CUSTOMS_JOB', priority: 'MEDIUM', progress: 80, status: 'IN_PROGRESS', deadline: '03-20' },
    ];

    const handleAssist = (record: any) => {
        message.info(`Assist request sent for ${record.jobId}`);
    };

    const handleDetail = (record: any) => {
        message.info(`View detail for ${record.jobId}`);
    };

    const columns = getColumns(handleAssist, handleDetail);

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getTeamJobsTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Select defaultValue="Team A" style={{ width: 120, marginRight: 8 }} options={[{ label: 'Team A', value: 'Team A' }, { label: 'Team B', value: 'Team B' }]} />
                            <Button>{i18n.t(LocaleHelper.getExport())}</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '10px' }}>
                <Card title={i18n.t(LocaleHelper.getTeamHeaderInfo())} size="small" bordered={false} style={{ marginBottom: '10px' }}>
                    <Row gutter={16}>
                        <Col span={6}>
                            <div style={{ textAlign: 'center' }}>
                                <Progress type="dashboard" percent={75} width={80} />
                                <div>{i18n.t(LocaleHelper.getTeamLoad())}</div>
                            </div>
                        </Col>
                        <Col span={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>5</div>
                                <div>{i18n.t(LocaleHelper.getMemberCount())}</div>
                            </div>
                        </Col>
                        <Col span={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>12</div>
                                <div>{i18n.t(LocaleHelper.getCompletedThisWeek())}</div>
                            </div>
                        </Col>
                        <Col span={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#cf1322' }}>2</div>
                                <div>{i18n.t(LocaleHelper.getOverdueTasks())}</div>
                            </div>
                        </Col>
                    </Row>
                </Card>

                <Row gutter={16}>
                    <Col span={8}>
                        <Card title={i18n.t(LocaleHelper.getWorkDistribution())} size="small" bordered={false} bodyStyle={{ padding: '0 10px' }}>
                            <List
                                itemLayout="horizontal"
                                dataSource={members}
                                renderItem={item => (
                                    <List.Item actions={[<a key="detail">{i18n.t(LocaleHelper.getDetail())}</a>]}>
                                        <List.Item.Meta
                                            avatar={<Avatar icon={<UserOutlined />} style={{ backgroundColor: item.load > 80 ? '#f56a00' : '#87d068' }} />}
                                            title={item.name}
                                            description={
                                                <div>
                                                    <div>{item.count} {i18n.t(LocaleHelper.getJobCountSuffix())}</div>
                                                    <Progress percent={item.load} size="small" status={item.load > 80 ? 'exception' : 'active'} />
                                                </div>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                    <Col span={16}>
                        <Card title={i18n.t(LocaleHelper.getTeamJobList())} size="small" bordered={false}>
                            <AdvancedSearchForm fields={fields as any} onSearch={() => {}} />
                            <Table
                                columns={columns as any}
                                dataSource={jobs}
                                rowKey="jobId"
                                size="small"
                                pagination={false}
                            />
                            <div style={{ marginTop: '10px', padding: '10px', background: '#f0f2f5', borderRadius: '4px' }}>
                                <Space>
                                    <span style={{ fontWeight: 'bold' }}>{i18n.t(LocaleHelper.getTeamCollaboration())}:</span>
                                    <Button size="small">{i18n.t(LocaleHelper.getReassign())}</Button>
                                    <Button size="small">{i18n.t(LocaleHelper.getLoadBalance())}</Button>
                                    <Button size="small">{i18n.t(LocaleHelper.getSkillMatch())}</Button>
                                    <Button size="small" type="dashed" danger>{i18n.t(LocaleHelper.getEmergencySupport())}</Button>
                                </Space>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default TeamJobs;

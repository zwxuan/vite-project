import React from 'react';
import { Card, Row, Col, Statistic, DatePicker, Button, List, Avatar, Progress, Tabs } from 'antd';
import { TrophyOutlined, RiseOutlined, ClockCircleOutlined, SmileOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import '@/pages/page_list.less';

const { RangePicker } = DatePicker;

const PerformanceAnalysis: React.FC = () => {
    // Mock Data
    const teamRanking = [
        { name: 'Team A', score: 98, jobs: 150 },
        { name: 'Team B', score: 95, jobs: 140 },
        { name: 'Team C', score: 92, jobs: 130 },
    ];

    const userRanking = [
        { name: 'User A', score: 99, jobs: 45 },
        { name: 'User B', score: 98, jobs: 42 },
        { name: 'User C', score: 96, jobs: 40 },
        { name: 'User D', score: 95, jobs: 38 },
        { name: 'User E', score: 94, jobs: 35 },
    ];

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
             <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getPerformanceAnalysisTitle())}
                        </span>
                    </div>
                </div>
                 <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <RangePicker style={{ marginRight: 10 }} />
                            <Button>{i18n.t(LocaleHelper.getExport())}</Button>
                        </div>
                    </div>
                </div>
            </div>

             <div style={{ padding: '20px' }}>
                {/* KPIs */}
                <Row gutter={16} style={{ marginBottom: '20px' }}>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic title="Completed Jobs" value={420} prefix={<TrophyOutlined style={{ color: '#faad14' }} />} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic title="On-time Rate" value={98.5} suffix="%" prefix={<RiseOutlined style={{ color: '#52c41a' }} />} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic title="Avg Duration" value={1.5} suffix="days" prefix={<ClockCircleOutlined style={{ color: '#1890ff' }} />} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic title="Cust. Satisfaction" value={4.9} suffix="/ 5.0" prefix={<SmileOutlined style={{ color: '#eb2f96' }} />} />
                        </Card>
                    </Col>
                </Row>

                {/* Charts & Rankings */}
                <Row gutter={16}>
                    <Col span={16}>
                        <Card title="Performance Trends" bordered={false} style={{ marginBottom: '20px' }}>
                             <div style={{ height: '300px', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                                <RiseOutlined style={{ fontSize: '48px' }} /> Chart Placeholder: Efficiency/Volume over time
                            </div>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Rankings" bordered={false} style={{ marginBottom: '20px' }}>
                            <Tabs defaultActiveKey="team">
                                <Tabs.TabPane tab="Team Ranking" key="team">
                                    <List
                                        dataSource={teamRanking}
                                        renderItem={(item, index) => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    avatar={<Avatar style={{ backgroundColor: index === 0 ? '#ffbf00' : index === 1 ? '#d9d9d9' : '#cd7f32' }}>{index + 1}</Avatar>}
                                                    title={item.name}
                                                    description={`${item.jobs} Jobs`}
                                                />
                                                <div style={{ fontWeight: 'bold' }}>{item.score} pts</div>
                                            </List.Item>
                                        )}
                                    />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab={i18n.t(LocaleHelper.getIndividualRanking())} key="individual">
                                    <List
                                        dataSource={userRanking}
                                        renderItem={(item, index) => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    avatar={<Avatar size="small">{index + 1}</Avatar>}
                                                    title={item.name}
                                                />
                                                <div>{item.score} pts</div>
                                            </List.Item>
                                        )}
                                    />
                                </Tabs.TabPane>
                            </Tabs>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default PerformanceAnalysis;

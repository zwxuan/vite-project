import React, { useState } from 'react';
import { Table, Button, Input, Form, Row, Col, Checkbox, Card, Space, Divider } from 'antd';
import CustomIcon from "@/components/custom-icon";
import '@/pages/page_list.less';

const OrderBreakdown: React.FC = () => {
    const [breakdownResults] = useState([
        {
            key: '1',
            no: '1',
            jobType: '货运作业',
            jobName: '海运出口运输',
            duration: '30天',
            department: '海运部',
            priority: '高',
        },
        {
            key: '2',
            no: '2',
            jobType: '报关作业',
            jobName: '出口报关',
            duration: '3天',
            department: '报关部',
            priority: '高',
        },
        {
            key: '3',
            no: '3',
            jobType: '仓储作业',
            jobName: '货物装箱',
            duration: '2天',
            department: '仓储部',
            priority: '中',
        },
        {
            key: '4',
            no: '4',
            jobType: '保险作业',
            jobName: '货物保险',
            duration: '1天',
            department: '客服部',
            priority: '低',
        },
    ]);

    const columns = [
        { title: '序号', dataIndex: 'no', key: 'no' },
        { title: '作业类型', dataIndex: 'jobType', key: 'jobType' },
        { title: '作业名称', dataIndex: 'jobName', key: 'jobName' },
        { title: '预计工期', dataIndex: 'duration', key: 'duration' },
        { title: '负责部门', dataIndex: 'department', key: 'department' },
        { title: '优先级', dataIndex: 'priority', key: 'priority' },
    ];

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            <span>订单管理 {'>'} 订单拆解</span>
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button>批量拆解</Button>
                            <Button>规则管理</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '10px' }}>
                <Row gutter={16}>
                    {/* Left Column: Order Info, Rules, Adjustments */}
                    <Col span={8}>
                        <Card size="small" title="待拆解订单" style={{ marginBottom: '10px', textAlign: 'left' }}>
                            <Row gutter={[16, 12]}>
                                <Col span={24}>订单号：ORD-20240315-001</Col>
                                <Col span={24}>客户：ABC公司</Col>
                                <Col span={12}>状态：已确认</Col>
                                <Col span={12}>类型：海运出口</Col>
                                <Col span={24}>路线：上海港 → 洛杉矶港</Col>
                            </Row>
                        </Card>

                        <Card size="small" title="拆解规则选择" style={{ marginBottom: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                <span style={{ marginRight: '8px' }}>适用规则：</span>
                                <Space size={8} wrap>
                                    <Checkbox defaultChecked>海运出口标准流程</Checkbox>
                                    <Checkbox defaultChecked>门到门服务流程</Checkbox>
                                    <Checkbox>危险品处理流程</Checkbox>
                                    <Checkbox defaultChecked>保险服务流程</Checkbox>
                                </Space>
                            </div>
                        </Card>

                        <Card size="small" title="拆解参数调整" style={{ marginBottom: '10px' }}>
                            <Form layout="vertical">
                                <Form.Item label="总工期">
                                    <Input suffix="天" defaultValue="35" />
                                </Form.Item>
                                <Form.Item label="开始日期">
                                    <Input defaultValue="2024-03-20" />
                                </Form.Item>
                                <Form.Item label="特殊要求">
                                    <Input defaultValue="易碎品需要特殊包装处理___________________" />
                                </Form.Item>
                                <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
                                    <Space>
                                        <Button type="primary">执行拆解</Button>
                                        <Button>取消</Button>
                                    </Space>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>

                    {/* Right Column: Preview Results */}
                    <Col span={16}>
                        <Card size="small" title="预览拆解结果" style={{ height: '100%' }}>
                            <Table
                                columns={columns}
                                dataSource={breakdownResults}
                                pagination={false}
                                size="small"
                                bordered
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default OrderBreakdown;

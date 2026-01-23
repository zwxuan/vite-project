import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Select, Statistic, Table } from 'antd';
import CustomIcon from '@/components/custom-icon';
import { getTrackingReportList } from '@/api/freight_forwarding/milestone_tracking/service';
import { TrackingReportItem } from '@/types/freight_forwarding/milestone_tracking';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import '@/pages/page_list.less';

const TrackingReport: React.FC = () => {
    const [data, setData] = useState<TrackingReportItem[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const result = await getTrackingReportList();
            setData(result);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        { title: '路线', dataIndex: 'route', key: 'route' },
        { title: '运单数量', dataIndex: 'shipmentCount', key: 'shipmentCount' },
        { title: '平均时效', dataIndex: 'avgDuration', key: 'avgDuration' },
        { title: '准时率', dataIndex: 'onTimeRate', key: 'onTimeRate', render: (val: number) => `${val}%` },
        { title: '异常率', dataIndex: 'exceptionRate', key: 'exceptionRate', render: (val: number) => `${val}%` },
        { title: '满意度', dataIndex: 'customerSatisfaction', key: 'customerSatisfaction', render: (val: number) => `${val}/5.0` },
    ];

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getTrackingReportTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button>自定义报表</Button>
                            <Button>导出</Button>
                        </div>
                    </div>
                </div>
            </div>
            
            <Card className="nc-bill-table-area" bordered={false}>
                <Form layout="inline" style={{ marginBottom: 16 }}>
                    <Form.Item label="报表类型">
                        <Select defaultValue="time" style={{ width: 200 }}>
                            <Select.Option value="time">运输时效分析</Select.Option>
                            <Select.Option value="exception">异常分析</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="时间范围">
                        <Select defaultValue="month" style={{ width: 160 }}>
                            <Select.Option value="month">本月</Select.Option>
                            <Select.Option value="quarter">本季度</Select.Option>
                            <Select.Option value="year">本年</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="客户">
                        <Select defaultValue="all" style={{ width: 160 }}>
                            <Select.Option value="all">全部</Select.Option>
                            <Select.Option value="客户A">客户A</Select.Option>
                            <Select.Option value="客户B">客户B</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="路线">
                        <Select defaultValue="all" style={{ width: 160 }}>
                            <Select.Option value="all">全部</Select.Option>
                            <Select.Option value="上海-洛杉矶">上海-洛杉矶</Select.Option>
                            <Select.Option value="深圳-纽约">深圳-纽约</Select.Option>
                            <Select.Option value="青岛-汉堡">青岛-汉堡</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={fetchData}>生成</Button>
                        <Button style={{ marginLeft: 8 }}>重置</Button>
                    </Form.Item>
                </Form>

                <Row gutter={16} style={{ marginBottom: 16 }}>
                    <Col span={8}>
                        <Card>
                            <Statistic title="平均运输时间" value={18.5} precision={1} suffix="天" valueStyle={{ color: '#3f8600' }} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic title="准时率" value={92.3} precision={1} suffix="%" valueStyle={{ color: '#3f8600' }} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic title="异常率" value={7.7} precision={1} suffix="%" valueStyle={{ color: '#cf1322' }} />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: 24 }}>
                    <Col span={8}>
                        <Card>
                            <Statistic title="客户满意度" value={4.2} precision={1} suffix="/ 5.0" valueStyle={{ color: '#3f8600' }} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic title="里程碑完成率" value={95.8} precision={1} suffix="%" valueStyle={{ color: '#3f8600' }} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic title="预警处理率" value={88.5} precision={1} suffix="%" valueStyle={{ color: '#3f8600' }} />
                        </Card>
                    </Col>
                </Row>

                <Row gutter={16} style={{ marginBottom: 24 }}>
                    <Col span={12}>
                        <div style={{ height: 260, border: '1px dashed #d9d9d9', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: '#999' }}>时效趋势图 - 折线图显示每日运输时效变化</span>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div style={{ height: 260, border: '1px dashed #d9d9d9', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: '#999' }}>异常分布图 - 饼图显示各类异常的分布比例</span>
                        </div>
                    </Col>
                </Row>

                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="route"
                    loading={loading}
                    size="small"
                    bordered={true}
                    pagination={false}
                />
            </Card>
        </div>
    );
};

export default TrackingReport;

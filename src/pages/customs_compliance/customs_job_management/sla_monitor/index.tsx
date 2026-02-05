import '@/pages/page_list.less';
import React, { useState, useEffect, useRef } from 'react';
import { Card, Col, Row, Statistic, Table, Tag, Button, Space, Progress, Tooltip, message } from 'antd';
import { WarningOutlined, ClockCircleOutlined, CheckCircleOutlined, FieldTimeOutlined, RiseOutlined, BellOutlined } from '@ant-design/icons';
import { getSlaMonitorData, urgeJob, remindJob } from '@/api/customs_compliance/customs_job_management/sla_service';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import CustomIcon from "@/components/custom-icon";
import { SlaMonitorLocale } from '@/utils/locale/customs_compliance/customs_job_management/sla_monitor';
import { Chart } from '@antv/g2';
import { useNavigate } from 'react-router-dom';

const SlaMonitor: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<Chart | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getSlaMonitorData();
                if (res.success) {
                    setData(res.data);
                }
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    useEffect(() => {
        if (data && data.trend && chartContainerRef.current) {
            if (!chartRef.current) {
                const chart = new Chart({
                    container: chartContainerRef.current,
                    autoFit: true,
                    height: 300,
                });

                chart
                    .data(data.trend)
                    .encode('x', 'date')
                    .encode('y', 'value')
                    .scale('y', { domain: [0, 100] });

                chart.line().style('stroke', '#1890ff').style('lineWidth', 2);
                chart.point().style('fill', '#1890ff').style('r', 4);

                chart.render();
                chartRef.current = chart;
            } else {
                chartRef.current.changeData(data.trend);
            }
        }
        
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }
        };
    }, [data]);

    if (loading) return <div>Loading...</div>;
    if (!data) return <div>No data available</div>;

    const handleUrge = async (record: any) => {
        const res = await urgeJob(record.job_id);
        if (res.success) {
            message.success(i18n.t(LocaleHelper.getSuccess()));
        }
    };

    const handleRemind = async (record: any) => {
        const res = await remindJob(record.job_id);
        if (res.success) {
            message.success(i18n.t(LocaleHelper.getSuccess()));
        }
    };

    const handleView = (record: any) => {
        navigate(`/customs_job_management/detail/${record.job_id}`);
    };

    const columns = [
        {
            title: i18n.t(SlaMonitorLocale.getColWarningLevel()),
            dataIndex: 'warning_level',
            key: 'warning_level',
            render: (text: string) => {
                let color = 'default';
                let label = text;
                if (text === 'severe') { color = '#cf1322'; label = '🔴 ' + i18n.t(SlaMonitorLocale.getStatSevereOverdue()); }
                else if (text === 'warning') { color = '#faad14'; label = '🟠 ' + i18n.t(SlaMonitorLocale.getStatSoonOverdue()); }
                else if (text === 'notice') { color = '#faad14'; label = '🟡 注意'; } // 'Attention'
                
                return <span style={{ color }}>{label}</span>;
            }
        },
        { title: i18n.t(SlaMonitorLocale.getColJobId()), dataIndex: 'job_id', key: 'job_id' },
        { title: i18n.t(SlaMonitorLocale.getColBusinessType()), dataIndex: 'business_type', key: 'business_type' },
        { title: i18n.t(SlaMonitorLocale.getColCustomer()), dataIndex: 'customer', key: 'customer' },
        { title: i18n.t(SlaMonitorLocale.getColHandler()), dataIndex: 'handler', key: 'handler' },
        { 
            title: i18n.t(SlaMonitorLocale.getColRemainingTime()), 
            dataIndex: 'remaining_time', 
            key: 'remaining_time', 
            render: (text: string) => <span style={{ color: text.startsWith('-') ? 'red' : 'inherit', fontWeight: 'bold' }}>{text}</span> 
        },
        { 
            title: i18n.t(SlaMonitorLocale.getColCompletionRate()), 
            dataIndex: 'completion_rate', 
            key: 'completion_rate',
            render: (val: number) => <Progress percent={val} size="small" />
        },
        {
            title: i18n.t(SlaMonitorLocale.getColOperation()),
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <a style={{ color: '#ff4d4f' }} onClick={() => handleUrge(record)}>{i18n.t(SlaMonitorLocale.getActionUrge())}</a>
                    <a onClick={() => handleRemind(record)}>{i18n.t(SlaMonitorLocale.getActionRemind())}</a>
                    <a onClick={() => handleView(record)}>{i18n.t(SlaMonitorLocale.getActionView())}</a>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(SlaMonitorLocale.getPageTitle())}
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}>
                                                <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                                                    <b>{i18n.t(SlaMonitorLocale.getHelpLabel())}</b>
                                                </span>
                                                <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                                                    <li><b>{i18n.t(SlaMonitorLocale.getHelpRole())}</b>{i18n.t(SlaMonitorLocale.getHelpRoleDesc())}</li>
                                                    <li><b>{i18n.t(SlaMonitorLocale.getHelpOrigin())}</b>{i18n.t(SlaMonitorLocale.getHelpOriginDesc())}</li>
                                                    <li><b>{i18n.t(SlaMonitorLocale.getHelpFunctionality())}</b>{i18n.t(SlaMonitorLocale.getHelpFunctionalityDesc())}</li>
                                                </ul>
                                            </li>
                                        </ol>
                                    </div>
                                }
                                color='white'
                            >
                                <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                            </Tooltip>
                        </span>
                    </div>
                </div>
            </div>

            <div style={{ padding: '24px' }}>
                {/* Statistics Row */}
                <Row gutter={[16, 16]}>
                    <Col span={4}>
                        <Card bordered={false} bodyStyle={{ padding: '20px' }}>
                            <Statistic
                                title={i18n.t(SlaMonitorLocale.getStatSevereOverdue())}
                                value={data.summary.severe_overdue}
                                valueStyle={{ color: '#cf1322', fontWeight: 'bold' }}
                                prefix={<WarningOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card bordered={false} bodyStyle={{ padding: '20px' }}>
                            <Statistic
                                title={i18n.t(SlaMonitorLocale.getStatSoonOverdue())}
                                value={data.summary.soon_overdue}
                                valueStyle={{ color: '#faad14', fontWeight: 'bold' }}
                                prefix={<ClockCircleOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card bordered={false} bodyStyle={{ padding: '20px' }}>
                            <Statistic
                                title={i18n.t(SlaMonitorLocale.getStatNormalProcessing())}
                                value={data.summary.normal}
                                style={{ color: '#52c41a', fontWeight: 'bold' }}
                                prefix={<CheckCircleOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card bordered={false} bodyStyle={{ padding: '20px' }}>
                            <Statistic
                                title={i18n.t(SlaMonitorLocale.getStatAvgDuration())}
                                value={data.summary.avg_duration}
                                style={{ color: '#1890ff', fontWeight: 'bold' }}
                                prefix={<FieldTimeOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card bordered={false} bodyStyle={{ padding: '20px' }}>
                            <Statistic
                                title={i18n.t(SlaMonitorLocale.getStatSlaRate())}
                                value={data.summary.sla_rate}
                                style={{ color: '#722ed1', fontWeight: 'bold' }}
                                prefix={<RiseOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card bordered={false} bodyStyle={{ padding: '20px' }}>
                            <Statistic
                                title={i18n.t(SlaMonitorLocale.getStatTodayWarning())}
                                value={data.summary.today_warning}
                                style={{ color: '#fa8c16', fontWeight: 'bold' }}
                                prefix={<BellOutlined />}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* Trend Chart */}
                <div style={{ marginTop: '24px', backgroundColor: '#fff', padding: '24px', borderRadius: '2px' }}>
                    <div style={{ marginBottom: '20px', fontSize: '16px', fontWeight: 500 }}>
                        {i18n.t(SlaMonitorLocale.getChartTrendTitle())}
                    </div>
                    <div ref={chartContainerRef} style={{ height: '300px' }}></div>
                </div>

                {/* Warning List */}
                <div style={{ marginTop: '24px', backgroundColor: '#fff', padding: '24px', borderRadius: '2px' }} className='nc-bill-table-area'>
                    <div style={{ marginBottom: '20px', fontSize: '16px', fontWeight: 500 }}>
                        {i18n.t(SlaMonitorLocale.getListTitle())}
                    </div>
                    <Table
                        columns={columns}
                        dataSource={data.warning_list}
                        rowKey="job_id"
                        pagination={{
                            size: 'small',
                            pageSize: 10,
                            showTotal: (total) => `Total ${total}`,
                            showQuickJumper: true,
                            showSizeChanger: true,
                        }}
                        scroll={{ x: 'max-content' }}
                        bordered={true}
                        size="small"
                    />
                </div>
            </div>
        </div>
    );
};

export default SlaMonitor;

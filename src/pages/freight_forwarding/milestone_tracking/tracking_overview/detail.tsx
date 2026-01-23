import React, { useState } from 'react';
import { Button, Card, Descriptions, Steps, Table, Tag, Timeline } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import CustomIcon from '@/components/custom-icon';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import '@/pages/page_list.less';

const TrackingDetail: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const handleBack = () => {
        navigate(-1);
    };

    // Mock Data
    const basicInfo = {
        waybillNumber: id || 'WAY-20240315-001',
        customer: 'ABC Trading Co.',
        route: 'Shanghai Port -> Los Angeles Port',
        carrier: 'COSCO',
        etd: '2024-03-20',
        eta: '2024-04-15',
    };

    const trackingRecords = [
        { time: '03-15 10:00', milestone: 'Booking Confirmed', status: 'Completed', location: 'Shanghai', operator: 'System' },
        { time: '03-16 14:30', milestone: 'Container Loaded', status: 'Completed', location: 'Shanghai Terminal', operator: 'Operator A' },
        { time: '03-20 08:15', milestone: 'Departure', status: 'Completed', location: 'COSCO SHANGHAI', operator: 'EDI' },
        { time: '03-22 16:00', milestone: 'In Transit Update', status: 'In Progress', location: 'Pacific Ocean', operator: 'GPS' },
    ];

    const columns = [
        { title: 'Time', dataIndex: 'time', key: 'time' },
        { title: 'Milestone', dataIndex: 'milestone', key: 'milestone' },
        { title: 'Status', dataIndex: 'status', key: 'status', render: (text: string) => <Tag color="blue">{text}</Tag> },
        { title: 'Location/Note', dataIndex: 'location', key: 'location' },
        { title: 'Action', key: 'action', render: () => <a>Detail</a> },
    ];

    // 步骤数据
    const stepsData = [
        { title: 'Booking', description: 'Confirmed' },
        { title: 'Loading', description: 'Completed' },
        { title: 'Departure', description: 'Completed' },
        { title: 'In Transit', description: 'In Progress' },
        { title: 'Arrival', description: 'Pending' },
        { title: 'Customs', description: 'Pending' },
        { title: 'Delivery', description: 'Pending' },
    ];

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                            <Button icon={<ArrowLeftOutlined />} onClick={handleBack} style={{ marginRight: 8 }} />
                            Tracking Detail - {basicInfo.waybillNumber}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button>Manual Update</Button>
                            <Button>Send Notification</Button>
                            <Button>Export</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '16px' }}>
                <Card title="Basic Information" bordered={false} style={{ marginBottom: 16 }}>
                    <Descriptions column={3}>
                        <Descriptions.Item label="Waybill No">{basicInfo.waybillNumber}</Descriptions.Item>
                        <Descriptions.Item label="Customer">{basicInfo.customer}</Descriptions.Item>
                        <Descriptions.Item label="Route">{basicInfo.route}</Descriptions.Item>
                        <Descriptions.Item label="Carrier">{basicInfo.carrier}</Descriptions.Item>
                        <Descriptions.Item label="Estimated ETD">{basicInfo.etd}</Descriptions.Item>
                        <Descriptions.Item label="Estimated ETA">{basicInfo.eta}</Descriptions.Item>
                    </Descriptions>
                </Card>

                <Card title="Milestone Progress" bordered={false} style={{ marginBottom: 16 }}>
                    <Steps 
                        current={3} 
                        type="dot"
                        items={stepsData}
                    />
                </Card>

                <Card title="Tracking Records" bordered={false}>
                    <Table
                        columns={columns}
                        dataSource={trackingRecords}
                        pagination={false}
                        rowKey="time"
                        size="small"
                    />
                </Card>
            </div>
        </div>
    );
};

export default TrackingDetail;
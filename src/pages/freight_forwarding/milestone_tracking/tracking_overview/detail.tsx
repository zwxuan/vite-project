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
        { title: i18n.t(LocaleHelper.getTime()), dataIndex: 'time', key: 'time' },
        { title: i18n.t(LocaleHelper.getMilestone()), dataIndex: 'milestone', key: 'milestone' },
        { title: i18n.t(LocaleHelper.getStatus()), dataIndex: 'status', key: 'status', render: (text: string) => <Tag color="blue">{text}</Tag> },
        { title: i18n.t(LocaleHelper.getLocationNote()), dataIndex: 'location', key: 'location' },
        { title: i18n.t(LocaleHelper.getAction()), key: 'action', render: () => <a>{i18n.t(LocaleHelper.getDetail())}</a> },
    ];

    // 步骤数据
    const stepsData = [
        { title: i18n.t(LocaleHelper.getBooking()), description: 'Confirmed' },
        { title: i18n.t(LocaleHelper.getLoading()), description: 'Completed' },
        { title: i18n.t(LocaleHelper.getDeparture()), description: 'Completed' },
        { title: i18n.t(LocaleHelper.getInTransit()), description: 'In Progress' },
        { title: i18n.t(LocaleHelper.getArrival()), description: 'Pending' },
        { title: i18n.t(LocaleHelper.getCustoms()), description: 'Pending' },
        { title: i18n.t(LocaleHelper.getDelivery()), description: 'Pending' },
    ];

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                            {i18n.t(LocaleHelper.getTrackingDetail())} - {basicInfo.waybillNumber}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button>{i18n.t(LocaleHelper.getManualUpdate())}</Button>
                            <Button>{i18n.t(LocaleHelper.getSendNotification())}</Button>
                            <Button>{i18n.t(LocaleHelper.getExport())}</Button>
                            <Button onClick={handleBack} style={{ marginRight: 8 }}>{i18n.t(LocaleHelper.getBack())}</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '16px' }}>
                <Card title={i18n.t(LocaleHelper.getBasicInformation())} variant="outlined" style={{ marginBottom: 16 }}>
                    <Descriptions column={3}>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillNumber())}>{basicInfo.waybillNumber}</Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getCustomer())}>{basicInfo.customer}</Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getRoute())}>{basicInfo.route}</Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getCarrier())}>{basicInfo.carrier}</Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getEstimatedEtd())}>{basicInfo.etd}</Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getEstimatedEta())}>{basicInfo.eta}</Descriptions.Item>
                    </Descriptions>
                </Card>

                <Card title={i18n.t(LocaleHelper.getMilestoneProgress())} bordered={false} style={{ marginBottom: 16 }}>
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
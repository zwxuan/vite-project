import React from 'react';
import { Table, Button, Tag } from 'antd';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

const Milestones: React.FC = () => {
    const data = [
        { key: '1', node: 'Booking Confirmed', plan: '2024-03-16', actual: '2024-03-16', location: 'Shanghai', source: 'System', status: 'Completed' },
        { key: '2', node: 'Loaded on Vessel', plan: '2024-03-20', actual: '-', location: 'Shanghai', source: 'Carrier', status: 'Pending' },
        { key: '3', node: 'Arrival', plan: '2024-04-15', actual: '-', location: 'Los Angeles', source: 'Carrier', status: 'Not Started' },
    ];

    const columns = [
        { title: i18n.t(LocaleHelper.getWaybillCreateNode()), dataIndex: 'node' },
        { title: i18n.t(LocaleHelper.getWaybillCreatePlanTime()), dataIndex: 'plan' },
        { title: i18n.t(LocaleHelper.getWaybillCreateActualTime()), dataIndex: 'actual' },
        { title: i18n.t(LocaleHelper.getWaybillCreateLocation()), dataIndex: 'location' },
        { title: i18n.t(LocaleHelper.getWaybillCreateSource()), dataIndex: 'source' },
        { 
            title: i18n.t(LocaleHelper.getWaybillCreateStatus()), 
            dataIndex: 'status',
            render: (text: string) => {
                let color = 'default';
                if (text === 'Completed') color = 'green';
                if (text === 'Pending') color = 'orange';
                return <Tag color={color}>{text}</Tag>;
            }
        },
        { 
            title: i18n.t(LocaleHelper.getWaybillTemplateAction()), 
            key: 'action',
            render: () => <Button type="link" size="small">Update</Button>
        },
    ];

    return (
        <div style={{ padding: '0 20px' }}>
            <Table dataSource={data} columns={columns} pagination={false} size="small" scroll={{ x: 'max-content' }} />
        </div>
    );
};

export default Milestones;

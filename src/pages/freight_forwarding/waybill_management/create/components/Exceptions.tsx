import React from 'react';
import { Table, Button, Tag, Empty } from 'antd';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

const Exceptions: React.FC = () => {
    const data = [
        { key: '1', level: 'High', type: 'Node Overdue', time: '2024-03-21', desc: 'Milestone "Loaded on Vessel" not updated', owner: 'Li Si', sla: '24h', status: 'Processing' }
    ];

    const columns = [
        { title: i18n.t(LocaleHelper.getWaybillCreateExceptionLevel()), dataIndex: 'level', render: (text: string) => <Tag color="red">{text}</Tag> },
        { title: i18n.t(LocaleHelper.getWaybillCreateExceptionType()), dataIndex: 'type' },
        { title: i18n.t(LocaleHelper.getWaybillCreateExceptionTime()), dataIndex: 'time' },
        { title: i18n.t(LocaleHelper.getWaybillCreateExceptionDesc()), dataIndex: 'desc' },
        { title: i18n.t(LocaleHelper.getWaybillCreateExceptionOwner()), dataIndex: 'owner' },
        { title: i18n.t(LocaleHelper.getWaybillCreateExceptionSla()), dataIndex: 'sla' },
        { title: i18n.t(LocaleHelper.getWaybillCreateStatus()), dataIndex: 'status' },
        { title: i18n.t(LocaleHelper.getWaybillTemplateAction()), key: 'action', render: () => <Button type="link" size="small">Resolve</Button> },
    ];

    return (
        <div style={{ padding: '0 20px' }}>
            {data.length > 0 ? (
                <Table dataSource={data} columns={columns} pagination={false} size="small" scroll={{ x: 'max-content' }} />
            ) : (
                <Empty description={i18n.t(LocaleHelper.getWaybillCreateNoExceptions())} />
            )}
        </div>
    );
};

export default Exceptions;

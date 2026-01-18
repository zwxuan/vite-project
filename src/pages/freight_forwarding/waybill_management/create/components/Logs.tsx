import React from 'react';
import { Table } from 'antd';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

const Logs: React.FC = () => {
    const data = [
        { key: '1', time: '2024-03-15 10:12', user: 'Li Si', action: 'Create Waybill', detail: 'Created based on JOB-001' },
        { key: '2', time: '2024-03-18 15:20', user: 'Li Si', action: 'Update Field', detail: 'VGM: Empty -> 5000KG' },
        { key: '3', time: '2024-03-19 09:10', user: 'Zhang San', action: 'Upload File', detail: 'BL Draft v2' },
    ];

    const columns = [
        { title: i18n.t(LocaleHelper.getWaybillCreateLogTime()), dataIndex: 'time' },
        { title: i18n.t(LocaleHelper.getWaybillCreateLogUser()), dataIndex: 'user' },
        { title: i18n.t(LocaleHelper.getWaybillCreateLogAction()), dataIndex: 'action' },
        { title: i18n.t(LocaleHelper.getWaybillCreateLogDetail()), dataIndex: 'detail' },
    ];

    return (
        <div style={{ padding: '0 20px' }}>
            <Table dataSource={data} columns={columns} pagination={false} size="small" scroll={{ x: 'max-content' }} />
        </div>
    );
};

export default Logs;

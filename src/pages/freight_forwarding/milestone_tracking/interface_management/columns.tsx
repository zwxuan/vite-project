import React from 'react';
import { Space, Tag } from 'antd';
import { InterfaceConfigItem } from '@/types/freight_forwarding/milestone_tracking';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getColumns = (handleConfig: (record: InterfaceConfigItem) => void) => [
    {
        title: i18n.t(LocaleHelper.getInterfaceName()),
        dataIndex: 'interfaceName',
        key: 'interfaceName',
    },
    {
        title: i18n.t(LocaleHelper.getInterfaceType()),
        dataIndex: 'interfaceType',
        key: 'interfaceType',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status: string) => {
            let color = 'green';
            if (status === 'Error') color = 'red';
            if (status === 'Maintenance') color = 'orange';
            return <Tag color={color}>{status}</Tag>;
        },
    },
    {
        title: i18n.t(LocaleHelper.getLastSync()),
        dataIndex: 'lastSyncTime',
        key: 'lastSyncTime',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_: any, record: InterfaceConfigItem) => (
            <Space size="middle">
                <a onClick={() => handleConfig(record)}>Config</a>
                <a>Test</a>
                <a>Log</a>
            </Space>
        ),
    },
];

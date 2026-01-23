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
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (status: InterfaceConfigItem['status']) => {
            const statusMap = {
                Normal: { label: '正常', color: 'green' },
                Error: { label: '异常', color: 'red' },
                Maintenance: { label: '维护中', color: 'orange' },
            } as const;
            const current = statusMap[status] || { label: status, color: 'default' };
            return <Tag color={current.color}>{current.label}</Tag>;
        },
    },
    {
        title: i18n.t(LocaleHelper.getLastSync()),
        dataIndex: 'lastSyncTime',
        key: 'lastSyncTime',
    },
    {
        title: '操作',
        key: 'action',
        render: (_: any, record: InterfaceConfigItem) => (
            <Space size="middle">
                <a onClick={() => handleConfig(record)}>配置</a>
                <a>测试</a>
                <a>日志</a>
            </Space>
        ),
    },
];

import React from 'react';
import { Space, Tag } from 'antd';
import { ExceptionAlertItem } from '@/types/freight_forwarding/milestone_tracking';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getColumns = (handleProcess: (record: ExceptionAlertItem) => void) => [
    {
        title: i18n.t(LocaleHelper.getWaybillNumber()),
        dataIndex: 'waybillNumber',
        key: 'waybillNumber',
    },
    {
        title: i18n.t(LocaleHelper.getAlertType()),
        dataIndex: 'alertType',
        key: 'alertType',
    },
    {
        title: i18n.t(LocaleHelper.getSeverity()),
        dataIndex: 'severity',
        key: 'severity',
        render: (severity: string) => {
            let color = 'blue';
            if (severity === 'High') color = 'orange';
            if (severity === 'Critical') color = 'red';
            return <Tag color={color}>{severity}</Tag>;
        },
    },
    {
        title: i18n.t(LocaleHelper.getAlertTime()),
        dataIndex: 'alertTime',
        key: 'alertTime',
    },
    {
        title: i18n.t(LocaleHelper.getStatus()),
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: i18n.t(LocaleHelper.getAction()),
        key: 'action',
        render: (_: any, record: ExceptionAlertItem) => (
            <Space size="middle">
                <a onClick={() => handleProcess(record)}>{i18n.t(LocaleHelper.getProcess())}</a>
            </Space>
        ),
    },
];

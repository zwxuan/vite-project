import React from 'react';
import { Space, Switch, Tag } from 'antd';
import { MilestoneConfigItem } from '@/types/freight_forwarding/milestone_tracking';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getColumns = (handleEdit: (record: MilestoneConfigItem) => void) => [
    {
        title: i18n.t(LocaleHelper.getMilestoneName()),
        dataIndex: 'milestoneName',
        key: 'milestoneName',
    },
    {
        title: i18n.t(LocaleHelper.getTriggerCondition()),
        dataIndex: 'triggerCondition',
        key: 'triggerCondition',
    },
    {
        title: i18n.t(LocaleHelper.getNotificationSettings()),
        dataIndex: 'notificationSettings',
        key: 'notificationSettings',
        render: (settings: string[]) => (
            <Space>
                {settings.map(s => <Tag key={s}>{s}</Tag>)}
            </Space>
        ),
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status: boolean) => <Switch checked={status} disabled />,
    },
    {
        title: 'Action',
        key: 'action',
        render: (_: any, record: MilestoneConfigItem) => (
            <Space size="middle">
                <a onClick={() => handleEdit(record)}>Edit</a>
            </Space>
        ),
    },
];

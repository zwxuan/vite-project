import React from 'react';
import { Space, Tag } from 'antd';
import { MilestoneConfigItem } from '@/types/freight_forwarding/milestone_tracking';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getColumns = (
    handleEdit: (record: MilestoneConfigItem) => void,
    handleCopy: (record: MilestoneConfigItem) => void,
    handleToggle: (record: MilestoneConfigItem) => void
) => [
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
            <span>{settings.join('+')}</span>
        ),
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (status: boolean) => (
            <Tag color={status ? 'green' : 'red'}>{status ? '启用' : '停用'}</Tag>
        ),
    },
    {
        title: '操作',
        key: 'action',
        render: (_: any, record: MilestoneConfigItem) => (
            <Space size="middle">
                <a onClick={(event) => { event.stopPropagation(); handleEdit(record); }}>编辑</a>
                <a onClick={(event) => { event.stopPropagation(); handleCopy(record); }}>复制</a>
                <a onClick={(event) => { event.stopPropagation(); handleToggle(record); }}>
                    {record.status ? '停用' : '启用'}
                </a>
            </Space>
        ),
    },
];

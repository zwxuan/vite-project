import React from 'react';
import { Tag } from 'antd';
import { CustomerNotificationItem } from '@/types/freight_forwarding/milestone_tracking';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getColumns = () => [
    {
        title: i18n.t(LocaleHelper.getCustomer()),
        dataIndex: 'customerName',
        key: 'customerName',
    },
    {
        title: i18n.t(LocaleHelper.getWaybillNumber()),
        dataIndex: 'waybillNumber',
        key: 'waybillNumber',
    },
    {
        title: '通知类型',
        dataIndex: 'notificationType',
        key: 'notificationType',
    },
    {
        title: '发送方式',
        dataIndex: 'method',
        key: 'method',
        render: (method: CustomerNotificationItem['method']) => {
            const map = {
                Email: '邮件',
                SMS: '短信',
                WeChat: '微信',
            };
            return map[method] || method;
        },
    },
    {
        title: '发送时间',
        dataIndex: 'sendTime',
        key: 'sendTime',
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (status: CustomerNotificationItem['status']) => {
            const map = {
                Sent: { text: '已发送', color: 'green' },
                Failed: { text: '发送失败', color: 'red' },
                Pending: { text: '发送中', color: 'gold' },
            };
            const item = map[status];
            if (!item) {
                return <Tag>{status}</Tag>;
            }
            return <Tag color={item.color}>{item.text}</Tag>;
        },
    },
];

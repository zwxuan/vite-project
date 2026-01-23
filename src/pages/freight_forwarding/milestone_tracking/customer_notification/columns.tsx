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
        title: i18n.t(LocaleHelper.getTemplateType()),
        dataIndex: 'notificationType',
        key: 'notificationType',
    },
    {
        title: i18n.t(LocaleHelper.getNotificationMethod()),
        dataIndex: 'method',
        key: 'method',
    },
    {
        title: 'Send Time',
        dataIndex: 'sendTime',
        key: 'sendTime',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status: string) => (
            <Tag color={status === 'Sent' ? 'green' : 'red'}>{status}</Tag>
        ),
    },
];

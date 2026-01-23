import React from 'react';
import { Button, Space, Progress, Tag } from 'antd';
import { TrackingOverviewItem } from '@/types/freight_forwarding/milestone_tracking';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getColumns = (handleDetail: (record: TrackingOverviewItem) => void) => [
    {
        title: i18n.t(LocaleHelper.getWaybillNumber()),
        dataIndex: 'waybillNumber',
        key: 'waybillNumber',
    },
    {
        title: i18n.t(LocaleHelper.getCustomer()),
        dataIndex: 'customerName',
        key: 'customerName',
    },
    {
        title: i18n.t(LocaleHelper.getRoute()),
        dataIndex: 'route',
        key: 'route',
    },
    {
        title: i18n.t(LocaleHelper.getStatus()),
        dataIndex: 'status',
        key: 'status',
        render: (status: string) => (
            <Tag color={status === 'Exception' ? 'red' : 'blue'}>{status}</Tag>
        ),
    },
    {
        title: i18n.t(LocaleHelper.getProgress()),
        dataIndex: 'progress',
        key: 'progress',
        render: (progress: number) => (
            <Progress percent={progress} size="small" />
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_: any, record: TrackingOverviewItem) => (
            <Space size="middle">
                <a onClick={() => handleDetail(record)}>Detail</a>
            </Space>
        ),
    },
];

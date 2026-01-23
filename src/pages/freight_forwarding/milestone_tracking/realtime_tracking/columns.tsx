import React from 'react';
import { Space } from 'antd';
import { RealtimeTrackingItem } from '@/types/freight_forwarding/milestone_tracking';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getColumns = (handleViewMap: (record: RealtimeTrackingItem) => void) => [
    {
        title: i18n.t(LocaleHelper.getWaybillNumber()),
        dataIndex: 'waybillNumber',
        key: 'waybillNumber',
    },
    {
        title: i18n.t(LocaleHelper.getCurrentLocation()),
        dataIndex: 'currentLocation',
        key: 'currentLocation',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: i18n.t(LocaleHelper.getEstimatedArrival()),
        dataIndex: 'estimatedArrival',
        key: 'estimatedArrival',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_: any, record: RealtimeTrackingItem) => (
            <Space size="middle">
                <a onClick={() => handleViewMap(record)}>View Map</a>
            </Space>
        ),
    },
];

import { Space, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { WaybillItem } from '@/types/freight_forwarding/waybill_management';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const getColumns = (
    onDetail: (record: WaybillItem) => void,
    onTrack: (record: WaybillItem) => void
): ColumnsType<WaybillItem> => [
    {
        title: i18n.t(LocaleHelper.getWaybillListWaybillNo()),
        dataIndex: 'waybillNo',
        key: 'waybillNo',
        width: 150,
    },
    {
        title: i18n.t(LocaleHelper.getWaybillListMblNo()),
        dataIndex: 'mblNo',
        key: 'mblNo',
        width: 150,
    },
    {
        title: i18n.t(LocaleHelper.getWaybillListTransportMode()),
        dataIndex: 'transportMode',
        key: 'transportMode',
        width: 100,
    },
    {
        title: i18n.t(LocaleHelper.getWaybillListCarrier()),
        dataIndex: 'carrier',
        key: 'carrier',
        width: 120,
    },
    {
        title: i18n.t(LocaleHelper.getWaybillListOrigin()),
        dataIndex: 'origin',
        key: 'origin',
        width: 120,
    },
    {
        title: i18n.t(LocaleHelper.getWaybillListDestination()),
        dataIndex: 'destination',
        key: 'destination',
        width: 120,
    },
    {
        title: i18n.t(LocaleHelper.getWaybillListStatus()),
        dataIndex: 'status',
        key: 'status',
        width: 100,
        render: (status: string) => {
            let color = 'default';
            if (status === 'CONFIRMED') color = 'green';
            if (status === 'ISSUED') color = 'blue';
            if (status === 'CANCELLED') color = 'red';
            return <Tag color={color}>{status}</Tag>;
        }
    },
    {
        title: i18n.t(LocaleHelper.getWaybillListActions()),
        key: 'action',
        fixed: 'right',
        width: 150,
        render: (_, record) => (
            <Space size="middle">
                <a onClick={() => onDetail(record)}>{i18n.t(LocaleHelper.getWaybillListDetail())}</a>
                <a onClick={() => onTrack(record)}>{i18n.t(LocaleHelper.getWaybillQueryTrack())}</a>
            </Space>
        ),
    },
];

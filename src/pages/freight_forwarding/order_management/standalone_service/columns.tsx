import { TableColumnsType } from 'antd';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { Space } from 'antd';

export interface StandaloneServiceItem {
    id: string;
    customerName: string;
    serviceType: string;
    serviceContent: string;
    status: string;
    fee: number;
}

export const getColumns = (handleDetail: (record: StandaloneServiceItem) => void, handleEdit: (record: StandaloneServiceItem) => void): TableColumnsType<StandaloneServiceItem> => [
    {
        title: i18n.t(LocaleHelper.getStandaloneServiceServiceId()),
        dataIndex: 'id',
        key: 'id',
        width: 120,
    },
    {
        title: i18n.t(LocaleHelper.getQueryCustomerName()),
        dataIndex: 'customerName',
        key: 'customerName',
        width: 200,
    },
    {
        title: i18n.t(LocaleHelper.getStandaloneServiceServiceType()),
        dataIndex: 'serviceType',
        key: 'serviceType',
        width: 120,
    },
    {
        title: i18n.t(LocaleHelper.getStandaloneServiceServiceContent()),
        dataIndex: 'serviceContent',
        key: 'serviceContent',
        width: 200,
    },
    {
        title: i18n.t(LocaleHelper.getStandaloneServiceServiceStatus()),
        dataIndex: 'status',
        key: 'status',
        width: 100,
    },
    {
        title: i18n.t(LocaleHelper.getStandaloneServiceFee()),
        dataIndex: 'fee',
        key: 'fee',
        width: 100,
    },
    {
        title: i18n.t(LocaleHelper.getOrderListActions()),
        key: 'action',
        fixed: 'right',
        width: 150,
        render: (_, record) => (
            <Space size="middle">
                <a onClick={() => handleDetail(record)}>{i18n.t(LocaleHelper.getOrderListDetail())}</a>
                <a onClick={() => handleEdit(record)}>{i18n.t(LocaleHelper.getOrderListEdit())}</a>
            </Space>
        ),
    },
];

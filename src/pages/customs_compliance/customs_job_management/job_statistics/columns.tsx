import { TableColumnsType } from 'antd';
import i18n from '@/i18n';
import { JobStatisticsLocale } from '@/utils/locale/customs_compliance/customs_job_management/job_statistics';

export interface JobStatisticItem {
    key: number;
    date: string;
    type: string;
    count: number;
    amount: string;
}

export const getColumns = (): TableColumnsType<JobStatisticItem> => [
    {
        title: i18n.t(JobStatisticsLocale.getColDate()),
        dataIndex: 'date',
        key: 'date',
        sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
        title: i18n.t(JobStatisticsLocale.getColType()),
        dataIndex: 'type',
        key: 'type',
        filters: [
            { text: 'Import Declaration', value: 'Import Declaration' },
            { text: 'Export Declaration', value: 'Export Declaration' },
            { text: 'Transit', value: 'Transit' },
        ],
        onFilter: (value, record) => record.type.indexOf(value as string) === 0,
    },
    {
        title: i18n.t(JobStatisticsLocale.getColCount()),
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count,
    },
    {
        title: i18n.t(JobStatisticsLocale.getColAmount()),
        dataIndex: 'amount',
        key: 'amount',
        render: (text) => `¥ ${text.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
        sorter: (a, b) => parseFloat(a.amount) - parseFloat(b.amount),
    },
];

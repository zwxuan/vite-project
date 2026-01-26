import { Tag, Space } from 'antd';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const columns = [
    {
        title: i18n.t(LocaleHelper.getDocumentArchiveArchiveNo()),
        dataIndex: 'archiveNo',
        key: 'archiveNo',
    },
    {
        title: i18n.t(LocaleHelper.getDocumentArchiveDocumentNo()),
        dataIndex: 'docNo',
        key: 'docNo',
    },
    {
        title: i18n.t(LocaleHelper.getDocumentArchiveType()),
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: i18n.t(LocaleHelper.getDocumentArchiveArchiveDate()),
        dataIndex: 'archiveDate',
        key: 'archiveDate',
    },
    {
        title: i18n.t(LocaleHelper.getDocumentArchiveLocation()),
        dataIndex: 'location',
        key: 'location',
    },
    {
        title: i18n.t(LocaleHelper.getDocumentArchiveStatus()),
        dataIndex: 'status',
        key: 'status',
        render: (status: string) => {
            let color = 'green';
            let label = status;
            if (status === 'Normal') label = i18n.t(LocaleHelper.getDocumentArchiveNormal());
            if (status === 'Lent') {
                color = 'orange';
                label = i18n.t(LocaleHelper.getDocumentArchiveLent());
            }
            if (status === 'Lost') label = i18n.t(LocaleHelper.getDocumentArchiveLost());
            if (status === 'Destroyed') label = i18n.t(LocaleHelper.getDocumentArchiveDestroyed());
            return <Tag color={color}>{label}</Tag>;
        }
    },
    {
        title: i18n.t(LocaleHelper.getDocumentArchiveOperation()),
        key: 'action',
        render: (_: any, record: any) => (
            <Space size="middle">
                <a>{i18n.t(LocaleHelper.getDocumentArchiveView())}</a>
                {record.status === 'Normal' ? <a>{i18n.t(LocaleHelper.getDocumentArchiveBorrow())}</a> : <a>{i18n.t(LocaleHelper.getDocumentArchiveReturn())}</a>}
            </Space>
        ),
    },
];

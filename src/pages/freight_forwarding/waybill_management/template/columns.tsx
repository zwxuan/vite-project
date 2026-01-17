import { Space, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { WaybillTemplateItem } from '@/types/freight_forwarding/waybill_management/template';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const getColumns = (
    onEdit: (record: WaybillTemplateItem) => void,
    onCopy: (record: WaybillTemplateItem) => void,
    onToggleStatus: (record: WaybillTemplateItem) => void,
    onDelete: (record: WaybillTemplateItem) => void
): ColumnsType<WaybillTemplateItem> => [
    {
        title: i18n.t(LocaleHelper.getWaybillTemplateTemplateName()),
        dataIndex: 'templateName',
        key: 'templateName',
        width: 200,
    },
    {
        title: i18n.t(LocaleHelper.getWaybillListTransportMode()),
        dataIndex: 'transportMode',
        key: 'transportMode',
        width: 120,
    },
    {
        title: i18n.t(LocaleHelper.getWaybillTemplateTemplateType()),
        dataIndex: 'templateType',
        key: 'templateType',
        width: 150,
    },
    {
        title: i18n.t(LocaleHelper.getWaybillTemplateCreatedBy()),
        dataIndex: 'createdBy',
        key: 'createdBy',
        width: 120,
    },
    {
        title: i18n.t(LocaleHelper.getWaybillTemplateCreatedAt()),
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 150,
    },
    {
        title: i18n.t(LocaleHelper.getWaybillTemplateStatus()),
        dataIndex: 'status',
        key: 'status',
        width: 100,
        render: (status: string) => {
            const color = status === 'ENABLED' ? 'green' : 'default';
            return <Tag color={color}>{status}</Tag>;
        }
    },
    {
        title: i18n.t(LocaleHelper.getWaybillListActions()),
        key: 'action',
        fixed: 'right',
        width: 200,
        render: (_, record) => (
            <Space size="middle">
                <a onClick={() => onEdit(record)}>{i18n.t(LocaleHelper.getWaybillTemplateDetail())}</a>
                <a onClick={() => onCopy(record)}>{i18n.t(LocaleHelper.getWaybillTemplateCopy())}</a>
                <a onClick={() => onToggleStatus(record)}>
                    {record.status === 'ENABLED' ? i18n.t(LocaleHelper.getWaybillTemplateDisable()) : i18n.t(LocaleHelper.getWaybillTemplateEnable())}
                </a>
            </Space>
        ),
    },
];

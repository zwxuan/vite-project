import { ColumnType } from 'antd/es/table';
import { Button, Space, Tag, Switch } from 'antd';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getColumns = (
  onEdit: (record: any) => void,
  onDelete: (record: any) => void
): ColumnType<any>[] => [
  {
    title: i18n.t(LocaleHelper.getRuleName()),
    dataIndex: 'ruleName',
    key: 'ruleName',
    width: 200,
  },
  {
    title: i18n.t(LocaleHelper.getApplicableJob()),
    dataIndex: 'jobType',
    key: 'jobType',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getTriggerCondition()),
    dataIndex: 'condition',
    key: 'condition',
    width: 200,
  },
  {
    title: i18n.t(LocaleHelper.getPriority()),
    dataIndex: 'priority',
    key: 'priority',
    width: 100,
  },
  {
    title: i18n.t(LocaleHelper.getStatus()),
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (text) => <Switch checked={text === 'ACTIVE'} />
  },
  {
    title: i18n.t(LocaleHelper.getActions()),
    key: 'action',
    width: 150,
    render: (_, record) => (
      <Space size="middle">
        <Button type="link" onClick={() => onEdit(record)}>{i18n.t(LocaleHelper.getEdit())}</Button>
        <Button type="link" danger onClick={() => onDelete(record)}>{i18n.t(LocaleHelper.getDelete())}</Button>
      </Space>
    ),
  },
];

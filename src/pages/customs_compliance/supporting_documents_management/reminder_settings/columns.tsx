import React from 'react';
import { ColumnsType } from 'antd/es/table';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { ReminderRuleItem } from '@/api/customs_compliance/supporting_documents_management/reminder_service';
import { Space, Tag } from 'antd';

export const getColumns = (
  onEdit: (record: ReminderRuleItem) => void,
  onDelete: (record: ReminderRuleItem) => void,
): ColumnsType<ReminderRuleItem> => [
  {
    title: i18n.t(LocaleHelper.getCcsdmReminderSettingsTableRuleName()),
    dataIndex: 'ruleName',
    key: 'ruleName',
  },
  {
    title: i18n.t(LocaleHelper.getCcsdmReminderSettingsTableReminderType()),
    dataIndex: 'reminderType',
    key: 'reminderType',
    render: (type) => {
        const typeMap: Record<string, string> = {
            email: i18n.t(LocaleHelper.getCcsdmReminderSettingsOptionEmail()),
            system: i18n.t(LocaleHelper.getCcsdmReminderSettingsOptionSystem()),
            sms: i18n.t(LocaleHelper.getCcsdmReminderSettingsOptionSMS()),
        };
        return <Tag color="blue">{typeMap[type] || type}</Tag>;
    }
  },
  {
    title: i18n.t(LocaleHelper.getCcsdmReminderSettingsTableTriggerCondition()),
    dataIndex: 'triggerCondition',
    key: 'triggerCondition',
  },
  {
    title: i18n.t(LocaleHelper.getCcsdmReminderSettingsTableRecipients()),
    dataIndex: 'recipients',
    key: 'recipients',
    render: (recipients: string[]) => (
        <Space size={[0, 4]} wrap>
            {recipients.map(r => <Tag key={r}>{r}</Tag>)}
        </Space>
    )
  },
  {
    title: i18n.t(LocaleHelper.getCcsdmReminderSettingsTableStatus()),
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
        <Tag color={status === 'active' ? 'success' : 'default'}>
            {status === 'active' 
                ? i18n.t(LocaleHelper.getCcsdmReminderSettingsStatusActive()) 
                : i18n.t(LocaleHelper.getCcsdmReminderSettingsStatusInactive())}
        </Tag>
    ),
  },
  {
    title: i18n.t(LocaleHelper.getCcsdmReminderSettingsTableLastModified()),
    dataIndex: 'lastModified',
    key: 'lastModified',
  },
  {
    title: i18n.t(LocaleHelper.getCcsdmReminderSettingsTableAction()),
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a onClick={() => onEdit(record)}>{i18n.t(LocaleHelper.getCcsdmReminderSettingsActionEdit())}</a>
        <a onClick={() => onDelete(record)} style={{ color: 'red' }}>{i18n.t(LocaleHelper.getCcsdmReminderSettingsActionDelete())}</a>
      </Space>
    ),
  },
];

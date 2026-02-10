import { AdvancedSearchFormProps } from '@/components/search-form';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const getFields = (): AdvancedSearchFormProps['fields'] => [
  {
    type: 'input',
    label: i18n.t(LocaleHelper.getCcsdmReminderSettingsSearchRuleName()),
    key: 'ruleName',
  },
  {
    type: 'select',
    label: i18n.t(LocaleHelper.getCcsdmReminderSettingsSearchReminderType()),
    key: 'reminderType',
    selectOptions: [
        { label: i18n.t(LocaleHelper.getCcsdmReminderSettingsOptionEmail()), value: 'email' },
        { label: i18n.t(LocaleHelper.getCcsdmReminderSettingsOptionSystem()), value: 'system' },
        { label: i18n.t(LocaleHelper.getCcsdmReminderSettingsOptionSMS()), value: 'sms' },
    ]
  },
  {
    type: 'select',
    label: i18n.t(LocaleHelper.getCcsdmReminderSettingsSearchStatus()),
    key: 'status',
    selectOptions: [
        { label: i18n.t(LocaleHelper.getCcsdmReminderSettingsStatusActive()), value: 'active' },
        { label: i18n.t(LocaleHelper.getCcsdmReminderSettingsStatusInactive()), value: 'inactive' },
    ]
  },
];

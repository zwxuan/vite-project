import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getSearchFields = () => [
  {
    name: 'name',
    label: i18n.t(LocaleHelper.getScreeningRuleConfigColName()),
    type: 'input',
  },
  {
    name: 'status',
    label: i18n.t(LocaleHelper.getScreeningRuleConfigColStatus()),
    type: 'select',
    options: [
        { label: i18n.t(LocaleHelper.getScreeningRuleConfigStatusActive()), value: '启用' },
        { label: i18n.t(LocaleHelper.getScreeningRuleConfigStatusInactive()), value: '停用' },
    ],
  },
];

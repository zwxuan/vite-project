import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getSearchFields = () => [
  {
    name: 'ruleType',
    label: i18n.t(LocaleHelper.getAllocationRulesSearchRuleType()),
    type: 'select',
    options: [
      { label: i18n.t(LocaleHelper.getAllocationRulesTypeAll()), value: '' },
      { label: i18n.t(LocaleHelper.getAllocationRulesTypeWeight()), value: 'Weight' },
      { label: i18n.t(LocaleHelper.getAllocationRulesTypeRatio()), value: 'Ratio' },
      { label: i18n.t(LocaleHelper.getAllocationRulesTypeFixed()), value: 'Fixed' },
    ],
  },
  {
    name: 'status',
    label: i18n.t(LocaleHelper.getAllocationRulesSearchStatus()),
    type: 'select',
    options: [
      { label: i18n.t(LocaleHelper.getAllocationRulesStatusAll()), value: '' },
      { label: i18n.t(LocaleHelper.getAllocationRulesStatusActive()), value: 'active' },
      { label: i18n.t(LocaleHelper.getAllocationRulesStatusPending()), value: 'pending' },
      { label: i18n.t(LocaleHelper.getAllocationRulesStatusDraft()), value: 'draft' },
      { label: i18n.t(LocaleHelper.getAllocationRulesStatusDisabled()), value: 'disabled' },
    ],
  },
  {
    name: 'creator',
    label: i18n.t(LocaleHelper.getAllocationRulesSearchCreator()),
    type: 'input',
  },
];

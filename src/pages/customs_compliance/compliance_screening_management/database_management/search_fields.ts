import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getSearchFields = () => [
  {
    label: i18n.t(LocaleHelper.getDatabaseManagementSearchName()),
    name: 'name',
    type: 'input',
    placeholder: i18n.t(LocaleHelper.getInputPlaceholder()),
  },
  {
    label: i18n.t(LocaleHelper.getDatabaseManagementSearchIssuingAuthority()),
    name: 'issuingAuthority',
    type: 'select',
    options: [
        { label: 'US Treasury', value: 'US Treasury' },
        { label: 'US Commerce', value: 'US Commerce' },
        { label: 'EU Commission', value: 'EU Commission' },
        { label: 'UN Security Council', value: 'UN Security Council' },
    ],
    placeholder: i18n.t(LocaleHelper.getSelectPlaceholder()),
  },
  {
    label: i18n.t(LocaleHelper.getDatabaseManagementSearchType()),
    name: 'type',
    type: 'select',
    options: [
        { label: 'Sanctions', value: 'Sanctions' },
        { label: 'Export Control', value: 'Export Control' },
        { label: 'Law Enforcement', value: 'Law Enforcement' },
        { label: 'PEP', value: 'PEP' },
    ],
    placeholder: i18n.t(LocaleHelper.getSelectPlaceholder()),
  },
  {
    label: i18n.t(LocaleHelper.getDatabaseManagementSearchStatus()),
    name: 'status',
    type: 'select',
    options: [
        { label: i18n.t(LocaleHelper.getDatabaseManagementStatusNormal()), value: 'normal' },
        { label: i18n.t(LocaleHelper.getDatabaseManagementStatusUpdating()), value: 'updating' },
        { label: i18n.t(LocaleHelper.getDatabaseManagementStatusError()), value: 'error' },
    ],
    placeholder: i18n.t(LocaleHelper.getSelectPlaceholder()),
  },
];

import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getFields = () => [
  {
    name: 'hs_code',
    label: i18n.t(LocaleHelper.getTariffDataHsCode()),
    type: 'input',
    placeholder: i18n.t(LocaleHelper.getTariffDataHsCode()),
  },
  {
    name: 'name',
    label: i18n.t(LocaleHelper.getTariffDataName()),
    type: 'input',
    placeholder: i18n.t(LocaleHelper.getTariffDataName()),
  },
];

import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getFields = () => [
  {
    name: 'product_name',
    label: i18n.t(LocaleHelper.getClassificationSuggestionProductName()),
    type: 'input',
  },
  {
    name: 'hs_code',
    label: i18n.t(LocaleHelper.getClassificationSuggestionHsCode()),
    type: 'input',
  },
];

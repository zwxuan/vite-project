import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getFields = () => [
  {
    name: 'invoice_no',
    label: i18n.t(LocaleHelper.getHistoricalClassificationInvoiceNo()),
    type: 'input',
    placeholder: i18n.t(LocaleHelper.getHistoricalClassificationInvoiceNo()),
  },
  {
    name: 'hs_code',
    label: i18n.t(LocaleHelper.getHistoricalClassificationHsCode()),
    type: 'input',
    placeholder: i18n.t(LocaleHelper.getHistoricalClassificationHsCode()),
  },
];

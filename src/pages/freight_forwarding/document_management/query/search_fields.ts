import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const searchFields = [
  {
    label: i18n.t(LocaleHelper.getDocumentQueryPol()),
    name: 'pol',
    type: 'input',
  },
  {
    label: i18n.t(LocaleHelper.getDocumentQueryPod()),
    name: 'pod',
    type: 'input',
  },
  {
    label: i18n.t(LocaleHelper.getDocumentQueryVessel()),
    name: 'vessel',
    type: 'input',
  },
  {
    label: i18n.t(LocaleHelper.getDocumentQueryCreator()),
    name: 'creator',
    type: 'input',
  },
  {
    label: i18n.t(LocaleHelper.getDocumentQueryReviewer()),
    name: 'reviewer',
    type: 'input',
  },
];

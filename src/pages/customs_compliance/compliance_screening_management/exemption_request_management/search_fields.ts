import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const fields = [
  {
    type: 'input',
    name: 'requestId',
    label: i18n.t(LocaleHelper.getExemptionRequestSearchRequestId()),
    placeholder: i18n.t(LocaleHelper.getInputPlaceholder()),
  },
  {
    type: 'input',
    name: 'screeningId',
    label: i18n.t(LocaleHelper.getExemptionRequestSearchScreeningId()),
    placeholder: i18n.t(LocaleHelper.getInputPlaceholder()),
  },
  {
    type: 'input',
    name: 'applicant',
    label: i18n.t(LocaleHelper.getExemptionRequestSearchApplicant()),
    placeholder: i18n.t(LocaleHelper.getInputPlaceholder()),
  },
  {
    type: 'select',
    name: 'status',
    label: i18n.t(LocaleHelper.getExemptionRequestSearchStatus()),
    placeholder: i18n.t(LocaleHelper.getSelectPlaceholder()),
    options: [
      { label: 'Pending', value: 'pending' },
      { label: 'Approved', value: 'approved' },
      { label: 'Rejected', value: 'rejected' },
    ],
  },
  {
    type: 'rangePicker',
    name: 'dateRange',
    label: i18n.t(LocaleHelper.getExemptionRequestSearchDateRange()),
  },
];

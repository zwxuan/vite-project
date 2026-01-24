import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const searchFields = [
  {
    label: i18n.t(LocaleHelper.getDocumentListCode()),
    name: 'code',
    type: 'input',
  },
  {
    label: i18n.t(LocaleHelper.getDocumentListType()),
    name: 'type',
    type: 'select',
    options: [
      { label: '提单(B/L)', value: '提单(B/L)' },
      { label: '发票(Invoice)', value: '发票(Invoice)' },
      { label: '装箱单(Packing List)', value: '装箱单(Packing List)' },
    ],
  },
  {
    label: i18n.t(LocaleHelper.getDocumentListWaybillNo()),
    name: 'waybill_no',
    type: 'input',
  },
  {
    label: i18n.t(LocaleHelper.getDocumentListStatus()),
    name: 'status',
    type: 'select',
    options: [
      { label: 'Draft', value: 'Draft' },
      { label: 'PendingReview', value: 'PendingReview' },
      { label: 'Approved', value: 'Approved' },
      { label: 'Issued', value: 'Issued' },
      { label: 'Rejected', value: 'Rejected' },
    ],
  },
];

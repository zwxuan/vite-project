import { ClassificationReviewLocale } from '@/utils/locale/customs_compliance/pre_entry_classification/classification_review';
import i18n from '@/i18n';

export const getFields = () => [
  {
    name: 'invoice_no',
    label: i18n.t(ClassificationReviewLocale.getClassificationReviewInvoiceNo()),
    type: 'input',
  },
  {
    name: 'status',
    label: i18n.t(ClassificationReviewLocale.getClassificationReviewStatus()),
    type: 'select',
    options: [
        { label: 'Pending', value: 'Pending' },
        { label: 'Approved', value: 'Approved' },
        { label: 'Rejected', value: 'Rejected' },
    ]
  },
];

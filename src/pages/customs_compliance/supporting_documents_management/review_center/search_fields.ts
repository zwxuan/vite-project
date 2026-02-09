import { AdvancedSearchFormProps } from '@/components/search-form';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const getFields = (): AdvancedSearchFormProps['fields'] => [
  {
    type: 'input',
    label: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementReviewCenterSearchPreEntryNo()),
    key: 'preEntryNo',
  },
  {
    type: 'select',
    label: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementReviewCenterSearchStatus()),
    key: 'status',
    selectOptions: [
        { label: '待审核', value: 'pending_review' },
        { label: '审核中', value: 'reviewing' },
        { label: '审核通过', value: 'approved' },
        { label: '需补充', value: 'needs_correction' },
    ]
  },
  {
      type: 'input',
      label: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementReviewCenterSearchReviewer()),
      key: 'reviewer',
  },
  {
      type: 'dateRange',
      label: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementReviewCenterSearchDate()),
      key: 'dateRange',
  }
];

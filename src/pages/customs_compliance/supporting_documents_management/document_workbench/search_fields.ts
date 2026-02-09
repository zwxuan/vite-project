import { AdvancedSearchFormProps } from '@/components/search-form';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const getFields = (): AdvancedSearchFormProps['fields'] => [
  {
    type: 'input',
    label: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementDocumentWorkbenchSearchPreEntryNo()),
    key: 'preEntryNo',
  },
  {
    type: 'select',
    label: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementDocumentWorkbenchSearchDocType()),
    key: 'docType',
    selectOptions: [
      { label: '全部', value: 'all' },
      { label: '商业发票', value: 'invoice' },
      { label: '装箱单', value: 'packing_list' },
      { label: '合同', value: 'contract' },
      { label: '提单', value: 'bill_of_lading' },
    ],
  },
  {
    type: 'select',
    label: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementDocumentWorkbenchSearchStatus()),
    key: 'status',
    selectOptions: [
        { label: '待收集', value: 'pending_collection' },
        { label: '收集中', value: 'collecting' },
        { label: '待审核', value: 'pending_review' },
        { label: '审核中', value: 'reviewing' },
        { label: '审核通过', value: 'approved' },
        { label: '需补充', value: 'needs_correction' },
        { label: '已归档', value: 'archived' },
    ]
  },
  {
    type: 'select',
    label: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementDocumentWorkbenchSearchBusinessType()),
    key: 'businessType',
    selectOptions: [
        { label: '进口', value: 'import' },
        { label: '出口', value: 'export' },
    ]
  },
  {
      type: 'select',
      label: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementDocumentWorkbenchSearchUrgency()),
      key: 'urgency',
      selectOptions: [
          { label: '全部', value: 'all' },
          { label: '高', value: 'high' },
          { label: '中', value: 'medium' },
          { label: '低', value: 'low' },
      ]
  },
  {
      type: 'input',
      label: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementDocumentWorkbenchSearchOwner()),
      key: 'owner',
  },
  {
      type: 'dateRange',
      label: i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementDocumentWorkbenchSearchDate()),
      key: 'dateRange',
  }
];

import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getFields = () => [
  {
    name: 'pre_entry_no',
    label: i18n.t(LocaleHelper.getPreEntryWorkbenchPreEntryNo()),
    type: 'input',
  },
  {
    name: 'job_no',
    label: i18n.t(LocaleHelper.getPreEntryWorkbenchJobNo()),
    type: 'input',
  },
  {
    name: 'status',
    label: i18n.t(LocaleHelper.getPreEntryWorkbenchStatus()),
    type: 'select',
    options: [
      { label: '草稿', value: 'draft' },
      { label: '处理中', value: 'processing' },
      { label: '待审核', value: 'pending_review' },
      { label: '已提交', value: 'submitted' },
    ],
  },
  {
    name: 'entry_type',
    label: i18n.t(LocaleHelper.getPreEntryWorkbenchEntryType()),
    type: 'select',
    options: [
      { label: '进口', value: 'import' },
      { label: '出口', value: 'export' },
    ],
  },
  {
    name: 'trade_mode',
    label: i18n.t(LocaleHelper.getPreEntryWorkbenchTradeMode()),
    type: 'input',
  },
  {
    name: 'handler',
    label: i18n.t(LocaleHelper.getPreEntryWorkbenchHandler()),
    type: 'input',
  },
  {
    name: 'create_time',
    label: i18n.t(LocaleHelper.getPreEntryWorkbenchCreateDate()),
    type: 'dateRange',
  },
];

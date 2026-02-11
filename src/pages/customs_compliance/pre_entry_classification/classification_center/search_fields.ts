import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getFields = () => [
  {
    name: 'goods_name',
    label: i18n.t(LocaleHelper.getClassificationCenterGoodsName()),
    type: 'input',
  },
  {
    name: 'pre_entry_no',
    label: i18n.t(LocaleHelper.getClassificationCenterPreEntryNo()),
    type: 'input',
  },
  {
    name: 'classification_status',
    label: i18n.t(LocaleHelper.getClassificationCenterStatus()),
    type: 'select',
    options: [
      { label: '待归类', value: 'pending' },
      { label: '归类中', value: 'classifying' },
      { label: '待审核', value: 'pending_review' },
      { label: '已完成', value: 'completed' },
      { label: '需修正', value: 'revision' },
    ],
  },
  {
    name: 'mode',
    label: i18n.t(LocaleHelper.getClassificationCenterMode()),
    type: 'select',
    options: [
        { label: '全部', value: 'all' },
        { label: '自动', value: 'auto' },
        { label: '人工', value: 'manual' },
    ],
  },
  {
    name: 'priority',
    label: i18n.t(LocaleHelper.getClassificationCenterPriority()),
    type: 'select',
    options: [
        { label: '全部', value: 'all' },
        { label: '高', value: 'high' },
        { label: '中', value: 'medium' },
        { label: '低', value: 'low' },
    ],
  },
  {
    name: 'classifier',
    label: i18n.t(LocaleHelper.getClassificationCenterClassifier()),
    type: 'input',
  },
  {
    name: 'create_time',
    label: i18n.t(LocaleHelper.getClassificationCenterCreateDate()),
    type: 'dateRange',
  },
];

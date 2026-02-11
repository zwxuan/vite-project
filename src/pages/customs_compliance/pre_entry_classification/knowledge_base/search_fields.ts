import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getFields = () => [
  {
    name: 'keyword',
    label: i18n.t(LocaleHelper.getClassificationKnowledgeBaseKeyword()),
    type: 'input',
  },
  {
    name: 'category',
    label: i18n.t(LocaleHelper.getClassificationKnowledgeBaseCategory()),
    type: 'select',
    options: [
        { label: '全部', value: 'all' },
        { label: '第84章', value: '84' },
        { label: '第85章', value: '85' },
        { label: '第90章', value: '90' },
    ],
  },
  {
    name: 'type',
    label: i18n.t(LocaleHelper.getClassificationKnowledgeBaseType()),
    type: 'select',
    options: [
      { label: '全部', value: 'all' },
      { label: '归类案例', value: 'case' },
      { label: '操作指南', value: 'guide' },
      { label: '法规规则', value: 'rule' },
    ],
  },
  {
    name: 'creator',
    label: i18n.t(LocaleHelper.getClassificationKnowledgeBaseCreator()),
    type: 'input',
  },
];

import { ProColumns } from '@ant-design/pro-components';
import { KnowledgeItem } from '@/api/customs_compliance/pre_entry_classification/knowledge_base_service';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getColumns = (): ProColumns<KnowledgeItem>[] => [
  {
    title: i18n.t(LocaleHelper.getClassificationKnowledgeBaseTitle()),
    dataIndex: 'title',
    width: 250,
    fixed: 'left',
  },
  {
    title: i18n.t(LocaleHelper.getClassificationKnowledgeBaseType()),
    dataIndex: 'type',
    valueEnum: {
      case: { text: '案例', status: 'Success' },
      guide: { text: '指南', status: 'Processing' },
      rule: { text: '法规', status: 'Error' },
    },
    width: 100,
  },
  {
    title: i18n.t(LocaleHelper.getClassificationKnowledgeBaseApplicableGoods()),
    dataIndex: 'applicable_goods',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getClassificationKnowledgeBaseHSCode()),
    dataIndex: 'hs_code',
    width: 120,
  },
  {
    title: i18n.t(LocaleHelper.getClassificationKnowledgeBaseCreator()),
    dataIndex: 'creator',
    width: 120,
  },
  {
    title: i18n.t(LocaleHelper.getClassificationKnowledgeBaseCreateTime()),
    dataIndex: 'create_time',
    valueType: 'date',
    width: 120,
  },
  {
      title: i18n.t(LocaleHelper.getClassificationKnowledgeBaseOperation()),
      valueType: 'option',
      width: 150,
      fixed: 'right',
      render: (text, record, _, action) => [
          <a key="view">{i18n.t(LocaleHelper.getClassificationKnowledgeBaseView())}</a>,
          <a key="edit">{i18n.t(LocaleHelper.getClassificationKnowledgeBaseEdit())}</a>,
      ],
  }
];

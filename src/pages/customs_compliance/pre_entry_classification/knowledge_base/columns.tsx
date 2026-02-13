import { ProColumns } from '@ant-design/pro-components';
import { KnowledgeItem } from '@/types/customs_compliance/pre_entry_classification/knowledge_base';
import { ClassificationKnowledgeBaseLocale } from '@/utils/locale/customs_compliance/pre_entry_classification/knowledge_base';
import i18n from '@/i18n';
import { Space } from 'antd';

export const getColumns = (
  handleView: (record: KnowledgeItem) => void,
  handleEdit: (record: KnowledgeItem) => void,
): ProColumns<KnowledgeItem>[] => [
  {
    title: i18n.t(ClassificationKnowledgeBaseLocale.getClassificationKnowledgeBaseTitle()),
    dataIndex: 'title',
    width: 250,
    fixed: 'left',
  },
  {
    title: i18n.t(ClassificationKnowledgeBaseLocale.getClassificationKnowledgeBaseType()),
    dataIndex: 'type',
    valueEnum: {
      case: { text: '案例', status: 'Success' },
      guide: { text: '指南', status: 'Processing' },
      rule: { text: '法规', status: 'Error' },
    },
    width: 100,
  },
  {
    title: i18n.t(ClassificationKnowledgeBaseLocale.getClassificationKnowledgeBaseApplicableGoods()),
    dataIndex: 'applicable_goods',
    width: 150,
  },
  {
    title: i18n.t(ClassificationKnowledgeBaseLocale.getClassificationKnowledgeBaseHSCode()),
    dataIndex: 'hs_code',
    width: 120,
  },
  {
    title: i18n.t(ClassificationKnowledgeBaseLocale.getClassificationKnowledgeBaseCreator()),
    dataIndex: 'creator',
    width: 120,
  },
  {
    title: i18n.t(ClassificationKnowledgeBaseLocale.getClassificationKnowledgeBaseCreateTime()),
    dataIndex: 'create_time',
    valueType: 'date',
    width: 120,
  },
  {
      title: i18n.t(ClassificationKnowledgeBaseLocale.getClassificationKnowledgeBaseOperation()),
      valueType: 'option',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <a key="view" onClick={() => handleView(record)}>{i18n.t(ClassificationKnowledgeBaseLocale.getClassificationKnowledgeBaseView())}</a>
          <a key="edit" onClick={() => handleEdit(record)}>{i18n.t(ClassificationKnowledgeBaseLocale.getClassificationKnowledgeBaseEdit())}</a>
        </Space>
      ),
  }
];

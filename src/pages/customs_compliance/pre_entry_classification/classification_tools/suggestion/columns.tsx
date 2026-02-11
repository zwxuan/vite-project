import { ProColumns } from '@ant-design/pro-components';
import { ClassificationSuggestion } from '@/api/customs_compliance/pre_entry_classification/classification_suggestion_service';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getColumns = (): ProColumns<ClassificationSuggestion>[] => [
  {
    title: i18n.t(LocaleHelper.getClassificationSuggestionProductName()),
    dataIndex: 'product_name',
    width: 200,
  },
  {
    title: i18n.t(LocaleHelper.getClassificationSuggestionHsCode()),
    dataIndex: 'hs_code',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getClassificationSuggestionConfidence()),
    dataIndex: 'confidence',
    valueType: 'progress',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getClassificationSuggestionSource()),
    dataIndex: 'source',
    width: 120,
  },
  {
    title: i18n.t(LocaleHelper.getClassificationSuggestionCreateTime()),
    dataIndex: 'create_time',
    valueType: 'date',
    width: 120,
  },
  {
      title: i18n.t(LocaleHelper.getOperation()),
      valueType: 'option',
      width: 100,
      fixed: 'right',
      render: (text, record, _, action) => [
          <a key="view">{i18n.t(LocaleHelper.getViewDetail())}</a>,
      ],
  }
];

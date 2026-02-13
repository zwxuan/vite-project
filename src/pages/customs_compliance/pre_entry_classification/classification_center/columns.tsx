import { ProColumns } from '@ant-design/pro-components';
import { ClassificationTask } from '@/types/customs_compliance/pre_entry_classification/classification_center';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export interface ColumnActions {
  onClassify: (record: ClassificationTask) => void;
  onView: (record: ClassificationTask) => void;
  onReview: (record: ClassificationTask) => void;
}

export const getColumns = (actions: ColumnActions): ProColumns<ClassificationTask>[] => [
  {
    title: i18n.t(LocaleHelper.getClassificationCenterPreEntryNo()),
    dataIndex: 'pre_entry_no',
    width: 150,
    fixed: 'left',
  },
  {
    title: i18n.t(LocaleHelper.getClassificationCenterSeq()),
    dataIndex: 'seq_no',
    width: 60,
    search: false,
  },
  {
    title: i18n.t(LocaleHelper.getClassificationCenterGoodsName()),
    dataIndex: 'goods_name',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getClassificationCenterSpec()),
    dataIndex: 'spec_model',
    width: 150,
    search: false,
  },
  {
    title: i18n.t(LocaleHelper.getClassificationCenterStatus()),
    dataIndex: 'classification_status',
    valueEnum: {
      pending: { text: '待归类', status: 'Default' },
      classifying: { text: '归类中', status: 'Processing' },
      pending_review: { text: '待审核', status: 'Warning' },
      completed: { text: '已完成', status: 'Success' },
      revision: { text: '需修正', status: 'Error' },
    },
    width: 100,
  },
  {
    title: i18n.t(LocaleHelper.getClassificationCenterSuggestedCode()),
    dataIndex: 'suggested_hscode',
    width: 120,
    search: false,
  },
  {
    title: i18n.t(LocaleHelper.getClassificationCenterClassifier()),
    dataIndex: 'classifier',
    width: 100,
  },
  {
    title: i18n.t(LocaleHelper.getClassificationCenterCreateDate()),
    dataIndex: 'create_time',
    valueType: 'date',
    width: 120,
  },
  {
      title: i18n.t(LocaleHelper.getClassificationCenterOperation()),
      valueType: 'option',
      width: 150,
      fixed: 'right',
      render: (text, record, _, action) => {
          const ops = [];
          if (record.classification_status === 'pending' || record.classification_status === 'revision') {
              ops.push(<a key="classify" onClick={() => actions.onClassify(record)}>{i18n.t(LocaleHelper.getClassificationCenterClassify())}</a>);
          } else if (record.classification_status === 'pending_review') {
              ops.push(<a key="review" onClick={() => actions.onReview(record)}>{i18n.t(LocaleHelper.getClassificationCenterReview())}</a>);
          } else {
              ops.push(<a key="view" onClick={() => actions.onView(record)}>{i18n.t(LocaleHelper.getClassificationCenterView())}</a>);
          }
          return ops;
      },
  }
];

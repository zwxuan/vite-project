import { ProColumns } from '@ant-design/pro-components';
import { PreEntryTask } from '@/api/customs_compliance/pre_entry_classification/pre_entry_workbench_service';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export interface ColumnActions {
  onView: (record: PreEntryTask) => void;
  onEdit: (record: PreEntryTask) => void;
  onClassify: (record: PreEntryTask) => void;
  onArchive: (record: PreEntryTask) => void;
}

export const getColumns = (actions: ColumnActions): ProColumns<PreEntryTask>[] => [
  {
    title: i18n.t(LocaleHelper.getPreEntryWorkbenchPreEntryNo()),
    dataIndex: 'pre_entry_no',
    width: 150,
    fixed: 'left',
  },
  {
    title: i18n.t(LocaleHelper.getPreEntryWorkbenchJobNo()),
    dataIndex: 'job_no',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getPreEntryWorkbenchEntryType()),
    dataIndex: 'entry_type',
    valueEnum: {
      import: { text: '进口', status: 'Processing' },
      export: { text: '出口', status: 'Success' },
    },
    width: 100,
  },
  {
    title: i18n.t(LocaleHelper.getPreEntryWorkbenchTradeMode()),
    dataIndex: 'trade_mode',
    width: 120,
  },
  {
    title: i18n.t(LocaleHelper.getPreEntryWorkbenchGoodsCount()),
    dataIndex: 'goods_count',
    search: false,
    width: 100,
  },
  {
    title: i18n.t(LocaleHelper.getPreEntryWorkbenchClassStatus()),
    dataIndex: 'classification_status',
    valueEnum: {
      pending: { text: '待归类', status: 'Default' },
      classifying: { text: '归类中', status: 'Processing' },
      completed: { text: '已归类', status: 'Success' },
    },
    width: 120,
  },
  {
    title: i18n.t(LocaleHelper.getPreEntryWorkbenchStatus()),
    dataIndex: 'status',
    valueEnum: {
      draft: { text: '草稿', status: 'Default' },
      processing: { text: '处理中', status: 'Processing' },
      pending_review: { text: '待审核', status: 'Warning' },
      submitted: { text: '已提交', status: 'Success' },
    },
    width: 120,
  },
  {
    title: i18n.t(LocaleHelper.getPreEntryWorkbenchHandler()),
    dataIndex: 'handler',
    width: 120,
  },
  {
    title: i18n.t(LocaleHelper.getPreEntryWorkbenchCreateDate()),
    dataIndex: 'create_time',
    valueType: 'date',
    width: 120,
  },
  {
      title: i18n.t(LocaleHelper.getPreEntryWorkbenchOperation()),
      valueType: 'option',
      width: 200,
      fixed: 'right',
      render: (text, record) => [
          <a key="view" onClick={() => actions.onView(record)}>{i18n.t(LocaleHelper.getPreEntryWorkbenchView())}</a>,
          <a key="edit" onClick={() => actions.onEdit(record)}>{i18n.t(LocaleHelper.getPreEntryWorkbenchEdit())}</a>,
          <a key="classify" onClick={() => actions.onClassify(record)}>{i18n.t(LocaleHelper.getPreEntryWorkbenchClassify())}</a>,
          <a key="archive" onClick={() => actions.onArchive(record)}>{i18n.t(LocaleHelper.getPreEntryWorkbenchArchive())}</a>,
      ],
  }
];

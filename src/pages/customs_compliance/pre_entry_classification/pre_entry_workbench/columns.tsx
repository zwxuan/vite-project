import { Badge, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PreEntryTask } from '@/types/customs_compliance/pre_entry_classification/pre_entry_task';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export interface ColumnActions {
  onView: (record: PreEntryTask) => void;
  onEdit: (record: PreEntryTask) => void;
  onClassify: (record: PreEntryTask) => void;
  onArchive: (record: PreEntryTask) => void;
}

export const getColumns = (actions: ColumnActions): ColumnsType<PreEntryTask> => [
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
    width: 100,
    render: (text: string) => {
      const map: Record<string, { text: string; status: 'processing' | 'success' | 'default' | 'error' | 'warning' }> = {
        import: { text: '进口', status: 'processing' },
        export: { text: '出口', status: 'success' },
      };
      const item = map[text];
      return item ? <Badge status={item.status} text={item.text} /> : text;
    },
  },
  {
    title: i18n.t(LocaleHelper.getPreEntryWorkbenchTradeMode()),
    dataIndex: 'trade_mode',
    width: 120,
  },
  {
    title: i18n.t(LocaleHelper.getPreEntryWorkbenchGoodsCount()),
    dataIndex: 'goods_count',
    width: 100,
  },
  {
    title: i18n.t(LocaleHelper.getPreEntryWorkbenchClassStatus()),
    dataIndex: 'classification_status',
    width: 120,
    render: (text: string) => {
      const map: Record<string, { text: string; status: 'processing' | 'success' | 'default' | 'error' | 'warning' }> = {
        pending: { text: '待归类', status: 'default' },
        classifying: { text: '归类中', status: 'processing' },
        completed: { text: '已归类', status: 'success' },
      };
      const item = map[text];
      return item ? <Badge status={item.status} text={item.text} /> : text;
    },
  },
  {
    title: i18n.t(LocaleHelper.getPreEntryWorkbenchStatus()),
    dataIndex: 'status',
    width: 120,
    render: (text: string) => {
      const map: Record<string, { text: string; status: 'processing' | 'success' | 'default' | 'error' | 'warning' }> = {
        draft: { text: '草稿', status: 'default' },
        processing: { text: '处理中', status: 'processing' },
        pending_review: { text: '待审核', status: 'warning' },
        submitted: { text: '已提交', status: 'success' },
      };
      const item = map[text];
      return item ? <Badge status={item.status} text={item.text} /> : text;
    },
  },
  {
    title: i18n.t(LocaleHelper.getPreEntryWorkbenchHandler()),
    dataIndex: 'handler',
    width: 120,
  },
  {
    title: i18n.t(LocaleHelper.getPreEntryWorkbenchCreateDate()),
    dataIndex: 'create_time',
    width: 120,
  },
  {
    title: i18n.t(LocaleHelper.getPreEntryWorkbenchOperation()),
    key: 'operation',
    width: 200,
    fixed: 'right',
    render: (_, record) => (
      <Space size="middle">
        <a onClick={() => actions.onView(record)}>{i18n.t(LocaleHelper.getPreEntryWorkbenchView())}</a>
        <a onClick={() => actions.onEdit(record)}>{i18n.t(LocaleHelper.getPreEntryWorkbenchEdit())}</a>
        <a onClick={() => actions.onClassify(record)}>{i18n.t(LocaleHelper.getPreEntryWorkbenchClassify())}</a>
        <a onClick={() => actions.onArchive(record)}>{i18n.t(LocaleHelper.getPreEntryWorkbenchArchive())}</a>
      </Space>
    ),
  }
];

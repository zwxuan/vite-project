import { ProColumns } from '@ant-design/pro-components';
import { HistoryItem } from '@/api/customs_compliance/pre_entry_classification/historical_classification_service';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getColumns = (): ProColumns<HistoryItem>[] => [
  {
    title: i18n.t(LocaleHelper.getHistoricalClassificationInvoiceNo()),
    dataIndex: 'invoice_no',
    width: 150,
    fixed: 'left',
  },
  {
    title: i18n.t(LocaleHelper.getHistoricalClassificationProductName()),
    dataIndex: 'product_name',
    width: 200,
  },
  {
    title: i18n.t(LocaleHelper.getHistoricalClassificationHsCode()),
    dataIndex: 'hs_code',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getHistoricalClassificationDeclaredPrice()),
    dataIndex: 'declared_price',
    valueType: 'money',
    width: 120,
    render: (text, record) => `${record.currency} ${text}`,
  },
  {
    title: i18n.t(LocaleHelper.getHistoricalClassificationEntryId()),
    dataIndex: 'entry_id',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getHistoricalClassificationEntryDate()),
    dataIndex: 'entry_date',
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

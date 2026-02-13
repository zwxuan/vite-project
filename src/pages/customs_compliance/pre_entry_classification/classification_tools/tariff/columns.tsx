import { ProColumns } from '@ant-design/pro-components';
import { TariffData } from '@/types/customs_compliance/pre_entry_classification/tariff_data';
import LocaleHelper from '@/utils/locale';
import { CommonLocale } from '@/utils/locale/common';
import i18n from '@/i18n';

export const getColumns = (onViewDetail?: (record: TariffData) => void): ProColumns<TariffData>[] => [
  {
    title: i18n.t(LocaleHelper.getTariffDataHsCode()),
    dataIndex: 'hs_code',
    width: 150,
    fixed: 'left',
  },
  {
    title: i18n.t(LocaleHelper.getTariffDataName()),
    dataIndex: 'name',
    width: 350,
    render: (_, record) => (
      <div>
        <div>{record.name}</div>
        <div style={{ color: '#999', fontSize: '12px' }}>{record.name_en}</div>
      </div>
    ),
  },
  {
    title: i18n.t(LocaleHelper.getTariffDataMFNRate()),
    dataIndex: 'mfn_rate',
    width: 100,
  },
  {
    title: i18n.t(LocaleHelper.getTariffDataGeneralRate()),
    dataIndex: 'general_rate',
    width: 100,
  },
  {
    title: i18n.t(LocaleHelper.getTariffDataVATRate()),
    dataIndex: 'vat_rate',
    width: 100,
  },
  {
    title: i18n.t(LocaleHelper.getTariffDataConsumptionTaxRate()),
    dataIndex: 'consumption_tax_rate',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getTariffDataExportRebateRate()),
    dataIndex: 'export_rebate_rate',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getTariffDataRegulatoryConditions()),
    dataIndex: 'regulatory_conditions',
    width: 150,
  },
  {
    title: i18n.t(LocaleHelper.getTariffDataInspectionQuarantine()),
    dataIndex: 'inspection_quarantine',
    width: 150,
  },
  {
      title: i18n.t(LocaleHelper.getOperation()),
      valueType: 'option',
      width: 100,
      fixed: 'right',
      render: (text, record, _, action) => [
          <a key="view" onClick={() => onViewDetail?.(record)}>{i18n.t(CommonLocale.getViewDetail())}</a>,
      ],
  }
];

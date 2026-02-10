import { AdvancedSearchFormProps } from '@/components/search-form';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const getFields = (): AdvancedSearchFormProps['fields'] => [
  {
    type: 'input',
    label: i18n.t(LocaleHelper.getCcsdmTemplateManagementSearchTemplateName()),
    key: 'templateName',
  },
  {
    type: 'select',
    label: i18n.t(LocaleHelper.getCcsdmTemplateManagementSearchBusinessType()),
    key: 'businessType',
    selectOptions: [
      { label: '全部', value: 'all' },
      { label: '进口', value: 'import' },
      { label: '出口', value: 'export' },
    ],
  },
  {
    type: 'select',
    label: i18n.t(LocaleHelper.getCcsdmTemplateManagementSearchTradeMode()),
    key: 'tradeMode',
    selectOptions: [
        { label: '全部', value: 'all' },
        { label: '一般贸易', value: 'general' },
        { label: '加工贸易', value: 'processing' },
        { label: '暂时进出口', value: 'temporary' },
        { label: '跨境电商', value: 'e_commerce' },
    ]
  },
  {
    type: 'select',
    label: i18n.t(LocaleHelper.getCcsdmTemplateManagementSearchStatus()),
    key: 'status',
    selectOptions: [
        { label: '全部', value: 'all' },
        { label: '启用', value: 'active' },
        { label: '禁用', value: 'inactive' },
    ]
  }
];

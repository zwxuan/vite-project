import { AdvancedSearchFormProps } from '@/components/search-form';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const fields: AdvancedSearchFormProps['fields'] = [
  {
    key: 'declaration_no',
    label: i18n.t(LocaleHelper.getManifestDeclarationListSearchFormDeclarationNo()),
    type: 'input',
  },
  {
    key: 'bl_number',
    label: i18n.t(LocaleHelper.getManifestDeclarationListSearchFormBlNumber()),
    type: 'input',
  },
  {
    key: 'vessel_name',
    label: i18n.t(LocaleHelper.getManifestDeclarationListSearchFormVesselName()),
    type: 'input',
  },
  {
    key: 'status',
    label: i18n.t(LocaleHelper.getManifestDeclarationListSearchFormStatus()),
    type: 'select',
    selectOptions: [
      { label: '草稿', value: 'draft' },
      { label: '待申报', value: 'pending' },
      { label: '已提交', value: 'submitted' },
      { label: '处理中', value: 'processing' },
      { label: '已接受', value: 'accepted' },
      { label: '被拒绝', value: 'rejected' },
    ],
  },
  {
    key: 'declaration_type',
    label: i18n.t(LocaleHelper.getManifestDeclarationListSearchFormDeclarationType()),
    type: 'select',
    selectOptions: [
      { label: '进口舱单', value: 'import' },
      { label: '出口舱单', value: 'export' },
      { label: 'ENS申报', value: 'ens' },
      { label: 'AMS申报', value: 'ams' },
      { label: 'ISF申报', value: 'isf' },
    ],
  },
  {
    key: 'date_range',
    label: i18n.t(LocaleHelper.getManifestDeclarationListSearchFormDateRange()),
    type: 'dateRange',
  },
  {
    key: 'destination_port',
    label: i18n.t(LocaleHelper.getManifestDeclarationListSearchFormDestinationPort()),
    type: 'input',
  },
];

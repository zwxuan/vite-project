import { AdvancedSearchFormProps } from '@/components/search-form';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const fields: AdvancedSearchFormProps['fields'] = [
  {
    key: 'filing_no',
    label: i18n.t(LocaleHelper.getSecurityFilingManagementSearchFormFilingNo()),
    type: 'input',
  },
  {
    key: 'type',
    label: i18n.t(LocaleHelper.getSecurityFilingManagementSearchFormType()),
    type: 'select',
    selectOptions: [
        { label: 'ENS (欧盟)', value: 'ENS' },
        { label: 'AMS (美国)', value: 'AMS' },
        { label: 'ISF (美国)', value: 'ISF' },
        { label: 'AFR (日本)', value: 'AFR' },
    ]
  },
  {
    key: 'status',
    label: i18n.t(LocaleHelper.getSecurityFilingManagementSearchFormStatus()),
    type: 'select',
    selectOptions: [
      { label: '草稿', value: 'Draft' },
      { label: '待申报', value: 'Pending' },
      { label: '已提交', value: 'Submitted' },
      { label: '处理中', value: 'Processing' },
      { label: '已接受', value: 'Accepted' },
      { label: '被拒绝', value: 'Rejected' },
      { label: '需修改', value: 'Amendment Needed' },
    ],
  },
  {
    key: 'vessel_name',
    label: i18n.t(LocaleHelper.getSecurityFilingManagementSearchFormVessel()),
    type: 'input',
  },
  {
    key: 'mbl_no',
    label: i18n.t(LocaleHelper.getSecurityFilingManagementSearchFormMbl()),
    type: 'input',
  },
  {
    key: 'hbl_no',
    label: i18n.t(LocaleHelper.getSecurityFilingManagementSearchFormHbl()),
    type: 'input',
  },
  {
    key: 'source_no',
    label: i18n.t(LocaleHelper.getSecurityFilingManagementSearchFormSourceNo()),
    type: 'input',
  },
];

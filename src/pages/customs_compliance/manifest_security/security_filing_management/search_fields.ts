
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
        { label: 'ENS', value: 'ens' },
        { label: 'AMS', value: 'ams' },
        { label: 'ISF', value: 'isf' },
    ]
  },
  {
    key: 'status',
    label: i18n.t(LocaleHelper.getSecurityFilingManagementSearchFormStatus()),
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
];

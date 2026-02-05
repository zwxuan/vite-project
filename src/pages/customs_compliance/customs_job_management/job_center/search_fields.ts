import { AdvancedSearchFormProps } from '@/components/search-form';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const fields: AdvancedSearchFormProps['fields'] = [
  {
    type: 'input',
    label: i18n.t(LocaleHelper.getJobCenterJobId()),
    key: 'jobId',
  },
  {
    type: 'input',
    label: i18n.t(LocaleHelper.getJobCenterDeclarationNo()),
    key: 'declarationNo',
  },
  {
    type: 'input',
    label: i18n.t(LocaleHelper.getJobCenterUpstreamOrderNo()),
    key: 'upstreamOrderNo',
  },
  {
    type: 'select',
    label: i18n.t(LocaleHelper.getJobCenterStatus()),
    key: 'status',
    selectOptions: [
      { label: i18n.t(LocaleHelper.getJobCenterPending()), value: 'pending' },
      { label: i18n.t(LocaleHelper.getJobCenterProcessing()), value: 'processing' },
      { label: i18n.t(LocaleHelper.getJobCenterCompleted()), value: 'completed' },
    ],
  },
  {
    type: 'select',
    label: i18n.t(LocaleHelper.getJobCenterBusinessType()),
    key: 'businessType',
    selectOptions: [
      { label: '进口报关', value: 'import_customs' },
      { label: '出口报关', value: 'export_customs' },
      { label: '转关作业', value: 'transfer_customs' },
    ],
  },
  {
    type: 'select',
    label: i18n.t(LocaleHelper.getJobCenterTransportMode()),
    key: 'transportMode',
    selectOptions: [
        { label: 'Sea', value: 'Sea' },
        { label: 'Air', value: 'Air' },
        { label: 'Land', value: 'Land' },
    ]
  },
  {
    type: 'select',
    label: i18n.t(LocaleHelper.getJobCenterSlaStatus()),
    key: 'slaStatus',
    selectOptions: [
        { label: 'NORMAL', value: 'normal' },
        { label: 'WARNING', value: 'warning' },
        { label: 'OVERDUE', value: 'overdue' },
    ]
  },
  {
    type: 'input',
    label: i18n.t(LocaleHelper.getJobCenterCustomerName()),
    key: 'customerName',
  },
  {
    type: 'input',
    label: i18n.t(LocaleHelper.getJobCenterAssignedTo()),
    key: 'assignedTo',
  },
  {
    type: 'dateRange',
    label: i18n.t(LocaleHelper.getJobCenterCreateTime()),
    key: 'createTime',
  },
];

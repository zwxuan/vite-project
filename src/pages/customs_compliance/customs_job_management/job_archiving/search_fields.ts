import { AdvancedSearchFormProps } from '@/components/search-form';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { JobArchivingLocale } from '@/utils/locale/customs_compliance/customs_job_management/job_archiving';

export const fields: AdvancedSearchFormProps['fields'] = [
  {
    type: 'input',
    label: i18n.t(LocaleHelper.getJobCenterJobId()),
    key: 'jobId',
  },
  {
    type: 'input',
    label: i18n.t(LocaleHelper.getJobCenterCustomerName()),
    key: 'customerName',
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
    type: 'dateRange',
    label: i18n.t(JobArchivingLocale.getArchiveDate()),
    key: 'archiveDate',
  },
  {
    type: 'input',
    label: i18n.t(JobArchivingLocale.getArchiveReason()),
    key: 'archiveReason',
  },
];

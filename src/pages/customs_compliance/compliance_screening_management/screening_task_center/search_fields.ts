import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

export const getSearchFields = () => [
  {
    label: i18n.t(LocaleHelper.getScreeningTaskCenterSearchScreeningId()),
    name: 'screeningId',
    type: 'input',
  },
  {
    label: i18n.t(LocaleHelper.getScreeningTaskCenterSearchJobId()),
    name: 'jobId',
    type: 'input',
  },
  {
    label: i18n.t(LocaleHelper.getScreeningTaskCenterSearchStatus()),
    name: 'status',
    type: 'select',
    options: [
      { label: '已完成', value: 'COMPLETED' },
      { label: '待处理', value: 'PENDING' },
      { label: '执行中', value: 'PROCESSING' },
    ],
  },
  {
    label: i18n.t(LocaleHelper.getScreeningTaskCenterSearchType()),
    name: 'type',
    type: 'select',
    options: [
      { label: '全面筛查', value: 'COMPREHENSIVE' },
      { label: '快速筛查', value: 'QUICK' },
      { label: '定向筛查', value: 'TARGETED' },
    ],
  },
  {
    label: i18n.t(LocaleHelper.getScreeningTaskCenterSearchRiskLevel()),
    name: 'riskLevel',
    type: 'select',
    options: [
      { label: '高风险', value: 'HIGH' },
      { label: '中风险', value: 'MEDIUM' },
      { label: '低风险', value: 'LOW' },
    ],
  },
  {
    label: i18n.t(LocaleHelper.getScreeningTaskCenterSearchProcessor()),
    name: 'processor',
    type: 'input',
  },
  {
    label: i18n.t(LocaleHelper.getScreeningTaskCenterSearchDateRange()),
    name: 'dateRange',
    type: 'rangePicker',
  },
];

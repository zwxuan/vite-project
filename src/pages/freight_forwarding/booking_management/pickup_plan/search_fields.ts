import { AdvancedSearchFormProps } from '@/components/search-form';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const fields: AdvancedSearchFormProps['fields'] = [
  {
    type: 'input',
    label: i18n.t(LocaleHelper.getPickupPlanPlanNo()),
    key: 'planNo',
  },
  {
    type: 'input',
    label: i18n.t(LocaleHelper.getPickupPlanBookingNo()),
    key: 'bookingNo',
  },
  {
    type: 'input',
    label: i18n.t(LocaleHelper.getPickupPlanCarrier()),
    key: 'carrier',
  },
  {
    type: 'select',
    label: i18n.t(LocaleHelper.getPickupPlanStatus()),
    key: 'status',
    selectOptions: [
      { label: i18n.t(LocaleHelper.getPickupPlanListStatusAll()), value: '' },
      { label: i18n.t(LocaleHelper.getPickupPlanStatusPlanned()), value: 'PLANNED' },
      { label: i18n.t(LocaleHelper.getPickupPlanStatusInProgress()), value: 'IN_PROGRESS' },
      { label: i18n.t(LocaleHelper.getPickupPlanStatusCompleted()), value: 'COMPLETED' },
      { label: i18n.t(LocaleHelper.getPickupPlanStatusDelayed()), value: 'DELAYED' },
    ],
  },
  {
    type: 'dateRange',
    label: i18n.t(LocaleHelper.getPickupPlanPickupDateRange()),
    key: 'pickupDateRange',
  },
];


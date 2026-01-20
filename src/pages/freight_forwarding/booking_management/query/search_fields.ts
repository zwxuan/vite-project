import { AdvancedSearchFormProps } from '@/components/search-form';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const fields: AdvancedSearchFormProps['fields'] = [
  {
    type: 'input',
    label: i18n.t(LocaleHelper.getBookingQueryBookingNo()),
    key: 'bookingNo',
  },
  {
    type: 'input',
    label: i18n.t(LocaleHelper.getBookingQueryWaybillNo()),
    key: 'waybillNo',
  },
  {
    type: 'input',
    label: i18n.t(LocaleHelper.getBookingQueryCustomer()),
    key: 'customer',
  },
  {
    type: 'select',
    label: i18n.t(LocaleHelper.getBookingListCarrier()),
    key: 'carrier',
    selectOptions: [
      { label: i18n.t(LocaleHelper.getBookingCommonAll()), value: '' },
      { label: i18n.t(LocaleHelper.getBookingCarrierCosco()), value: 'COSCO' },
      { label: i18n.t(LocaleHelper.getBookingCarrierMaersk()), value: 'MAERSK' },
      { label: i18n.t(LocaleHelper.getBookingCarrierMsc()), value: 'MSC' },
      { label: i18n.t(LocaleHelper.getBookingCarrierCr()), value: 'CR' },
    ],
  },
  {
    type: 'select',
    label: i18n.t(LocaleHelper.getBookingQueryStatus()),
    key: 'status',
    selectOptions: [
      { label: i18n.t(LocaleHelper.getBookingCommonAll()), value: '' },
      { label: i18n.t(LocaleHelper.getBookingStatusPending()), value: 'PENDING' },
      { label: i18n.t(LocaleHelper.getBookingStatusConfirmed()), value: 'CONFIRMED' },
      { label: i18n.t(LocaleHelper.getBookingStatusCancelled()), value: 'CANCELLED' },
      { label: i18n.t(LocaleHelper.getBookingQueryStatusOther()), value: 'OTHER' },
    ],
  },
  {
    type: 'select',
    label: i18n.t(LocaleHelper.getBookingQueryRoute()),
    key: 'route',
    selectOptions: [
      { label: i18n.t(LocaleHelper.getBookingCommonAll()), value: '' },
      { label: i18n.t(LocaleHelper.getBookingRouteShaLax()), value: 'SHA-LAX' },
      { label: i18n.t(LocaleHelper.getBookingRouteShaHam()), value: 'SHA-HAM' },
      { label: i18n.t(LocaleHelper.getBookingRouteSZXNYC()), value: 'SZX-NYC' },
      { label: i18n.t(LocaleHelper.getBookingRouteCgoHam()), value: 'CGO-HAM' },
    ],
  },
  {
    type: 'dateRange',
    label: i18n.t(LocaleHelper.getBookingQueryApplyDate()),
    key: 'applyDate',
  },
  {
    type: 'dateRange',
    label: i18n.t(LocaleHelper.getBookingQuerySailingDate()),
    key: 'sailingDate',
  },
  {
    type: 'input',
    label: i18n.t(LocaleHelper.getBookingQueryOperator()),
    key: 'operator',
  },
  {
    type: 'select',
    label: i18n.t(LocaleHelper.getBookingQueryConfirmStatus()),
    key: 'confirmStatus',
    selectOptions: [
      { label: i18n.t(LocaleHelper.getBookingCommonAll()), value: '' },
      { label: i18n.t(LocaleHelper.getBookingConfirmStatusConfirmed()), value: 'CONFIRMED' },
      { label: i18n.t(LocaleHelper.getBookingConfirmStatusUnconfirmed()), value: 'UNCONFIRMED' },
    ],
  },
];

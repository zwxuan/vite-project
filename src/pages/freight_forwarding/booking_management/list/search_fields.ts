import { AdvancedSearchFormProps } from '@/components/search-form';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

export const fields: AdvancedSearchFormProps['fields'] = [
  {
    type: 'input',
    label: i18n.t(LocaleHelper.getBookingListSearchBookingNo()),
    key: 'bookingNo',
  },
  {
    type: 'select',
    label: i18n.t(LocaleHelper.getBookingListSearchCarrier()),
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
    label: i18n.t(LocaleHelper.getBookingListSearchStatus()),
    key: 'status',
    selectOptions: [
      { label: i18n.t(LocaleHelper.getBookingCommonAll()), value: '' },
      { label: i18n.t(LocaleHelper.getBookingStatusPending()), value: 'PENDING' },
      { label: i18n.t(LocaleHelper.getBookingStatusConfirmed()), value: 'CONFIRMED' },
      { label: i18n.t(LocaleHelper.getBookingStatusCancelled()), value: 'CANCELLED' },
    ],
  },
  {
    type: 'dateRange',
    label: i18n.t(LocaleHelper.getBookingListSearchDepartureDate()),
    key: 'etd',
  },
  {
    type: 'select',
    label: i18n.t(LocaleHelper.getBookingListSearchRoute()),
    key: 'route',
    selectOptions: [
      { label: i18n.t(LocaleHelper.getBookingCommonAll()), value: '' },
      { label: i18n.t(LocaleHelper.getBookingRouteShaLax()), value: 'SHA-LAX' },
      { label: i18n.t(LocaleHelper.getBookingRouteShaHam()), value: 'SHA-HAM' },
      { label: i18n.t(LocaleHelper.getBookingRouteSZXNYC()), value: 'SZX-NYC' },
      { label: i18n.t(LocaleHelper.getBookingRouteCgoHam()), value: 'CGO-HAM' },
    ],
  },
];

import { Space, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { BookingQueryItem } from '@/types/freight_forwarding/booking_management';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

const statusColorMap: Record<BookingQueryItem['status'], string> = {
  PENDING: 'orange',
  CONFIRMED: 'green',
  CANCELLED: 'red',
  OTHER: 'blue',
};

const statusTextMap: Record<BookingQueryItem['status'], string> = {
  PENDING: i18n.t(LocaleHelper.getBookingStatusPending()),
  CONFIRMED: i18n.t(LocaleHelper.getBookingStatusConfirmed()),
  CANCELLED: i18n.t(LocaleHelper.getBookingStatusCancelled()),
  OTHER: i18n.t(LocaleHelper.getBookingQueryStatusOther()),
};

const confirmStatusColorMap: Record<BookingQueryItem['confirmStatus'], string> = {
  CONFIRMED: 'green',
  UNCONFIRMED: 'orange',
};

const confirmStatusTextMap: Record<BookingQueryItem['confirmStatus'], string> = {
  CONFIRMED: i18n.t(LocaleHelper.getBookingConfirmStatusConfirmed()),
  UNCONFIRMED: i18n.t(LocaleHelper.getBookingConfirmStatusUnconfirmed()),
};

export const getColumns = (
  onDetail: (record: BookingQueryItem) => void,
): ColumnsType<BookingQueryItem> => [
  {
    title: i18n.t(LocaleHelper.getBookingQueryBookingNo()),
    dataIndex: 'bookingNo',
    key: 'bookingNo',
    width: 140,
  },
  {
    title: i18n.t(LocaleHelper.getBookingQueryWaybillNo()),
    dataIndex: 'waybillNo',
    key: 'waybillNo',
    width: 140,
  },
  {
    title: i18n.t(LocaleHelper.getBookingQueryCustomer()),
    dataIndex: 'customer',
    key: 'customer',
    width: 160,
  },
  {
    title: i18n.t(LocaleHelper.getBookingListCarrier()),
    dataIndex: 'carrier',
    key: 'carrier',
    width: 120,
  },
  {
    title: i18n.t(LocaleHelper.getBookingListRoute()),
    dataIndex: 'route',
    key: 'route',
    width: 140,
  },
  {
    title: i18n.t(LocaleHelper.getBookingQueryStatus()),
    dataIndex: 'status',
    key: 'status',
    width: 110,
    render: (status: BookingQueryItem['status']) => (
      <Tag color={statusColorMap[status]}>{statusTextMap[status]}</Tag>
    ),
  },
  {
    title: i18n.t(LocaleHelper.getBookingQueryApplyDate()),
    dataIndex: 'applyDate',
    key: 'applyDate',
    width: 130,
  },
  {
    title: i18n.t(LocaleHelper.getBookingQueryOperator()),
    dataIndex: 'operator',
    key: 'operator',
    width: 120,
  },
  {
    title: i18n.t(LocaleHelper.getBookingQueryConfirmStatus()),
    dataIndex: 'confirmStatus',
    key: 'confirmStatus',
    width: 120,
    render: (status: BookingQueryItem['confirmStatus']) => (
      <Tag color={confirmStatusColorMap[status]}>{confirmStatusTextMap[status]}</Tag>
    ),
  },
  {
    title: i18n.t(LocaleHelper.getBookingQueryAction()),
    key: 'action',
    fixed: 'right',
    width: 120,
    render: (_, record) => (
      <Space size="middle">
        <a onClick={() => onDetail(record)}>{i18n.t(LocaleHelper.getBookingQueryDetail())}</a>
      </Space>
    ),
  },
];

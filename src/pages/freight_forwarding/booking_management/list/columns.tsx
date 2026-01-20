import { ColumnsType } from 'antd/es/table';
import { Button, Space, Tag } from 'antd';
import { BookingItem } from '@/types/freight_forwarding/booking_management';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

const statusColorMap: Record<string, string> = {
  PENDING: 'orange',
  CONFIRMED: 'green',
  CANCELLED: 'red',
};

const statusTextMap = {
  PENDING: i18n.t(LocaleHelper.getBookingStatusPending()),
  CONFIRMED: i18n.t(LocaleHelper.getBookingStatusConfirmed()),
  CANCELLED: i18n.t(LocaleHelper.getBookingStatusCancelled()),
};

export const getColumns = (
  onDetail: (record: BookingItem) => void,
  onEdit: (record: BookingItem) => void,
  onUrge: (record: BookingItem) => void,
): ColumnsType<BookingItem> => [
  {
    title: i18n.t(LocaleHelper.getBookingListBookingNo()),
    dataIndex: 'bookingNo',
    key: 'bookingNo',
    width: 140,
  },
  {
    title: i18n.t(LocaleHelper.getBookingListCarrier()),
    dataIndex: 'carrier',
    key: 'carrier',
    width: 120,
  },
  {
    title: i18n.t(LocaleHelper.getBookingListVesselVoyage()),
    dataIndex: 'vesselVoyage',
    key: 'vesselVoyage',
    width: 160,
  },
  {
    title: i18n.t(LocaleHelper.getBookingListRoute()),
    dataIndex: 'route',
    key: 'route',
    width: 140,
  },
  {
    title: i18n.t(LocaleHelper.getBookingListContainerSummary()),
    dataIndex: 'containerSummary',
    key: 'containerSummary',
    width: 120,
  },
  {
    title: i18n.t(LocaleHelper.getBookingListStatus()),
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (value: BookingItem['status']) => (
      <Tag color={statusColorMap[value]}>{statusTextMap[value]}</Tag>
    ),
  },
  {
    title: i18n.t(LocaleHelper.getBookingListConfirmDate()),
    dataIndex: 'confirmDate',
    key: 'confirmDate',
    width: 120,
  },
  {
    title: i18n.t(LocaleHelper.getBookingListActions()),
    key: 'actions',
    width: 180,
    fixed: 'right',
    render: (_, record) => (
      <Space>
        <Button type="link" onClick={() => onDetail(record)}>
          {i18n.t(LocaleHelper.getBookingListDetail())}
        </Button>
        <Button type="link" onClick={() => onEdit(record)}>
          {i18n.t(LocaleHelper.getBookingListEdit())}
        </Button>
        <Button type="link" onClick={() => onUrge(record)}>
          {i18n.t(LocaleHelper.getBookingListUrge())}
        </Button>
      </Space>
    ),
  },
];

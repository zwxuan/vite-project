import React, { useEffect, useMemo, useState } from 'react';
import { Button, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { BookingItem, BookingListParams } from '@/types/freight_forwarding/booking_management';
import { getBookingList } from '@/api/freight_forwarding/booking_management/booking_service';
import CustomIcon from '@/components/custom-icon';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import AdvancedSearchForm from '@/components/search-form';
import { getColumns } from './columns';
import { fields } from './search_fields';
import '@/pages/page_list.less';

const BookingList: React.FC = () => {
  const [data, setData] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadData({});
  }, []);

  const loadData = async (params: BookingListParams) => {
    setLoading(true);
    const res = await getBookingList(params);
    if (res.success && res.data) {
      setData(res.data.list);
      setTotal(res.data.total);
    }
    setLoading(false);
  };

  const handleSearch = (values: BookingListParams) => {
    loadData(values);
  };

  const handleNew = () => {
    navigate('/booking_management/create');
  };

  const handleDetail = (record: BookingItem) => {
    navigate(`/booking_management/create?id=${record.bookingId}&readonly=true`);
  };

  const handleEdit = (record: BookingItem) => {
    navigate(`/booking_management/create?id=${record.bookingId}`);
  };

  const handleUrge = (record: BookingItem) => {
    navigate(`/booking_management/query?bookingNo=${record.bookingNo}`);
  };

  const summary = useMemo(() => {
    const pending = data.filter(item => item.status === 'PENDING').length;
    const confirmed = data.filter(item => item.status === 'CONFIRMED').length;
    const cancelled = data.filter(item => item.status === 'CANCELLED').length;
    return {
      dueToday: Math.min(5, data.length),
      pending,
      confirmed,
      cancelled,
    };
  }, [data]);

  const columns = getColumns(handleDetail, handleEdit, handleUrge);

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <span className="bill-info-title" style={{ marginLeft: '10px' }}>
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
              {i18n.t(LocaleHelper.getBookingListTitle())}
            </span>
          </div>
        </div>
        <div className="header-button-area">
          <div className="buttonGroup-component">
            <div className="u-button-group">
              <Button type="primary" danger onClick={handleNew}>
                {i18n.t(LocaleHelper.getBookingListNewBooking())}
              </Button>
              <Button>{i18n.t(LocaleHelper.getBookingListBatchOperation())}</Button>
            </div>
          </div>
        </div>
      </div>

      <AdvancedSearchForm fields={fields as any} onSearch={handleSearch} />

      <div className="nc-bill-table-area">
        <Table<BookingItem>
          columns={columns}
          dataSource={data}
          rowKey="bookingId"
          size="small"
          bordered={true}
          loading={loading}
          scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
          pagination={{
            size: 'small',
            total,
            showTotal: totalCount => `${i18n.t(LocaleHelper.getBookingCommonTotal())} ${totalCount}`,
            showQuickJumper: true,
            showSizeChanger: true,
            locale: {
              items_per_page: i18n.t(LocaleHelper.getItemsPerPage()),
              jump_to: i18n.t(LocaleHelper.getJumpTo()),
              page: i18n.t(LocaleHelper.getPage()),
            },
          }}
        />
      </div>

      <div style={{ padding: '8px 16px', textAlign: 'left' }}>
        {i18n.t(LocaleHelper.getBookingListSummaryDueToday())}：{summary.dueToday}
        <span style={{ marginLeft: 16 }}>
          {i18n.t(LocaleHelper.getBookingListSummaryPending())}：{summary.pending}
        </span>
        <span style={{ marginLeft: 16 }}>
          {i18n.t(LocaleHelper.getBookingListSummaryConfirmed())}：{summary.confirmed}
        </span>
        <span style={{ marginLeft: 16 }}>
          {i18n.t(LocaleHelper.getBookingListSummaryCancelled())}：{summary.cancelled}
        </span>
      </div>
    </div>
  );
};

export default BookingList;

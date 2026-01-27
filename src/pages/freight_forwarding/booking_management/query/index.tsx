import React, { useEffect, useState } from 'react';
import { Card, Col, Input, Row, Table, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { BookingQueryItem, BookingQueryParams } from '@/types/freight_forwarding/booking_management';
import { getBookingQueryList } from '@/api/freight_forwarding/booking_management/booking_service';
import CustomIcon from '@/components/custom-icon';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import AdvancedSearchForm from '@/components/search-form';
import { getColumns } from './columns';
import { fields } from './search_fields';
import '@/pages/page_list.less';

const { Search } = Input;

const BookingQuery: React.FC = () => {
  const [data, setData] = useState<BookingQueryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadData({});
  }, []);

  const loadData = async (params: BookingQueryParams) => {
    setLoading(true);
    try {
      const res = await getBookingQueryList(params);
      if (res.success && res.data) {
        setData(res.data.list);
        setTotal(res.data.total);
      }
    } catch (error) {
      message.error('Load failed');
    }
    setLoading(false);
  };

  const handleSearch = (values: BookingQueryParams) => {
    loadData(values);
  };

  const handleQuickSearch = (key: keyof BookingQueryParams, value: string) => {
    loadData({ [key]: value } as BookingQueryParams);
  };

  const handleDetail = (record: BookingQueryItem) => {
    navigate(`/booking_management/create?id=${record.bookingId}&readonly=true`);
  };

  const columns = getColumns(handleDetail);

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap">
            <span className="bill-info-title" style={{ marginLeft: '10px' }}>
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
              {i18n.t(LocaleHelper.getBookingQueryTitle())}
            </span>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 20px 20px 20px' }}>
        <Card title={i18n.t(LocaleHelper.getBookingQueryQuickQuery())} bordered={false} className="nc-bill-card" style={{ marginBottom: '20px' }}>
          <Row gutter={24}>
            <Col span={8}>
              <Search
                placeholder={i18n.t(LocaleHelper.getBookingQueryBookingNo())}
                onSearch={(value) => handleQuickSearch('bookingNo', value)}
                enterButton={i18n.t(LocaleHelper.getBookingQueryQuery())}
              />
            </Col>
            <Col span={8}>
              <Search
                placeholder={i18n.t(LocaleHelper.getBookingQueryWaybillNo())}
                onSearch={(value) => handleQuickSearch('waybillNo', value)}
                enterButton={i18n.t(LocaleHelper.getBookingQueryQuery())}
              />
            </Col>
            <Col span={8}>
              <Search
                placeholder={i18n.t(LocaleHelper.getBookingQueryCustomer())}
                onSearch={(value) => handleQuickSearch('customer', value)}
                enterButton={i18n.t(LocaleHelper.getBookingQueryQuery())}
              />
            </Col>
          </Row>
        </Card>

        <AdvancedSearchForm fields={fields as any} onSearch={handleSearch} />

        <div className="nc-bill-table-area">
          <Table<BookingQueryItem>
            columns={columns}
            dataSource={data}
            rowKey="bookingId"
            size="small"
            bordered={true}
            loading={loading}
            scroll={{ x: 'max-content', y: 'calc(100vh - 480px)' }}
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
      </div>
    </div>
  );
};

export default BookingQuery;

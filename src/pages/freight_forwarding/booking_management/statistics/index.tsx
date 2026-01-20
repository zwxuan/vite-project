import React, { useState } from 'react';
import { Card, Col, DatePicker, Form, Progress, Radio, Row, Statistic, Table } from 'antd';
import { RiseOutlined, ContainerOutlined, FileTextOutlined, TeamOutlined, PieChartOutlined } from '@ant-design/icons';
import CustomIcon from '@/components/custom-icon';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import '@/pages/page_list.less';

const { RangePicker } = DatePicker;

const BookingStatistics: React.FC = () => {
  const [form] = Form.useForm();
  const [chartType, setChartType] = useState('trend');

  const routeData = [
    { key: '1', route: 'SHA-LAX', count: 320, prop: 28, mom: '+6%', yoy: '+12%' },
    { key: '2', route: 'SHA-HAM', count: 260, prop: 23, mom: '+3%', yoy: '+8%' },
    { key: '3', route: 'SZX-NYC', count: 210, prop: 18, mom: '-2%', yoy: '+4%' },
    { key: '4', route: 'CGO-HAM', count: 160, prop: 14, mom: '+5%', yoy: '+10%' },
  ];

  const carrierData = [
    { key: '1', rank: 1, carrier: 'COSCO', count: 240, prop: 30, confirmRate: 92 },
    { key: '2', rank: 2, carrier: 'MAERSK', count: 200, prop: 25, confirmRate: 88 },
    { key: '3', rank: 3, carrier: 'MSC', count: 160, prop: 20, confirmRate: 85 },
    { key: '4', rank: 4, carrier: 'CMA', count: 120, prop: 15, confirmRate: 80 },
  ];

  const routeColumns = [
    { title: i18n.t(LocaleHelper.getBookingStatisticsRoute()), dataIndex: 'route', key: 'route' },
    { title: i18n.t(LocaleHelper.getBookingStatisticsBookingCount()), dataIndex: 'count', key: 'count' },
    {
      title: i18n.t(LocaleHelper.getBookingStatisticsProportion()),
      dataIndex: 'prop',
      key: 'prop',
      render: (val: number) => <Progress percent={val} size="small" />,
    },
    { title: i18n.t(LocaleHelper.getBookingStatisticsMomGrowth()), dataIndex: 'mom', key: 'mom' },
    { title: i18n.t(LocaleHelper.getBookingStatisticsYoyGrowth()), dataIndex: 'yoy', key: 'yoy' },
  ];

  const carrierColumns = [
    { title: i18n.t(LocaleHelper.getBookingStatisticsRank()), dataIndex: 'rank', key: 'rank', width: 80 },
    { title: i18n.t(LocaleHelper.getBookingListCarrier()), dataIndex: 'carrier', key: 'carrier' },
    { title: i18n.t(LocaleHelper.getBookingStatisticsBookingCount()), dataIndex: 'count', key: 'count' },
    {
      title: i18n.t(LocaleHelper.getBookingStatisticsProportion()),
      dataIndex: 'prop',
      key: 'prop',
      render: (val: number) => <Progress percent={val} size="small" />,
    },
    {
      title: i18n.t(LocaleHelper.getBookingStatisticsConfirmRate()),
      dataIndex: 'confirmRate',
      key: 'confirmRate',
      render: (val: number) => <Progress percent={val} size="small" />,
    },
  ];

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap">
            <span className="bill-info-title" style={{ marginLeft: '10px' }}>
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
              {i18n.t(LocaleHelper.getBookingStatisticsTitle())}
            </span>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <Card bordered={false} style={{ marginBottom: '20px' }}>
          <Form form={form} layout="vertical">
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item label={i18n.t(LocaleHelper.getBookingStatisticsTimeRange())}>
                  <RangePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={i18n.t(LocaleHelper.getBookingStatisticsStatisticsType())}>
                  <Radio.Group value={chartType} onChange={e => setChartType(e.target.value)} buttonStyle="solid">
                    <Radio.Button value="trend">{i18n.t(LocaleHelper.getBookingStatisticsBookingCount())}</Radio.Button>
                    <Radio.Button value="carrier">{i18n.t(LocaleHelper.getBookingStatisticsCarrierRanking())}</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        <Row gutter={16} style={{ marginBottom: '20px' }}>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title={i18n.t(LocaleHelper.getBookingStatisticsTotalBookings())}
                value={1050}
                prefix={<FileTextOutlined style={{ color: '#1890ff' }} />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title={i18n.t(LocaleHelper.getBookingStatisticsPending())}
                value={180}
                prefix={<ContainerOutlined style={{ color: '#faad14' }} />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title={i18n.t(LocaleHelper.getBookingStatisticsConfirmed())}
                value={820}
                prefix={<TeamOutlined style={{ color: '#722ed1' }} />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title={i18n.t(LocaleHelper.getBookingStatisticsCancelled())}
                value={50}
                prefix={<RiseOutlined style={{ color: '#52c41a' }} />}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Card title={i18n.t(LocaleHelper.getBookingStatisticsBookingCount())} bordered={false}>
              <Table dataSource={routeData} columns={routeColumns} pagination={false} size="small" />
            </Card>
          </Col>
          <Col span={12}>
            <Card title={i18n.t(LocaleHelper.getBookingStatisticsStatusDistribution())} bordered={false}>
              <div style={{
                height: '200px',
                border: '2px dashed #d9d9d9',
                background: '#fafafa',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '4px',
                flexDirection: 'column'
              }}>
                <PieChartOutlined style={{ fontSize: '48px', color: '#ccc' }} />
                <span style={{ color: '#999', marginTop: '10px' }}>{i18n.t(LocaleHelper.getBookingStatisticsChartPlaceholder())}</span>
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: '20px' }}>
          <Col span={24}>
            <Card title={i18n.t(LocaleHelper.getBookingStatisticsCarrierRanking())} bordered={false}>
              <Table dataSource={carrierData} columns={carrierColumns} pagination={false} size="small" />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BookingStatistics;

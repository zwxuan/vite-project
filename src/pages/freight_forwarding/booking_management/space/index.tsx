import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Descriptions, Modal, Progress, Table, Tag, message } from 'antd';
import dayjs from 'dayjs';
import CustomIcon from '@/components/custom-icon';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { getSpaceList } from '@/api/freight_forwarding/booking_management/booking_service';
import { SpaceItem } from '@/types/freight_forwarding/booking_management';
import AdvancedSearchForm from '@/components/search-form';
import '@/pages/page_list.less';
import { useNavigate } from 'react-router-dom';

const statusColorMap: Record<SpaceItem['status'], string> = {
  OPEN: 'green',
  TIGHT: 'orange',
  FULL: 'red',
};

const SpaceManagement: React.FC = () => {
  const [data, setData] = useState<SpaceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<SpaceItem | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const navigate = useNavigate();

  const containerStatsBySpaceId = useMemo(
    () => ({
      'S-001': [
        { type: '20GP', total: 50, booked: 38, available: 12 },
        { type: '40GP', total: 80, booked: 65, available: 15 },
        { type: '40HQ', total: 70, booked: 53, available: 17 },
        { type: '45HQ', total: 0, booked: 0, available: 0 },
      ],
      'S-002': [
        { type: '20GP', total: 60, booked: 48, available: 12 },
        { type: '40GP', total: 70, booked: 58, available: 12 },
        { type: '40HQ', total: 50, booked: 39, available: 11 },
        { type: '45HQ', total: 0, booked: 0, available: 0 },
      ],
      'S-003': [
        { type: '20GP', total: 40, booked: 15, available: 25 },
        { type: '40GP', total: 90, booked: 42, available: 48 },
        { type: '40HQ', total: 90, booked: 32, available: 58 },
        { type: '45HQ', total: 0, booked: 0, available: 0 },
      ],
      'S-004': [
        { type: '20GP', total: 30, booked: 20, available: 10 },
        { type: '40GP', total: 60, booked: 38, available: 22 },
        { type: '40HQ', total: 60, booked: 37, available: 23 },
        { type: '45HQ', total: 0, booked: 0, available: 0 },
      ],
      'S-005': [
        { type: '20GP', total: 20, booked: 20, available: 0 },
        { type: '40GP', total: 70, booked: 70, available: 0 },
        { type: '40HQ', total: 70, booked: 70, available: 0 },
        { type: '45HQ', total: 0, booked: 0, available: 0 },
      ],
      'S-006': [
        { type: '20GP', total: 30, booked: 18, available: 12 },
        { type: '40GP', total: 60, booked: 40, available: 20 },
        { type: '40HQ', total: 50, booked: 42, available: 8 },
        { type: '45HQ', total: 0, booked: 0, available: 0 },
      ],
      'S-007': [
        { type: '20GP', total: 40, booked: 30, available: 10 },
        { type: '40GP', total: 70, booked: 65, available: 5 },
        { type: '40HQ', total: 80, booked: 75, available: 5 },
        { type: '45HQ', total: 0, booked: 0, available: 0 },
      ],
      'S-008': [
        { type: '20GP', total: 50, booked: 45, available: 5 },
        { type: '40GP', total: 80, booked: 78, available: 2 },
        { type: '40HQ', total: 80, booked: 77, available: 3 },
        { type: '45HQ', total: 0, booked: 0, available: 0 },
      ],
      'S-009': [
        { type: '20GP', total: 35, booked: 20, available: 15 },
        { type: '40GP', total: 70, booked: 50, available: 20 },
        { type: '40HQ', total: 70, booked: 50, available: 20 },
        { type: '45HQ', total: 0, booked: 0, available: 0 },
      ],
      'S-010': [
        { type: '20GP', total: 60, booked: 55, available: 5 },
        { type: '40GP', total: 90, booked: 85, available: 5 },
        { type: '40HQ', total: 80, booked: 70, available: 10 },
        { type: '45HQ', total: 0, booked: 0, available: 0 },
      ],
    }),
    []
  );

  useEffect(() => {
    loadData({});
  }, []);

  const loadData = async (params: any) => {
    setLoading(true);
    try {
      const res = await getSpaceList();
      if (res.success && res.data) {
        let list = res.data.list;
        if (params.carrier) list = list.filter(item => item.carrier.includes(params.carrier));
        if (params.route) list = list.filter(item => item.route.includes(params.route));
        if (params.status) list = list.filter(item => item.status === params.status);
        if (params.schedule) {
          const now = dayjs();
          const rangeStart = params.schedule === 'THIS_WEEK' ? now.startOf('week') : now.startOf('month');
          const rangeEnd = params.schedule === 'THIS_WEEK' ? now.endOf('week') : now.endOf('month');
          list = list.filter(item => {
            const date = dayjs(item.departureDate);
            return !date.isBefore(rangeStart, 'day') && !date.isAfter(rangeEnd, 'day');
          });
        }
        if (params.containerType) {
          list = list.filter(item => {
            const stats = (containerStatsBySpaceId as Record<string, typeof containerStatsBySpaceId['S-001']>)[item.spaceId] || [];
            return stats.some(stat => stat.type === params.containerType && stat.total > 0);
          });
        }
        setData(list);
        if (!selectedSpace && list.length > 0) {
          setSelectedSpace(list[0]);
        }
      }
    } catch (error) {
      message.error('Load failed');
    }
    setLoading(false);
  };

  const fields = useMemo(() => ([
    {
      type: 'select',
      label: i18n.t(LocaleHelper.getSpaceManagementCarrier()),
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
      label: i18n.t(LocaleHelper.getSpaceManagementRoute()),
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
      type: 'select',
      label: i18n.t(LocaleHelper.getSpaceManagementSchedule()),
      key: 'schedule',
      selectOptions: [
        { label: i18n.t(LocaleHelper.getBookingCommonAll()), value: '' },
        { label: i18n.t(LocaleHelper.getSpaceManagementScheduleThisWeek()), value: 'THIS_WEEK' },
        { label: i18n.t(LocaleHelper.getSpaceManagementScheduleThisMonth()), value: 'THIS_MONTH' },
      ],
    },
    {
      type: 'select',
      label: i18n.t(LocaleHelper.getSpaceManagementContainerType()),
      key: 'containerType',
      selectOptions: [
        { label: i18n.t(LocaleHelper.getBookingCommonAll()), value: '' },
        { label: i18n.t(LocaleHelper.getBookingContainerType20GP()), value: '20GP' },
        { label: i18n.t(LocaleHelper.getBookingContainerType40GP()), value: '40GP' },
        { label: i18n.t(LocaleHelper.getBookingContainerType40HQ()), value: '40HQ' },
        { label: i18n.t(LocaleHelper.getBookingContainerType45HQ()), value: '45HQ' },
      ],
    },
    {
      type: 'select',
      label: i18n.t(LocaleHelper.getSpaceManagementStatus()),
      key: 'status',
      selectOptions: [
        { label: i18n.t(LocaleHelper.getBookingCommonAll()), value: '' },
        { label: i18n.t(LocaleHelper.getSpaceManagementStatusOpen()), value: 'OPEN' },
        { label: i18n.t(LocaleHelper.getSpaceManagementStatusTight()), value: 'TIGHT' },
        { label: i18n.t(LocaleHelper.getSpaceManagementStatusFull()), value: 'FULL' },
      ],
    },
  ]), []);

  const handleSearch = (values: any) => {
    loadData(values);
  };

  const columns = [
    {
      title: i18n.t(LocaleHelper.getSpaceManagementCarrier()),
      dataIndex: 'carrier',
      key: 'carrier',
      width: 120,
    },
    {
      title: i18n.t(LocaleHelper.getSpaceManagementVesselVoyage()),
      dataIndex: 'vesselVoyage',
      key: 'vesselVoyage',
      width: 150,
    },
    {
      title: i18n.t(LocaleHelper.getSpaceManagementRoute()),
      dataIndex: 'route',
      key: 'route',
      width: 140,
    },
    {
      title: i18n.t(LocaleHelper.getSpaceManagementDepartureDate()),
      dataIndex: 'departureDate',
      key: 'departureDate',
      width: 140,
    },
    {
      title: i18n.t(LocaleHelper.getSpaceManagementTotalSpace()),
      dataIndex: 'totalSpace',
      key: 'totalSpace',
      width: 120,
    },
    {
      title: i18n.t(LocaleHelper.getSpaceManagementBookedSpace()),
      dataIndex: 'bookedSpace',
      key: 'bookedSpace',
      width: 120,
    },
    {
      title: i18n.t(LocaleHelper.getSpaceManagementAvailableSpace()),
      dataIndex: 'availableSpace',
      key: 'availableSpace',
      width: 140,
      render: (val: number) => <Progress percent={Math.min(100, Math.round((val / 230) * 100))} size="small" />,
    },
    {
      title: i18n.t(LocaleHelper.getSpaceManagementStatus()),
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: SpaceItem['status']) => (
        <Tag color={statusColorMap[status]}>
          {status === 'OPEN' ? i18n.t(LocaleHelper.getSpaceManagementStatusOpen()) : status === 'TIGHT' ? i18n.t(LocaleHelper.getSpaceManagementStatusTight()) : i18n.t(LocaleHelper.getSpaceManagementStatusFull())}
        </Tag>
      ),
    },
    {
      title: i18n.t(LocaleHelper.getSpaceManagementAction()),
      key: 'action',
      width: 140,
      render: (_: unknown, record: SpaceItem) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setSelectedSpace(record);
              setDetailModalVisible(true);
            }}
          >
            {i18n.t(LocaleHelper.getSpaceManagementDetail())}
          </Button>
          <Button
            type="link"
            onClick={() => {
              navigate('/booking_management/create');
            }}
          >
            {i18n.t(LocaleHelper.getSpaceManagementReserve())}
          </Button>
        </>
      ),
    },
  ];

  const containerColumns = [
    {
      title: i18n.t(LocaleHelper.getSpaceManagementContainerType()),
      dataIndex: 'type',
      key: 'type',
      width: 120,
    },
    {
      title: i18n.t(LocaleHelper.getSpaceManagementTotalSpace()),
      dataIndex: 'total',
      key: 'total',
      width: 120,
    },
    {
      title: i18n.t(LocaleHelper.getSpaceManagementBookedSpace()),
      dataIndex: 'booked',
      key: 'booked',
      width: 120,
    },
    {
      title: i18n.t(LocaleHelper.getSpaceManagementAvailableSpace()),
      dataIndex: 'available',
      key: 'available',
      width: 120,
    },
  ];

  const DetailModalBody: React.FC<{
    open: boolean;
    onCancel: () => void;
    space: SpaceItem | null;
  }> = ({ open, onCancel, space }) => {
    const stats =
      space
        ? (containerStatsBySpaceId as Record<string, typeof containerStatsBySpaceId['S-001']>)[space.spaceId] || []
        : [];
    return (
      <Modal
        width={900}
        open={open}
        onCancel={onCancel}
        title={
          space
            ? `${i18n.t(LocaleHelper.getSpaceManagementDetailTitle())}：${space.carrier} ${space.vesselVoyage} ${space.route}`
            : i18n.t(LocaleHelper.getSpaceManagementDetailTitle())
        }
        footer={
          <Button type="primary" danger onClick={() => navigate('/booking_management/create')}>
            {i18n.t(LocaleHelper.getSpaceManagementReserveButton())}
          </Button>
        }
      >
        {space && (
          <>
            <Card bordered={false} style={{ marginBottom: 12 }}>
              <Descriptions size="small" column={3}>
                <Descriptions.Item label={i18n.t(LocaleHelper.getSpaceManagementCarrier())}>{space.carrier}</Descriptions.Item>
                <Descriptions.Item label={i18n.t(LocaleHelper.getSpaceManagementVesselVoyage())}>{space.vesselVoyage}</Descriptions.Item>
                <Descriptions.Item label={i18n.t(LocaleHelper.getSpaceManagementRoute())}>{space.route}</Descriptions.Item>
                <Descriptions.Item label={i18n.t(LocaleHelper.getSpaceManagementDepartureDate())}>{space.departureDate}</Descriptions.Item>
                <Descriptions.Item label={i18n.t(LocaleHelper.getSpaceManagementTotalSpace())}>{space.totalSpace}</Descriptions.Item>
                <Descriptions.Item label={i18n.t(LocaleHelper.getSpaceManagementBookedSpace())}>{space.bookedSpace}</Descriptions.Item>
                <Descriptions.Item label={i18n.t(LocaleHelper.getSpaceManagementAvailableSpace())}>{space.availableSpace}</Descriptions.Item>
              </Descriptions>
            </Card>
            <Card bordered={false} title={i18n.t(LocaleHelper.getSpaceManagementOverviewTitle())}>
              <Table
                columns={containerColumns}
                dataSource={stats}
                rowKey="type"
                size="small"
                bordered={true}
                pagination={false}
              />
            </Card>
          </>
        )}
      </Modal>
    );
  };

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap">
            <span className="bill-info-title" style={{ marginLeft: '10px' }}>
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
              {i18n.t(LocaleHelper.getSpaceManagementTitle())}
            </span>
          </div>
        </div>
        <div className="header-button-area">
          <div className="buttonGroup-component">
            <div className="u-button-group">
              <Button type="primary" danger onClick={() => navigate('/booking_management/create')}>
                {i18n.t(LocaleHelper.getSpaceManagementReserveButton())}
              </Button>
              <Button>{i18n.t(LocaleHelper.getSpaceManagementBatchAllocate())}</Button>
              <Button>{i18n.t(LocaleHelper.getSpaceManagementImport())}</Button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 20px 20px 20px' }}>
        <Card bordered={false} style={{ marginBottom: 16 }}>
          <AdvancedSearchForm fields={fields as any} onSearch={handleSearch} />
        </Card>
        <Card bordered={false} title={i18n.t(LocaleHelper.getSpaceManagementOverviewTitle())} style={{ marginBottom: 16 }}>
          <Table<SpaceItem>
            columns={columns}
            dataSource={data}
            rowKey="spaceId"
            size="small"
            bordered={true}
            loading={loading}
            pagination={{ size: 'small', showQuickJumper: true, showSizeChanger: true }}
            scroll={{ x: 'max-content' }}
          />
        </Card>
        <DetailModalBody
          open={detailModalVisible}
          onCancel={() => setDetailModalVisible(false)}
          space={selectedSpace}
        />
      </div>
    </div>
  );
};

export default SpaceManagement;

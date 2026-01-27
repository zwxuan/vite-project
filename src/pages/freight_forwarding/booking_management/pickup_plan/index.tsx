import React, { useEffect, useMemo, useState } from 'react';
import { Button, Form, Input, InputNumber, Select, Space, Table, Tag, message } from 'antd';
import CustomIcon from '@/components/custom-icon';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { getPickupPlanList, getPickupTrackingList } from '@/api/freight_forwarding/booking_management/booking_service';
import { PickupPlanItem, PickupTrackingItem, PickupPlanParams } from '@/types/freight_forwarding/booking_management';
import AdvancedSearchForm from '@/components/search-form';
import GeneratePlanModal, { ContainerRequirement } from './generate_plan_modal';
import AdjustPlanModal from './adjust_plan_modal';
import PlanDetailModal from './plan_detail_modal';
import TrackingDetailModal from './tracking_detail_modal';
import { fields } from './search_fields';
import '@/pages/page_list.less';
import dayjs from 'dayjs';

const planStatusColorMap: Record<PickupPlanItem['status'], string> = {
  PLANNED: 'blue',
  IN_PROGRESS: 'orange',
  COMPLETED: 'green',
  DELAYED: 'red',
};

const trackingStatusColorMap: Record<PickupTrackingItem['status'], string> = {
  WAITING: 'blue',
  PICKING: 'orange',
  ARRIVED: 'cyan',
  COMPLETED: 'green',
  EXCEPTION: 'red',
};

const PickupPlanManagement: React.FC = () => {
  const [planList, setPlanList] = useState<PickupPlanItem[]>([]);
  const [trackingList, setTrackingList] = useState<PickupTrackingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [adjustForm] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [planDetailVisible, setPlanDetailVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PickupPlanItem | null>(null);
  const [trackingDetailVisible, setTrackingDetailVisible] = useState(false);
  const [selectedTracking, setSelectedTracking] = useState<PickupTrackingItem | null>(null);
  const [generateVisible, setGenerateVisible] = useState(false);
  const [adjustVisible, setAdjustVisible] = useState(false);
  const defaultContainerRequirements = () => ([
    {
      key: '1',
      containerType: '40HQ',
      quantity: 2,
      condition: i18n.t(LocaleHelper.getPickupPlanGenerateSampleCondition()),
      specialRequirement: i18n.t(LocaleHelper.getPickupPlanGenerateSampleSpecialRequirement()),
    },
  ]);
  const [containerRequirements, setContainerRequirements] = useState<ContainerRequirement[]>(defaultContainerRequirements());

  useEffect(() => {
    loadPlanList({});
    loadTrackingList({});
  }, []);

  const loadPlanList = async (params: PickupPlanParams) => {
    setLoading(true);
    try {
      const res = await getPickupPlanList(params);
      if (res.success && res.data) {
        setPlanList(res.data.list);
      }
    } catch (error) {
      message.error('Load failed');
    }
    setLoading(false);
  };

  const loadTrackingList = async (params: PickupPlanParams) => {
    try {
      const res = await getPickupTrackingList(params);
      if (res.success && res.data) {
        setTrackingList(res.data.list);
      }
    } catch (error) {
      message.error('Load failed');
    }
  };

  const handleGenerate = () => {
    const generatedRequirements = [
      {
        key: `${Date.now()}`,
        containerType: '40HQ',
        quantity: 1,
        condition: i18n.t(LocaleHelper.getPickupPlanGenerateSampleCondition()),
        specialRequirement: i18n.t(LocaleHelper.getPickupPlanGenerateSampleSpecialRequirement()),
      },
      {
        key: `${Date.now() + 1}`,
        containerType: '20GP',
        quantity: 2,
        condition: i18n.t(LocaleHelper.getPickupPlanGenerateSampleCondition()),
        specialRequirement: i18n.t(LocaleHelper.getPickupPlanGenerateSampleSpecialRequirement()),
      },
    ];
    const containerSummary = generatedRequirements
      .map(item => `${item.containerType} × ${item.quantity}`)
      .join(', ');
    form.setFieldsValue({
      route: i18n.t(LocaleHelper.getPickupPlanGenerateSampleRoute()),
      containerSummary,
      depot: i18n.t(LocaleHelper.getPickupPlanGenerateSampleDepot()),
      depotAddress: i18n.t(LocaleHelper.getPickupPlanGenerateSampleDepotAddress()),
      pickupDate: '2024-03-19',
      pickupTime: '08:30',
      cutoffTime: '2024-03-19 15:30',
      estimatedDuration: 90,
      contactName: i18n.t(LocaleHelper.getPickupPlanGenerateSampleContactName()),
      remark: i18n.t(LocaleHelper.getPickupPlanGenerateSampleRemark()),
    });
    setContainerRequirements(generatedRequirements);
    message.success(i18n.t(LocaleHelper.getPickupPlanGenerateSuccess()));
  };

  const handleSave = () => {
    message.success(i18n.t(LocaleHelper.getPickupPlanGenerateSaveSuccess()));
  };

  const handleAdjust = () => {
    message.success(i18n.t(LocaleHelper.getPickupPlanAdjustSuccess()));
  };

  const handleAdjustReoptimize = () => {
    message.success(i18n.t(LocaleHelper.getPickupPlanAdjustReoptimizeSuccess()));
  };

  const handleAdjustCancel = () => {
    message.info(i18n.t(LocaleHelper.getPickupPlanAdjustCancelSuccess()));
  };

  const handleSearch = (values?: Array<{ field: string; value: any }>) => {
    const currentValues = (values || []).reduce((acc, item) => {
      acc[item.field] = item.value;
      return acc;
    }, {} as Record<string, any>);
    const params: PickupPlanParams = {
      planNo: currentValues.planNo?.trim(),
      bookingNo: currentValues.bookingNo?.trim(),
      carrier: currentValues.carrier?.trim(),
      status: currentValues.status || undefined,
      pickupDate: currentValues.pickupDateRange?.length === 2
        ? currentValues.pickupDateRange
        : undefined,
    };
    loadPlanList(params);
  };

  const openGenerateDrawer = () => {
    setGenerateVisible(true);
    setContainerRequirements(defaultContainerRequirements());
    form.resetFields();
  };

  const openAdjustDrawer = (record: PickupPlanItem) => {
    setSelectedPlan(record);
    setAdjustVisible(true);
    adjustForm.resetFields();
    adjustForm.setFieldsValue({
      originalPickupDate: record.plannedDate,
      originalDepot: record.depot,
      originalContainer: `${record.containerCount}`,
      originalStatus: planStatusTextMap[record.status],
    });
  };

  const openTrackingDrawer = (record: PickupPlanItem) => {
    const tracking = trackingList.find(item => item.planNo === record.planNo);
    const fallbackTracking: PickupTrackingItem = {
      trackingId: `PT-${record.planId}`,
      planNo: record.planNo,
      bookingNo: record.bookingNo,
      vehicleNo: '沪A12345',
      driver: '王师傅',
      status: record.status === 'COMPLETED' ? 'COMPLETED' : 'WAITING',
      lastUpdate: `${record.plannedDate} 09:00`,
      progress: record.progress,
    };
    setSelectedTracking(tracking || fallbackTracking);
    setTrackingDetailVisible(true);
  };

  const planStatusTextMap: Record<PickupPlanItem['status'], string> = {
    PLANNED: i18n.t(LocaleHelper.getPickupPlanStatusPlanned()),
    IN_PROGRESS: i18n.t(LocaleHelper.getPickupPlanStatusInProgress()),
    COMPLETED: i18n.t(LocaleHelper.getPickupPlanStatusCompleted()),
    DELAYED: i18n.t(LocaleHelper.getPickupPlanStatusDelayed()),
  };

  const trackingStatusTextMap: Record<PickupTrackingItem['status'], string> = {
    WAITING: i18n.t(LocaleHelper.getPickupTrackingStatusWaiting()),
    PICKING: i18n.t(LocaleHelper.getPickupTrackingStatusPicking()),
    ARRIVED: i18n.t(LocaleHelper.getPickupTrackingStatusArrived()),
    COMPLETED: i18n.t(LocaleHelper.getPickupTrackingStatusCompleted()),
    EXCEPTION: i18n.t(LocaleHelper.getPickupTrackingStatusException()),
  };

  const pushStatusTextMap: Record<PickupPlanItem['pushStatus'], string> = {
    PENDING: i18n.t(LocaleHelper.getPickupPlanPushStatusPending()),
    PUSHED: i18n.t(LocaleHelper.getPickupPlanPushStatusPushed()),
  };

  const summaryData = useMemo(() => {
    const today = dayjs().format('YYYY-MM-DD');
    return {
      todayPlans: planList.filter(item => item.plannedDate === today).length,
      pendingPush: planList.filter(item => item.pushStatus === 'PENDING').length,
      inProgress: planList.filter(item => item.status === 'IN_PROGRESS').length,
      completed: planList.filter(item => item.status === 'COMPLETED').length,
    };
  }, [planList]);

  const handleBatchPush = () => {
    message.success(i18n.t(LocaleHelper.getPickupPlanActionPush()));
  };

  const adjustReasonTypeOptions = [
    { label: i18n.t(LocaleHelper.getPickupPlanAdjustReasonTypeTime()), value: 'time' },
    { label: i18n.t(LocaleHelper.getPickupPlanAdjustReasonTypeDepot()), value: 'depot' },
    { label: i18n.t(LocaleHelper.getPickupPlanAdjustReasonTypeOther()), value: 'other' },
  ];

  const adjustReasonOptions = [
    { label: i18n.t(LocaleHelper.getPickupPlanAdjustReasonValueMaintenance()), value: 'maintenance' },
    { label: i18n.t(LocaleHelper.getPickupPlanAdjustReasonValueTraffic()), value: 'traffic' },
    { label: i18n.t(LocaleHelper.getPickupPlanAdjustReasonValueCustomer()), value: 'customer' },
  ];

  const planColumns = [
    {
      title: i18n.t(LocaleHelper.getPickupPlanPlanNo()),
      dataIndex: 'planNo',
      key: 'planNo',
      width: 140,
    },
    {
      title: i18n.t(LocaleHelper.getPickupPlanBookingNo()),
      dataIndex: 'bookingNo',
      key: 'bookingNo',
      width: 140,
    },
    {
      title: i18n.t(LocaleHelper.getPickupPlanCarrier()),
      dataIndex: 'carrier',
      key: 'carrier',
      width: 140,
    },
    {
      title: i18n.t(LocaleHelper.getPickupPlanDepot()),
      dataIndex: 'depot',
      key: 'depot',
      width: 140,
    },
    {
      title: i18n.t(LocaleHelper.getPickupPlanPlannedDate()),
      dataIndex: 'plannedDate',
      key: 'plannedDate',
      width: 140,
    },
    {
      title: i18n.t(LocaleHelper.getPickupPlanContainerCount()),
      dataIndex: 'containerCount',
      key: 'containerCount',
      width: 100,
    },
    {
      title: i18n.t(LocaleHelper.getPickupPlanStatus()),
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: PickupPlanItem['status']) => (
        <Tag color={planStatusColorMap[status]}>{planStatusTextMap[status]}</Tag>
      ),
    },
    {
      title: i18n.t(LocaleHelper.getPickupPlanPushStatus()),
      dataIndex: 'pushStatus',
      key: 'pushStatus',
      width: 120,
      render: (status: PickupPlanItem['pushStatus']) => (
        <Tag color={status === 'PUSHED' ? 'green' : 'orange'}>{pushStatusTextMap[status]}</Tag>
      ),
    },
    {
      title: i18n.t(LocaleHelper.getPickupPlanAction()),
      key: 'action',
      fixed: 'right',
      width: 200,
      render: (_: any, record: PickupPlanItem) => (
        <Space size="middle">
          {record.status === 'PLANNED' && record.pushStatus === 'PENDING' ? (
            <>
              <a onClick={() => openAdjustDrawer(record)}>{i18n.t(LocaleHelper.getPickupPlanActionEdit())}</a>
              <a onClick={() => message.success(i18n.t(LocaleHelper.getPickupPlanActionPush()))}>{i18n.t(LocaleHelper.getPickupPlanActionPush())}</a>
            </>
          ) : (
            <>
              <a
                onClick={() => {
                  setSelectedPlan(record);
                  setPlanDetailVisible(true);
                }}
              >
                {i18n.t(LocaleHelper.getPickupPlanDetail())}
              </a>
              {(record.status === 'IN_PROGRESS' || record.status === 'DELAYED' || record.status === 'COMPLETED') && (
                <a onClick={() => openTrackingDrawer(record)}>{i18n.t(LocaleHelper.getPickupPlanActionTrack())}</a>
              )}
              {record.status === 'PLANNED' && record.pushStatus === 'PUSHED' && (
                <a onClick={() => openAdjustDrawer(record)}>{i18n.t(LocaleHelper.getPickupPlanActionAdjust())}</a>
              )}
            </>
          )}
        </Space>
      ),
    },
  ];

  const containerRequirementColumns = [
    {
      title: i18n.t(LocaleHelper.getPickupPlanGenerateContainerType()),
      dataIndex: 'containerType',
      key: 'containerType',
      width: 140,
      render: (value: string, record: { key: string }) => (
                  <Select
          value={value}
          style={{ width: '100%' }}
          options={[
            { label: i18n.t(LocaleHelper.getBookingContainerType20GP()), value: '20GP' },
            { label: i18n.t(LocaleHelper.getBookingContainerType40GP()), value: '40GP' },
            { label: i18n.t(LocaleHelper.getBookingContainerType40HQ()), value: '40HQ' },
            { label: i18n.t(LocaleHelper.getBookingContainerType45HQ()), value: '45HQ' },
          ]}
          onChange={(next) => {
            setContainerRequirements(prev => prev.map(item => (item.key === record.key ? { ...item, containerType: next } : item)));
          }}
        />
      ),
    },
    {
      title: i18n.t(LocaleHelper.getPickupPlanGenerateQuantity()),
      dataIndex: 'quantity',
      key: 'quantity',
      width: 120,
      render: (value: number, record: { key: string }) => (
        <InputNumber
          min={1}
          value={value}
          style={{ width: '100%' }}
          onChange={(next) => {
            const normalized = Number(next || 0);
            setContainerRequirements(prev => prev.map(item => (item.key === record.key ? { ...item, quantity: normalized } : item)));
          }}
        />
      ),
    },
    {
      title: i18n.t(LocaleHelper.getPickupPlanGenerateCondition()),
      dataIndex: 'condition',
      key: 'condition',
      width: 140,
      render: (value: string, record: { key: string }) => (
        <Input
          value={value}
          onChange={(event) => {
            const next = event.target.value;
            setContainerRequirements(prev => prev.map(item => (item.key === record.key ? { ...item, condition: next } : item)));
          }}
        />
      ),
    },
    {
      title: i18n.t(LocaleHelper.getPickupPlanGenerateSpecialRequirement()),
      dataIndex: 'specialRequirement',
      key: 'specialRequirement',
      render: (value: string, record: { key: string }) => (
        <Input
          value={value}
          onChange={(event) => {
            const next = event.target.value;
            setContainerRequirements(prev => prev.map(item => (item.key === record.key ? { ...item, specialRequirement: next } : item)));
          }}
        />
      ),
    },
    {
      title: i18n.t(LocaleHelper.getPickupPlanAction()),
      key: 'action',
      width: 100,
      render: (_: unknown, record: { key: string }) => (
        <Button type="link" onClick={() => handleDeleteRequirement(record.key)}>
          {i18n.t(LocaleHelper.getPickupPlanGenerateDeleteRequirement())}
        </Button>
      ),
    },
  ];

  const handleAddRequirement = () => {
    setContainerRequirements(prev => ([
      ...prev,
      { key: `${Date.now()}`, containerType: '40HQ', quantity: 1, condition: '', specialRequirement: '' },
    ]));
  };

  const handleDeleteRequirement = (targetKey: string) => {
    setContainerRequirements(prev => prev.filter(item => item.key !== targetKey));
  };

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <span className="bill-info-title" style={{ marginLeft: '10px' }}>
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
              {i18n.t(LocaleHelper.getPickupPlanTitle())}
            </span>
          </div>
        </div>
        <div className="header-button-area">
          <div className="buttonGroup-component">
            <div className="u-button-group">
              <Button type="primary" danger onClick={openGenerateDrawer}>
                {i18n.t(LocaleHelper.getPickupPlanListGenerate())}
              </Button>
              <Button onClick={handleBatchPush}>
                {i18n.t(LocaleHelper.getPickupPlanListBatchPush())}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: '0 20px 20px 20px' }}>
        <AdvancedSearchForm fields={fields as any} onSearch={handleSearch} />
        <div className="nc-bill-table-area">
          <Table<PickupPlanItem>
            columns={planColumns as any}
            dataSource={planList}
            rowKey="planId"
            rowSelection={{
              selectedRowKeys,
              onChange: (keys) => setSelectedRowKeys(keys),
              type: 'checkbox',
              columnWidth: 40,
            }}
            size="small"
            bordered={true}
            loading={loading}
            scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
            pagination={{
              size: 'small',
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
          {i18n.t(LocaleHelper.getPickupPlanListSummaryToday())}：{summaryData.todayPlans}
          <span style={{ marginLeft: 16 }}>
            {i18n.t(LocaleHelper.getPickupPlanListSummaryPendingPush())}：{summaryData.pendingPush}
          </span>
          <span style={{ marginLeft: 16 }}>
            {i18n.t(LocaleHelper.getPickupPlanListSummaryInProgress())}：{summaryData.inProgress}
          </span>
          <span style={{ marginLeft: 16 }}>
            {i18n.t(LocaleHelper.getPickupPlanListSummaryCompleted())}：{summaryData.completed}
          </span>
        </div>
      </div>
      <GeneratePlanModal
        open={generateVisible}
        onCancel={() => setGenerateVisible(false)}
        form={form}
        containerRequirements={containerRequirements}
        containerRequirementColumns={containerRequirementColumns}
        onGenerate={handleGenerate}
        onSave={handleSave}
        onAddRequirement={handleAddRequirement}
      />
      <AdjustPlanModal
        open={adjustVisible}
        onCancel={() => setAdjustVisible(false)}
        form={adjustForm}
        adjustReasonTypeOptions={adjustReasonTypeOptions}
        adjustReasonOptions={adjustReasonOptions}
        onAdjust={handleAdjust}
        onReoptimize={handleAdjustReoptimize}
        onAdjustCancel={handleAdjustCancel}
      />
      <PlanDetailModal
        open={planDetailVisible}
        onCancel={() => setPlanDetailVisible(false)}
        selectedPlan={selectedPlan}
        planStatusTextMap={planStatusTextMap}
      />
      <TrackingDetailModal
        open={trackingDetailVisible}
        onCancel={() => setTrackingDetailVisible(false)}
        selectedTracking={selectedTracking}
        trackingStatusTextMap={trackingStatusTextMap}
      />
    </div>
  );
};

export default PickupPlanManagement;

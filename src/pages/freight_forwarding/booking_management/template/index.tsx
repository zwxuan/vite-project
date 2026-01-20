import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Modal, Table, Tag, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import CustomIcon from '@/components/custom-icon';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import AdvancedSearchForm from '@/components/search-form';
import { getBookingTemplateList } from '@/api/freight_forwarding/booking_management/booking_service';
import { BookingTemplateItem } from '@/types/freight_forwarding/booking_management';
import '@/pages/page_list.less';

const BookingTemplate: React.FC = () => {
  const [data, setData] = useState<BookingTemplateItem[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadData({});
  }, []);

  const loadData = async (params: any) => {
    setLoading(true);
    try {
      const res = await getBookingTemplateList();
      if (res.success && res.data) {
        let list = res.data.list;
        if (params.transportMode) list = list.filter(item => item.transportMode === params.transportMode);
        if (params.templateType) list = list.filter(item => item.templateType === params.templateType);
        if (params.scope) list = list.filter(item => item.scope === params.scope);
        if (params.status) list = list.filter(item => item.status === params.status);
        if (params.templateName) list = list.filter(item => item.templateName.includes(params.templateName));
        setData(list);
      }
    } catch (error) {
      message.error('Load failed');
    }
    setLoading(false);
  };

  const handleSearch = (values: any) => {
    loadData(values);
  };

  const handleDetail = (record: BookingTemplateItem) => {
    navigate(`/booking_management/template/detail/${record.templateId}`);
  };

  const handleEdit = (record: BookingTemplateItem) => {
    navigate(`/booking_management/template/edit/${record.templateId}`);
  };

  const handleToggleStatus = (record: BookingTemplateItem) => {
    const nextStatus = record.status === 'ENABLED' ? 'DISABLED' : 'ENABLED';
    message.success(i18n.t(LocaleHelper.getBookingTemplateStatusChanged()));
    record.status = nextStatus;
    setData([...data]);
  };

  const handleDelete = (record: BookingTemplateItem) => {
    Modal.confirm({
      title: i18n.t(LocaleHelper.getBookingTemplateDelete()),
      content: `${i18n.t(LocaleHelper.getBookingTemplateDeleteConfirm())} ${record.templateName}?`,
      onOk: () => {
        setData(data.filter(item => item.templateId !== record.templateId));
        message.success(i18n.t(LocaleHelper.getBookingTemplateDeleted()));
      },
    });
  };

  const fields = useMemo(() => ([
    {
      type: 'input',
      label: i18n.t(LocaleHelper.getBookingTemplateName()),
      key: 'templateName',
    },
    {
      type: 'select',
      label: i18n.t(LocaleHelper.getBookingTemplateTransportMode()),
      key: 'transportMode',
      selectOptions: [
        { label: i18n.t(LocaleHelper.getBookingCommonAll()), value: '' },
        { label: 'SEA', value: 'SEA' },
        { label: 'AIR', value: 'AIR' },
        { label: 'RAIL', value: 'RAIL' },
      ],
    },
    {
      type: 'select',
      label: i18n.t(LocaleHelper.getBookingTemplateType()),
      key: 'templateType',
      selectOptions: [
        { label: i18n.t(LocaleHelper.getBookingCommonAll()), value: '' },
        { label: i18n.t(LocaleHelper.getBookingTemplateTypeBooking()), value: 'BOOKING' },
        { label: i18n.t(LocaleHelper.getBookingTemplateTypePickup()), value: 'PICKUP' },
        { label: i18n.t(LocaleHelper.getBookingTemplateTypeConfirmation()), value: 'CONFIRMATION' },
      ],
    },
    {
      type: 'select',
      label: i18n.t(LocaleHelper.getBookingTemplateScope()),
      key: 'scope',
      selectOptions: [
        { label: i18n.t(LocaleHelper.getBookingCommonAll()), value: '' },
        { label: i18n.t(LocaleHelper.getBookingTemplateScopeGlobal()), value: 'GLOBAL' },
        { label: i18n.t(LocaleHelper.getBookingTemplateScopePersonal()), value: 'PERSONAL' },
      ],
    },
    {
      type: 'select',
      label: i18n.t(LocaleHelper.getBookingTemplateStatus()),
      key: 'status',
      selectOptions: [
        { label: i18n.t(LocaleHelper.getBookingCommonAll()), value: '' },
        { label: i18n.t(LocaleHelper.getBookingTemplateStatusEnabled()), value: 'ENABLED' },
        { label: i18n.t(LocaleHelper.getBookingTemplateStatusDisabled()), value: 'DISABLED' },
      ],
    },
  ]), []);

  const columns = [
    {
      title: i18n.t(LocaleHelper.getBookingTemplateName()),
      dataIndex: 'templateName',
      key: 'templateName',
      width: 180,
      render: (name: string, record: BookingTemplateItem) => (
        <Button type="link" onClick={() => handleDetail(record)}>
          {name}
        </Button>
      ),
    },
    {
      title: i18n.t(LocaleHelper.getBookingTemplateTransportMode()),
      dataIndex: 'transportMode',
      key: 'transportMode',
      width: 100,
    },
    {
      title: i18n.t(LocaleHelper.getBookingTemplateType()),
      dataIndex: 'templateType',
      key: 'templateType',
      width: 120,
    },
    {
      title: i18n.t(LocaleHelper.getBookingTemplateScope()),
      dataIndex: 'scope',
      key: 'scope',
      width: 120,
    },
    {
      title: i18n.t(LocaleHelper.getBookingTemplateStatus()),
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: BookingTemplateItem['status']) => (
        <Tag color={status === 'ENABLED' ? 'green' : 'default'}>
          {status === 'ENABLED' ? i18n.t(LocaleHelper.getBookingTemplateStatusEnabled()) : i18n.t(LocaleHelper.getBookingTemplateStatusDisabled())}
        </Tag>
      ),
    },
    {
      title: i18n.t(LocaleHelper.getBookingTemplateUpdatedBy()),
      dataIndex: 'updatedBy',
      key: 'updatedBy',
      width: 120,
    },
    {
      title: i18n.t(LocaleHelper.getBookingTemplateUpdateTime()),
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 140,
    },
    {
      title: i18n.t(LocaleHelper.getBookingTemplateAction()),
      key: 'action',
      fixed: 'right',
      width: 220,
      render: (_: any, record: BookingTemplateItem) => (
        <>
          <Button type="link" onClick={() => handleDetail(record)}>
            {i18n.t(LocaleHelper.getBookingTemplateDetail())}
          </Button>
          <Button type="link" onClick={() => handleEdit(record)}>
            {i18n.t(LocaleHelper.getBookingTemplateEdit())}
          </Button>
          <Button type="link" onClick={() => handleToggleStatus(record)}>
            {record.status === 'ENABLED' ? i18n.t(LocaleHelper.getBookingTemplateDisable()) : i18n.t(LocaleHelper.getBookingTemplateEnable())}
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record)}>
            {i18n.t(LocaleHelper.getBookingTemplateDelete())}
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap">
            <span className="bill-info-title" style={{ marginLeft: '10px' }}>
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
              {i18n.t(LocaleHelper.getBookingTemplateTitle())}
            </span>
          </div>
        </div>
        <div className="header-button-area">
          <div className="buttonGroup-component">
            <div className="u-button-group">
              <Button type="primary" danger onClick={() => navigate('/booking_management/template/create')}>
                {i18n.t(LocaleHelper.getBookingTemplateNew())}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 20px 20px 20px' }}>
        <Card bordered={false} style={{ marginBottom: 16 }}>
          <AdvancedSearchForm fields={fields as any} onSearch={handleSearch} />
        </Card>
        <div className="nc-bill-table-area">
          <Table<BookingTemplateItem>
            columns={columns as any}
            dataSource={data}
            rowKey="templateId"
            size="small"
            bordered={true}
            loading={loading}
            scroll={{ x: 'max-content', y: 'calc(100vh - 420px)' }}
            pagination={{ size: 'small', showQuickJumper: true, showSizeChanger: true }}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingTemplate;

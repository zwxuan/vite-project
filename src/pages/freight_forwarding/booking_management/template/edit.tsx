import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Checkbox, Col, Form, Input, List, Row, Select, Table, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import CustomIcon from '@/components/custom-icon';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { getBookingTemplateList } from '@/api/freight_forwarding/booking_management/booking_service';
import { BookingTemplateItem } from '@/types/freight_forwarding/booking_management';
import '@/pages/page_list.less';

const BookingTemplateEdit: React.FC = () => {
  const [form] = Form.useForm<any>();
  const [loading, setLoading] = useState(false);
  const [fieldConfig, setFieldConfig] = useState<Array<{
    key: string;
    fieldName: string;
    required: boolean;
    defaultValue: string;
    rule: string;
  }>>([]);
  const [approvalFlow, setApprovalFlow] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<Array<{ key: string; label: string; checked: boolean }>>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const isCreate = !id;

  const getTemplateConfig = (template?: BookingTemplateItem | null) => {
    const base = {
      applicableRoute: '上海-洛杉矶航线',
      defaultCarrier: 'COSCO',
      serviceType: 'CY-CY',
      transportTerms: 'FCL',
      fieldConfig: [
        { key: '1', fieldName: '起运港', required: true, defaultValue: '上海港', rule: '限制港口列表' },
        { key: '2', fieldName: '目的港', required: true, defaultValue: '-', rule: '限制港口列表' },
        { key: '3', fieldName: '箱型', required: true, defaultValue: '40HQ', rule: '20GP,40GP,40HQ,45HQ' },
        { key: '4', fieldName: '危险品标识', required: false, defaultValue: '否', rule: '是/否' },
        { key: '5', fieldName: '货物描述', required: true, defaultValue: '-', rule: '最少10字符' },
      ],
      approvalFlow: [
        '订舱金额 < $5000：操作员直接提交',
        '订舱金额 ≥ $5000：需要主管审批',
        '危险品货物：需要安全主管审批',
      ],
      notifications: [
        { key: 'n1', label: '订舱确认后通知客户', checked: true },
        { key: 'n2', label: '开船前24小时提醒', checked: true },
        { key: 'n3', label: '异常情况立即通知', checked: true },
        { key: 'n4', label: '到港后通知客户', checked: true },
      ],
    };
    if (!template) {
      return base;
    }
    const byTemplateId: Record<string, typeof base> = {
      'T-001': base,
      'T-002': {
        ...base,
        applicableRoute: '上海-汉堡航线',
        defaultCarrier: 'MSC',
      },
      'T-003': {
        ...base,
        applicableRoute: '郑州-汉堡航线',
        defaultCarrier: '中铁集装箱',
      },
      'T-004': {
        ...base,
        applicableRoute: '通用',
        defaultCarrier: '通用',
      },
    };
    return byTemplateId[template.templateId] || base;
  };

  const fieldColumns = useMemo(() => ([
    {
      title: i18n.t(LocaleHelper.getBookingTemplateFieldName()),
      dataIndex: 'fieldName',
      key: 'fieldName',
      render: (value: string, record: { key: string }) => (
        <Input
          value={value}
          onChange={(event) => {
            const next = event.target.value;
            setFieldConfig(prev => prev.map(item => (item.key === record.key ? { ...item, fieldName: next } : item)));
          }}
        />
      ),
    },
    {
      title: i18n.t(LocaleHelper.getBookingTemplateFieldRequired()),
      dataIndex: 'required',
      key: 'required',
      width: 140,
      render: (value: boolean, record: { key: string }) => (
        <Select
          value={value}
          options={[
            { label: i18n.t(LocaleHelper.getBookingTemplateRequiredYes()), value: true },
            { label: i18n.t(LocaleHelper.getBookingTemplateRequiredNo()), value: false },
          ]}
          onChange={(next) => {
            setFieldConfig(prev => prev.map(item => (item.key === record.key ? { ...item, required: next } : item)));
          }}
        />
      ),
    },
    {
      title: i18n.t(LocaleHelper.getBookingTemplateFieldDefault()),
      dataIndex: 'defaultValue',
      key: 'defaultValue',
      width: 160,
      render: (value: string, record: { key: string }) => (
        <Input
          value={value}
          onChange={(event) => {
            const next = event.target.value;
            setFieldConfig(prev => prev.map(item => (item.key === record.key ? { ...item, defaultValue: next } : item)));
          }}
        />
      ),
    },
    {
      title: i18n.t(LocaleHelper.getBookingTemplateFieldRule()),
      dataIndex: 'rule',
      key: 'rule',
      render: (value: string, record: { key: string }) => (
        <Input
          value={value}
          onChange={(event) => {
            const next = event.target.value;
            setFieldConfig(prev => prev.map(item => (item.key === record.key ? { ...item, rule: next } : item)));
          }}
        />
      ),
    },
  ]), []);

  useEffect(() => {
    if (!isCreate) {
      loadDetail();
    } else {
      const config = getTemplateConfig();
      form.setFieldsValue({
        transportMode: 'SEA',
        templateType: 'BOOKING',
        scope: 'GLOBAL',
        status: 'ENABLED',
        applicableRoute: config.applicableRoute,
        defaultCarrier: config.defaultCarrier,
        serviceType: config.serviceType,
        transportTerms: config.transportTerms,
      });
      setFieldConfig(config.fieldConfig);
      setApprovalFlow(config.approvalFlow);
      setNotifications(config.notifications);
    }
  }, [id]);

  const loadDetail = async () => {
    setLoading(true);
    try {
      const res = await getBookingTemplateList();
      if (res.success && res.data) {
        const found = res.data.list.find(item => item.templateId === id);
        if (found) {
          const config = getTemplateConfig(found);
          form.setFieldsValue({
            ...found,
            applicableRoute: config.applicableRoute,
            defaultCarrier: config.defaultCarrier,
            serviceType: config.serviceType,
            transportTerms: config.transportTerms,
          });
          setFieldConfig(config.fieldConfig);
          setApprovalFlow(config.approvalFlow);
          setNotifications(config.notifications);
        }
      }
    } catch (error) {
      message.error('Load failed');
    }
    setLoading(false);
  };

  const handleSave = async () => {
    try {
      await form.validateFields();
      message.success(i18n.t(LocaleHelper.getBookingTemplateSave()));
      navigate('/booking_management/template');
    } catch (error) {
      return;
    }
  };

  const handleCancel = () => {
    navigate('/booking_management/template');
  };

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap">
            <span className="bill-info-title" style={{ marginLeft: '10px' }}>
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
              {isCreate ? i18n.t(LocaleHelper.getBookingTemplateNew()) : i18n.t(LocaleHelper.getBookingTemplateEdit())}
            </span>
          </div>
        </div>
        <div className="header-button-area">
          <div className="buttonGroup-component">
            <div className="u-button-group">
              <Button type="primary" onClick={handleSave} loading={loading}>
                {i18n.t(LocaleHelper.getBookingTemplateSave())}
              </Button>
              <Button onClick={handleCancel}>
                {i18n.t(LocaleHelper.getBookingTemplateCancel())}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 20px 20px 20px' }}>
        <Card bordered={false} loading={loading} title={i18n.t(LocaleHelper.getBookingTemplateBasicSettings())} style={{ marginBottom: 16 }}>
          <Form form={form} layout="vertical">
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item label={i18n.t(LocaleHelper.getBookingTemplateName())} name="templateName" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={i18n.t(LocaleHelper.getBookingTemplateApplicableRoute())} name="applicableRoute" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={i18n.t(LocaleHelper.getBookingTemplateDefaultCarrier())} name="defaultCarrier" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={i18n.t(LocaleHelper.getBookingTemplateTransportMode())} name="transportMode" rules={[{ required: true }]}>
                  <Select options={[
                    { label: 'SEA', value: 'SEA' },
                    { label: 'AIR', value: 'AIR' },
                    { label: 'RAIL', value: 'RAIL' },
                  ]} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={i18n.t(LocaleHelper.getBookingTemplateServiceType())} name="serviceType" rules={[{ required: true }]}>
                  <Select options={[
                    { label: i18n.t(LocaleHelper.getBookingServiceTypeCyCy()), value: 'CY-CY' },
                    { label: i18n.t(LocaleHelper.getBookingServiceTypeDoorDoor()), value: 'DOOR-DOOR' },
                  ]} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={i18n.t(LocaleHelper.getBookingTemplateTransportTerms())} name="transportTerms" rules={[{ required: true }]}>
                  <Select options={[
                    { label: i18n.t(LocaleHelper.getBookingTransportTermsFcl()), value: 'FCL' },
                    { label: i18n.t(LocaleHelper.getBookingTransportTermsLcl()), value: 'LCL' },
                  ]} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={i18n.t(LocaleHelper.getBookingTemplateType())} name="templateType" rules={[{ required: true }]}>
                  <Select options={[
                    { label: i18n.t(LocaleHelper.getBookingTemplateTypeBooking()), value: 'BOOKING' },
                    { label: i18n.t(LocaleHelper.getBookingTemplateTypePickup()), value: 'PICKUP' },
                    { label: i18n.t(LocaleHelper.getBookingTemplateTypeConfirmation()), value: 'CONFIRMATION' },
                  ]} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={i18n.t(LocaleHelper.getBookingTemplateScope())} name="scope" rules={[{ required: true }]}>
                  <Select options={[
                    { label: i18n.t(LocaleHelper.getBookingTemplateScopeGlobal()), value: 'GLOBAL' },
                    { label: i18n.t(LocaleHelper.getBookingTemplateScopePersonal()), value: 'PERSONAL' },
                  ]} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={i18n.t(LocaleHelper.getBookingTemplateStatus())} name="status" rules={[{ required: true }]}>
                  <Select options={[
                    { label: i18n.t(LocaleHelper.getBookingTemplateStatusEnabled()), value: 'ENABLED' },
                    { label: i18n.t(LocaleHelper.getBookingTemplateStatusDisabled()), value: 'DISABLED' },
                  ]} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={i18n.t(LocaleHelper.getBookingTemplateUpdatedBy())} name="updatedBy">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={i18n.t(LocaleHelper.getBookingTemplateUpdateTime())} name="updateTime">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card bordered={false} title={i18n.t(LocaleHelper.getBookingTemplateFieldConfig())} style={{ marginBottom: 16 }}>
          <Table
            columns={fieldColumns}
            dataSource={fieldConfig}
            rowKey="key"
            size="small"
            pagination={false}
          />
        </Card>
        <Card bordered={false} title={i18n.t(LocaleHelper.getBookingTemplateApprovalFlow())} style={{ marginBottom: 16 }}>
          <List
            dataSource={approvalFlow}
            renderItem={(item, index) => (
              <List.Item>
                <Input
                  value={item}
                  onChange={(event) => {
                    const next = event.target.value;
                    setApprovalFlow(prev => prev.map((value, idx) => (idx === index ? next : value)));
                  }}
                />
              </List.Item>
            )}
          />
        </Card>
        <Card bordered={false} title={i18n.t(LocaleHelper.getBookingTemplateNotificationSettings())}>
          <List
            dataSource={notifications}
            renderItem={(item) => (
              <List.Item>
                <Checkbox
                  checked={item.checked}
                  onChange={(event) => {
                    const next = event.target.checked;
                    setNotifications(prev => prev.map(value => (value.key === item.key ? { ...value, checked: next } : value)));
                  }}
                >
                  {item.label}
                </Checkbox>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
};

export default BookingTemplateEdit;

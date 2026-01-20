import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Checkbox, Descriptions, List, Table, Tag, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import CustomIcon from '@/components/custom-icon';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { getBookingTemplateList } from '@/api/freight_forwarding/booking_management/booking_service';
import { BookingTemplateItem } from '@/types/freight_forwarding/booking_management';
import '@/pages/page_list.less';

const BookingTemplateDetail: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState<BookingTemplateItem | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const detailConfig = useMemo(() => {
    const fieldConfig = [
      { fieldName: '起运港', required: true, defaultValue: '上海港', rule: '限制港口列表' },
      { fieldName: '目的港', required: true, defaultValue: '-', rule: '限制港口列表' },
      { fieldName: '箱型', required: true, defaultValue: '40HQ', rule: '20GP,40GP,40HQ,45HQ' },
      { fieldName: '危险品标识', required: false, defaultValue: '否', rule: '是/否' },
      { fieldName: '货物描述', required: true, defaultValue: '-', rule: '最少10字符' },
    ];
    const base = {
      applicableRoute: '上海-洛杉矶航线',
      defaultCarrier: 'COSCO',
      serviceType: 'CY-CY',
      transportTerms: 'FCL',
      fieldConfig,
      approvalFlow: [
        '订舱金额 < $5000：操作员直接提交',
        '订舱金额 ≥ $5000：需要主管审批',
        '危险品货物：需要安全主管审批',
      ],
      notifications: [
        '订舱确认后通知客户',
        '开船前24小时提醒',
        '异常情况立即通知',
        '到港后通知客户',
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
  }, [template]);

  const fieldColumns = [
    {
      title: i18n.t(LocaleHelper.getBookingTemplateFieldName()),
      dataIndex: 'fieldName',
      key: 'fieldName',
    },
    {
      title: i18n.t(LocaleHelper.getBookingTemplateFieldRequired()),
      dataIndex: 'required',
      key: 'required',
      width: 120,
      render: (required: boolean) =>
        required ? i18n.t(LocaleHelper.getBookingTemplateRequiredYes()) : i18n.t(LocaleHelper.getBookingTemplateRequiredNo()),
    },
    {
      title: i18n.t(LocaleHelper.getBookingTemplateFieldDefault()),
      dataIndex: 'defaultValue',
      key: 'defaultValue',
      width: 160,
    },
    {
      title: i18n.t(LocaleHelper.getBookingTemplateFieldRule()),
      dataIndex: 'rule',
      key: 'rule',
    },
  ];

  useEffect(() => {
    loadDetail();
  }, [id]);

  const loadDetail = async () => {
    setLoading(true);
    try {
      const res = await getBookingTemplateList();
      if (res.success && res.data) {
        const found = res.data.list.find(item => item.templateId === id) || null;
        setTemplate(found);
        if (!found) {
          message.warning(i18n.t(LocaleHelper.getBookingTemplateDetail()));
        }
      }
    } catch (error) {
      message.error('Load failed');
    }
    setLoading(false);
  };

  const handleEdit = () => {
    if (template) {
      navigate(`/booking_management/template/edit/${template.templateId}`);
    }
  };

  const handleBack = () => {
    navigate('/booking_management/template');
  };

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap">
            <span className="bill-info-title" style={{ marginLeft: '10px' }}>
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
              {i18n.t(LocaleHelper.getBookingTemplateDetail())}
            </span>
          </div>
        </div>
        <div className="header-button-area">
          <div className="buttonGroup-component">
            <div className="u-button-group">
              <Button type="primary" onClick={handleEdit} disabled={!template}>
                {i18n.t(LocaleHelper.getBookingTemplateEdit())}
              </Button>
              <Button onClick={handleBack}>{i18n.t(LocaleHelper.getBookingTemplateBack())}</Button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 20px 20px 20px' }}>
        <Card bordered={false} loading={loading} title={i18n.t(LocaleHelper.getBookingTemplateBasicSettings())} style={{ marginBottom: 16 }}>
          <Descriptions column={3} size="small">
            <Descriptions.Item label={i18n.t(LocaleHelper.getBookingTemplateName())}>
              {template?.templateName || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getBookingTemplateApplicableRoute())}>
              {detailConfig.applicableRoute}
            </Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getBookingTemplateDefaultCarrier())}>
              {detailConfig.defaultCarrier}
            </Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getBookingTemplateServiceType())}>
              {detailConfig.serviceType}
            </Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getBookingTemplateTransportTerms())}>
              {detailConfig.transportTerms}
            </Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getBookingTemplateTransportMode())}>
              {template?.transportMode || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getBookingTemplateType())}>
              {template?.templateType || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getBookingTemplateScope())}>
              {template?.scope || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getBookingTemplateStatus())}>
              <Tag color={template?.status === 'ENABLED' ? 'green' : 'default'}>
                {template?.status === 'ENABLED' ? i18n.t(LocaleHelper.getBookingTemplateStatusEnabled()) : i18n.t(LocaleHelper.getBookingTemplateStatusDisabled())}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getBookingTemplateUpdatedBy())}>
              {template?.updatedBy || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getBookingTemplateUpdateTime())}>
              {template?.updateTime || '-'}
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <Card bordered={false} title={i18n.t(LocaleHelper.getBookingTemplateFieldConfig())} style={{ marginBottom: 16 }}>
          <Table
            columns={fieldColumns}
            dataSource={detailConfig.fieldConfig}
            rowKey="fieldName"
            size="small"
            pagination={false}
          />
        </Card>
        <Card bordered={false} title={i18n.t(LocaleHelper.getBookingTemplateApprovalFlow())} style={{ marginBottom: 16 }}>
          <List
            dataSource={detailConfig.approvalFlow}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </Card>
        <Card bordered={false} title={i18n.t(LocaleHelper.getBookingTemplateNotificationSettings())}>
          <List
            dataSource={detailConfig.notifications}
            renderItem={(item) => (
              <List.Item>
                <Checkbox checked disabled>
                  {item}
                </Checkbox>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
};

export default BookingTemplateDetail;

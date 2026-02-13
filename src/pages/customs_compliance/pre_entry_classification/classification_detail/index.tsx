import React, { useEffect, useState } from 'react';
import { Card, Button, Form, Input, Row, Col, Table, message, Tooltip, Descriptions, Divider, Spin, Tabs, Tag, Alert, Empty, Badge, Image } from 'antd';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import {
  getClassificationDetail,
  getHistoryReference,
  saveClassification,
  submitReview,
  approveReview,
  rejectReview,
} from '@/api/customs_compliance/pre_entry_classification/classification_detail_service';
import { ClassificationDetail as ClassificationDetailType, HistoryReference } from '@/types/customs_compliance/pre_entry_classification/classification_detail';
import '@/pages/page_list.less';

const { TextArea } = Input;

const ClassificationDetail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const mode = searchParams.get('mode') || 'view';
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<ClassificationDetailType | null>(null);
  const [historyData, setHistoryData] = useState<HistoryReference[]>([]);
  const [form] = Form.useForm();

  const isView = mode === 'view';
  const isReview = mode === 'review';
  const isEdit = mode === 'edit';

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  const fetchData = async (detailId: string) => {
    setLoading(true);
    try {
      const res = await getClassificationDetail(detailId);
      if (res.success) {
        setDetail(res.data);
        form.setFieldsValue(res.data.expert_classification);
      }
      const historyRes = await getHistoryReference({ id: detailId });
      if (historyRes.success) {
        setHistoryData(historyRes.data);
      }
    } catch (error) {
      message.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      await saveClassification({ ...values, id });
      message.success('Saved successfully');
    } catch (error) {
      // Validation failed
    }
  };

  const handleSubmitReview = async () => {
     try {
        await submitReview(id!);
        message.success('Submitted for review');
        navigate(-1);
     } catch(error) {
         message.error('Failed to submit');
     }
  };

  const handleApprove = async () => {
      try {
          const values = await form.validateFields(['review_opinion']);
          await approveReview(id!, values.review_opinion);
          message.success('Review approved');
          navigate(-1);
      } catch (error) {
          message.error('Failed to approve');
      }
  };

  const handleReject = async () => {
      try {
          const values = await form.validateFields(['review_opinion']);
          if (!values.review_opinion) {
              message.error('Please provide review opinion for rejection');
              return;
          }
          await rejectReview(id!, values.review_opinion);
          message.success('Review rejected');
          navigate(-1);
      } catch (error) {
          message.error('Failed to reject');
      }
  };

  const historyColumns = [
    { title: i18n.t(LocaleHelper.getClassificationDetailSimilarProduct()), dataIndex: 'similar_product', ellipsis: true },
    { title: i18n.t(LocaleHelper.getClassificationDetailHsCode()), dataIndex: 'hs_code', width: 120 },
    { title: i18n.t(LocaleHelper.getClassificationDetailMatchRate()), dataIndex: 'match_rate', width: 100, render: (text: string) => <Tag color={parseFloat(text) > 90 ? 'green' : 'orange'}>{text}</Tag> },
    {
      title: i18n.t(LocaleHelper.getClassificationDetailAction()),
      width: 100,
      render: (_: any, record: HistoryReference) => (
        <a onClick={() => form.setFieldsValue({ hs_code: record.hs_code })}>
          {i18n.t(LocaleHelper.getClassificationDetailReference())}
        </a>
      ),
    },
  ];

  const renderProductInfo = () => (
    <Card title={i18n.t(LocaleHelper.getClassificationDetailBasicInfo())} className="mb-4" bordered={false}>
      <Descriptions column={2} bordered size="small" labelStyle={{ width: '120px' }}>
        <Descriptions.Item label={i18n.t(LocaleHelper.getClassificationDetailPreEntryNo())}>{detail?.pre_entry_no}</Descriptions.Item>
        <Descriptions.Item label={i18n.t(LocaleHelper.getClassificationDetailSeqNo())}>{detail?.seq_no}</Descriptions.Item>
        <Descriptions.Item label={i18n.t(LocaleHelper.getClassificationDetailProductName())}>
            <span style={{ fontWeight: 'bold' }}>{detail?.product_name}</span>
        </Descriptions.Item>
        <Descriptions.Item label={i18n.t(LocaleHelper.getClassificationDetailBrand())}>{detail?.brand}</Descriptions.Item>
        <Descriptions.Item label={i18n.t(LocaleHelper.getClassificationDetailSpec())} span={2}>{detail?.spec_model}</Descriptions.Item>
        <Descriptions.Item label={i18n.t(LocaleHelper.getClassificationDetailUsage())} span={2}>{detail?.usage}</Descriptions.Item>
        <Descriptions.Item label={i18n.t(LocaleHelper.getClassificationDetailMaterial())}>{detail?.material}</Descriptions.Item>
        <Descriptions.Item label={i18n.t(LocaleHelper.getClassificationDetailWeight())}>{detail?.weight}</Descriptions.Item>
        <Descriptions.Item label={i18n.t(LocaleHelper.getClassificationDetailDimensions())}>{detail?.dimensions}</Descriptions.Item>
      </Descriptions>
      <Divider style={{ margin: '16px 0' }}>{i18n.t(LocaleHelper.getClassificationDetailDesc())}</Divider>
      <div style={{ backgroundColor: '#fafafa', padding: '12px', borderRadius: '4px', border: '1px solid #f0f0f0' }}>
          {detail?.description || <span style={{ color: '#ccc' }}>No description</span>}
      </div>
      <Divider style={{ margin: '16px 0' }}>{i18n.t(LocaleHelper.getClassificationDetailImages())}</Divider>
       <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {detail?.images && detail.images.length > 0 ? (
                detail.images.map((img, idx) => <Image key={idx} width={100} src={img} />)
            ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无图片" style={{ margin: 0 }} />
            )}
       </div>
    </Card>
  );

  const renderAIAnalysis = () => (
      <Card title={i18n.t(LocaleHelper.getClassificationDetailAiSuggestion())} bordered={false} className="mb-4">
          <Alert
            message="AI 智能归类建议"
            description={
                <div style={{ marginTop: 8 }}>
                    建议归类为 <Tag color="blue" style={{ fontSize: '14px', fontWeight: 'bold' }}>{detail?.ai_suggestion.hs_code}</Tag>，
                    置信度为 <b>{detail?.ai_suggestion.confidence}</b>。
                </div>
            }
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
          <Descriptions column={1} size="small">
            <Descriptions.Item label={i18n.t(LocaleHelper.getClassificationDetailReason())}>
                {detail?.ai_suggestion.reason}
            </Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getClassificationDetailTaxRates())}>
                {detail?.ai_suggestion.tax_rates}
            </Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getClassificationDetailRegulatoryConditions())}>
                {detail?.ai_suggestion.regulatory_conditions}
            </Descriptions.Item>
          </Descriptions>
      </Card>
  );

  const renderExpertForm = () => (
      <Card
        title={i18n.t(LocaleHelper.getClassificationDetailExpertClassification())}
        bordered={false}
        className="mb-4"
        extra={<Badge status={isView ? "default" : "processing"} text={isView ? "查看模式" : (isReview ? "审核模式" : "归类中")} />}
      >
        <Form form={form} layout="vertical" disabled={isView && !isReview}>
            <Form.Item
                label={i18n.t(LocaleHelper.getClassificationDetailConfirmHsCode())}
                name="hs_code"
                rules={[{ required: true }]}
                tooltip="请输入最终确定的商品编码"
            >
                <Input
                        placeholder="请输入 HS Code"
                        addonAfter={
                            <>
                            <a style={{ marginRight: 8 }}>{i18n.t(LocaleHelper.getClassificationDetailTariffSearch())}</a>
                            <a>{i18n.t(LocaleHelper.getClassificationDetailCodeVerify())}</a>
                            </>
                        }
                        disabled={isReview} // Reviewer cannot change HS code directly? Or maybe they can? Let's assume they can't, they just approve/reject. Or usually they can correct it. Let's make it disabled for now to force rejection if wrong. Or maybe better to allow correction. The user asked "how to operate". Usually "Review" means verify. If wrong, reject.
                        // Actually, if I disable it, I should verify the "disabled" prop on Form.
                        // Line 156: <Form ... disabled={isView}>. I changed it to disabled={isView && !isReview}.
                        // So if isReview is true, form is NOT disabled.
                        // But I want HS code to be read-only for reviewer?
                        // Let's make HS code and Rationale disabled for Reviewer, but Review Opinion enabled.
                />
            </Form.Item>
            <Form.Item
                label={i18n.t(LocaleHelper.getClassificationDetailRationale())}
                name="rationale"
                rules={[{ required: true }]}
            >
                <TextArea rows={6} placeholder="请输入归类依据..." showCount maxLength={500} disabled={isReview} />
            </Form.Item>
            {(isView || isReview) && (
                    <Form.Item label={i18n.t(LocaleHelper.getClassificationDetailReviewOpinion())} name="review_opinion">
                        <TextArea rows={2} readOnly={isView} placeholder={isReview ? "请输入审核意见" : ""} style={isView ? { backgroundColor: '#fffbe6', borderColor: '#ffe58f' } : {}} />
                    </Form.Item>
            )}
        </Form>
      </Card>
  );

  const renderReferences = () => (
      <Card title="参考信息" bordered={false} bodyStyle={{ padding: 0 }}>
          <Tabs
            defaultActiveKey="history"
            items={[
                {
                    key: 'history',
                    label: i18n.t(LocaleHelper.getClassificationDetailHistoryReference()),
                    children: (
                        <Table
                            columns={historyColumns}
                            dataSource={historyData}
                            rowKey="id"
                            pagination={false}
                            size="small"
                            scroll={{ y: 200 }}
                        />
                    )
                },
                {
                    key: 'similar',
                    label: '相似商品',
                    children: <Empty description="暂无相似商品数据" />
                }
            ]}
            tabBarStyle={{ padding: '0 16px' }}
          />
      </Card>
  );

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)', backgroundColor: '#f0f2f5' }}>
       <div className="nc-bill-header-area" style={{ marginBottom: 16, backgroundColor: '#fff' }}>
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <span className="bill-info-title" style={{ display: 'flex', alignItems: 'center' }}>
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px', marginRight: '8px' }} />
              <span>{i18n.t(LocaleHelper.getClassificationDetailPageTitle())}</span>
              <Divider type="vertical" />
              <span style={{ fontSize: '14px', fontWeight: 'normal', color: '#666' }}>{detail?.product_name}</span>
            </span>
          </div>
        </div>
        <div className="header-button-area">
             <span className="button-app-wrapper"></span>
             <div className="buttonGroup-component">
                <div className="u-button-group">
                    {isEdit && (
                        <>
                            <Button type="primary" onClick={handleSave}>{i18n.t(LocaleHelper.getClassificationDetailSave())}</Button>
                            <Button  onClick={handleSubmitReview}>{i18n.t(LocaleHelper.getClassificationDetailSubmitReview())}</Button>
                        </>
                    )}
                    {isReview && (
                        <>
                            <Button type="primary" onClick={handleApprove}>{i18n.t(LocaleHelper.getClassificationDetailApprove())}</Button>
                            <Button  type="primary"  danger onClick={handleReject}>{i18n.t(LocaleHelper.getClassificationDetailReject())}</Button>
                        </>
                    )}
                     <Button onClick={() => navigate(-1)}>返回</Button>
                </div>
             </div>
        </div>
      </div>
      
      <Spin spinning={loading}>
        <div style={{ padding: '0 24px 24px' }}>
          <Row gutter={24}>
            {/* Left Column: Product Info & AI */}
            <Col span={15}>
                {renderProductInfo()}
                {renderAIAnalysis()}
            </Col>

            {/* Right Column: Expert Form & Refs */}
            <Col span={9}>
                {renderExpertForm()}
                {renderReferences()}
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
};

export default ClassificationDetail;
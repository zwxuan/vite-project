
import React, { useEffect, useState } from 'react';
import { Button, Spin, Card, Descriptions, Radio, Input, Checkbox, Select, message, Row, Col } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { DocumentService } from "@/api/freight_forwarding/document_management/document_service";
import { DocumentDetail as DocumentDetailType } from "@/types/freight_forwarding/document_management";
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

const { TextArea } = Input;

const ReviewDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [data, setData] = useState<DocumentDetailType | null>(null);
    const [loading, setLoading] = useState(false);
    const [reviewResult, setReviewResult] = useState<'pass' | 'reject' | 'modify'>('pass');
    const [comment, setComment] = useState('');
    const [needSignature, setNeedSignature] = useState(false);
    const [signer, setSigner] = useState('');

    useEffect(() => {
        if (id) {
            setLoading(true);
            DocumentService.getDocumentDetail(id).then(res => {
                if (res.success) {
                    setData(res.data);
                }
                setLoading(false);
            });
        }
    }, [id]);

    const handleSubmit = () => {
        const resultText = reviewResult === 'pass' ? '通过' : reviewResult === 'reject' ? '驳回' : '需修改';
        message.success(`审核结果：${resultText}，已提交`);
        navigate('/document_management/review');
    };

    const handleCancel = () => {
        navigate('/document_management/review');
    };

    if (loading || !data) {
        return <Spin style={{ width: '100%', marginTop: 100 }} />;
    }

    return (
        <div style={{ height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div className="nc-bill-header-area" style={{ flexShrink: 0 }}>
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getDocumentReviewDetail())} - {data.code}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button onClick={handleCancel}>Back</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', backgroundColor: '#f0f2f5' }}>
                <Row gutter={16}>
                    {/* Left: Document Detail & Preview */}
                    <Col span={14}>
                        {/* Document Detail */}
                        <Card title={i18n.t(LocaleHelper.getDocumentReviewDetail())} style={{ marginBottom: 16 }}>
                            <Descriptions column={2} size="small">
                                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentListType())}>{data.type}</Descriptions.Item>
                                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentListWaybillNo())}>{data.waybill_no}</Descriptions.Item>
                                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentListCustomer())}>{data.customer}</Descriptions.Item>
                                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentListCarrier())}>{data.carrier}</Descriptions.Item>
                            </Descriptions>
                        </Card>

                        {/* Shipper & Consignee */}
                        <Card title={i18n.t(LocaleHelper.getDocumentReviewShipper()) + ' / ' + i18n.t(LocaleHelper.getDocumentReviewConsignee())} style={{ marginBottom: 16 }}>
                            <Descriptions column={2} size="small">
                                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentReviewShipper())}>DEF公司</Descriptions.Item>
                                <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentReviewConsignee())}>GHI TRADING</Descriptions.Item>
                            </Descriptions>
                        </Card>

                        {/* Cargo Info */}
                        <Card title={i18n.t(LocaleHelper.getDocumentReviewCargoInfo())} style={{ marginBottom: 16 }}>
                            <Descriptions column={3} size="small">
                                <Descriptions.Item label="货物">机械设备</Descriptions.Item>
                                <Descriptions.Item label="重量">8,500 KG</Descriptions.Item>
                                <Descriptions.Item label="体积">45 CBM</Descriptions.Item>
                            </Descriptions>
                        </Card>

                        {/* Route Info */}
                        <Card title={i18n.t(LocaleHelper.getDocumentReviewRouteInfo())} style={{ marginBottom: 16 }}>
                            <Descriptions column={2} size="small">
                                <Descriptions.Item label="路线">{data.pol || '青岛港'} → {data.pod || '汉堡港'}</Descriptions.Item>
                                <Descriptions.Item label="船名">{data.vessel || 'COSCO HAMBURG'}</Descriptions.Item>
                            </Descriptions>
                        </Card>

                        {/* PDF Preview */}
                        <Card title={i18n.t(LocaleHelper.getDocumentReviewPreview())}>
                            <div style={{
                                border: '1px solid #d9d9d9',
                                borderRadius: 4,
                                height: 300,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#fafafa'
                            }}>
                                <div style={{ textAlign: 'center', color: '#999' }}>
                                    <div style={{ fontSize: 24, marginBottom: 8 }}>📄</div>
                                    <div>BILL OF LADING</div>
                                    <div style={{ marginTop: 8, fontSize: 12 }}>Shipper: {data.customer}</div>
                                    <div style={{ fontSize: 12 }}>Consignee: GHI TRADING INC.</div>
                                    <div style={{ marginTop: 16, fontSize: 12, color: '#bbb' }}>[PDF Preview Placeholder]</div>
                                </div>
                            </div>
                        </Card>
                    </Col>

                    {/* Right: Review Opinion */}
                    <Col span={10}>
                        <Card title={i18n.t(LocaleHelper.getDocumentReviewOpinion())} style={{ position: 'sticky', top: 0 }}>
                            {/* Review Result */}
                            <div style={{ marginBottom: 16 }}>
                                <div style={{ marginBottom: 8, fontWeight: 500 }}>{i18n.t(LocaleHelper.getDocumentReviewResult())}:</div>
                                <Radio.Group value={reviewResult} onChange={e => setReviewResult(e.target.value)}>
                                    <Radio value="pass">{i18n.t(LocaleHelper.getDocumentReviewPass())}</Radio>
                                    <Radio value="reject">{i18n.t(LocaleHelper.getDocumentReviewReject())}</Radio>
                                    <Radio value="modify">{i18n.t(LocaleHelper.getDocumentReviewModify())}</Radio>
                                </Radio.Group>
                            </div>

                            {/* Comment */}
                            <div style={{ marginBottom: 16 }}>
                                <div style={{ marginBottom: 8, fontWeight: 500 }}>{i18n.t(LocaleHelper.getDocumentReviewComment())}:</div>
                                <TextArea
                                    rows={4}
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                    placeholder="单证信息完整，格式规范，可以通过"
                                />
                            </div>

                            {/* Signature */}
                            <div style={{ marginBottom: 16 }}>
                                <div style={{ marginBottom: 8, fontWeight: 500 }}>{i18n.t(LocaleHelper.getDocumentReviewSignature())}:</div>
                                <Checkbox
                                    checked={needSignature}
                                    onChange={e => setNeedSignature(e.target.checked)}
                                >
                                    {i18n.t(LocaleHelper.getDocumentReviewSignatureRequired())}
                                </Checkbox>
                                {needSignature && (
                                    <Select
                                        style={{ width: '100%', marginTop: 8 }}
                                        placeholder={i18n.t(LocaleHelper.getDocumentReviewSigner())}
                                        value={signer || undefined}
                                        onChange={setSigner}
                                    >
                                        <Select.Option value="manager">审核主管</Select.Option>
                                        <Select.Option value="supervisor">部门经理</Select.Option>
                                    </Select>
                                )}
                            </div>

                            {/* Buttons */}
                            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                                <Button onClick={handleCancel}>
                                    取消
                                </Button>
                                <Button type="primary" onClick={handleSubmit}>
                                    {i18n.t(LocaleHelper.getDocumentReviewSubmit())}
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ReviewDetail;

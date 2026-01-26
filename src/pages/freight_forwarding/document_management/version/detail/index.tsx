import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Button, Row, Col, Space, Typography, Tag, Divider, Spin } from 'antd';
import { ArrowLeftOutlined, DownloadOutlined, RollbackOutlined, FileTextOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

const { Title, Text } = Typography;

const VersionDetail: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Mock data fetching
        const loadData = async () => {
             setLoading(true);
             // Simulate API call
             setTimeout(() => {
                 const mockData = {
                     id: id || '1',
                     version: 'v1.1',
                     modify_time: '2024-01-20 14:30',
                     modifier: '张三',
                     description: '更新了提单收货人信息',
                     code: 'DOC-2024001',
                     type: '提单',
                     waybill_no: 'WAY-2024001',
                     customer: 'ABC Trading Co.',
                     content: 'Bill of Lading Content...',
                     status: 'active',
                     change_log: [
                        { field: 'Consignee', old: 'Old Address', new: '456 Import Ave, Hamburg, Germany' }
                     ]
                 };
                 setData(mockData);
                 setLoading(false);
             }, 500);
        };
        loadData();
    }, [id]);

    const handleBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div style={{ padding: 50, textAlign: 'center' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!data) return <div>Data not found</div>;

    return (
        <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Header Area */}
            <div style={{ background: '#fff', padding: '16px 24px', borderRadius: 8, boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Title level={4} style={{ margin: 0 }}>
                                    {i18n.t(LocaleHelper.getDocumentVersionDetailTitle())}
                                </Title>
                            </div>
                        </div>
                    </div>
                    <Space>
                        
                        <Button icon={<RollbackOutlined />}>
                            {i18n.t(LocaleHelper.getDocumentVersionRollback())}
                        </Button>
                        <Button type="primary" icon={<DownloadOutlined />}>
                            {i18n.t(LocaleHelper.getDocumentVersionExport())}
                        </Button>
                        <Button onClick={handleBack} icon={<ArrowLeftOutlined />}>
                            {i18n.t(LocaleHelper.getDocumentVersionBack())}
                        </Button>
                    </Space>
                </div>
            </div>

            {/* Basic Info */}
            <Card bordered={false} title={i18n.t(LocaleHelper.getDocumentVersionDescription())} style={{ borderRadius: 8 }}>
                 <Descriptions column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}>
                    <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentVersionNumber())}>{data.version}</Descriptions.Item>
                    <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentVersionCode())}>{data.code}</Descriptions.Item>
                    <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentListType())}>{data.type}</Descriptions.Item>
                    <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentVersionModifier())}>{data.modifier}</Descriptions.Item>
                    <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentVersionModifyTime())}>{data.modify_time}</Descriptions.Item>
                    <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentListWaybillNo())}>{data.waybill_no}</Descriptions.Item>
                    <Descriptions.Item label={i18n.t(LocaleHelper.getDocumentListCustomer())}>{data.customer}</Descriptions.Item>
                </Descriptions>
                <Divider style={{ margin: '12px 0' }} />
                <Descriptions title={i18n.t(LocaleHelper.getDocumentVersionChangeLog())} column={1}>
                    <Descriptions.Item>
                        {data.description}
                    </Descriptions.Item>
                </Descriptions>
            </Card>

            {/* Document Content / Preview */}
            <Card bordered={false} title={i18n.t(LocaleHelper.getDocumentReviewPreview())} style={{ flex: 1, borderRadius: 8 }} bodyStyle={{ padding: 0 }}>
                 <div style={{ padding: 40, background: '#fff', minHeight: 600 }}>
                    <div style={{ 
                        maxWidth: 800, 
                        margin: '0 auto', 
                        padding: 40, 
                        border: '1px solid #e8e8e8', 
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        background: '#fff'
                    }}>
                        <div style={{ textAlign: 'center', marginBottom: 40 }}>
                            <Title level={3}>BILL OF LADING</Title>
                            <Text type="secondary">{data.code}</Text>
                        </div>
                        
                        <Row gutter={[24, 24]}>
                            <Col span={12}>
                                <Card size="small" title={i18n.t(LocaleHelper.getDocumentReviewShipper())} bordered={true}>
                                    <p><strong>{data.customer}</strong></p>
                                    <p>123 Export Blvd</p>
                                    <p>Shanghai, China</p>
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card size="small" title={i18n.t(LocaleHelper.getDocumentReviewConsignee())} bordered={true}>
                                    <p><strong>GHI TRADING INC.</strong></p>
                                    <p>456 Import Ave</p>
                                    <p>Hamburg, Germany</p>
                                </Card>
                            </Col>
                            <Col span={24}>
                                <Card size="small" title="Notify Party" bordered={true}>
                                    <p>SAME AS CONSIGNEE</p>
                                </Card>
                            </Col>
                        </Row>

                        <Divider />

                        <div style={{ marginTop: 24 }}>
                            <Title level={5}>Description of Goods</Title>
                            <div style={{ background: '#fafafa', padding: 16, borderRadius: 4 }}>
                                <p><strong>1000 Cartons of Electronic Components</strong></p>
                                <Row gutter={16} style={{ marginTop: 8 }}>
                                    <Col span={8}>
                                        <Text type="secondary">Gross Weight</Text>
                                        <div>5000 KGS</div>
                                    </Col>
                                    <Col span={8}>
                                        <Text type="secondary">Measurement</Text>
                                        <div>20 CBM</div>
                                    </Col>
                                    <Col span={8}>
                                        <Text type="secondary">HS Code</Text>
                                        <div>85423100</div>
                                    </Col>
                                </Row>
                            </div>
                        </div>

                        <div style={{ marginTop: 40, textAlign: 'right' }}>
                            <Text type="secondary">Signed by: </Text>
                            <div style={{ 
                                display: 'inline-block', 
                                borderBottom: '1px solid #000', 
                                width: 200, 
                                textAlign: 'center',
                                fontFamily: 'cursive',
                                fontSize: 18
                            }}>
                                John Doe
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default VersionDetail;

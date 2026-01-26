import React, { useState, useEffect } from 'react';
import { Card, Button, Typography, Select, Space, Divider, Row, Col, Tag } from 'antd';
import { RollbackOutlined, ExportOutlined, CloseOutlined, ArrowLeftOutlined, SwapRightOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const DocumentVersionCompare: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [version1, setVersion1] = useState<string>('v1.2');
    const [version2, setVersion2] = useState<string>('v1.3');

    useEffect(() => {
        const v1Id = searchParams.get('v1');
        const v2Id = searchParams.get('v2');
        
        // In a real app, fetch version details by ID.
        // For now, we just map IDs to mock version numbers.
        if (v1Id === '2') setVersion1('v1.2');
        if (v2Id === '1') setVersion2('v1.3');
    }, [searchParams]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleCompare = () => {
        // Refresh comparison logic
        console.log(`Comparing ${version1} with ${version2}`);
    };

    return (
        <div style={{ padding: '20px', height: '100%', overflowY: 'auto' }}>
            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px', marginRight: '10px' }} />
                        <Title level={4} style={{ margin: 0 }}>{i18n.t(LocaleHelper.getDocumentVersionCompare())}</Title>
                    </div>
                    <Button onClick={handleBack} icon={<ArrowLeftOutlined />}>
                        {i18n.t(LocaleHelper.getDocumentVersionBack())}
                    </Button>
                </div>

                <div style={{ marginBottom: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '4px' }}>
                    <Space size="large" align="center">
                        <Text strong>{i18n.t(LocaleHelper.getDocumentVersionContrast())}:</Text>
                        <Select value={version1} style={{ width: 120 }} onChange={setVersion1}>
                            <Option value="v1.1">v1.1</Option>
                            <Option value="v1.2">v1.2</Option>
                            <Option value="v1.3">v1.3</Option>
                        </Select>
                        <SwapRightOutlined style={{ fontSize: 18, color: '#999' }} />
                        <Select value={version2} style={{ width: 120 }} onChange={setVersion2}>
                            <Option value="v1.1">v1.1</Option>
                            <Option value="v1.2">v1.2</Option>
                            <Option value="v1.3">v1.3</Option>
                        </Select>
                        <Button type="primary" onClick={handleCompare}>{i18n.t(LocaleHelper.getDocumentVersionStartCompare())}</Button>
                    </Space>
                </div>

                <div style={{ border: '1px solid #d9d9d9', borderRadius: '4px', padding: '20px' }}>
                    <div style={{ marginBottom: '16px' }}>
                        <Title level={5}>{i18n.t(LocaleHelper.getDocumentVersionDiffDisplay())}</Title>
                    </div>
                    
                    <div style={{ background: '#fafafa', padding: '24px', border: '1px solid #eee', borderRadius: '4px' }}>
                        {/* Headers */}
                        <Row gutter={24} style={{ marginBottom: 16 }}>
                            <Col span={12}>
                                <div style={{ borderBottom: '2px solid #ff7875', paddingBottom: 8, display: 'flex', alignItems: 'center' }}>
                                    <Tag color="red">{version1}</Tag>
                                    <Text type="secondary">Old Version</Text>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div style={{ borderBottom: '2px solid #95de64', paddingBottom: 8, display: 'flex', alignItems: 'center' }}>
                                    <Tag color="green">{version2}</Tag>
                                    <Text type="secondary">New Version</Text>
                                </div>
                            </Col>
                        </Row>

                        {/* Field 1: Consignee Address */}
                        <div style={{ marginBottom: 24 }}>
                            <Text strong style={{ display: 'block', marginBottom: 8, fontSize: 14 }}>Consignee Address</Text>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <div style={{ 
                                        padding: '12px', 
                                        background: '#fff1f0', 
                                        border: '1px solid #ffccc7', 
                                        borderRadius: 4,
                                        minHeight: 60,
                                        textAlign: 'left' // Explicit left alignment
                                    }}>
                                        <Text delete type="secondary">123 Main St, LA, CA 90001</Text>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div style={{ 
                                        padding: '12px', 
                                        background: '#f6ffed', 
                                        border: '1px solid #b7eb8f', 
                                        borderRadius: 4,
                                        minHeight: 60,
                                        textAlign: 'left' // Explicit left alignment
                                    }}>
                                        <Text strong type="success">123 Main Street, Los Angeles, CA 90001</Text>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        {/* Field 2: Cargo Weight */}
                        <div style={{ marginBottom: 24 }}>
                            <Text strong style={{ display: 'block', marginBottom: 8, fontSize: 14 }}>Cargo Weight</Text>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <div style={{ 
                                        padding: '12px', 
                                        background: '#fff1f0', 
                                        border: '1px solid #ffccc7', 
                                        borderRadius: 4,
                                        minHeight: 60,
                                        textAlign: 'left'
                                    }}>
                                        <Text delete type="secondary">2400 KG</Text>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div style={{ 
                                        padding: '12px', 
                                        background: '#f6ffed', 
                                        border: '1px solid #b7eb8f', 
                                        borderRadius: 4,
                                        minHeight: 60,
                                        textAlign: 'left'
                                    }}>
                                        <Text strong type="success">2500 KG</Text>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        {/* Field 3: Payment Terms (No Change Example - Optional, but good for completeness, or just show diffs) */}
                        {/* Assuming we only show diffs based on context */}
                        
                         {/* Field 3: Description */}
                        <div style={{ marginBottom: 24 }}>
                            <Text strong style={{ display: 'block', marginBottom: 8, fontSize: 14 }}>Remark / Description</Text>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <div style={{ 
                                        padding: '12px', 
                                        background: '#fff1f0', 
                                        border: '1px solid #ffccc7', 
                                        borderRadius: 4,
                                        minHeight: 80,
                                        textAlign: 'left'
                                    }}>
                                        <Text delete type="secondary">Standard delivery required.</Text>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div style={{ 
                                        padding: '12px', 
                                        background: '#f6ffed', 
                                        border: '1px solid #b7eb8f', 
                                        borderRadius: 4,
                                        minHeight: 80,
                                        textAlign: 'left'
                                    }}>
                                        <Text strong type="success">Express delivery required. Handle with care.</Text>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                    </div>

                    <div style={{ marginTop: '20px', textAlign: 'right' }}>
                        <Space>
                            <Button icon={<RollbackOutlined />}>{i18n.t(LocaleHelper.getDocumentVersionRollback())}</Button>
                            <Button icon={<ExportOutlined />}>{i18n.t(LocaleHelper.getDocumentVersionExport())}</Button>
                            <Button>{i18n.t(LocaleHelper.getDocumentVersionRemark())}</Button>
                            <Button icon={<CloseOutlined />} onClick={handleBack}>{i18n.t(LocaleHelper.getDocumentVersionClose())}</Button>
                        </Space>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default DocumentVersionCompare;

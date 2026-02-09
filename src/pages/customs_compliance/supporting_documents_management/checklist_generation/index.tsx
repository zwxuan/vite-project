import React, { useState } from 'react';
import { Form, Input, Select, Button, Card, Checkbox, Row, Col, message, Divider, Space } from 'antd';
import  CustomIcon  from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { generateChecklist } from '@/api/customs_compliance/supporting_documents_management/checklist_service';
import { useNavigate } from 'react-router-dom';
import '@/pages/page_list.less';

const ChecklistGeneration: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const res = await generateChecklist(values);
            if (res.success) {
                message.success(res.message);
                navigate('/supporting_documents_management/document_workbench');
            }
        } catch (error) {
            message.error('Failed to generate checklist');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)', padding: '24px' }}>
            <Card title={
                <span>
                    <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px', marginRight: '8px' }} />
                    {i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementChecklistGenerationPageTitle())}
                </span>
            } extra={
                <Space>
                    <Button onClick={() => message.info('Saved')}>{i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementChecklistGenerationBtnSave())}</Button>
                    <Button type="primary" danger onClick={() => form.submit()} loading={loading}>
                        {i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementChecklistGenerationBtnGenerate())}
                    </Button>
                </Space>
            }>
                <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{
                    businessType: 'import',
                    tradeMode: 'general',
                    transportMode: 'sea',
                    requiredDocs: ['invoice', 'packing', 'contract', 'bl']
                }}>
                    <Divider>{i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementChecklistGenerationSectionBasicInfo())}</Divider>
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item name="preEntryNo" label={i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementChecklistGenerationFieldPreEntryNo())}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="businessType" label={i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementChecklistGenerationFieldBusinessType())}>
                                <Select options={[{ label: 'Import', value: 'import' }, { label: 'Export', value: 'export' }]} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="tradeMode" label={i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementChecklistGenerationFieldTradeMode())}>
                                <Select options={[{ label: 'General Trade', value: 'general' }]} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="transportMode" label={i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementChecklistGenerationFieldTransportMode())}>
                                <Select options={[{ label: 'Sea', value: 'sea' }]} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="originCountry" label={i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementChecklistGenerationFieldOrigin())}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="destinationCountry" label={i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementChecklistGenerationFieldDestination())}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider>{i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementChecklistGenerationSectionGoodsInfo())}</Divider>
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item name="goodsName" label={i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementChecklistGenerationFieldGoodsName())}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="hsCode" label={i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementChecklistGenerationFieldHsCode())}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="supervisionCondition" label={i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementChecklistGenerationFieldSupervision())}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="specialRequirements" label={i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementChecklistGenerationFieldSpecial())}>
                                <Checkbox.Group style={{ width: '100%' }}>
                                    <Row>
                                        <Col span={8}><Checkbox value="3c">3C认证</Checkbox></Col>
                                        <Col span={8}><Checkbox value="energy">能效标识</Checkbox></Col>
                                        <Col span={8}><Checkbox value="dangerous">危险品证书</Checkbox></Col>
                                    </Row>
                                </Checkbox.Group>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider>{i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementChecklistGenerationSectionRecommend())}</Divider>
                    <Form.Item name="requiredDocs" label={i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementChecklistGenerationGroupBasicDocs())}>
                         <Checkbox.Group style={{ width: '100%' }}>
                            <Row>
                                <Col span={6}><Checkbox value="invoice">商业发票</Checkbox></Col>
                                <Col span={6}><Checkbox value="packing">装箱单</Checkbox></Col>
                                <Col span={6}><Checkbox value="contract">合同</Checkbox></Col>
                                <Col span={6}><Checkbox value="bl">提单</Checkbox></Col>
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                     <Form.Item name="licenseDocs" label={i18n.t(LocaleHelper.getCustomsComplianceSupportingDocumentsManagementChecklistGenerationGroupLicense())}>
                         <Checkbox.Group style={{ width: '100%' }}>
                            <Row>
                                <Col span={6}><Checkbox value="import_license">进口许可证</Checkbox></Col>
                                <Col span={6}><Checkbox value="quota">配额证</Checkbox></Col>
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default ChecklistGeneration;

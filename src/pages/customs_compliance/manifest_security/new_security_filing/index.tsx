import React, { useState, useEffect } from 'react';
import { Form, Input, Select, DatePicker, Button, Row, Col, Card, message, Space } from 'antd';
import { useSearchParams, useNavigate } from 'react-router-dom';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import '@/pages/page_list.less';
import { getSecurityFilingDetail, saveSecurityFiling } from '@/api/customs_compliance/manifest_security/security_filing_service';
import dayjs from 'dayjs';

const { Option } = Select;

const NewSecurityFiling: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const mode = searchParams.get('mode') || 'create';
    const id = searchParams.get('id');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            getSecurityFilingDetail(id).then(data => {
                form.setFieldsValue({
                    ...data,
                    etd: data.etd ? dayjs(data.etd) : undefined,
                    eta: data.eta ? dayjs(data.eta) : undefined,
                });
                setLoading(false);
            });
        }
    }, [id, form]);

    const onFinish = async (values: any) => {
        await handleSubmit(values, false);
    };

    const handleSubmit = async (values: any, isSubmit: boolean) => {
        setLoading(true);
        try {
            const submitData = {
                ...values,
                key: id, // Pass key if editing
                etd: values.etd ? values.etd.format('YYYY-MM-DD') : undefined,
                eta: values.eta ? values.eta.format('YYYY-MM-DD') : undefined,
                status: isSubmit ? 'Processing' : undefined,
            };
            await saveSecurityFiling(submitData);
            message.success(isSubmit ? '申报成功' : (i18n.t(LocaleHelper.getSuccess()) || '保存成功'));
            navigate('/customs_compliance/manifest_security/security_filing_management');
        } finally {
            setLoading(false);
        }
    };

    const isView = mode === 'view';

    return (
        <div className="page-content">
            <Card title={mode === 'create' ? '新建安全申报' : (mode === 'edit' ? '编辑安全申报' : '安全申报详情')} bordered={false}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    disabled={isView}
                >
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item name="filing_no" label="申报单号">
                                <Input placeholder="自动生成" disabled />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="type" label="申报类型" rules={[{ required: true }]}>
                                <Select>
                                    <Option value="ISF">ISF</Option>
                                    <Option value="AMS">AMS</Option>
                                    <Option value="ENS">ENS</Option>
                                    <Option value="AFR">AFR</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="vessel_name" label="船名" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="voyage_number" label="航次" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="mbl_no" label="MBL No" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="hbl_no" label="HBL No">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="pol" label="起运港 (POL)" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="pod" label="卸货港 (POD)" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="etd" label="ETD">
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="eta" label="ETA">
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                         <Col span={8}>
                            <Form.Item name="source_type" label="数据来源类型">
                                <Select>
                                    <Option value="manifest">舱单</Option>
                                    <Option value="booking">订舱</Option>
                                    <Option value="manual">手工录入</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="source_no" label="来源单号">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <h3 style={{ marginBottom: '16px', marginTop: '16px', borderLeft: '4px solid #1890ff', paddingLeft: '8px' }}>申报要素 (ISF 10+2 / AMS / ENS)</h3>
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item name="importer_of_record" label="进口商 (Importer of Record)">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="consignee_number" label="收货人代码 (Consignee No)">
                                <Input />
                            </Form.Item>
                        </Col>
                         <Col span={8}>
                            <Form.Item name="seller" label="卖方 (Seller)">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="buyer" label="买方 (Buyer)">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="ship_to_party" label="送货方 (Ship to Party)">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="manufacturer" label="制造商 (Manufacturer)">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="country_of_origin" label="原产国 (Country of Origin)">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="commodity_hts_no" label="商品编码 (HTS Code)">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="container_stuffing_location" label="装箱地点 (Container Stuffing Location)">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="consolidator" label="拼箱人 (Consolidator)">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col span={24} style={{ textAlign: 'right', marginTop: 16 }}>
                            <Space>
                                <Button onClick={() => navigate('/manifest_security/security_filing_management')}>
                                    {i18n.t(LocaleHelper.getCancel()) || '取消'}
                                </Button>
                                {!isView && (
                                    <>
                                        <Button type="primary" htmlType="submit" loading={loading}>
                                            {i18n.t(LocaleHelper.getSave()) || '保存'}
                                        </Button>
                                        <Button type="primary" style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }} onClick={() => {
                                            form.validateFields().then(values => handleSubmit(values, true));
                                        }} loading={loading}>
                                            申报
                                        </Button>
                                    </>
                                )}
                            </Space>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    );
};

export default NewSecurityFiling;

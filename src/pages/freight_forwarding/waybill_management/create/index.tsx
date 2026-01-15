import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Form, Input, Select, DatePicker, InputNumber, Radio, message } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { getWaybillDetail, saveWaybill } from "@/api/freight_forwarding/waybill_management/waybill_service";
import '@/pages/page_list.less';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

const WaybillCreate: React.FC = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const isReadonly = searchParams.get('readonly') === 'true';
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            loadData(id);
        }
    }, [id]);

    const loadData = async (waybillId: string) => {
        setLoading(true);
        try {
            const res = await getWaybillDetail(waybillId);
            if (res.success && res.data) {
                const data = res.data;
                form.setFieldsValue({
                    ...data,
                    etd: data.etd ? dayjs(data.etd) : null,
                    eta: data.eta ? dayjs(data.eta) : null,
                    ...(data as any).isDangerous !== undefined && { isDangerous: (data as any).isDangerous ? 'yes' : 'no' }
                });
            }
        } catch (error) {
            console.error(error);
            message.error('Load failed');
        }
        setLoading(false);
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            const res = await saveWaybill(values);
            if (res.success) {
                message.success('Saved successfully');
                navigate('/freight_forwarding/waybill_management/list');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async () => {
        // Implement submit logic
         try {
            const values = await form.validateFields();
            // Simulate submit
            message.success('Submitted successfully');
            navigate('/waybill_management/list');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getWaybillCreateTitle())} {id ? `- ${id}` : ''}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            {!isReadonly && (
                                <>
                                    <Button type="primary" danger onClick={handleSave} loading={loading}>
                                        {i18n.t(LocaleHelper.getSave())}
                                    </Button>
                                    <Button onClick={handleSubmit}>
                                        {i18n.t(LocaleHelper.getWaybillCreateSubmit())}
                                    </Button>
                                </>
                            )}
                            <Button onClick={() => navigate(-1)}>
                                {i18n.t(LocaleHelper.getBack())}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '10px' }}>
                <Form form={form} layout="vertical" disabled={isReadonly}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card title={i18n.t(LocaleHelper.getWaybillCreateBasicInfo())} bordered={false} className="nc-bill-card">
                                <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateTransportMode())} name="transportMode" rules={[{ required: true }]}>
                                    <Radio.Group>
                                        <Radio value="SEA">SEA</Radio>
                                        <Radio value="AIR">AIR</Radio>
                                        <Radio value="RAIL">RAIL</Radio>
                                        <Radio value="TRUCK">TRUCK</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateRelatedJob())} name="jobNo">
                                    <Select showSearch placeholder="Select Job">
                                        <Option value="JOB-001">JOB-001</Option>
                                        <Option value="JOB-002">JOB-002</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateCarrier())} name="carrier">
                                    <Select showSearch placeholder="Select Carrier">
                                        <Option value="COSCO">COSCO</Option>
                                        <Option value="MAERSK">MAERSK</Option>
                                        <Option value="MSC">MSC</Option>
                                    </Select>
                                </Form.Item>
                            </Card>
                        </Col>
                        <Col span={16}>
                            <Card title={i18n.t(LocaleHelper.getWaybillCreateTransportInfo())} bordered={false} className="nc-bill-card">
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateVesselName())} name="vessel">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateVoyage())} name="voyage">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={i18n.t(LocaleHelper.getWaybillCreatePol())} name="origin">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={i18n.t(LocaleHelper.getWaybillCreatePod())} name="destination">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateEtd())} name="etd">
                                            <DatePicker style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateEta())} name="eta">
                                            <DatePicker style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>

                    <Row gutter={16} style={{ marginTop: '16px' }}>
                        <Col span={24}>
                            <Card title={i18n.t(LocaleHelper.getWaybillCreateNumbersInfo())} bordered={false} className="nc-bill-card">
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateMbl())} name="mblNo">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateHbl())} name="hblNo">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                    
                    <Row gutter={16} style={{ marginTop: '16px' }}>
                         <Col span={24}>
                            <Card title={i18n.t(LocaleHelper.getWaybillCreateCargoInfo())} bordered={false} className="nc-bill-card">
                                <Row gutter={16}>
                                     <Col span={6}>
                                        <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateCommodity())} name="commodity">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label={i18n.t(LocaleHelper.getWaybillCreatePackages())} name="packages">
                                            <InputNumber style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateGrossWeight())} name="grossWeight">
                                            <InputNumber style={{ width: '100%' }} addonAfter="KGS" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateVolume())} name="volume">
                                            <InputNumber style={{ width: '100%' }} addonAfter="CBM" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateDangerous())} name="isDangerous">
                                            <Radio.Group>
                                                <Radio value="yes">{i18n.t(LocaleHelper.getWaybillCreateYes())}</Radio>
                                                <Radio value="no">{i18n.t(LocaleHelper.getWaybillCreateNo())}</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                         </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};

export default WaybillCreate;

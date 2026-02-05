import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, DatePicker, Row, Col, Spin, message, InputNumber, Table } from 'antd';
import { useSearchParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { getCustomsJobDetail } from '@/api/customs_compliance/customs_job_management/job_center_service';
import CustomIcon from "@/components/custom-icon";
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import '@/pages/page_list.less';

const { TextArea } = Input;

const CreateJob: React.FC = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            fetchData(id);
        }
    }, [id]);

    const fetchData = async (jobId: string) => {
        setLoading(true);
        try {
            const res = await getCustomsJobDetail(jobId);
            if (res.success && res.data) {
                const data = res.data;
                form.setFieldsValue({
                    ...data,
                    businessType: data.business_type === 'import_customs' ? 'import' : (data.business_type === 'export_customs' ? 'export' : data.business_type),
                    customer: data.customer_name,
                    priority: data.priority,
                    port: data.port_code,
                    orderNo: data.upstream_order_no,
                    contractNo: data.contract_no,
                    transportMode: data.transport_mode,
                    vessel: data.vessel_name,
                    voyage: data.voyage_no,
                    mbl: data.mbl_no,
                    etd: data.etd ? dayjs(data.etd) : null,
                    eta: data.eta ? dayjs(data.eta) : null,
                    preEntryNo: data.pre_entry_no,
                    customsNo: data.customs_no,
                    tradeMode: data.trade_mode,
                    cutMode: data.cut_mode,
                    originCountry: data.origin_country,
                    destinationCountry: data.destination_country,
                    packNo: data.pack_no,
                    packType: data.pack_type,
                    grossWeight: data.gross_weight,
                    netWeight: data.net_weight,
                    remarks: data.remarks,
                    consignorCname: data.consignor_cname,
                    consignorEname: data.consignor_ename,
                    consigneeCname: data.consignee_cname,
                    consigneeEname: data.consignee_ename,
                    notifyParty: data.notify_party,
                    goods_items: data.goods_items || [],
                });
            } else {
                message.error(res.message || 'Failed to load data');
            }
        } catch (error) {
            console.error(error);
            message.error('An error occurred while fetching data');
        } finally {
            setLoading(false);
        }
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
        message.success(id ? i18n.t(LocaleHelper.getCreateJobUpdateSuccess()) : i18n.t(LocaleHelper.getCreateJobSuccess()));
        navigate(-1);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <>
            <style>{`
                .form-section {
                    margin-bottom: 24px;
                }
                .form-section-title {
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 20px;
                    color: #1f1f1f;
                    position: relative;
                    padding-left: 12px;
                    line-height: 1.2;
                }
                .form-section-title::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 2px;
                    bottom: 2px;
                    width: 4px;
                    background-color: #1890ff;
                    border-radius: 2px;
                }
            `}</style>
            <div style={{ height: 'calc(100vh - 80px)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap">
                        <span className="bill-info-title">
                            <CustomIcon type="icon-Currency" style={{ fontSize: '20px', marginRight: '8px',color: 'red' }} />
                            {id ? i18n.t(LocaleHelper.getCreateJobEditTitle()) : i18n.t(LocaleHelper.getCreateJobPageTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{ display: "flex" }}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button onClick={handleCancel}>{i18n.t(LocaleHelper.getCreateJobCancel())}</Button>
                                <Button type="primary" onClick={() => form.submit()}>{i18n.t(LocaleHelper.getCreateJobSubmit())}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
                <Spin spinning={loading}>
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <div className="form-section">
                            <Row gutter={24}>
                                <Col span={8}>
                                    <Form.Item label={i18n.t(LocaleHelper.getCreateJobCustomer())} name="customer" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label={i18n.t(LocaleHelper.getCreateJobBusinessType())} name="businessType" rules={[{ required: true }]}>
                                        <Select options={[
                                            { label: '进口报关', value: 'import' },
                                            { label: '出口报关', value: 'export' },
                                            { label: '转关作业', value: 'transfer' },
                                        ]} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label={i18n.t(LocaleHelper.getCreateJobPriority())} name="priority">
                                        <Select options={[
                                            { label: 'High', value: 'high' },
                                            { label: 'Medium', value: 'medium' },
                                            { label: 'Low', value: 'low' },
                                        ]} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <Form.Item label={i18n.t(LocaleHelper.getCreateJobOrderNo())} name="orderNo">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label={i18n.t(LocaleHelper.getCreateJobContractNo())} name="contractNo">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label={i18n.t(LocaleHelper.getCreateJobPreEntryNo())} name="preEntryNo">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <Form.Item label={i18n.t(LocaleHelper.getCreateJobCustomsNo())} name="customsNo">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>

                        <div className="form-section">
                            <Row gutter={24}>
                                <Col span={8}>
                                    <Form.Item label={i18n.t(LocaleHelper.getCreateJobTransportMode())} name="transportMode">
                                        <Select options={[
                                            { label: 'Sea', value: 'Sea' },
                                            { label: 'Air', value: 'Air' },
                                            { label: 'Land', value: 'Land' },
                                        ]} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label={i18n.t(LocaleHelper.getCreateJobPort())} name="port">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label={i18n.t(LocaleHelper.getCreateJobMbl())} name="mbl">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <Form.Item label={i18n.t(LocaleHelper.getCreateJobVessel())} name="vessel">
                                        <Input placeholder="Vessel Name" style={{ marginBottom: 8 }} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="&nbsp;" name="voyage" colon={false}>
                                        <Input placeholder="Voyage No" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label={i18n.t(LocaleHelper.getCreateJobTradeMode())} name="tradeMode">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <Form.Item label={i18n.t(LocaleHelper.getCreateJobEtd())} name="etd">
                                        <DatePicker style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label={i18n.t(LocaleHelper.getCreateJobEta())} name="eta">
                                        <DatePicker style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label={i18n.t(LocaleHelper.getCreateJobCutMode())} name="cutMode">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <Form.Item label={i18n.t(LocaleHelper.getCreateJobOriginCountry())} name="originCountry">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label={i18n.t(LocaleHelper.getCreateJobDestinationCountry())} name="destinationCountry">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label={i18n.t(LocaleHelper.getCreateJobPackNo())} name="packNo">
                                        <InputNumber style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label={i18n.t(LocaleHelper.getCreateJobPackType())} name="packType">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Form.Item label={i18n.t(LocaleHelper.getCreateJobGrossWeight())} name="grossWeight">
                                        <InputNumber style={{ width: '100%' }} addonAfter="KG" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label={i18n.t(LocaleHelper.getCreateJobNetWeight())} name="netWeight">
                                        <InputNumber style={{ width: '100%' }} addonAfter="KG" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>

                        <div className="form-section">
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item label={i18n.t(LocaleHelper.getCreateJobConsignorCname())} name="consignorCname">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label={i18n.t(LocaleHelper.getCreateJobConsignorEname())} name="consignorEname">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item label={i18n.t(LocaleHelper.getCreateJobConsigneeCname())} name="consigneeCname">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label={i18n.t(LocaleHelper.getCreateJobConsigneeEname())} name="consigneeEname">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={24}>
                                    <Form.Item label={i18n.t(LocaleHelper.getCreateJobNotifyParty())} name="notifyParty">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>

                        <div className="form-section">
                            <Form.List name="goods_items">
                                {(fields, { add, remove }) => (
                                    <>
                                        <Table
                                            dataSource={fields}
                                            pagination={false}
                                            rowKey="key"
                                            scroll={{ x: 1500 }}
                                            columns={[
                                                {
                                                    title: i18n.t(LocaleHelper.getCreateJobItemNo()),
                                                    dataIndex: 'item_no',
                                                    width: 80,
                                                    render: (_, field) => (
                                                        <Form.Item name={[field.name, 'item_no']} noStyle>
                                                            <InputNumber style={{ width: '100%' }} />
                                                        </Form.Item>
                                                    )
                                                },
                                                {
                                                    title: i18n.t(LocaleHelper.getCreateJobHsCode()),
                                                    dataIndex: 'hs_code',
                                                    width: 150,
                                                    render: (_, field) => (
                                                        <Form.Item name={[field.name, 'hs_code']} noStyle rules={[{ required: true }]}>
                                                            <Input />
                                                        </Form.Item>
                                                    )
                                                },
                                                {
                                                    title: i18n.t(LocaleHelper.getCreateJobProductNameCn()),
                                                    dataIndex: 'product_name_cn',
                                                    width: 200,
                                                    render: (_, field) => (
                                                        <Form.Item name={[field.name, 'product_name_cn']} noStyle rules={[{ required: true }]}>
                                                            <Input />
                                                        </Form.Item>
                                                    )
                                                },
                                                {
                                                    title: i18n.t(LocaleHelper.getCreateJobProductNameEn()),
                                                    dataIndex: 'product_name_en',
                                                    width: 200,
                                                    render: (_, field) => (
                                                        <Form.Item name={[field.name, 'product_name_en']} noStyle>
                                                            <Input />
                                                        </Form.Item>
                                                    )
                                                },
                                                {
                                                    title: i18n.t(LocaleHelper.getCreateJobSpecModel()),
                                                    dataIndex: 'spec_model',
                                                    width: 150,
                                                    render: (_, field) => (
                                                        <Form.Item name={[field.name, 'spec_model']} noStyle>
                                                            <Input />
                                                        </Form.Item>
                                                    )
                                                },
                                                {
                                                    title: i18n.t(LocaleHelper.getCreateJobQty()),
                                                    dataIndex: 'qty_1',
                                                    width: 100,
                                                    render: (_, field) => (
                                                        <Form.Item name={[field.name, 'qty_1']} noStyle>
                                                            <InputNumber style={{ width: '100%' }} />
                                                        </Form.Item>
                                                    )
                                                },
                                                {
                                                    title: i18n.t(LocaleHelper.getCreateJobUnit()),
                                                    dataIndex: 'unit_1',
                                                    width: 100,
                                                    render: (_, field) => (
                                                        <Form.Item name={[field.name, 'unit_1']} noStyle>
                                                            <Input />
                                                        </Form.Item>
                                                    )
                                                },
                                                {
                                                    title: i18n.t(LocaleHelper.getCreateJobUnitPrice()),
                                                    dataIndex: 'unit_price',
                                                    width: 120,
                                                    render: (_, field) => (
                                                        <Form.Item name={[field.name, 'unit_price']} noStyle>
                                                            <InputNumber style={{ width: '100%' }} />
                                                        </Form.Item>
                                                    )
                                                },
                                                {
                                                    title: i18n.t(LocaleHelper.getCreateJobTotalPrice()),
                                                    dataIndex: 'total_price',
                                                    width: 120,
                                                    render: (_, field) => (
                                                        <Form.Item name={[field.name, 'total_price']} noStyle>
                                                            <InputNumber style={{ width: '100%' }} />
                                                        </Form.Item>
                                                    )
                                                },
                                                {
                                                    title: i18n.t(LocaleHelper.getCreateJobCurrency()),
                                                    dataIndex: 'currency',
                                                    width: 100,
                                                    render: (_, field) => (
                                                        <Form.Item name={[field.name, 'currency']} noStyle>
                                                            <Input />
                                                        </Form.Item>
                                                    )
                                                },
                                                {
                                                    title: i18n.t(LocaleHelper.getCreateJobDutyMode()),
                                                    dataIndex: 'duty_mode',
                                                    width: 120,
                                                    render: (_, field) => (
                                                        <Form.Item name={[field.name, 'duty_mode']} noStyle>
                                                            <Input />
                                                        </Form.Item>
                                                    )
                                                },
                                                {
                                                    title: i18n.t(LocaleHelper.getCreateJobOriginCountry()),
                                                    dataIndex: 'origin_country',
                                                    width: 120,
                                                    render: (_, field) => (
                                                        <Form.Item name={[field.name, 'origin_country']} noStyle>
                                                            <Input />
                                                        </Form.Item>
                                                    )
                                                },
                                                {
                                                    title: i18n.t(LocaleHelper.getCreateJobDelete()),
                                                    width: 80,
                                                    fixed: 'right',
                                                    render: (_, field) => (
                                                        <Button 
                                                            type="text" 
                                                            danger 
                                                            icon={<DeleteOutlined />} 
                                                            onClick={() => remove(field.name)} 
                                                        />
                                                    )
                                                }
                                            ]}
                                        />
                                        <Button type="dashed" onClick={() => add()} block style={{ marginTop: 16 }}>
                                            <PlusOutlined /> {i18n.t(LocaleHelper.getCreateJobAddGoods())}
                                        </Button>
                                    </>
                                )}
                            </Form.List>
                        </div>

                        <div className="form-section">
                            <Row gutter={24}>
                                <Col span={24}>
                                    <Form.Item name="remarks">
                                        <TextArea rows={4} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </Spin>
            </div>
        </div>
        </>
    );
};

export default CreateJob;

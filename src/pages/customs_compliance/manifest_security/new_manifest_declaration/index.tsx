import React, { useState, useEffect } from 'react';
import { Form, Input, Select, DatePicker, Button, Row, Col, Card, message, Tooltip, Tabs } from 'antd';
import { useSearchParams, useNavigate } from 'react-router-dom';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import '@/pages/page_list.less';
import CustomIcon from '@/components/custom-icon';
import { getManifestDeclarationDetail, saveManifestDeclaration } from '@/api/customs_compliance/manifest_security/manifest_declaration_service';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const NewManifestDeclaration: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const mode = searchParams.get('mode') || 'create';
    const id = searchParams.get('id');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            getManifestDeclarationDetail(id).then(data => {
                form.setFieldsValue({
                    ...data,
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
                eta: values.eta ? values.eta.format('YYYY-MM-DD') : undefined,
                status: isSubmit ? 'Submitted' : undefined,
            };
            await saveManifestDeclaration(submitData);
            message.success(isSubmit ? '申报成功' : (i18n.t(LocaleHelper.getSuccess()) || '保存成功'));
            navigate('/manifest_security/manifest_declaration_list');
        } finally {
            setLoading(false);
        }
    };

    const isView = mode === 'view';

    const renderTransportInfo = () => (
        <Row gutter={24}>
            <Col span={6}>
                <Form.Item name="vessel_name" label="船名">
                    <Input />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item name="voyage_number" label="航次">
                    <Input />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item name="imo_number" label="IMO Number">
                    <Input placeholder="e.g. 9123456" />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item name="call_sign" label="Call Sign">
                    <Input />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item name="flag_country" label="船旗国">
                    <Input />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item name="port_of_loading" label="起运港">
                    <Input />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item name="port_of_discharge" label="卸货港">
                    <Input />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item name="destination_port" label="目的港">
                    <Input />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item name="eta" label="预计到港时间">
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item name="customs_office" label="申报海关">
                    <Input />
                </Form.Item>
            </Col>
        </Row>
    );

    const renderBillOfLadingInfo = () => (
        <Row gutter={24}>
            <Col span={8}>
                <Form.Item name="bl_number" label="提单号" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item name="bl_type" label="提单类型">
                    <Select>
                        <Select.Option value="master">Master B/L</Select.Option>
                        <Select.Option value="house">House B/L</Select.Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item name="payment_method" label="付款方式">
                    <Select>
                        <Select.Option value="prepaid">Prepaid</Select.Option>
                        <Select.Option value="collect">Collect</Select.Option>
                    </Select>
                </Form.Item>
            </Col>
        </Row>
    );

    const renderPartiesInfo = () => (
        <>
            <Row gutter={24}>
                <Col span={8}>
                    <Card title="发货人 (Shipper)" size="small" bordered={false} className="inner-card">
                        <Form.Item name="shipper" label="名称">
                            <Input />
                        </Form.Item>
                        <Form.Item name="shipper_address" label="地址">
                            <Input.TextArea rows={3} />
                        </Form.Item>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="收货人 (Consignee)" size="small" bordered={false} className="inner-card">
                        <Form.Item name="consignee" label="名称">
                            <Input />
                        </Form.Item>
                        <Form.Item name="consignee_address" label="地址">
                            <Input.TextArea rows={3} />
                        </Form.Item>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title={i18n.t(LocaleHelper.getNewManifestDeclarationNotifyPartyInfo())} size="small" bordered={false} className="inner-card">
                        <Form.Item name="notify_party" label="名称">
                            <Input />
                        </Form.Item>
                        <Form.Item name="notify_party_address" label="地址">
                            <Input.TextArea rows={3} />
                        </Form.Item>
                    </Card>
                </Col>
            </Row>
        </>
    );

    const renderContainerList = () => (
        <Form.List name="containers">
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }) => (
                        <div key={key} style={{ display: 'flex', marginBottom: 8, gap: '8px', alignItems: 'baseline', borderBottom: '1px solid #f0f0f0', paddingBottom: '8px' }}>
                            <Form.Item
                                {...restField}
                                name={[name, 'container_no']}
                                label={key === 0 ? "箱号" : ""}
                                rules={[{ required: true, message: 'Missing container no' }]}
                            >
                                <Input placeholder="Container No" />
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name, 'container_type']}
                                label={key === 0 ? "箱型" : ""}
                            >
                                <Input placeholder="Type (e.g. 40HQ)" />
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name, 'seal_no']}
                                label={key === 0 ? "封号" : ""}
                            >
                                <Input placeholder="Seal No" />
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name, 'gross_weight']}
                                label={key === 0 ? "毛重 (KGS)" : ""}
                            >
                                <Input type="number" placeholder="Weight" />
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name, 'package_count']}
                                label={key === 0 ? "件数" : ""}
                            >
                                <Input type="number" placeholder="Packages" />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} style={{ color: 'red' }} />
                        </div>
                    ))}
                    {!isView && (
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                添加集装箱 (Add Container)
                            </Button>
                        </Form.Item>
                    )}
                </>
            )}
        </Form.List>
    );

    const renderGoodsList = () => (
        <Form.List name="goods">
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }) => (
                        <div key={key} style={{ display: 'flex', marginBottom: 8, gap: '8px', alignItems: 'baseline', borderBottom: '1px solid #f0f0f0', paddingBottom: '8px' }}>
                            <Form.Item
                                {...restField}
                                name={[name, 'hs_code']}
                                label={key === 0 ? "HS编码" : ""}
                                rules={[{ required: true, message: 'Missing HS Code' }]}
                            >
                                <Input placeholder="HS Code" />
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name, 'description']}
                                label={key === 0 ? "货名" : ""}
                                style={{ flex: 2 }}
                            >
                                <Input placeholder="Description" />
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name, 'marks']}
                                label={key === 0 ? "唛头" : ""}
                            >
                                <Input placeholder="Marks" />
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name, 'gross_weight']}
                                label={key === 0 ? "毛重" : ""}
                            >
                                <Input type="number" placeholder="Weight" />
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name, 'volume']}
                                label={key === 0 ? "体积" : ""}
                            >
                                <Input type="number" placeholder="Volume" />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} style={{ color: 'red' }} />
                        </div>
                    ))}
                    {!isView && (
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                添加货物 (Add Goods)
                            </Button>
                        </Form.Item>
                    )}
                </>
            )}
        </Form.List>
    );

    const items = [
        {
            key: '1',
            label: i18n.t(LocaleHelper.getNewManifestDeclarationTransportInfo()),
            children: renderTransportInfo(),
        },
        {
            key: '2',
            label: i18n.t(LocaleHelper.getNewManifestDeclarationCargoInfo()),
            children: (
                <>
                    {renderBillOfLadingInfo()}
                    <div style={{ marginTop: '20px' }}>
                         <h4 style={{ marginBottom: '10px' }}>{i18n.t(LocaleHelper.getNewManifestDeclarationContainerList())}</h4>
                         {renderContainerList()}
                    </div>
                    <div style={{ marginTop: '20px' }}>
                         <h4 style={{ marginBottom: '10px' }}>{i18n.t(LocaleHelper.getNewManifestDeclarationGoodsList())}</h4>
                         {renderGoodsList()}
                    </div>
                </>
            ),
        },
        {
            key: '3',
            label: i18n.t(LocaleHelper.getNewManifestDeclarationShipperInfo()),
            children: renderPartiesInfo(),
        },
    ];

    const footerButtons = (
        <div style={{ textAlign: 'right' }}>
            <Button onClick={() => navigate('/manifest_security/manifest_declaration_list')} style={{ marginRight: 8 }}>
                {i18n.t(LocaleHelper.getCancel()) || '取消'}
            </Button>
            {!isView && (
                <>
                    <Button type="primary" htmlType="submit" loading={loading} style={{ marginRight: 8 }}>
                        {i18n.t(LocaleHelper.getSave()) || '保存'}
                    </Button>
                    <Button type="primary" style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }} onClick={() => {
                        form.validateFields().then(values => handleSubmit(values, true));
                    }} loading={loading}>
                        申报
                    </Button>
                </>
            )}
        </div>
    );

    return (
        <div className="page-content">
            <Card title={mode === 'create' ? '新建舱单申报' : (mode === 'edit' ? '编辑舱单申报' : '舱单申报详情')} bordered={false}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    disabled={isView}
                    initialValues={{
                        declaration_type: 'export',
                        source_type: 'manual',
                        containers: [],
                        goods: []
                    }}
                >
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item name="declaration_no" label="申报单号">
                                <Input disabled placeholder="自动生成" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="declaration_type" label="申报类型" rules={[{ required: true }]}>
                                <Select>
                                    <Select.Option value="import">进口舱单</Select.Option>
                                    <Select.Option value="export">出口舱单</Select.Option>
                                    <Select.Option value="ens">ENS</Select.Option>
                                    <Select.Option value="ams">AMS</Select.Option>
                                    <Select.Option value="isf">ISF</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="source_type" label={i18n.t(LocaleHelper.getNewManifestDeclarationSourceType())}>
                                <Select>
                                    <Select.Option value="booking">订舱</Select.Option>
                                    <Select.Option value="bill_of_lading">提单</Select.Option>
                                    <Select.Option value="manual">手工</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Tabs defaultActiveKey="1" items={items} style={{ marginTop: '20px' }} />
                    
                    <Row style={{ marginTop: 24 }}>
                        <Col span={24}>
                            {footerButtons}
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    );
};

export default NewManifestDeclaration;

import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, Card, message, Row, Col, Radio, Divider, Space, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import LocaleHelper from '@/utils/locale/freight_forwarding/order_management/orders';
import i18n from '@/i18n';
import CustomIcon from "@/components/custom-icon";
import '@/pages/page_list.less';

const { Option } = Select;
const { TextArea } = Input;

import { createOrder } from "@/api/freight_forwarding/order_management/order_service";

const NewOrder: React.FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [serviceCategory, setServiceCategory] = useState('integrated');
    const [standaloneServices, setStandaloneServices] = useState<string[]>([]);

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const formattedValues = {
                ...values,
                bookingDate: values.bookingDate ? values.bookingDate.format('YYYY-MM-DD') : undefined,
                status: 'draft'
            };
            await createOrder(formattedValues);
            message.success('Order created successfully');
            navigate('/order_management/list');
        } catch (error) {
            console.error('Failed to create order:', error);
            message.error('Failed to create order');
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            <span>订单管理 {'>'} 新建订单</span>
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button>保存草稿</Button>
                            <Button>预览</Button>
                            <Button type="primary" onClick={() => form.submit()} loading={loading}>
                                {i18n.t(LocaleHelper.getButtonSubmit())}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '10px' }}>
                <Form
                    form={form}
                    name="new_order"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    initialValues={{ serviceCategory: 'integrated' }}
                >
                    <Card size="small" title="🔹 服务选择" style={{ marginBottom: '10px' }}>
                        <Form.Item name="serviceCategory" label="服务分类">
                            <Radio.Group onChange={(e) => setServiceCategory(e.target.value)}>
                                <Radio value="integrated">综合运输服务</Radio>
                                <Radio value="standalone">单项专业服务</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name="orderType" label="订单类型">
                            <Select placeholder="请先选择服务分类_________________▼" disabled={!serviceCategory}>
                                {serviceCategory === 'integrated' ? (
                                    <>
                                        <Option value="sea_export">海运出口</Option>
                                        <Option value="sea_import">海运进口</Option>
                                        <Option value="air_export">空运出口</Option>
                                        <Option value="air_import">空运进口</Option>
                                    </>
                                ) : (
                                    <>
                                        <Option value="customs">单独报关</Option>
                                        <Option value="warehouse">单独仓储</Option>
                                        <Option value="document">单证代理</Option>
                                    </>
                                )}
                            </Select>
                        </Form.Item>
                    </Card>

                    {serviceCategory === 'integrated' && (
                        <Card size="small" title="🚢 综合运输服务配置" style={{ marginBottom: '10px' }}>
                            <Form.Item name="transportType" label="运输类型">
                                <Radio.Group>
                                    <Radio value="sea_export">海运出口</Radio>
                                    <Radio value="sea_import">海运进口</Radio>
                                    <Radio value="air_export">空运出口</Radio>
                                    <Radio value="air_import">空运进口</Radio>
                                    <Radio value="land">陆运运输</Radio>
                                    <Radio value="rail">铁路运输</Radio>
                                    <Radio value="inland">内陆运输</Radio>
                                    <Radio value="multimodal">多式联运</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item name="origin" label="路线信息">
                                        <Input placeholder="起运地 [上海港___________]" addonAfter={<span style={{padding: '0 10px'}}>→</span>} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="destination" label=" ">
                                        <Input placeholder="目的地 [洛杉矶港__________]" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item name="etd" label="时间安排">
                                        <DatePicker placeholder="预计发货 [2024-03-20]" style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="eta" label=" ">
                                        <DatePicker placeholder="要求到货 [2024-04-15]" style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
                    )}

                    {serviceCategory === 'standalone' && (
                        <Card size="small" title="🎯 单项专业服务配置" style={{ marginBottom: '10px' }}>
                            <Form.Item name="serviceTypes" label="服务类型">
                                <Checkbox.Group onChange={(values) => setStandaloneServices(values as string[])}>
                                    <Checkbox value="customs">单独报关</Checkbox>
                                    <Checkbox value="warehouse">单独仓储</Checkbox>
                                    <Checkbox value="document">单证代理</Checkbox>
                                    <Checkbox value="insurance">保险代理</Checkbox>
                                    <Checkbox value="consulting">咨询服务</Checkbox>
                                </Checkbox.Group>
                            </Form.Item>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item name="serviceLocation" label="服务地点">
                                        <Input placeholder="[上海保税区仓库___________] [选择地点]" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="serviceTime" label="服务时间">
                                        <DatePicker.RangePicker style={{ width: '100%' }} placeholder={['开始日期', '预计完成']} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
                    )}

                    <Card size="small" title="👤 客户信息" style={{ marginBottom: '10px' }}>
                        <Row gutter={24}>
                            <Col span={8}>
                                <Form.Item name="customerName" label="客户名称">
                                    <Input placeholder="[下拉选择客户________________] [新增客户] [客户详情]" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="contact" label="联系人">
                                    <Input placeholder="[张经理_______]" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="phone" label="电话">
                                    <Input placeholder="[138****8888]" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={8}>
                                <Form.Item name="tradeTerms" label="贸易条款">
                                    <Select placeholder="[FOB ▼]">
                                        <Option value="FOB">FOB</Option>
                                        <Option value="CIF">CIF</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="currency" label="货币">
                                    <Select placeholder="[USD ▼]">
                                        <Option value="USD">USD</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="信用额度">
                                    <span style={{ color: 'green' }}>[500,000] 可用：[320,000]</span>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    <Card size="small" title="📦 货物信息" style={{ marginBottom: '10px' }}>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item name="goodsName" label="货物品名">
                                    <Input placeholder="[电子产品________________________]" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="hsCode" label="HS编码">
                                    <Input placeholder="[8543709990]" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={6}>
                                <Form.Item name="weight" label="重量">
                                    <Input suffix="KG" placeholder="[5,000]" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item name="volume" label="体积">
                                    <Input suffix="CBM" placeholder="[20]" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item name="packages" label="件数">
                                    <Input placeholder="[100]" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item name="value" label="货值">
                                    <Input suffix="USD" placeholder="[100,000]" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item name="packaging" label="包装方式">
                                    <Select placeholder="[纸箱 ▼]">
                                        <Option value="carton">纸箱</Option>
                                        <Option value="pallet">托盘</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="packagingReq" label="包装要求">
                                    <Input placeholder="[易碎品，需要防震包装_______________]" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item name="dangerous" label="危险品">
                                    <Radio.Group defaultValue={false}>
                                        <Radio value={true}>是</Radio>
                                        <Radio value={false}>否</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="tempControl" label="温控要求">
                                    <Radio.Group defaultValue="normal">
                                        <Radio value="chill">冷藏</Radio>
                                        <Radio value="freeze">冷冻</Radio>
                                        <Radio value="normal">常温</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    {standaloneServices.includes('customs') && (
                         <Card size="small" title="📋 单独报关服务" style={{ marginBottom: '10px' }}>
                             <Row gutter={24}>
                                 <Col span={24}>
                                     <Form.Item name="customsType" label="报关类型">
                                         <Radio.Group defaultValue="export">
                                             <Radio value="export">出口报关</Radio>
                                             <Radio value="import">进口报关</Radio>
                                             <Radio value="transit">转关报关</Radio>
                                         </Radio.Group>
                                     </Form.Item>
                                 </Col>
                             </Row>
                             {/* More fields for customs... */}
                         </Card>
                    )}

                    {/* Placeholder for other service configs and Fee Info/Remarks */}
                    
                    <Card size="small" title="💰 费用信息" style={{ marginBottom: '10px' }}>
                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item name="billingMethod" label="计费方式">
                                    <Radio.Group defaultValue="fixed">
                                        <Radio value="fixed">固定费用</Radio>
                                        <Radio value="ratio">按比例</Radio>
                                        <Radio value="hourly">按工时</Radio>
                                        <Radio value="mixed">组合计费</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={8}>
                                <Form.Item name="estTotalCost" label="预估总费用">
                                    <Input suffix="USD" placeholder="[6,100]" />
                                </Form.Item>
                            </Col>
                             <Col span={8}>
                                <Form.Item name="currency" label="币种">
                                     <Select placeholder="[USD ▼]">
                                        <Option value="USD">USD</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="paymentTerms" label="付款条件">
                                     <Select placeholder="[预付50% ▼]">
                                        <Option value="prepay50">预付50%</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    <Card size="small" title="📝 备注信息" style={{ marginBottom: '10px' }}>
                         <Form.Item name="specialReq" label="特殊要求">
                             <TextArea rows={2} placeholder="[客户要求加急处理，需要在3个工作日内完成报关手续_______]" />
                         </Form.Item>
                         <Form.Item name="internalRemark" label="内部备注">
                             <TextArea rows={2} placeholder="[客户为VIP客户，优先处理_____________________________]" />
                         </Form.Item>
                         <Form.Item name="riskAlert" label="风险提示">
                             <TextArea rows={2} placeholder="[货物涉及3C认证，需要提前准备相关证书________________]" />
                         </Form.Item>
                    </Card>

                </Form>
            </div>
        </div>
    );
};

export default NewOrder;

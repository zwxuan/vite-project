/**
 * 应付费用录入表单页面
 * 参考应收费用录入页面设计，适配应付费用业务场景
 */
import React, { useState } from 'react';
import { Form, Input, Select, Button, Table, InputNumber, Card, Row, Col, message, Space, Modal } from 'antd';
import { PlusOutlined, DeleteOutlined, SaveOutlined, CheckOutlined, PrinterOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import '@/pages/page_list.less';

const { Option } = Select;

// 费用项接口
interface CostItem {
    key: string;
    costType: string;
    costName: string;
    quantity: number;
    unitPrice: number;
    amount: number;
    taxRate: number;
    taxAmount: number;
    totalAmount: number;
}

const PayableCostForm: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [costItems, setCostItems] = useState<CostItem[]>([]);
    const [summary, setSummary] = useState({
        baseTotal: 0,
        taxTotal: 0,
        grandTotal: 0,
    });

    // 费用项表格列定义
    const columns: ColumnsType<CostItem> = [
        {
            title: i18n.t(LocaleHelper.getPayableCostDetailCostType()),
            dataIndex: 'costType',
            key: 'costType',
            width: 150,
            render: (_, record, index) => (
                <Select
                    style={{ width: '100%' }}
                    value={record.costType}
                    onChange={(value) => handleCostItemChange(index, 'costType', value)}
                >
                    <Option value="OCEAN_FREIGHT">{i18n.t(LocaleHelper.getPayableCostOptionOceanFreight())}</Option>
                    <Option value="PORT_CHARGE">{i18n.t(LocaleHelper.getPayableCostOptionPortCharge())}</Option>
                    <Option value="CUSTOMS_FEE">{i18n.t(LocaleHelper.getPayableCostOptionCustomsFee())}</Option>
                    <Option value="TRUCKING_FEE">{i18n.t(LocaleHelper.getPayableCostOptionTruckingFee())}</Option>
                    <Option value="WAREHOUSE_FEE">{i18n.t(LocaleHelper.getPayableCostOptionWarehouseFee())}</Option>
                    <Option value="HANDLING_FEE">{i18n.t(LocaleHelper.getPayableCostOptionHandlingFee())}</Option>
                    <Option value="OTHER">{i18n.t(LocaleHelper.getPayableCostOptionOther())}</Option>
                </Select>
            ),
        },
        {
            title: i18n.t(LocaleHelper.getPayableCostDetailCostName()),
            dataIndex: 'costName',
            key: 'costName',
            width: 150,
            render: (_, record, index) => (
                <Input
                    value={record.costName}
                    onChange={(e) => handleCostItemChange(index, 'costName', e.target.value)}
                />
            ),
        },
        {
            title: i18n.t(LocaleHelper.getPayableCostDetailQuantity()),
            dataIndex: 'quantity',
            key: 'quantity',
            width: 100,
            render: (_, record, index) => (
                <InputNumber
                    min={0}
                    precision={2}
                    style={{ width: '100%' }}
                    value={record.quantity}
                    onChange={(value) => handleCostItemChange(index, 'quantity', value || 0)}
                />
            ),
        },
        {
            title: i18n.t(LocaleHelper.getPayableCostDetailUnitPrice()),
            dataIndex: 'unitPrice',
            key: 'unitPrice',
            width: 120,
            render: (_, record, index) => (
                <InputNumber
                    min={0}
                    precision={2}
                    style={{ width: '100%' }}
                    value={record.unitPrice}
                    onChange={(value) => handleCostItemChange(index, 'unitPrice', value || 0)}
                />
            ),
        },
        {
            title: i18n.t(LocaleHelper.getPayableCostDetailAmount()),
            dataIndex: 'amount',
            key: 'amount',
            width: 120,
            align: 'right',
            render: (value) => `¥${value.toLocaleString()}`,
        },
        {
            title: i18n.t(LocaleHelper.getPayableCostDetailTaxRate()),
            dataIndex: 'taxRate',
            key: 'taxRate',
            width: 100,
            render: (_, record, index) => (
                <Select
                    style={{ width: '100%' }}
                    value={record.taxRate}
                    onChange={(value) => handleCostItemChange(index, 'taxRate', value)}
                >
                    <Option value={0.13}>13%</Option>
                    <Option value={0.09}>9%</Option>
                    <Option value={0.06}>6%</Option>
                    <Option value={0}>0%</Option>
                </Select>
            ),
        },
        {
            title: i18n.t(LocaleHelper.getPayableCostDetailTotalAmount()),
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            width: 120,
            align: 'right',
            render: (value) => `¥${value.toLocaleString()}`,
        },
        {
            title: i18n.t(LocaleHelper.getPayableCostDetailAction()),
            key: 'action',
            width: 80,
            fixed: 'right',
            render: (_, record, index) => (
                <Button
                    type="link"
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteCostItem(index)}
                >
                    {i18n.t(LocaleHelper.getPayableCostBtnDelete())}
                </Button>
            ),
        },
    ];

    // 添加费用项
    const handleAddCostItem = () => {
        const newItem: CostItem = {
            key: `item_${Date.now()}`,
            costType: 'OCEAN_FREIGHT',
            costName: '',
            quantity: 1,
            unitPrice: 0,
            amount: 0,
            taxRate: 0.13,
            taxAmount: 0,
            totalAmount: 0,
        };
        setCostItems([...costItems, newItem]);
    };

    // 删除费用项
    const handleDeleteCostItem = (index: number) => {
        const newItems = costItems.filter((_, i) => i !== index);
        setCostItems(newItems);
        calculateSummary(newItems);
    };

    // 费用项字段变更
    const handleCostItemChange = (index: number, field: string, value: any) => {
        const newItems = [...costItems];
        newItems[index] = { ...newItems[index], [field]: value };

        // 自动计算金额
        if (field === 'quantity' || field === 'unitPrice') {
            newItems[index].amount = newItems[index].quantity * newItems[index].unitPrice;
            newItems[index].taxAmount = newItems[index].amount * newItems[index].taxRate;
            newItems[index].totalAmount = newItems[index].amount + newItems[index].taxAmount;
        }

        // 税率变更时重新计算
        if (field === 'taxRate') {
            newItems[index].taxAmount = newItems[index].amount * newItems[index].taxRate;
            newItems[index].totalAmount = newItems[index].amount + newItems[index].taxAmount;
        }

        setCostItems(newItems);
        calculateSummary(newItems);
    };

    // 计算汇总
    const calculateSummary = (items: CostItem[]) => {
        const baseTotal = items.reduce((sum, item) => sum + item.amount, 0);
        const taxTotal = items.reduce((sum, item) => sum + item.taxAmount, 0);
        const grandTotal = baseTotal + taxTotal;

        setSummary({
            baseTotal,
            taxTotal,
            grandTotal,
        });
    };

    // 保存草稿
    const handleSaveDraft = async () => {
        try {
            await form.validateFields();
            setLoading(true);
            // TODO: 调用API保存草稿
            message.success(i18n.t(LocaleHelper.getPayableCostMsgSaveDraftSuccess()));
            navigate('/cost_management/payable_cost');
        } catch (error) {
            message.error(i18n.t(LocaleHelper.getPayableCostMsgSaveDraftFail()));
        } finally {
            setLoading(false);
        }
    };

    // 提交审核
    const handleSubmitReview = async () => {
        try {
            await form.validateFields();
            if (costItems.length === 0) {
                message.warning(i18n.t(LocaleHelper.getPayableCostMsgNeedCostItems()));
                return;
            }
            setLoading(true);
            // TODO: 调用API提交审核
            message.success(i18n.t(LocaleHelper.getPayableCostMsgSubmitSuccess()));
            navigate('/cost_management/payable_cost');
        } catch (error) {
            message.error(i18n.t(LocaleHelper.getPayableCostMsgSubmitFail()));
        } finally {
            setLoading(false);
        }
    };

    // 从模板导入
    const handleImportFromTemplate = () => {
        message.info(i18n.t(LocaleHelper.getPayableCostMsgImportTemplateWip()));
    };

    const handleBack = () => {
        navigate('/cost_management/payable_cost');
    };

    // 自动生成费用
    const handleAutoGenerateCosts = async () => {
        try {
            const waybillNo = form.getFieldValue('waybillNo');
            if (!waybillNo) {
                message.warning(i18n.t(LocaleHelper.getPayableCostMsgSelectWaybillFirst()));
                return;
            }

            message.loading({ content: i18n.t(LocaleHelper.getPayableCostMsgAutoGenerateLoading()), key: 'autoGenerate' });

            // TODO: 调用API自动生成费用
            // 1. 获取运单信息（服务类型、航线、箱型等）
            // 2. 匹配供应商协议费率规则
            // 3. 自动计算并生成费用明细

            // 模拟自动生成的费用数据
            setTimeout(() => {
                const autoGeneratedItems: CostItem[] = [
                    {
                        key: `auto_${Date.now()}_1`,
                        costType: 'OCEAN_FREIGHT',
                        costName: i18n.t(LocaleHelper.getPayableCostOptionOceanFreight()),
                        quantity: 2,
                        unitPrice: 6000,
                        amount: 12000,
                        taxRate: 0.13,
                        taxAmount: 1560,
                        totalAmount: 13560,
                    },
                    {
                        key: `auto_${Date.now()}_2`,
                        costType: 'PORT_CHARGE',
                        costName: i18n.t(LocaleHelper.getPayableCostOptionPortCharge()),
                        quantity: 1,
                        unitPrice: 2000,
                        amount: 2000,
                        taxRate: 0.13,
                        taxAmount: 260,
                        totalAmount: 2260,
                    },
                    {
                        key: `auto_${Date.now()}_3`,
                        costType: 'HANDLING_FEE',
                        costName: i18n.t(LocaleHelper.getPayableCostOptionHandlingFee()),
                        quantity: 1,
                        unitPrice: 1000,
                        amount: 1000,
                        taxRate: 0.13,
                        taxAmount: 130,
                        totalAmount: 1130,
                    },
                ];

                setCostItems(autoGeneratedItems);
                calculateSummary(autoGeneratedItems);
                message.success({ content: i18n.t(LocaleHelper.getPayableCostMsgAutoGenerateSuccess()), key: 'autoGenerate' });
            }, 1000);
        } catch (error) {
            message.error({ content: i18n.t(LocaleHelper.getPayableCostMsgAutoGenerateFail()), key: 'autoGenerate' });
        }
    };

    // 重新生成费用
    const handleRegenerateCosts = () => {
        if (costItems.length > 0) {
            Modal.confirm({
                title: i18n.t(LocaleHelper.getPayableCostMsgConfirmRegenerateTitle()),
                content: i18n.t(LocaleHelper.getPayableCostMsgConfirmRegenerateContent()),
                onOk: () => {
                    handleAutoGenerateCosts();
                },
            });
        } else {
            handleAutoGenerateCosts();
        }
    };

    // 清空重来
    const handleClearAll = () => {
        Modal.confirm({
            title: i18n.t(LocaleHelper.getPayableCostMsgConfirmClearTitle()),
            content: i18n.t(LocaleHelper.getPayableCostMsgConfirmClearContent()),
            onOk: () => {
                setCostItems([]);
                setSummary({
                    baseTotal: 0,
                    taxTotal: 0,
                    grandTotal: 0,
                });
                message.success(i18n.t(LocaleHelper.getPayableCostMsgClearSuccess()));
            },
        });
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            {/* 页面头部 */}
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {id ? i18n.t(LocaleHelper.getPayableCostEditTitle()) : i18n.t(LocaleHelper.getPayableCostCreateTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
                                {i18n.t(LocaleHelper.getBack())}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 表单内容 */}
            <div style={{ padding: '24px', background: '#f0f2f5' }}>
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        currency: 'CNY',
                        exchangeRate: 1.0,
                        reviewLevel: 'LEVEL_1',
                        urgency: 'NORMAL',
                    }}
                >
                    {/* 基本信息 */}
                    <Card title={i18n.t(LocaleHelper.getPayableCostSectionBasicInfo())} style={{ marginBottom: 16 }}>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item
                                    label={i18n.t(LocaleHelper.getPayableCostFormWaybillNo())}
                                    name="waybillNo"
                                    rules={[{ required: true, message: i18n.t(LocaleHelper.getPayableCostMsgWaybillNoRequired()) }]}
                                >
                                    <Input placeholder={i18n.t(LocaleHelper.getPayableCostPlaceholderWaybillNo())} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={i18n.t(LocaleHelper.getPayableCostFormServiceType())}
                                    name="serviceType"
                                    rules={[{ required: true, message: i18n.t(LocaleHelper.getPayableCostMsgServiceTypeRequired()) }]}
                                >
                                    <Select placeholder={i18n.t(LocaleHelper.getPayableCostPlaceholderServiceType())}>
                                        <Option value="SHIPPING">{i18n.t(LocaleHelper.getPayableCostServiceTypeShipping())}</Option>
                                        <Option value="BOOKING">{i18n.t(LocaleHelper.getPayableCostServiceTypeBooking())}</Option>
                                        <Option value="TRUCKING">{i18n.t(LocaleHelper.getPayableCostServiceTypeTrucking())}</Option>
                                        <Option value="CUSTOMS">{i18n.t(LocaleHelper.getPayableCostServiceTypeCustoms())}</Option>
                                        <Option value="WAREHOUSE">{i18n.t(LocaleHelper.getPayableCostServiceTypeWarehouse())}</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={i18n.t(LocaleHelper.getPayableCostFormSupplier())}
                                    name="supplierName"
                                    rules={[{ required: true, message: i18n.t(LocaleHelper.getPayableCostMsgSupplierRequired()) }]}
                                >
                                    <Input placeholder={i18n.t(LocaleHelper.getPayableCostPlaceholderSupplier())} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={i18n.t(LocaleHelper.getPayableCostFormAgreement())} name="agreementNo">
                                    <Input placeholder={i18n.t(LocaleHelper.getPayableCostPlaceholderAgreement())} disabled />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item
                                    label={i18n.t(LocaleHelper.getPayableCostFormCurrency())}
                                    name="currency"
                                    rules={[{ required: true, message: i18n.t(LocaleHelper.getPayableCostMsgCurrencyRequired()) }]}
                                >
                                    <Select>
                                        <Option value="CNY">CNY</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="EUR">EUR</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={i18n.t(LocaleHelper.getPayableCostFormExchangeRate())} name="exchangeRate">
                                    <InputNumber
                                        min={0}
                                        precision={4}
                                        style={{ width: '100%' }}
                                        placeholder={i18n.t(LocaleHelper.getPayableCostPlaceholderExchangeRate())}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={i18n.t(LocaleHelper.getPayableCostFormOperator())} name="operator">
                                    <Input placeholder={i18n.t(LocaleHelper.getPayableCostPlaceholderOperator())} disabled />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={i18n.t(LocaleHelper.getPayableCostFormServiceDate())} name="serviceDate">
                                    <Input placeholder={i18n.t(LocaleHelper.getPayableCostPlaceholderServiceDate())} disabled />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    {/* 费用明细 */}
                    <Card
                        title={i18n.t(LocaleHelper.getPayableCostSectionCostItems())}
                        style={{ marginBottom: 16 }}
                        extra={
                            <Space>
                                <Button type="primary" icon={<PlusOutlined />} onClick={handleAutoGenerateCosts}>
                                    {i18n.t(LocaleHelper.getPayableCostBtnAutoGenerate())}
                                </Button>
                                <Button icon={<PlusOutlined />} onClick={handleAddCostItem}>
                                    {i18n.t(LocaleHelper.getPayableCostBtnManualAdd())}
                                </Button>
                                <Button onClick={handleImportFromTemplate}>
                                    {i18n.t(LocaleHelper.getPayableCostBtnImportTemplate())}
                                </Button>
                                <Button onClick={handleRegenerateCosts}>
                                    {i18n.t(LocaleHelper.getPayableCostBtnRegenerate())}
                                </Button>
                                <Button danger onClick={handleClearAll}>
                                    {i18n.t(LocaleHelper.getPayableCostBtnClearAll())}
                                </Button>
                            </Space>
                        }
                    >
                        <Table
                            columns={columns}
                            dataSource={costItems}
                            pagination={false}
                            size="small"
                            bordered
                            scroll={{ x: 'max-content' }}
                        />
                    </Card>

                    {/* 费用汇总 */}
                    <Card title={i18n.t(LocaleHelper.getPayableCostSectionSummary())} style={{ marginBottom: 16 }}>
                        <Row gutter={16}>
                            <Col span={8}>
                                <div style={{ fontSize: 14 }}>
                                    <span style={{ color: '#666' }}>
                                        {i18n.t(LocaleHelper.getPayableCostSummaryTotalAmount())}：
                                    </span>
                                    <span style={{ fontSize: 16, fontWeight: 500, color: '#1890ff' }}>
                                        ¥{summary.baseTotal.toLocaleString()}
                                    </span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div style={{ fontSize: 14 }}>
                                    <span style={{ color: '#666' }}>{i18n.t(LocaleHelper.getPayableCostSummaryTaxAmount())}：</span>
                                    <span style={{ fontSize: 16, fontWeight: 500, color: '#1890ff' }}>
                                        ¥{summary.taxTotal.toLocaleString()}
                                    </span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div style={{ fontSize: 14 }}>
                                    <span style={{ color: '#666' }}>{i18n.t(LocaleHelper.getPayableCostSummaryGrandTotal())}：</span>
                                    <span style={{ fontSize: 16, fontWeight: 500, color: '#ff4d4f' }}>
                                        ¥{summary.grandTotal.toLocaleString()}
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </Card>

                    {/* 审核设置 */}
                    <Card title={i18n.t(LocaleHelper.getPayableCostSectionAuditSettings())} style={{ marginBottom: 16 }}>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label={i18n.t(LocaleHelper.getPayableCostFormReviewLevel())} name="reviewLevel">
                                    <Select>
                                        <Option value="LEVEL_1">{i18n.t(LocaleHelper.getPayableCostReviewLevelOne())}</Option>
                                        <Option value="LEVEL_2">{i18n.t(LocaleHelper.getPayableCostReviewLevelTwo())}</Option>
                                        <Option value="LEVEL_3">{i18n.t(LocaleHelper.getPayableCostReviewLevelThree())}</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={i18n.t(LocaleHelper.getPayableCostFormUrgency())} name="urgency">
                                    <Select>
                                        <Option value="NORMAL">{i18n.t(LocaleHelper.getPayableCostUrgencyNormal())}</Option>
                                        <Option value="URGENT">{i18n.t(LocaleHelper.getPayableCostUrgencyUrgent())}</Option>
                                        <Option value="VERY_URGENT">{i18n.t(LocaleHelper.getPayableCostUrgencyVeryUrgent())}</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={i18n.t(LocaleHelper.getPayableCostFormReviewer())} name="reviewer">
                                    <Input placeholder={i18n.t(LocaleHelper.getPayableCostPlaceholderReviewer())} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={i18n.t(LocaleHelper.getPayableCostFormEstimatedReviewTime())} name="estimatedReviewTime">
                                    <Input placeholder={i18n.t(LocaleHelper.getPayableCostPlaceholderEstimatedReviewTime())} disabled />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    {/* 备注 */}
                    <Card title={i18n.t(LocaleHelper.getPayableCostSectionRemark())} style={{ marginBottom: 16 }}>
                        <Form.Item name="remark">
                            <Input.TextArea rows={3} placeholder={i18n.t(LocaleHelper.getPayableCostPlaceholderRemark())} />
                        </Form.Item>
                    </Card>

                    {/* 操作按钮 */}
                    <div style={{ textAlign: 'center', marginTop: 24 }}>
                        <Space size="middle">
                            <Button
                                icon={<SaveOutlined />}
                                onClick={handleSaveDraft}
                                loading={loading}
                            >
                                {i18n.t(LocaleHelper.getPayableCostBtnSaveDraft())}
                            </Button>
                            <Button
                                type="primary"
                                icon={<CheckOutlined />}
                                onClick={handleSubmitReview}
                                loading={loading}
                            >
                                {i18n.t(LocaleHelper.getPayableCostBtnSubmit())}
                            </Button>
                            <Button icon={<PrinterOutlined />}>
                                {i18n.t(LocaleHelper.getPayableCostBtnPreviewPrint())}
                            </Button>
                            <Button onClick={() => navigate('/cost_management/payable_cost')}>
                                {i18n.t(LocaleHelper.getPayableCostBtnCancel())}
                            </Button>
                        </Space>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default PayableCostForm;

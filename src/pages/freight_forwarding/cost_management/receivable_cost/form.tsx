/**
 * 应收费用录入表单页面
 * 对应文档：docs\1.货代操作\1.7 费用管理.md - 应收费用录入页面 (第208-240行)
 */
import React, { useState, useEffect } from 'react';
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

const ReceivableCostForm: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [costItems, setCostItems] = useState<CostItem[]>([]);
    const [summary, setSummary] = useState({
        baseTotal: 0,
        taxTotal: 0,
        grandTotal: 0,
        estimatedProfit: 0,
        profitRate: 0,
    });

    // 费用项表格列定义
    const columns: ColumnsType<CostItem> = [
        {
            title: i18n.t(LocaleHelper.getReceivableCostDetailCostType()),
            dataIndex: 'costType',
            key: 'costType',
            width: 150,
            render: (_, record, index) => (
                <Select
                    style={{ width: '100%' }}
                    value={record.costType}
                    onChange={(value) => handleCostItemChange(index, 'costType', value)}
                >
                    <Option value="OCEAN_FREIGHT">{i18n.t(LocaleHelper.getReceivableCostOptionOceanFreight())}</Option>
                    <Option value="DOC_FEE">{i18n.t(LocaleHelper.getReceivableCostOptionDocFee())}</Option>
                    <Option value="PORT_CHARGE">{i18n.t(LocaleHelper.getReceivableCostOptionPortCharge())}</Option>
                    <Option value="CUSTOMS_FEE">{i18n.t(LocaleHelper.getReceivableCostOptionCustomsFee())}</Option>
                    <Option value="TRUCKING_FEE">{i18n.t(LocaleHelper.getReceivableCostOptionTruckingFee())}</Option>
                    <Option value="WAREHOUSE_FEE">{i18n.t(LocaleHelper.getReceivableCostOptionWarehouseFee())}</Option>
                    <Option value="OTHER">{i18n.t(LocaleHelper.getReceivableCostOptionOther())}</Option>
                </Select>
            ),
        },
        {
            title: i18n.t(LocaleHelper.getReceivableCostDetailCostName()),
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
            title: i18n.t(LocaleHelper.getReceivableCostDetailQuantity()),
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
            title: i18n.t(LocaleHelper.getReceivableCostDetailUnitPrice()),
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
            title: i18n.t(LocaleHelper.getReceivableCostDetailAmount()),
            dataIndex: 'amount',
            key: 'amount',
            width: 120,
            align: 'right',
            render: (value) => `¥${value.toLocaleString()}`,
        },
        {
            title: i18n.t(LocaleHelper.getReceivableCostDetailTaxRate()),
            dataIndex: 'taxRate',
            key: 'taxRate',
            width: 100,
            render: (_, record, index) => (
                <Select
                    style={{ width: '100%' }}
                    value={record.taxRate}
                    onChange={(value) => handleCostItemChange(index, 'taxRate', value)}
                >
                    {[0.13, 0.09, 0.06, 0].map((rate) => (
                        <Option key={rate} value={rate}>{`${rate * 100}%`}</Option>
                    ))}
                </Select>
            ),
        },
        {
            title: i18n.t(LocaleHelper.getReceivableCostDetailTotalAmount()),
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            width: 120,
            align: 'right',
            render: (value) => `¥${value.toLocaleString()}`,
        },
        {
            title: i18n.t(LocaleHelper.getReceivableCostDetailAction()),
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
                    {i18n.t(LocaleHelper.getReceivableCostBtnDelete())}
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
            estimatedProfit: grandTotal * 0.289, // 示例：预计毛利率28.9%
            profitRate: 28.9,
        });
    };

    // 保存草稿
    const handleSaveDraft = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            message.success(i18n.t(LocaleHelper.getReceivableCostMsgSaveDraftSuccess()));
            navigate('/cost_management/receivable_cost');
        } catch (error) {
            message.error(i18n.t(LocaleHelper.getReceivableCostMsgSaveDraftFail()));
        } finally {
            setLoading(false);
        }
    };

    // 提交审核
    const handleSubmitReview = async () => {
        try {
            const values = await form.validateFields();
            if (costItems.length === 0) {
                message.warning(i18n.t(LocaleHelper.getReceivableCostMsgNeedCostItems()));
                return;
            }
            setLoading(true);
            message.success(i18n.t(LocaleHelper.getReceivableCostMsgSubmitSuccess()));
            navigate('/cost_management/receivable_cost');
        } catch (error) {
            message.error(i18n.t(LocaleHelper.getReceivableCostMsgSubmitFail()));
        } finally {
            setLoading(false);
        }
    };

    // 从模板导入
    const handleImportFromTemplate = () => {
        message.info(i18n.t(LocaleHelper.getReceivableCostMsgImportTemplateWip()));
    };

    const handleBack = () => {
        navigate('/cost_management/receivable_cost');
    };

    // 智能匹配费率（已重命名为自动生成费用）
    const handleAutoGenerateCosts = async () => {
        try {
            const orderNo = form.getFieldValue('orderNo');
            if (!orderNo) {
                message.warning(i18n.t(LocaleHelper.getReceivableCostMsgSelectOrderFirst()));
                return;
            }

            message.loading({ content: i18n.t(LocaleHelper.getReceivableCostMsgAutoGenerateLoading()), key: 'autoGenerate' });

            // TODO: 调用API自动生成费用
            // 1. 获取订单信息（航线、箱型、重量等）
            // 2. 匹配客户合同费率规则
            // 3. 自动计算并生成费用明细

            // 模拟自动生成的费用数据
            setTimeout(() => {
                const autoGeneratedItems: CostItem[] = [
                    {
                        key: `auto_${Date.now()}_1`,
                        costType: 'OCEAN_FREIGHT',
                        costName: i18n.t(LocaleHelper.getReceivableCostOptionOceanFreight()),
                        quantity: 2,
                        unitPrice: 7500,
                        amount: 15000,
                        taxRate: 0.13,
                        taxAmount: 1950,
                        totalAmount: 16950,
                    },
                    {
                        key: `auto_${Date.now()}_2`,
                        costType: 'DOC_FEE',
                        costName: i18n.t(LocaleHelper.getReceivableCostOptionDocFee()),
                        quantity: 1,
                        unitPrice: 300,
                        amount: 300,
                        taxRate: 0.06,
                        taxAmount: 18,
                        totalAmount: 318,
                    },
                    {
                        key: `auto_${Date.now()}_3`,
                        costType: 'PORT_CHARGE',
                        costName: i18n.t(LocaleHelper.getReceivableCostOptionPortCharge()),
                        quantity: 1,
                        unitPrice: 2500,
                        amount: 2500,
                        taxRate: 0.13,
                        taxAmount: 325,
                        totalAmount: 2825,
                    },
                ];

                setCostItems(autoGeneratedItems);
                calculateSummary(autoGeneratedItems);
                message.success({ content: i18n.t(LocaleHelper.getReceivableCostMsgAutoGenerateSuccess()), key: 'autoGenerate' });
            }, 1000);
        } catch (error) {
            message.error({ content: i18n.t(LocaleHelper.getReceivableCostMsgAutoGenerateFail()), key: 'autoGenerate' });
        }
    };

    // 重新生成费用
    const handleRegenerateCosts = () => {
        if (costItems.length > 0) {
            Modal.confirm({
                title: i18n.t(LocaleHelper.getReceivableCostMsgConfirmRegenerateTitle()),
                content: i18n.t(LocaleHelper.getReceivableCostMsgConfirmRegenerateContent()),
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
            title: i18n.t(LocaleHelper.getReceivableCostMsgConfirmClearTitle()),
            content: i18n.t(LocaleHelper.getReceivableCostMsgConfirmClearContent()),
            onOk: () => {
                setCostItems([]);
                setSummary({
                    baseTotal: 0,
                    taxTotal: 0,
                    grandTotal: 0,
                    estimatedProfit: 0,
                    profitRate: 0,
                });
                message.success(i18n.t(LocaleHelper.getReceivableCostMsgClearSuccess()));
            },
        });
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {id ? i18n.t(LocaleHelper.getReceivableCostEditTitle()) : i18n.t(LocaleHelper.getReceivableCostCreateTitle())}
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
                    <Row gutter={16}>
                        <Col span={16}>
                            <Card title={i18n.t(LocaleHelper.getReceivableCostSectionBasicInfo())} style={{ marginBottom: 16 }} bodyStyle={{ textAlign: 'left' }}>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Form.Item
                                            label={i18n.t(LocaleHelper.getReceivableCostFormOrderNo())}
                                            name="orderNo"
                                            rules={[{ required: true, message: i18n.t(LocaleHelper.getReceivableCostMsgOrderNoRequired()) }]}
                                        >
                                            <Input placeholder={i18n.t(LocaleHelper.getReceivableCostPlaceholderOrderNo())} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            label={i18n.t(LocaleHelper.getReceivableCostFormCustomer())}
                                            name="customerName"
                                            rules={[{ required: true, message: i18n.t(LocaleHelper.getReceivableCostMsgCustomerRequired()) }]}
                                        >
                                            <Input placeholder={i18n.t(LocaleHelper.getReceivableCostPlaceholderCustomer())} disabled />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label={i18n.t(LocaleHelper.getReceivableCostFormContract())} name="contractNo">
                                            <Input placeholder={i18n.t(LocaleHelper.getReceivableCostPlaceholderContract())} disabled />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            label={i18n.t(LocaleHelper.getReceivableCostFormCurrency())}
                                            name="currency"
                                            rules={[{ required: true, message: i18n.t(LocaleHelper.getReceivableCostMsgCurrencyRequired()) }]}
                                        >
                                            <Select>
                                                <Option value="CNY">CNY</Option>
                                                <Option value="USD">USD</Option>
                                                <Option value="EUR">EUR</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label={i18n.t(LocaleHelper.getReceivableCostFormExchangeRate())} name="exchangeRate">
                                            <InputNumber
                                                min={0}
                                                precision={4}
                                                style={{ width: '100%' }}
                                                placeholder={i18n.t(LocaleHelper.getReceivableCostPlaceholderExchangeRate())}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label={i18n.t(LocaleHelper.getReceivableCostFormSalesman())} name="salesman">
                                            <Input placeholder={i18n.t(LocaleHelper.getReceivableCostPlaceholderSalesman())} disabled />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label={i18n.t(LocaleHelper.getReceivableCostFormCreateTime())} name="createTime">
                                            <Input placeholder={i18n.t(LocaleHelper.getReceivableCostPlaceholderCreateTime())} disabled />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>

                            <Card
                                title={i18n.t(LocaleHelper.getReceivableCostSectionCostItems())}
                                style={{ marginBottom: 16 }}
                                extra={
                                    <Space>
                                        <Button type="primary" icon={<PlusOutlined />} onClick={handleAutoGenerateCosts}>
                                            {i18n.t(LocaleHelper.getReceivableCostBtnAutoGenerate())}
                                        </Button>
                                        <Button icon={<PlusOutlined />} onClick={handleAddCostItem}>
                                            {i18n.t(LocaleHelper.getReceivableCostBtnManualAdd())}
                                        </Button>
                                        <Button onClick={handleImportFromTemplate}>
                                            {i18n.t(LocaleHelper.getReceivableCostBtnImportTemplate())}
                                        </Button>
                                        <Button onClick={handleRegenerateCosts}>
                                            {i18n.t(LocaleHelper.getReceivableCostBtnRegenerate())}
                                        </Button>
                                        <Button danger onClick={handleClearAll}>
                                            {i18n.t(LocaleHelper.getReceivableCostBtnClearAll())}
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

                            <Card title={i18n.t(LocaleHelper.getReceivableCostSectionRemark())} style={{ marginBottom: 16 }} bodyStyle={{ textAlign: 'left' }}>
                                <Form.Item name="remark">
                                    <Input.TextArea rows={3} placeholder={i18n.t(LocaleHelper.getReceivableCostPlaceholderRemark())} />
                                </Form.Item>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title={i18n.t(LocaleHelper.getReceivableCostSectionSummary())} style={{ marginBottom: 16 }} bodyStyle={{ textAlign: 'left' }}>
                                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                                    <div style={{ fontSize: 14 }}>
                                        <span style={{ color: '#666' }}>{i18n.t(LocaleHelper.getReceivableCostSummaryTotalAmount())}：</span>
                                        <span style={{ fontSize: 16, fontWeight: 500, color: '#1890ff' }}>
                                            ¥{summary.baseTotal.toLocaleString()}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: 14 }}>
                                        <span style={{ color: '#666' }}>{i18n.t(LocaleHelper.getReceivableCostSummaryTaxAmount())}：</span>
                                        <span style={{ fontSize: 16, fontWeight: 500, color: '#1890ff' }}>
                                            ¥{summary.taxTotal.toLocaleString()}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: 14 }}>
                                        <span style={{ color: '#666' }}>{i18n.t(LocaleHelper.getReceivableCostSummaryGrandTotal())}：</span>
                                        <span style={{ fontSize: 16, fontWeight: 500, color: '#ff4d4f' }}>
                                            ¥{summary.grandTotal.toLocaleString()}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: 14 }}>
                                        <span style={{ color: '#666' }}>{i18n.t(LocaleHelper.getReceivableCostSummaryEstimatedProfit())}：</span>
                                        <span style={{ fontSize: 16, fontWeight: 500, color: '#52c41a' }}>
                                            ¥{summary.estimatedProfit.toLocaleString()} ({summary.profitRate}%)
                                        </span>
                                    </div>
                                </Space>
                            </Card>

                            <Card title={i18n.t(LocaleHelper.getReceivableCostSectionAuditSettings())} style={{ marginBottom: 16 }} bodyStyle={{ textAlign: 'left' }}>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item label={i18n.t(LocaleHelper.getReceivableCostFormReviewLevel())} name="reviewLevel">
                                            <Select>
                                                <Option value="LEVEL_1">{i18n.t(LocaleHelper.getReceivableCostReviewLevelOne())}</Option>
                                                <Option value="LEVEL_2">{i18n.t(LocaleHelper.getReceivableCostReviewLevelTwo())}</Option>
                                                <Option value="LEVEL_3">{i18n.t(LocaleHelper.getReceivableCostReviewLevelThree())}</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label={i18n.t(LocaleHelper.getReceivableCostFormUrgency())} name="urgency">
                                            <Select>
                                                <Option value="NORMAL">{i18n.t(LocaleHelper.getReceivableCostUrgencyNormal())}</Option>
                                                <Option value="URGENT">{i18n.t(LocaleHelper.getReceivableCostUrgencyUrgent())}</Option>
                                                <Option value="VERY_URGENT">{i18n.t(LocaleHelper.getReceivableCostUrgencyVeryUrgent())}</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label={i18n.t(LocaleHelper.getReceivableCostFormReviewer())} name="reviewer">
                                            <Input placeholder={i18n.t(LocaleHelper.getReceivableCostPlaceholderReviewer())} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label={i18n.t(LocaleHelper.getReceivableCostFormEstimatedReviewTime())} name="estimatedReviewTime">
                                            <Input placeholder={i18n.t(LocaleHelper.getReceivableCostPlaceholderEstimatedReviewTime())} disabled />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>

                    <div style={{ textAlign: 'center', marginTop: 24 }}>
                        <Space size="middle">
                            <Button
                                icon={<SaveOutlined />}
                                onClick={handleSaveDraft}
                                loading={loading}
                            >
                                {i18n.t(LocaleHelper.getReceivableCostBtnSaveDraft())}
                            </Button>
                            <Button
                                type="primary"
                                icon={<CheckOutlined />}
                                onClick={handleSubmitReview}
                                loading={loading}
                            >
                                {i18n.t(LocaleHelper.getReceivableCostBtnSubmit())}
                            </Button>
                            <Button icon={<PrinterOutlined />}>
                                {i18n.t(LocaleHelper.getReceivableCostBtnPreviewPrint())}
                            </Button>
                            <Button onClick={() => navigate('/cost_management/receivable_cost')}>
                                {i18n.t(LocaleHelper.getReceivableCostBtnCancel())}
                            </Button>
                        </Space>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default ReceivableCostForm;

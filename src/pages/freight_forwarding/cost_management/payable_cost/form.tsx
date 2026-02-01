/**
 * 应付费用录入表单页面
 * 参考应收费用录入页面设计，适配应付费用业务场景
 */
import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Table, InputNumber, Card, Row, Col, message, Space, Divider, Modal } from 'antd';
import { PlusOutlined, DeleteOutlined, SaveOutlined, CheckOutlined, PrinterOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import CustomIcon from '@/components/custom-icon';
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
            title: '费用类型',
            dataIndex: 'costType',
            key: 'costType',
            width: 150,
            render: (_, record, index) => (
                <Select
                    style={{ width: '100%' }}
                    value={record.costType}
                    onChange={(value) => handleCostItemChange(index, 'costType', value)}
                >
                    <Option value="OCEAN_FREIGHT">海运费</Option>
                    <Option value="PORT_CHARGE">港杂费</Option>
                    <Option value="CUSTOMS_FEE">报关费</Option>
                    <Option value="TRUCKING_FEE">拖车费</Option>
                    <Option value="WAREHOUSE_FEE">仓储费</Option>
                    <Option value="HANDLING_FEE">装卸费</Option>
                    <Option value="OTHER">其他</Option>
                </Select>
            ),
        },
        {
            title: '费用名称',
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
            title: '数量',
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
            title: '单价',
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
            title: '金额',
            dataIndex: 'amount',
            key: 'amount',
            width: 120,
            align: 'right',
            render: (value) => `¥${value.toLocaleString()}`,
        },
        {
            title: '税率',
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
            title: '含税金额',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            width: 120,
            align: 'right',
            render: (value) => `¥${value.toLocaleString()}`,
        },
        {
            title: '操作',
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
                    删除
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
            const values = await form.validateFields();
            setLoading(true);
            // TODO: 调用API保存草稿
            message.success('草稿保存成功');
            navigate('/freight-forwarding/cost-management/payable-cost');
        } catch (error) {
            message.error('保存失败');
        } finally {
            setLoading(false);
        }
    };

    // 提交审核
    const handleSubmitReview = async () => {
        try {
            const values = await form.validateFields();
            if (costItems.length === 0) {
                message.warning('请至少添加一项费用');
                return;
            }
            setLoading(true);
            // TODO: 调用API提交审核
            message.success('提交审核成功');
            navigate('/freight-forwarding/cost-management/payable-cost');
        } catch (error) {
            message.error('提交失败');
        } finally {
            setLoading(false);
        }
    };

    // 从模板导入
    const handleImportFromTemplate = () => {
        message.info('从模板导入功能开发中...');
    };

    // 自动生成费用
    const handleAutoGenerateCosts = async () => {
        try {
            const waybillNo = form.getFieldValue('waybillNo');
            if (!waybillNo) {
                message.warning('请先选择运单号');
                return;
            }

            message.loading({ content: '正在自动生成费用...', key: 'autoGenerate' });

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
                        costName: '海运费',
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
                        costName: '港杂费',
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
                        costName: '装卸费',
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
                message.success({ content: '费用自动生成成功！已根据供应商协议匹配费率', key: 'autoGenerate' });
            }, 1000);
        } catch (error) {
            message.error({ content: '自动生成费用失败', key: 'autoGenerate' });
        }
    };

    // 重新生成费用
    const handleRegenerateCosts = () => {
        if (costItems.length > 0) {
            Modal.confirm({
                title: '确认重新生成费用？',
                content: '重新生成将清空当前所有费用明细，此操作不可恢复',
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
            title: '确认清空所有费用？',
            content: '清空后需要重新添加费用明细，此操作不可恢复',
            onOk: () => {
                setCostItems([]);
                setSummary({
                    baseTotal: 0,
                    taxTotal: 0,
                    grandTotal: 0,
                });
                message.success('已清空所有费用');
            },
        });
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            {/* 页面头部 */}
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap">
                        <CustomIcon type="icon-Currency" style={{ fontSize: 24, marginRight: 8 }} />
                        <span style={{ fontSize: 18, fontWeight: 500 }}>
                            {id ? '编辑应付费用' : '新建应付费用'}
                        </span>
                    </div>
                </div>
            </div>

            {/* 表单内容 */}
            <div style={{ padding: '16px 24px' }}>
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
                    <Card title="基本信息" style={{ marginBottom: 16 }}>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item
                                    label="运单号"
                                    name="waybillNo"
                                    rules={[{ required: true, message: '请输入运单号' }]}
                                >
                                    <Input placeholder="请输入或选择运单号" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="服务类型"
                                    name="serviceType"
                                    rules={[{ required: true, message: '请选择服务类型' }]}
                                >
                                    <Select placeholder="请选择服务类型">
                                        <Option value="SHIPPING">运输</Option>
                                        <Option value="BOOKING">订舱</Option>
                                        <Option value="TRUCKING">拖车</Option>
                                        <Option value="CUSTOMS">报关</Option>
                                        <Option value="WAREHOUSE">仓储</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="供应商"
                                    name="supplierName"
                                    rules={[{ required: true, message: '请选择供应商' }]}
                                >
                                    <Input placeholder="请选择供应商" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="供应商协议" name="agreementNo">
                                    <Input placeholder="自动带出协议编号" disabled />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item
                                    label="币种"
                                    name="currency"
                                    rules={[{ required: true, message: '请选择币种' }]}
                                >
                                    <Select>
                                        <Option value="CNY">CNY</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="EUR">EUR</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="汇率" name="exchangeRate">
                                    <InputNumber
                                        min={0}
                                        precision={4}
                                        style={{ width: '100%' }}
                                        placeholder="自动获取汇率"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="操作员" name="operator">
                                    <Input placeholder="自动带出操作员" disabled />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="服务日期" name="serviceDate">
                                    <Input placeholder="自动生成" disabled />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    {/* 费用明细 */}
                    <Card
                        title="费用明细"
                        style={{ marginBottom: 16 }}
                        extra={
                            <Space>
                                <Button type="primary" icon={<PlusOutlined />} onClick={handleAutoGenerateCosts}>
                                    🤖 自动生成费用
                                </Button>
                                <Button icon={<PlusOutlined />} onClick={handleAddCostItem}>
                                    ✏️ 手动添加
                                </Button>
                                <Button onClick={handleImportFromTemplate}>📋 从模板导入</Button>
                                <Button onClick={handleRegenerateCosts}>重新生成</Button>
                                <Button danger onClick={handleClearAll}>清空重来</Button>
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
                    <Card title="费用汇总" style={{ marginBottom: 16 }}>
                        <Row gutter={16}>
                            <Col span={8}>
                                <div style={{ fontSize: 14 }}>
                                    <span style={{ color: '#666' }}>不含税总额：</span>
                                    <span style={{ fontSize: 16, fontWeight: 500, color: '#1890ff' }}>
                                        ¥{summary.baseTotal.toLocaleString()}
                                    </span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div style={{ fontSize: 14 }}>
                                    <span style={{ color: '#666' }}>税额：</span>
                                    <span style={{ fontSize: 16, fontWeight: 500, color: '#1890ff' }}>
                                        ¥{summary.taxTotal.toLocaleString()}
                                    </span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div style={{ fontSize: 14 }}>
                                    <span style={{ color: '#666' }}>含税总额：</span>
                                    <span style={{ fontSize: 16, fontWeight: 500, color: '#ff4d4f' }}>
                                        ¥{summary.grandTotal.toLocaleString()}
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </Card>

                    {/* 审核设置 */}
                    <Card title="审核设置" style={{ marginBottom: 16 }}>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label="审核级别" name="reviewLevel">
                                    <Select>
                                        <Option value="LEVEL_1">一级审核</Option>
                                        <Option value="LEVEL_2">二级审核</Option>
                                        <Option value="LEVEL_3">三级审核</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="紧急程度" name="urgency">
                                    <Select>
                                        <Option value="NORMAL">普通</Option>
                                        <Option value="URGENT">紧急</Option>
                                        <Option value="VERY_URGENT">非常紧急</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="审核人" name="reviewer">
                                    <Input placeholder="自动分配审核人" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="预计审核时间" name="estimatedReviewTime">
                                    <Input placeholder="自动计算" disabled />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    {/* 备注 */}
                    <Card title="备注" style={{ marginBottom: 16 }}>
                        <Form.Item name="remark">
                            <Input.TextArea rows={3} placeholder="请输入备注信息" />
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
                                保存草稿
                            </Button>
                            <Button
                                type="primary"
                                icon={<CheckOutlined />}
                                onClick={handleSubmitReview}
                                loading={loading}
                            >
                                提交审核
                            </Button>
                            <Button icon={<PrinterOutlined />}>预览打印</Button>
                            <Button onClick={() => navigate('/cost_management/payable_cost')}>
                                取消
                            </Button>
                        </Space>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default PayableCostForm;

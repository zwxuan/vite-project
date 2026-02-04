/**
 * 费用详情页面
 */
import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Table, Tag, Button, Space, Divider, Timeline, message, Modal, Form, Input, InputNumber, Select, Upload } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeftOutlined,
    EditOutlined,
    DeleteOutlined,
    PrinterOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    FormOutlined,
    UploadOutlined
} from '@ant-design/icons';
import CustomIcon from '@/components/custom-icon';
import { CostStatus } from '@/types/freight_forwarding/cost_management';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import '@/pages/page_list.less';
import { CostItem, getItemColumns } from './columns';

interface CostDetailInfo {
    id: string;
    orderNo: string;
    waybillNo?: string;
    costType: 'RECEIVABLE' | 'PAYABLE';
    costName: string;
    amount: number;
    currency: string;
    status: CostStatus;
    customer?: string;
    supplier?: string;
    createTime: string;
    updateTime: string;
    creator: string;
    remark?: string;
}

interface AuditHistory {
    id: string;
    action: string;
    operator: string;
    time: string;
    remark?: string;
    status: string;
}

const CostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [costInfo, setCostInfo] = useState<CostDetailInfo | null>(null);
    const [costItems, setCostItems] = useState<CostItem[]>([]);
    const [auditHistory, setAuditHistory] = useState<AuditHistory[]>([]);
    const [isAdjustmentModalOpen, setIsAdjustmentModalOpen] = useState(false);
    const [adjustmentForm] = Form.useForm();

    const handleApplyAdjustment = () => {
        setIsAdjustmentModalOpen(true);
    };

    const handleAdjustmentOk = () => {
        adjustmentForm.validateFields().then(values => {
            console.log('Adjustment values:', values);
            setIsAdjustmentModalOpen(false);
            message.success(i18n.t(LocaleHelper.getCostOverviewMsgApplySuccess()));
            adjustmentForm.resetFields();
            // In a real app, this would submit to the API and then refresh data
        });
    };

    const handleAdjustmentCancel = () => {
        setIsAdjustmentModalOpen(false);
        adjustmentForm.resetFields();
    };

    // 费用项列定义
    const itemColumns = getItemColumns();

    // 获取状态标签
    const getStatusTag = (status: CostStatus) => {
        const statusConfig = {
            [CostStatus.DRAFT]: { color: 'default', text: i18n.t(LocaleHelper.getCostOverviewStatusDraft()) },
            [CostStatus.PENDING]: { color: 'processing', text: i18n.t(LocaleHelper.getCostOverviewStatusPending()) },
            [CostStatus.APPROVED]: { color: 'success', text: i18n.t(LocaleHelper.getCostOverviewStatusApproved()) },
            [CostStatus.REJECTED]: { color: 'error', text: i18n.t(LocaleHelper.getCostOverviewStatusRejected()) },
            [CostStatus.CONFIRMED]: { color: 'success', text: i18n.t(LocaleHelper.getCostOverviewStatusConfirmed()) },
        };
        const config = statusConfig[status] || { color: 'default', text: status };
        return <Tag color={config.color}>{config.text}</Tag>;
    };

    // 加载数据
    const loadData = async () => {
        setLoading(true);
        try {
            // 模拟数据
            const mockCostInfo: CostDetailInfo = {
                id: id || '1',
                orderNo: 'ORD001',
                waybillNo: 'WAY001',
                costType: 'RECEIVABLE',
                costName: '海运费',
                amount: 15000,
                currency: 'CNY',
                status: CostStatus.CONFIRMED,
                customer: '客户A',
                createTime: '2024-03-15 14:30',
                updateTime: '2024-03-16 10:00',
                creator: '张三',
                remark: '正常海运费用',
            };

            const mockItems: CostItem[] = [
                {
                    id: '1',
                    itemName: '海运费',
                    quantity: 2,
                    unitPrice: 7500,
                    amount: 15000,
                    taxRate: 13,
                    taxAmount: 1950,
                    totalAmount: 16950,
                },
            ];

            const mockHistory: AuditHistory[] = [
                {
                    id: '1',
                    action: '创建费用',
                    operator: '张三',
                    time: '2024-03-15 14:30',
                    status: 'DRAFT',
                },
                {
                    id: '2',
                    action: '提交审核',
                    operator: '张三',
                    time: '2024-03-15 15:00',
                    status: 'PENDING',
                },
                {
                    id: '3',
                    action: '审核通过',
                    operator: '李经理',
                    time: '2024-03-16 10:00',
                    remark: '费用合理，审核通过',
                    status: 'APPROVED',
                },
                {
                    id: '4',
                    action: '确认费用',
                    operator: '王财务',
                    time: '2024-03-16 14:00',
                    status: 'CONFIRMED',
                },
            ];

            setCostInfo(mockCostInfo);
            setCostItems(mockItems);
            setAuditHistory(mockHistory);
        } catch (error) {
            message.error(i18n.t(LocaleHelper.getCostOverviewMsgLoadFail()));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [id]);

    // 返回列表
    const handleBack = () => {
        navigate('/cost_management/cost_overview');
    };

    // 编辑
    const handleEdit = () => {
        message.info(i18n.t(LocaleHelper.getCostOverviewMsgEditWip()));
    };

    // 删除
    const handleDelete = () => {
        message.info(i18n.t(LocaleHelper.getCostOverviewMsgDeleteWip()));
    };

    // 打印
    const handlePrint = () => {
        window.print();
    };

    if (!costInfo) {
        return <div>{i18n.t(LocaleHelper.getLoading())}</div>;
    }

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getCostOverviewDetailTitle())} - {costInfo.orderNo}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            
                            <Button icon={<EditOutlined />} onClick={handleEdit}>
                                {i18n.t(LocaleHelper.getCostOverviewBtnEdit())}
                            </Button>
                            <Button icon={<DeleteOutlined />} onClick={handleDelete}>
                                {i18n.t(LocaleHelper.getCostOverviewBtnDelete())}
                            </Button>
                            <Button icon={<PrinterOutlined />} onClick={handlePrint}>
                                {i18n.t(LocaleHelper.getCostOverviewBtnPrint())}
                            </Button>
                            <Button type="primary" icon={<FormOutlined />} onClick={handleApplyAdjustment}>
                                {i18n.t(LocaleHelper.getCostOverviewBtnApplyAdjustment())}
                            </Button>
                            <Button onClick={handleBack}>
                                {i18n.t(LocaleHelper.getCostOverviewBtnBack())}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '24px', background: '#f0f2f5' }}>

                {/* 基本信息 */}
                <Card title={i18n.t(LocaleHelper.getCostOverviewSectionBasicInfo())} style={{ marginBottom: '16px' }}>
                    <Descriptions column={3} bordered>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getCostOverviewLabelCostId())}>{costInfo.id}</Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getCostOverviewColOrderNo())}>{costInfo.orderNo}</Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getCostOverviewColWaybillNo())}>{costInfo.waybillNo || '-'}</Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getCostOverviewColCostType())}>
                            <Tag color={costInfo.costType === 'RECEIVABLE' ? 'green' : 'orange'}>
                                {costInfo.costType === 'RECEIVABLE' ? i18n.t(LocaleHelper.getCostOverviewTypeReceivable()) : i18n.t(LocaleHelper.getCostOverviewTypePayable())}
                            </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getCostOverviewColCostName())}>{costInfo.costName}</Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getCostOverviewColStatus())}>
                            {getStatusTag(costInfo.status)}
                        </Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getCostOverviewColAmount())}>
                            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1890ff' }}>
                                {costInfo.currency} {costInfo.amount.toLocaleString()}
                            </span>
                        </Descriptions.Item>
                        <Descriptions.Item label={costInfo.costType === 'RECEIVABLE' ? i18n.t(LocaleHelper.getCostOverviewColCustomer()) : i18n.t(LocaleHelper.getCostOverviewLabelSupplier())}>
                            {costInfo.customer || costInfo.supplier || '-'}
                        </Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getCostOverviewLabelCurrency())}>{costInfo.currency}</Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getCostOverviewLabelCreator())}>{costInfo.creator}</Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getCostOverviewLabelCreateTime())}>{costInfo.createTime}</Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getCostOverviewLabelUpdateTime())}>{costInfo.updateTime}</Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getCostOverviewLabelRemark())} span={3}>
                            {costInfo.remark || '-'}
                        </Descriptions.Item>
                    </Descriptions>
                </Card>

                {/* 费用明细 */}
                <Card title={i18n.t(LocaleHelper.getCostOverviewSectionCostItems())} style={{ marginBottom: '16px' }}>
                    <Table
                        columns={itemColumns}
                        dataSource={costItems}
                        rowKey="id"
                        pagination={false}
                        size="small"
                        bordered
                        summary={(pageData) => {
                            let totalAmount = 0;
                            let totalTax = 0;
                            let totalWithTax = 0;

                            pageData.forEach(({ amount, taxAmount, totalAmount: total }) => {
                                totalAmount += amount;
                                totalTax += taxAmount;
                                totalWithTax += total;
                            });

                            return (
                                <Table.Summary fixed>
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell index={0} colSpan={3}>
                                            <strong>{i18n.t(LocaleHelper.getCostOverviewTotal())}</strong>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={1} align="right">
                                            <strong>¥{totalAmount.toLocaleString()}</strong>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={2}></Table.Summary.Cell>
                                        <Table.Summary.Cell index={3} align="right">
                                            <strong>¥{totalTax.toLocaleString()}</strong>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={4} align="right">
                                            <strong>¥{totalWithTax.toLocaleString()}</strong>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={5}></Table.Summary.Cell>
                                    </Table.Summary.Row>
                                </Table.Summary>
                            );
                        }}
                    />
                </Card>

                {/* 审核历史 */}
                <Card title={i18n.t(LocaleHelper.getCostOverviewSectionAuditHistory())}>
                    <Timeline
                        items={auditHistory.map((item) => ({
                            color: item.status === 'REJECTED' ? 'red' : 'green',
                            dot: item.status === 'REJECTED' ? <CloseCircleOutlined /> : <CheckCircleOutlined />,
                            children: (
                                <div>
                                    <div>
                                        <strong>{item.action}</strong>
                                        <Tag style={{ marginLeft: '8px' }}>{item.operator}</Tag>
                                    </div>
                                    <div style={{ color: '#999', fontSize: '12px', marginTop: '4px' }}>
                                        {item.time}
                                    </div>
                                    {item.remark && (
                                        <div style={{ marginTop: '4px', color: '#666' }}>
                                            备注：{item.remark}
                                        </div>
                                    )}
                                </div>
                            ),
                        }))}
                    />
                </Card>
            </div>

            <Modal
                title={i18n.t(LocaleHelper.getCostOverviewModalTitleApplyAdjustment())}
                open={isAdjustmentModalOpen}
                onOk={handleAdjustmentOk}
                onCancel={handleAdjustmentCancel}
                width={600}
            >
                <Form form={adjustmentForm} layout="vertical">
                    <Form.Item
                        name="adjustmentType"
                        label={i18n.t(LocaleHelper.getCostOverviewLabelAdjustmentType())}
                        rules={[{ required: true }]}
                    >
                        <Select>
                            <Select.Option value="PROFIT">{i18n.t(LocaleHelper.getCostOverviewOptionAdjTypeProfit())}</Select.Option>
                            <Select.Option value="COST">{i18n.t(LocaleHelper.getCostOverviewOptionAdjTypeCost())}</Select.Option>
                            <Select.Option value="EXCHANGE">{i18n.t(LocaleHelper.getCostOverviewOptionAdjTypeExchange())}</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="settlementObject"
                        label={i18n.t(LocaleHelper.getCostOverviewLabelSettlementObject())}
                        initialValue={costInfo?.customer || costInfo?.supplier}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="amount"
                        label={i18n.t(LocaleHelper.getCostOverviewLabelAdjustmentAmount())}
                        rules={[{ required: true }]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            addonBefore={
                                <Form.Item name="currency" noStyle initialValue={costInfo?.currency || 'CNY'}>
                                    <Select style={{ width: 80 }}>
                                        <Select.Option value="CNY">CNY</Select.Option>
                                        <Select.Option value="USD">USD</Select.Option>
                                        <Select.Option value="EUR">EUR</Select.Option>
                                    </Select>
                                </Form.Item>
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="reason"
                        label={i18n.t(LocaleHelper.getCostOverviewLabelAdjustmentReason())}
                        rules={[{ required: true }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        name="attachment"
                        label={i18n.t(LocaleHelper.getCostOverviewLabelAttachment())}
                    >
                        <Upload>
                            <Button icon={<UploadOutlined />}>{i18n.t(LocaleHelper.getCostOverviewBtnUpload())}</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CostDetail;

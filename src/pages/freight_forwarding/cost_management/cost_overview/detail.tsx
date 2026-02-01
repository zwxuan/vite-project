/**
 * 费用详情页面
 */
import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Table, Tag, Button, Space, Divider, Timeline, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeftOutlined,
    EditOutlined,
    DeleteOutlined,
    PrinterOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { CostStatus } from '@/types/freight_forwarding/cost_management';
import '@/pages/page_list.less';

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

interface CostItem {
    id: string;
    itemName: string;
    quantity: number;
    unitPrice: number;
    amount: number;
    taxRate: number;
    taxAmount: number;
    totalAmount: number;
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

    // 费用项列定义
    const itemColumns: ColumnsType<CostItem> = [
        {
            title: '费用项名称',
            dataIndex: 'itemName',
            key: 'itemName',
            width: 150,
        },
        {
            title: '数量',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 100,
            align: 'right',
        },
        {
            title: '单价',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
            width: 120,
            align: 'right',
            render: (value) => `¥${value.toLocaleString()}`,
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
            align: 'right',
            render: (value) => `${value}%`,
        },
        {
            title: '税额',
            dataIndex: 'taxAmount',
            key: 'taxAmount',
            width: 120,
            align: 'right',
            render: (value) => `¥${value.toLocaleString()}`,
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
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
            ellipsis: true,
        },
    ];

    // 获取状态标签
    const getStatusTag = (status: CostStatus) => {
        const statusConfig = {
            [CostStatus.DRAFT]: { color: 'default', text: '草稿' },
            [CostStatus.PENDING]: { color: 'processing', text: '待审核' },
            [CostStatus.APPROVED]: { color: 'success', text: '已审核' },
            [CostStatus.REJECTED]: { color: 'error', text: '已驳回' },
            [CostStatus.CONFIRMED]: { color: 'success', text: '已确认' },
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
            message.error('加载数据失败');
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
        message.info('编辑功能开发中...');
    };

    // 删除
    const handleDelete = () => {
        message.info('删除功能开发中...');
    };

    // 打印
    const handlePrint = () => {
        window.print();
    };

    if (!costInfo) {
        return <div>加载中...</div>;
    }

    return (
        <div style={{ padding: '24px', background: '#f0f2f5', minHeight: 'calc(100vh - 80px)' }}>
            {/* 页面头部 */}
            <Card style={{ marginBottom: '16px' }}>
                <Space>
                    <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
                        返回
                    </Button>
                    <Divider type="vertical" />
                    <Button icon={<EditOutlined />} onClick={handleEdit}>
                        编辑
                    </Button>
                    <Button icon={<DeleteOutlined />} danger onClick={handleDelete}>
                        删除
                    </Button>
                    <Button icon={<PrinterOutlined />} onClick={handlePrint}>
                        打印
                    </Button>
                </Space>
            </Card>

            {/* 基本信息 */}
            <Card title="基本信息" style={{ marginBottom: '16px' }}>
                <Descriptions column={3} bordered>
                    <Descriptions.Item label="费用ID">{costInfo.id}</Descriptions.Item>
                    <Descriptions.Item label="订单号">{costInfo.orderNo}</Descriptions.Item>
                    <Descriptions.Item label="运单号">{costInfo.waybillNo || '-'}</Descriptions.Item>
                    <Descriptions.Item label="费用类型">
                        <Tag color={costInfo.costType === 'RECEIVABLE' ? 'green' : 'orange'}>
                            {costInfo.costType === 'RECEIVABLE' ? '应收' : '应付'}
                        </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="费用名称">{costInfo.costName}</Descriptions.Item>
                    <Descriptions.Item label="状态">
                        {getStatusTag(costInfo.status)}
                    </Descriptions.Item>
                    <Descriptions.Item label="金额">
                        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1890ff' }}>
                            {costInfo.currency} {costInfo.amount.toLocaleString()}
                        </span>
                    </Descriptions.Item>
                    <Descriptions.Item label={costInfo.costType === 'RECEIVABLE' ? '客户' : '供应商'}>
                        {costInfo.customer || costInfo.supplier || '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="币种">{costInfo.currency}</Descriptions.Item>
                    <Descriptions.Item label="创建人">{costInfo.creator}</Descriptions.Item>
                    <Descriptions.Item label="创建时间">{costInfo.createTime}</Descriptions.Item>
                    <Descriptions.Item label="更新时间">{costInfo.updateTime}</Descriptions.Item>
                    <Descriptions.Item label="备注" span={3}>
                        {costInfo.remark || '-'}
                    </Descriptions.Item>
                </Descriptions>
            </Card>

            {/* 费用明细 */}
            <Card title="费用明细" style={{ marginBottom: '16px' }}>
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
                                        <strong>合计</strong>
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
            <Card title="审核历史">
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
    );
};

export default CostDetail;

/**
 * 费用审核中心列表页面
 */
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Tag, message, Modal, Form, Input, Row, Col, Statistic, Card } from 'antd';
import {
    CheckOutlined,
    CloseOutlined,
    ExportOutlined,
    ExclamationCircleOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
    WarningOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AdvancedSearchForm from '@/components/search-form';
import CustomIcon from '@/components/custom-icon';
import { costReviewCenterSearchFields } from './search_fields';
import { getColumns } from './columns';
import {
    getCostReviewList,
    approveCost,
    rejectCost,
    batchApproveCosts,
    batchRejectCosts,
} from '@/api/freight_forwarding/cost_management/cost_management_service';
import { CostReviewItem, CostStatus, CostUrgency } from '@/types/freight_forwarding/cost_management';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import '@/pages/page_list.less';

const { TextArea } = Input;

const CostReviewCenter: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState<CostReviewItem[]>([]);
    const [total, setTotal] = useState(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [searchParams, setSearchParams] = useState<any>({
        pageNum: 1,
        pageSize: 10,
        status: 'PENDING', // 默认显示待审核
    });
    const [reviewModalVisible, setReviewModalVisible] = useState(false);
    const [currentReviewItem, setCurrentReviewItem] = useState<CostReviewItem | null>(null);
    const [reviewAction, setReviewAction] = useState<'approve' | 'reject'>('approve');
    const [form] = Form.useForm();

    // 统计数据
    const [statistics, setStatistics] = useState({
        pendingTotal: 0,
        urgentCount: 0,
        overdueCount: 0,
        todayReviewed: 0,
    });



    // 加载数据
    const loadData = async () => {
        setLoading(true);
        try {
            const response = await getCostReviewList(searchParams);
            setDataSource(response.list);
            setTotal(response.total);
            setStatistics(response.statistics || statistics);
        } catch (error) {
            message.error('加载数据失败');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [searchParams]);

    // 搜索处理
    const handleSearch = (values: any) => {
        setSearchParams({
            ...values,
            pageNum: 1,
            pageSize: searchParams.pageSize,
        });
    };

    // 审核处理
    const handleReview = (record: CostReviewItem, action: 'approve' | 'reject') => {
        setCurrentReviewItem(record);
        setReviewAction(action);
        setReviewModalVisible(true);
        form.resetFields();
    };

    const columns = getColumns(handleReview);

    // 提交审核
    const handleReviewSubmit = async () => {
        try {
            const values = await form.validateFields();
            const reviewData = {
                id: currentReviewItem!.id,
                comment: values.comment,
            };

            if (reviewAction === 'approve') {
                await approveCost(reviewData);
                message.success(i18n.t(LocaleHelper.getCostReviewCenterMsgApproveSuccess()));
            } else {
                await rejectCost(reviewData);
                message.success(i18n.t(LocaleHelper.getCostReviewCenterMsgRejectSuccess()));
            }

            setReviewModalVisible(false);
            loadData();
        } catch (error) {
            // 表单验证失败或API调用失败
        }
    };

    // 批量审核通过
    const handleBatchApprove = () => {
        if (selectedRowKeys.length === 0) {
            message.warning(i18n.t(LocaleHelper.getCostReviewCenterMsgSelectAtLeastOne()));
            return;
        }

        Modal.confirm({
            title: '确认批量审核',
            content: i18n.t(LocaleHelper.getCostReviewCenterMsgConfirmBatchApprove()),
            onOk: async () => {
                try {
                    await batchApproveCosts({ ids: selectedRowKeys as string[] });
                    message.success(i18n.t(LocaleHelper.getCostReviewCenterMsgBatchApproveSuccess()));
                    setSelectedRowKeys([]);
                    loadData();
                } catch (error) {
                    message.error('批量审核失败');
                }
            },
        });
    };

    // 批量驳回
    const handleBatchReject = () => {
        if (selectedRowKeys.length === 0) {
            message.warning(i18n.t(LocaleHelper.getCostReviewCenterMsgSelectAtLeastOne()));
            return;
        }

        Modal.confirm({
            title: '确认批量驳回',
            content: i18n.t(LocaleHelper.getCostReviewCenterMsgConfirmBatchReject()),
            onOk: async () => {
                try {
                    await batchRejectCosts({ ids: selectedRowKeys as string[] });
                    message.success(i18n.t(LocaleHelper.getCostReviewCenterMsgBatchRejectSuccess()));
                    setSelectedRowKeys([]);
                    loadData();
                } catch (error) {
                    message.error('批量驳回失败');
                }
            },
        });
    };

    // 分页变化
    const handleTableChange = (pagination: any) => {
        setSearchParams({
            ...searchParams,
            pageNum: pagination.current,
            pageSize: pagination.pageSize,
        });
    };

    // 行选择配置
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys: React.Key[]) => {
            setSelectedRowKeys(selectedKeys);
        },
        getCheckboxProps: (record: CostReviewItem) => ({
            disabled: record.status !== CostStatus.PENDING,
        }),
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            {/* 页面头部 */}
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap">
                        <CustomIcon type="icon-Currency" style={{ fontSize: 24, marginRight: 8 }} />
                        <span style={{ fontSize: 18, fontWeight: 500 }}>
                            {i18n.t(LocaleHelper.getCostReviewCenterListTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button
                                type="primary"
                                danger
                                icon={<CheckOutlined />}
                                onClick={handleBatchApprove}
                                disabled={selectedRowKeys.length === 0}
                            >
                                {i18n.t(LocaleHelper.getCostReviewCenterBtnBatchApprove())}
                            </Button>
                            <Button
                                icon={<CloseOutlined />}
                                onClick={handleBatchReject}
                                disabled={selectedRowKeys.length === 0}
                            >
                                {i18n.t(LocaleHelper.getCostReviewCenterBtnBatchReject())}
                            </Button>
                            <Button icon={<ExportOutlined />}>
                                {i18n.t(LocaleHelper.getCostReviewCenterBtnExport())}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 统计卡片 */}
            <div style={{ padding: '16px 24px', background: '#fff', marginBottom: 16 }}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title={i18n.t(LocaleHelper.getCostReviewCenterStatPendingTotal())}
                                value={statistics.pendingTotal}
                                prefix={<ClockCircleOutlined style={{ color: '#1890ff' }} />}
                                valueStyle={{ color: '#1890ff' }}
                                suffix="项"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title={i18n.t(LocaleHelper.getCostReviewCenterStatUrgent())}
                                value={statistics.urgentCount}
                                prefix={<WarningOutlined style={{ color: '#faad14' }} />}
                                valueStyle={{ color: '#faad14' }}
                                suffix="项"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title={i18n.t(LocaleHelper.getCostReviewCenterStatOverdue())}
                                value={statistics.overdueCount}
                                prefix={<ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />}
                                valueStyle={{ color: '#ff4d4f' }}
                                suffix="项"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title={i18n.t(LocaleHelper.getCostReviewCenterStatTodayReviewed())}
                                value={statistics.todayReviewed}
                                prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                                valueStyle={{ color: '#52c41a' }}
                                suffix="项"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* 搜索表单 */}
            <AdvancedSearchForm
                fields={costReviewCenterSearchFields}
                onSearch={handleSearch}
            />

            {/* 表格 */}
            <div className="nc-bill-table-area">
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    loading={loading}
                    rowKey="id"
                    size="small"
                    bordered={true}
                    rowSelection={rowSelection}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 580px)' }}
                    pagination={{
                        current: searchParams.pageNum,
                        pageSize: searchParams.pageSize,
                        total: total,
                        showTotal: (total) => `共 ${total} 条`,
                        showQuickJumper: true,
                        showSizeChanger: true,
                    }}
                    onChange={handleTableChange}
                />
            </div>

            {/* 审核弹窗 */}
            <Modal
                title={reviewAction === 'approve' ? '审核通过' : '审核驳回'}
                open={reviewModalVisible}
                onOk={handleReviewSubmit}
                onCancel={() => setReviewModalVisible(false)}
                width={600}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="订单号">
                        <Input value={currentReviewItem?.orderNo} disabled />
                    </Form.Item>
                    <Form.Item label="费用金额">
                        <Input
                            value={currentReviewItem ? `${currentReviewItem.currency} ${currentReviewItem.totalAmount.toLocaleString()}` : ''}
                            disabled
                        />
                    </Form.Item>
                    <Form.Item
                        name="comment"
                        label={i18n.t(LocaleHelper.getCostReviewCenterFormReviewComment())}
                        rules={reviewAction === 'reject' ? [{ required: true, message: '驳回时必须填写审核意见' }] : []}
                    >
                        <TextArea
                            rows={4}
                            placeholder={i18n.t(LocaleHelper.getCostReviewCenterFormReviewCommentPlaceholder())}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CostReviewCenter;

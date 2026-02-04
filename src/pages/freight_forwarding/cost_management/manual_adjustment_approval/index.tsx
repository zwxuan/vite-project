import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Row, Space, Statistic, Table, Tag, message, Modal, Tooltip } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, DollarOutlined, HourglassOutlined, ExportOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AdvancedSearchForm from '@/components/search-form';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getManualAdjustmentApprovalSearchFields } from './search_fields';
import { getManualAdjustmentApprovalColumns } from './columns';
import {
    queryManualAdjustmentApprovalList,
    queryManualAdjustmentApprovalStats,
    approveManualAdjustment,
    rejectManualAdjustment,
    batchApproveManualAdjustments,
    batchRejectManualAdjustments,
} from '@/api/freight_forwarding/cost_management/manual_adjustment_approval_service';
import {
    ManualAdjustmentApprovalItem,
    ManualAdjustmentApprovalStats,
    ManualAdjustmentApprovalStatus,
} from '@/types/freight_forwarding/cost_management';
import '@/pages/page_list.less';

const ManualAdjustmentApproval: React.FC = () => {
    const [data, setData] = useState<ManualAdjustmentApprovalItem[]>([]);
    const [stats, setStats] = useState<ManualAdjustmentApprovalStats | null>(null);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState<Record<string, any>>({});
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const fetchData = async () => {
        setLoading(true);
        const queryParams = {
            pageNum: pagination.current,
            pageSize: pagination.pageSize,
            ...filters,
        };
        const [listRes, statsRes] = await Promise.all([
            queryManualAdjustmentApprovalList(queryParams),
            queryManualAdjustmentApprovalStats(queryParams),
        ]);
        setData(listRes.data);
        setPagination((prev) => ({ ...prev, total: listRes.total }));
        setStats(statsRes);
        setLoading(false);
        setSelectedRowKeys([]); // Reset selection on refresh
    };

    const handleApprove = (id: string) => {
        Modal.confirm({
            title: i18n.t(LocaleHelper.getOperation()),
            content: i18n.t(LocaleHelper.getConfirmApprove()),
            onOk: async () => {
                try {
                    await approveManualAdjustment(id);
                    message.success(i18n.t(LocaleHelper.getSuccess()));
                    fetchData();
                } catch (error) {
                    message.error(i18n.t(LocaleHelper.getFail()));
                }
            },
        });
    };

    const handleReject = (id: string) => {
        Modal.confirm({
            title: i18n.t(LocaleHelper.getOperation()),
            content: i18n.t(LocaleHelper.getConfirmReject()),
            onOk: async () => {
                try {
                    await rejectManualAdjustment(id);
                    message.success(i18n.t(LocaleHelper.getSuccess()));
                    fetchData();
                } catch (error) {
                    message.error(i18n.t(LocaleHelper.getFail()));
                }
            },
        });
    };

    const handleBatchApprove = () => {
        if (selectedRowKeys.length === 0) {
            return;
        }
        Modal.confirm({
            title: i18n.t(LocaleHelper.getOperation()),
            content: i18n.t(LocaleHelper.getConfirmBatchApprove()),
            onOk: async () => {
                try {
                    await batchApproveManualAdjustments(selectedRowKeys as string[]);
                    message.success(i18n.t(LocaleHelper.getSuccess()));
                    fetchData();
                } catch (error) {
                    message.error(i18n.t(LocaleHelper.getFail()));
                }
            },
        });
    };

    const handleBatchReject = () => {
        if (selectedRowKeys.length === 0) {
            return;
        }
        Modal.confirm({
            title: i18n.t(LocaleHelper.getOperation()),
            content: i18n.t(LocaleHelper.getConfirmBatchReject()),
            onOk: async () => {
                try {
                    await batchRejectManualAdjustments(selectedRowKeys as string[]);
                    message.success(i18n.t(LocaleHelper.getSuccess()));
                    fetchData();
                } catch (error) {
                    message.error(i18n.t(LocaleHelper.getFail()));
                }
            },
        });
    };

    useEffect(() => {
        fetchData();
    }, [pagination.current, pagination.pageSize, filters]);

    const onSearch = (values: any) => {
        const nextFilters = Array.isArray(values)
            ? values.reduce((acc, item) => {
                acc[item.field] = item.value;
                return acc;
            }, {} as Record<string, any>)
            : values || {};
        setFilters(nextFilters);
        setPagination((prev) => ({ ...prev, current: 1 }));
    };

    const columns = useMemo(
        () => getManualAdjustmentApprovalColumns(handleApprove, handleReject),
        []
    );

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getManualAdjustmentApprovalPageTitle())}
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}>
                                                <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                                                    <b>说明</b>
                                                </span>
                                                <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                                                    <li><b>功能：</b>本页面是<b>“手动调整审核”</b>的地方，用于处理费用调整申请。</li>
                                                    <li><b>操作影响：</b>通过调整申请将使其生效并进入结算流程；驳回调整申请将使其无效。</li>
                                                    <li><b>数据来源：</b>数据产生于<b>“费用管理”</b>模块的"费用总览详情"-"调整申请"。</li>
                                                </ul>
                                            </li>
                                        </ol>
                                    </div>
                                }
                                color='white'
                            >
                                <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                            </Tooltip>
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <span className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary" danger onClick={handleBatchApprove}>
                                {i18n.t(LocaleHelper.getManualAdjustmentApprovalActionBatchApprove())}
                            </Button>
                            <Button type="primary" danger  onClick={handleBatchReject}>
                                {i18n.t(LocaleHelper.getManualAdjustmentApprovalActionBatchReject())}
                            </Button>
                            <Button icon={<ExportOutlined />}>
                                {i18n.t(LocaleHelper.getManualAdjustmentApprovalActionExport())}
                            </Button>
                        </div>
                    </span>
                </div>
            </div>

            <div className="nc-bill-search-area">
                <AdvancedSearchForm fields={getManualAdjustmentApprovalSearchFields()} onSearch={onSearch} />
            </div>

            <div style={{ padding: '10px 10px 0' }}>
                <Card size="small" variant='outlined'>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Statistic
                                title={i18n.t(LocaleHelper.getManualAdjustmentApprovalStatTotalAmount())}
                                value={stats?.totalAdjustmentAmount || 0}
                                precision={2}
                                prefix={<DollarOutlined />}
                            />
                        </Col>
                        <Col span={6}>
                            <Statistic
                                title={i18n.t(LocaleHelper.getManualAdjustmentApprovalStatPending())}
                                value={stats?.pendingCount || 0}
                                prefix={<HourglassOutlined />}
                                style={{ color: '#faad14' }}
                            />
                        </Col>
                        <Col span={6}>
                            <Statistic
                                title={i18n.t(LocaleHelper.getManualAdjustmentApprovalStatApproved())}
                                value={stats?.approvedCount || 0}
                                prefix={<CheckCircleOutlined />}
                                style={{ color: '#52c41a' }}
                            />
                        </Col>
                        <Col span={6}>
                            <Statistic
                                title={i18n.t(LocaleHelper.getManualAdjustmentApprovalStatRejected())}
                                value={stats?.rejectedCount || 0}
                                prefix={<CloseCircleOutlined />}
                                style={{ color: '#ff4d4f' }}
                            />
                        </Col>
                    </Row>
                </Card>
            </div>

            <div className="nc-bill-table-area">
                <Table
                    rowSelection={{
                        selectedRowKeys,
                        onChange: (keys) => setSelectedRowKeys(keys),
                    }}
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    loading={loading}
                    size="small"
                    bordered
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: pagination.total,
                        showTotal: (total) =>
                            `${i18n.t(LocaleHelper.getTotal())}${total}${i18n.t(LocaleHelper.getItems())}`,
                        showQuickJumper: true,
                        showSizeChanger: true,
                    }}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
                    onChange={(page) =>
                        setPagination((prev) => ({
                            ...prev,
                            current: page.current || 1,
                            pageSize: page.pageSize || 10,
                        }))
                    }
                />
            </div>
        </div>
    );
};

export default ManualAdjustmentApproval;

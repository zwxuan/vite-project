import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Row, Space, Statistic, Table, Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, DollarOutlined, HourglassOutlined, ExportOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AdvancedSearchForm from '@/components/search-form';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getManualAdjustmentApprovalSearchFields } from './search_fields';
import {
    queryManualAdjustmentApprovalList,
    queryManualAdjustmentApprovalStats,
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

    const statusLabelMap = useMemo(
        () => ({
            [ManualAdjustmentApprovalStatus.PENDING]: i18n.t(LocaleHelper.getManualAdjustmentApprovalStatusPending()),
            [ManualAdjustmentApprovalStatus.APPROVED]: i18n.t(LocaleHelper.getManualAdjustmentApprovalStatusApproved()),
            [ManualAdjustmentApprovalStatus.REJECTED]: i18n.t(LocaleHelper.getManualAdjustmentApprovalStatusRejected()),
        }),
        []
    );

    const statusColorMap = {
        [ManualAdjustmentApprovalStatus.PENDING]: 'processing',
        [ManualAdjustmentApprovalStatus.APPROVED]: 'success',
        [ManualAdjustmentApprovalStatus.REJECTED]: 'error',
    };

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

    const columns: ColumnsType<ManualAdjustmentApprovalItem> = [
        {
            title: i18n.t(LocaleHelper.getManualAdjustmentApprovalColAdjustmentNo()),
            dataIndex: 'adjustmentNo',
            key: 'adjustmentNo',
        },
        {
            title: i18n.t(LocaleHelper.getManualAdjustmentApprovalColOrderNo()),
            dataIndex: 'orderNo',
            key: 'orderNo',
        },
        {
            title: i18n.t(LocaleHelper.getManualAdjustmentApprovalColCustomer()),
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: i18n.t(LocaleHelper.getManualAdjustmentApprovalColAdjustmentType()),
            dataIndex: 'adjustmentType',
            key: 'adjustmentType',
        },
        {
            title: i18n.t(LocaleHelper.getManualAdjustmentApprovalColAdjustmentAmount()),
            dataIndex: 'adjustmentAmount',
            key: 'adjustmentAmount',
        },
        {
            title: i18n.t(LocaleHelper.getManualAdjustmentApprovalColCurrency()),
            dataIndex: 'currency',
            key: 'currency',
        },
        {
            title: i18n.t(LocaleHelper.getManualAdjustmentApprovalColApplicant()),
            dataIndex: 'applicant',
            key: 'applicant',
        },
        {
            title: i18n.t(LocaleHelper.getManualAdjustmentApprovalColApplyTime()),
            dataIndex: 'applyTime',
            key: 'applyTime',
        },
        {
            title: i18n.t(LocaleHelper.getManualAdjustmentApprovalColStatus()),
            dataIndex: 'status',
            key: 'status',
            render: (value: ManualAdjustmentApprovalStatus) => (
                <Tag color={statusColorMap[value]}>{statusLabelMap[value]}</Tag>
            ),
        },
        {
            title: i18n.t(LocaleHelper.getManualAdjustmentApprovalColAction()),
            key: 'action',
            render: (_, record) => (
                <Space size={8}>
                    <Button type="link" disabled={record.status !== ManualAdjustmentApprovalStatus.PENDING}>
                        {i18n.t(LocaleHelper.getManualAdjustmentApprovalActionApprove())}
                    </Button>
                    <Button type="link" danger disabled={record.status !== ManualAdjustmentApprovalStatus.PENDING}>
                        {i18n.t(LocaleHelper.getManualAdjustmentApprovalActionReject())}
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <CustomIcon type="icon-Currency" className="page-title-Icon" />
                        <span className="bill-info-title">
                            {i18n.t(LocaleHelper.getManualAdjustmentApprovalPageTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <span className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary" danger>
                                {i18n.t(LocaleHelper.getManualAdjustmentApprovalActionBatchApprove())}
                            </Button>
                            <Button danger>
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
                <Card size="small" bordered={false}>
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
                                valueStyle={{ color: '#faad14' }}
                            />
                        </Col>
                        <Col span={6}>
                            <Statistic
                                title={i18n.t(LocaleHelper.getManualAdjustmentApprovalStatApproved())}
                                value={stats?.approvedCount || 0}
                                prefix={<CheckCircleOutlined />}
                                valueStyle={{ color: '#52c41a' }}
                            />
                        </Col>
                        <Col span={6}>
                            <Statistic
                                title={i18n.t(LocaleHelper.getManualAdjustmentApprovalStatRejected())}
                                value={stats?.rejectedCount || 0}
                                prefix={<CloseCircleOutlined />}
                                valueStyle={{ color: '#ff4d4f' }}
                            />
                        </Col>
                    </Row>
                </Card>
            </div>

            <div className="nc-bill-table-area">
                <Table
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

import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Row, Space, Statistic, Table, Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, FileSearchOutlined, ReloadOutlined, DollarOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AdvancedSearchForm from '@/components/search-form';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getAllocationHistorySearchFields } from './search_fields';
import {
    queryAllocationHistoryList,
    queryAllocationHistoryStats,
} from '@/api/freight_forwarding/cost_management/allocation_history_service';
import {
    AllocationHistoryItem,
    AllocationHistoryStats,
    AllocationHistoryStatus,
} from '@/types/freight_forwarding/cost_management';
import '@/pages/page_list.less';

const AllocationHistory: React.FC = () => {
    const [data, setData] = useState<AllocationHistoryItem[]>([]);
    const [stats, setStats] = useState<AllocationHistoryStats | null>(null);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState<Record<string, any>>({});
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

    const statusLabelMap = useMemo(
        () => ({
            [AllocationHistoryStatus.SUCCESS]: i18n.t(LocaleHelper.getAllocationHistoryStatusSuccess()),
            [AllocationHistoryStatus.FAILED]: i18n.t(LocaleHelper.getAllocationHistoryStatusFailed()),
        }),
        []
    );

    const statusColorMap = {
        [AllocationHistoryStatus.SUCCESS]: 'success',
        [AllocationHistoryStatus.FAILED]: 'error',
    };

    const fetchData = async () => {
        setLoading(true);
        const queryParams = {
            pageNum: pagination.current,
            pageSize: pagination.pageSize,
            ...filters,
        };
        const [listRes, statsRes] = await Promise.all([
            queryAllocationHistoryList(queryParams),
            queryAllocationHistoryStats(queryParams),
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

    const columns: ColumnsType<AllocationHistoryItem> = [
        {
            title: i18n.t(LocaleHelper.getAllocationHistoryColAllocationNo()),
            dataIndex: 'allocationNo',
            key: 'allocationNo',
        },
        {
            title: i18n.t(LocaleHelper.getAllocationHistoryColOrderNo()),
            dataIndex: 'orderNo',
            key: 'orderNo',
        },
        {
            title: i18n.t(LocaleHelper.getAllocationHistoryColCustomer()),
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: i18n.t(LocaleHelper.getAllocationHistoryColAllocationType()),
            dataIndex: 'allocationType',
            key: 'allocationType',
        },
        {
            title: i18n.t(LocaleHelper.getAllocationHistoryColAllocationBasis()),
            dataIndex: 'allocationBasis',
            key: 'allocationBasis',
        },
        {
            title: i18n.t(LocaleHelper.getAllocationHistoryColAllocationAmount()),
            dataIndex: 'allocationAmount',
            key: 'allocationAmount',
        },
        {
            title: i18n.t(LocaleHelper.getAllocationHistoryColCurrency()),
            dataIndex: 'currency',
            key: 'currency',
        },
        {
            title: i18n.t(LocaleHelper.getAllocationHistoryColOperator()),
            dataIndex: 'operator',
            key: 'operator',
        },
        {
            title: i18n.t(LocaleHelper.getAllocationHistoryColAllocateTime()),
            dataIndex: 'allocateTime',
            key: 'allocateTime',
        },
        {
            title: i18n.t(LocaleHelper.getAllocationHistoryColStatus()),
            dataIndex: 'status',
            key: 'status',
            render: (value: AllocationHistoryStatus) => (
                <Tag color={statusColorMap[value]}>{statusLabelMap[value]}</Tag>
            ),
        },
        {
            title: i18n.t(LocaleHelper.getAllocationHistoryColSource()),
            dataIndex: 'source',
            key: 'source',
        },
        {
            title: i18n.t(LocaleHelper.getAllocationHistoryColAction()),
            key: 'action',
            render: () => (
                <Space size={8}>
                    <Button type="link">{i18n.t(LocaleHelper.getAllocationHistoryActionTrace())}</Button>
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
                            {i18n.t(LocaleHelper.getAllocationHistoryPageTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <span className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary" danger icon={<FileSearchOutlined />}>
                                {i18n.t(LocaleHelper.getAllocationHistoryActionExport())}
                            </Button>
                            <Button icon={<ReloadOutlined />}>
                                {i18n.t(LocaleHelper.getAllocationHistoryActionRefresh())}
                            </Button>
                        </div>
                    </span>
                </div>
            </div>

            <div className="nc-bill-search-area">
                <AdvancedSearchForm fields={getAllocationHistorySearchFields()} onSearch={onSearch} />
            </div>

            <div style={{ padding: '10px 10px 0' }}>
                <Card size="small" bordered={false}>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Statistic
                                title={i18n.t(LocaleHelper.getAllocationHistoryStatTotalCount())}
                                value={stats?.totalCount || 0}
                                prefix={<FileSearchOutlined />}
                            />
                        </Col>
                        <Col span={6}>
                            <Statistic
                                title={i18n.t(LocaleHelper.getAllocationHistoryStatTotalAmount())}
                                value={stats?.totalAmount || 0}
                                precision={2}
                                prefix={<DollarOutlined />}
                            />
                        </Col>
                        <Col span={6}>
                            <Statistic
                                title={i18n.t(LocaleHelper.getAllocationHistoryStatSuccessCount())}
                                value={stats?.successCount || 0}
                                prefix={<CheckCircleOutlined />}
                                valueStyle={{ color: '#52c41a' }}
                            />
                        </Col>
                        <Col span={6}>
                            <Statistic
                                title={i18n.t(LocaleHelper.getAllocationHistoryStatFailedCount())}
                                value={stats?.failedCount || 0}
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

export default AllocationHistory;

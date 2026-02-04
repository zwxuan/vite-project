import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Row, Statistic, Table, Modal, Descriptions, Tooltip } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, FileSearchOutlined, ReloadOutlined, DollarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import AdvancedSearchForm from '@/components/search-form';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getAllocationHistorySearchFields } from './search_fields';
import { getColumns } from './columns';
import {
    queryAllocationHistoryList,
    queryAllocationHistoryStats,
} from '@/api/freight_forwarding/cost_management/allocation_history_service';
import {
    AllocationHistoryItem,
    AllocationHistoryStats,
} from '@/types/freight_forwarding/cost_management';
import '@/pages/page_list.less';
import { color } from 'three/src/nodes/TSL.js';

const AllocationHistory: React.FC = () => {
    const [data, setData] = useState<AllocationHistoryItem[]>([]);
    const [stats, setStats] = useState<AllocationHistoryStats | null>(null);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState<Record<string, any>>({});
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [traceModalOpen, setTraceModalOpen] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<AllocationHistoryItem | null>(null);

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

    const handleTrace = (record: AllocationHistoryItem) => {
        setCurrentRecord(record);
        setTraceModalOpen(true);
    };

    const columns = useMemo(() => getColumns(handleTrace), []);

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getAllocationHistoryPageTitle())}
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}>
                                                <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                                                    <b>说明</b>
                                                </span>
                                                <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                                                    <li><b>角色：</b>本页面记录<b>所有费用分配的历史轨迹</b>，包括系统自动分配和人工调整的记录。</li>
                                                    <li><b>数据来源：</b>数据来源于<b>系统分配引擎</b>的自动计算或<b>“费用分配总览”</b>页面的人工调整操作。</li>
                                                    <li><b>分配单号：</b>是系统为每一次分配操作（无论是自动还是手动）自动生成的<b>唯一流水号</b>，用于关联和追溯分配结果。</li>
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
                <Card size="small" variant='outlined'>
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
                                style={{ color: '#52c41a' }}
                            />
                        </Col>
                        <Col span={6}>
                            <Statistic
                                title={i18n.t(LocaleHelper.getAllocationHistoryStatFailedCount())}
                                value={stats?.failedCount || 0}
                                prefix={<CloseCircleOutlined />}
                                style={{ color: '#ff4d4f' }}
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

            <Modal
                title={i18n.t(LocaleHelper.getAllocationHistoryActionTrace())}
                open={traceModalOpen}
                onCancel={() => setTraceModalOpen(false)}
                footer={null}
                width={600}
            >
                {currentRecord && (
                    <Descriptions column={1} bordered size="small">
                        <Descriptions.Item label={i18n.t(LocaleHelper.getAllocationHistoryColAllocationNo())}>
                            {currentRecord.allocationNo}
                        </Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getAllocationHistoryColOrderNo())}>
                            <Link to={`/order_management/detail?id=${currentRecord.orderId}&mode=view`}>
                                {currentRecord.orderNo}
                            </Link>
                        </Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getAllocationHistoryColCustomer())}>
                            {currentRecord.customerName}
                        </Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getAllocationHistoryColAllocationType())}>
                            {currentRecord.allocationType}
                        </Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getAllocationHistoryColAllocationBasis())}>
                            {currentRecord.allocationBasis}
                        </Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getAllocationHistoryColOperator())}>
                            {currentRecord.operator}
                        </Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getAllocationHistoryColAllocateTime())}>
                            {currentRecord.allocateTime}
                        </Descriptions.Item>
                        <Descriptions.Item label={i18n.t(LocaleHelper.getAllocationHistoryColSource())}>
                            {currentRecord.source}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
        </div>
    );
};

export default AllocationHistory;

import React, { useState, useEffect } from 'react';
import { Table, Button, message, Row, Col, Card, Statistic, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { JobItem, JobListParams } from "@/types/freight_forwarding/job_management";
import { getJobList } from "@/api/freight_forwarding/job_management/job_service";
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import AdvancedSearchForm from "@/components/search-form";
import { getColumns } from './columns';
import { fields } from './search_fields';
import '@/pages/page_list.less';

const MyJobs: React.FC = () => {
    const [data, setData] = useState<JobItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        loadData({});
    }, []);

    const loadData = async (params: JobListParams) => {
        setLoading(true);
        try {
            // Simulate "My Jobs" filter
            const myParams = { ...params, assignee: 'CurrentUser' };
            const res = await getJobList(myParams);
            if (res.success && res.data) {
                // Mock progress data
                const listWithProgress = res.data.list.map(item => ({
                    ...item,
                    progress: Math.floor(Math.random() * 100)
                }));
                setData(listWithProgress);
                setTotal(res.data.total);
            }
        } catch (error) {
            console.error(error);
            message.error(i18n.t(LocaleHelper.getLoadFailed()));
        }
        setLoading(false);
    };

    const handleEdit = (record: JobItem) => {
        navigate(`/job_management/detail/${record.jobId}`);
    };

    const handleSearch = (values: any) => {
        loadData(values);
    };

    const columns = getColumns(handleEdit);

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getMyJobsTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button>{i18n.t('Refresh') || '刷新'}</Button>
                            <Button>{i18n.t('Export') || '导出'}</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '10px' }}>
                <Row gutter={16} style={{ marginBottom: '10px' }}>
                    <Col span={8}>
                        <Card size="small" bordered={false}>
                            <Statistic title={i18n.t(LocaleHelper.getTodayPending())} value={3} valueStyle={{ color: '#cf1322' }} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card size="small" bordered={false}>
                            <Statistic title={i18n.t(LocaleHelper.getWeekPlan())} value={8} valueStyle={{ color: '#1890ff' }} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card size="small" bordered={false}>
                            <Statistic title={i18n.t(LocaleHelper.getOverdueAlert())} value={1} valueStyle={{ color: '#faad14' }} />
                        </Card>
                    </Col>
                </Row>

                <AdvancedSearchForm fields={fields as any} onSearch={handleSearch} />
                
                <div className='nc-bill-table-area'>
                    <Table<JobItem>
                        columns={columns}
                        dataSource={data}
                        rowKey="jobId"
                        size="small"
                        bordered={true}
                        loading={loading}
                        scroll={{ x: 'max-content', y: 'calc(100vh - 450px)' }}
                        pagination={{
                            size: 'small',
                            total: total,
                            showTotal: (total) => i18n.t(LocaleHelper.getTotalItems(), { total }),
                            showQuickJumper: true,
                            showSizeChanger: true,
                        }}
                    />
                </div>

                <div style={{ marginTop: '10px', padding: '10px', background: '#fff', border: '1px solid #e8e8e8' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{i18n.t(LocaleHelper.getQuickActions())}</div>
                    <Space>
                        <Button size="small">{i18n.t(LocaleHelper.getUpdateProgress())}</Button>
                        <Button size="small">{i18n.t(LocaleHelper.getAddRemark())}</Button>
                        <Button size="small">{i18n.t(LocaleHelper.getApplyExtension())}</Button>
                        <Button size="small">{i18n.t(LocaleHelper.getRequestAssist())}</Button>
                        <Button size="small" type="primary">{i18n.t(LocaleHelper.getCompleteJob())}</Button>
                    </Space>
                </div>
            </div>
        </div>
    );
};

export default MyJobs;

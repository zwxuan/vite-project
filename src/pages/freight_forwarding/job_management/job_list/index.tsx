import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
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

const JobList: React.FC = () => {
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
            const res = await getJobList(params);
            if (res.success && res.data) {
                setData(res.data.list);
                setTotal(res.data.total);
            }
        } catch (error) {
            console.error(error);
            message.error('Load failed');
        }
        setLoading(false);
    };

    const handleEdit = (record: JobItem) => {
        navigate(`/job_management/detail/${record.jobId}`);
    };

    const handleAssign = (record: JobItem) => {
        message.info(`Assign: ${record.jobId}`);
    };

    const handleSearch = (values: any) => {
        loadData(values);
    };
    
    const handleAutoAssign = () => {
        message.info('Auto Assign Triggered');
    };

    const handleManualAssign = () => {
        message.info('Manual Assign Triggered');
    };

    const columns = getColumns(handleEdit, handleAssign);

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getJobListTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary" danger onClick={handleAutoAssign}>
                                {i18n.t(LocaleHelper.getAutoAssign())}
                            </Button>
                             <Button onClick={handleManualAssign}>
                                {i18n.t(LocaleHelper.getManualAssign())}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            
            <AdvancedSearchForm fields={fields as any} onSearch={handleSearch} />
            
            <div className='nc-bill-table-area'>
                <Table<JobItem>
                    columns={columns}
                    dataSource={data}
                    rowKey="jobId"
                    size="small"
                    bordered={true}
                    loading={loading}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
                    pagination={{
                        size: 'small',
                        total: total,
                        showTotal: (total) => `Total ${total} items`,
                        showQuickJumper: true,
                        showSizeChanger: true,
                    }}
                />
            </div>
             <div style={{ padding: '10px 20px', background: '#f0f2f5', borderTop: '1px solid #e8e8e8', display: 'flex', gap: '20px' }}>
                <span>{i18n.t(LocaleHelper.getStatusPending())}：<span style={{ color: 'red', fontWeight: 'bold' }}>15</span></span>
                <span>{i18n.t(LocaleHelper.getStatusProcessing())}：<span style={{ color: '#1890ff', fontWeight: 'bold' }}>28</span></span>
                <span>{i18n.t(LocaleHelper.getStatusCompleted())}：<span style={{ color: '#52c41a', fontWeight: 'bold' }}>156</span></span>
                <span>{i18n.t(LocaleHelper.getStatusOverdue())}：<span style={{ color: 'red', fontWeight: 'bold' }}>3</span></span>
            </div>
        </div>
    );
};

export default JobList;

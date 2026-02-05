import '@/pages/page_list.less';
import React, { useState, useEffect } from 'react';
import { Table, Button, Tooltip, message, Modal, Space } from 'antd';
import type { TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CustomsJob, getArchivedJobList, batchRestoreJobs } from '@/api/customs_compliance/customs_job_management/job_center_service';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { CommonLocale } from '@/utils/locale/common';
import { JobArchivingLocale } from '@/utils/locale/customs_compliance/customs_job_management/job_archiving';
import CustomIcon from "@/components/custom-icon";
import AdvancedSearchForm from "@/components/search-form";
import { getColumns } from './columns';
import { fields } from './search_fields';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

const JobArchiving: React.FC = () => {
    const [dataList, setDataList] = useState<CustomsJob[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [searchParams, setSearchParams] = useState<any>({});

    const navigate = useNavigate();

    const getData = async () => {
        setLoading(true);
        try {
            const res = await getArchivedJobList({
                page: currentPage,
                pageSize: pageSize, // Note: service defines pageSize, not page_size? Check service definition.
                ...searchParams
            });
            if (res.success && res.data) {
                setDataList(res.data.list);
                setTotal(res.data.total);
            }
        } catch (error) {
            console.error(error);
            message.error(i18n.t(CommonLocale.getFail()));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, [currentPage, pageSize, searchParams]);

    const handleSearch = (values: any) => {
        // Map form fields to service params
        const params = {
            keyword: values.jobId,
            customer_name: values.customerName,
            business_type: values.businessType,
            archive_date_range: values.archiveDate,
            archive_reason: values.archiveReason
        };
        setSearchParams(params);
        setCurrentPage(1); // Reset to first page on search
    };

    const handleRestore = (record: CustomsJob) => {
        Modal.confirm({
            title: i18n.t(CommonLocale.getConfirm()),
            content: `确定要还原作业单 ${record.job_id} 吗？`,
            onOk: async () => {
                try {
                    const res = await batchRestoreJobs([record.job_id]);
                    if (res.success) {
                        message.success(i18n.t(CommonLocale.getSuccess()));
                        getData();
                    } else {
                        message.error(res.message || i18n.t(CommonLocale.getFail()));
                    }
                } catch (error) {
                    console.error(error);
                    message.error(i18n.t(CommonLocale.getFail()));
                }
            }
        });
    };

    const handleView = (record: CustomsJob) => {
        // Navigate to job detail page in read-only mode or just standard detail
        navigate(`/customs_job_management/detail/${record.job_id}`);
    };

    const handleBatchRestore = () => {
        if (selectedRowKeys.length === 0) {
            message.warning(i18n.t(LocaleHelper.getSelectOne()));
            return;
        }

        Modal.confirm({
            title: i18n.t(CommonLocale.getConfirm()),
            content: `确定要还原选中的 ${selectedRowKeys.length} 个作业单吗？`,
            onOk: async () => {
                try {
                    const res = await batchRestoreJobs(selectedRowKeys);
                    if (res.success) {
                        message.success(i18n.t(CommonLocale.getSuccess()));
                        setSelectedRowKeys([]);
                        getData();
                    } else {
                        message.error(res.message || i18n.t(CommonLocale.getFail()));
                    }
                } catch (error) {
                    console.error(error);
                    message.error(i18n.t(CommonLocale.getFail()));
                }
            }
        });
    };

    const rowSelection: TableRowSelection<CustomsJob> = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys) => {
            setSelectedRowKeys(newSelectedRowKeys);
        },
    };

    const columns = getColumns(handleRestore, handleView);

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(JobArchivingLocale.getPageTitle())}
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}>
                                                <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                                                    <b>{i18n.t(JobArchivingLocale.getHelpLabel())}</b>
                                                </span>
                                                <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                                                    <li><b>{i18n.t(JobArchivingLocale.getHelpRole())}</b>{i18n.t(JobArchivingLocale.getHelpRoleDesc())}</li>
                                                    <li><b>{i18n.t(JobArchivingLocale.getHelpOrigin())}</b>{i18n.t(JobArchivingLocale.getHelpOriginDesc())}</li>
                                                    <li><b>{i18n.t(JobArchivingLocale.getHelpFunctionality())}</b>{i18n.t(JobArchivingLocale.getHelpFunctionalityDesc())}</li>
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
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{ display: "flex" }}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button type="primary" onClick={handleBatchRestore}>
                                    {i18n.t(JobArchivingLocale.getBatchRestore())}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AdvancedSearchForm fields={fields} onSearch={handleSearch} />

            <div className='nc-bill-table-area'>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={dataList}
                    rowKey="job_id"
                    loading={loading}
                    pagination={{
                        size: 'small',
                        current: currentPage,
                        pageSize: pageSize,
                        total: total,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total) => `${i18n.t(CommonLocale.getTotal())} ${total} ${i18n.t(CommonLocale.getItems())}`,
                        onChange: (page, size) => {
                            setCurrentPage(page);
                            setPageSize(size);
                        }
                    }}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
                    bordered={true}
                    size="small"
                />
            </div>
        </div>
    );
};

export default JobArchiving;

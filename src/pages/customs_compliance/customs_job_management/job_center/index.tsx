import '@/pages/page_list.less';
import React, { useState, useEffect } from 'react';
import { Table, Button, Tooltip, message, Modal, Select, Form } from 'antd';
import type { TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getCustomsJobList, batchAssignJobs, batchExportJobs, batchArchiveJobs } from '@/api/customs_compliance/customs_job_management/job_center_service';
import { CustomsJob } from '@/types/customs_compliance/customs_job_management/job_center';
import { getUserList } from '@/api/golbal/user_service';
import { UserLogin } from "@/types/user";
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import AdvancedSearchForm from "@/components/search-form";
import { getColumns } from './columns';
import { fields } from './search_fields';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

const JobCenter: React.FC = () => {
    const [dataList, setDataList] = useState<CustomsJob[]>([]);
    const [loading, setLoading] = useState(false);
    const [pageSize, setPageSize] = useState(20);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [userList, setUserList] = useState<UserLogin[]>([]);
    const [assignModalVisible, setAssignModalVisible] = useState(false);
    const [assignTargetKeys, setAssignTargetKeys] = useState<React.Key[]>([]);
    const [assignForm] = Form.useForm();
    const navigate = useNavigate();

    const getData = async () => {
        setLoading(true);
        try {
            const res = await getCustomsJobList({});
            if (res.success && res.data) {
                setDataList(res.data.list);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserList = async () => {
        try {
            const users = await getUserList();
            setUserList(users);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
        fetchUserList();
    }, []);

    const handleAssignOk = async () => {
        try {
            const values = await assignForm.validateFields();
            const res = await batchAssignJobs(assignTargetKeys, values.assignedTo); 
            if (res.success) {
                message.success(i18n.t(LocaleHelper.getSuccess()));
                setAssignModalVisible(false);
                setSelectedRowKeys([]);
                getData();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleAssignCancel = () => {
        setAssignModalVisible(false);
        assignForm.resetFields();
    };

    const handleView = (record: CustomsJob) => {
        navigate(`/customs_job_management/detail/${record.job_id}`);
    };

    const handleEdit = (record: CustomsJob) => {
        navigate(`/customs_job_management/create_job?id=${record.job_id}`);
    };

    const handleAssign = (record: CustomsJob) => {
        setAssignTargetKeys([record.job_id]);
        assignForm.resetFields();
        setAssignModalVisible(true);
    };

    const columns = getColumns(handleView, handleEdit, handleAssign);

    const rowSelection: TableRowSelection<CustomsJob> = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys) => {
            setSelectedRowKeys(newSelectedRowKeys);
        },
    };

    const handleSearch = (values: any) => {
        console.log('Search:', values);
        getData();
    };

    const handleCreate = () => {
        navigate('/customs_job_management/create_job');
    };

    const handleBatchAssign = async () => {
        if (selectedRowKeys.length === 0) {
            message.warning(i18n.t(LocaleHelper.getSelectOne()));
            return;
        }

        // Validate status: 'completed' jobs cannot be assigned
        const invalidJobs = dataList.filter(item => selectedRowKeys.includes(item.job_id) && item.status === 'completed');
        if (invalidJobs.length > 0) {
            message.warning('包含已完成的作业单，不可分派'); // TODO: Add to locale
            return;
        }

        setAssignTargetKeys(selectedRowKeys);
        assignForm.resetFields();
        setAssignModalVisible(true);
    };

    const handleBatchExport = async () => {
        if (selectedRowKeys.length === 0) {
             message.warning('请至少选择一项进行导出'); // Fallback or add to locale
             return;
        }
        const res = await batchExportJobs(selectedRowKeys);
        if (res.success) {
            message.success(res.message);
        }
    };

    const handleBatchArchive = async () => {
        if (selectedRowKeys.length === 0) {
            message.warning('请至少选择一项进行归档');
            return;
        }
        Modal.confirm({
            title: i18n.t(LocaleHelper.getJobCenterBatchArchive()),
            content: `确认归档选中的 ${selectedRowKeys.length} 项作业单？`,
            onOk: async () => {
                const res = await batchArchiveJobs(selectedRowKeys);
                if (res.success) {
                    message.success(res.message);
                    setSelectedRowKeys([]);
                    getData();
                }
            }
        });
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} /> 
                            {i18n.t(LocaleHelper.getJobCenterPageTitle())}
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}>
                                                <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                                                    <b>{i18n.t(LocaleHelper.getJobCenterHelpLabel())}</b>
                                                </span>
                                                <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                                                    <li><b>{i18n.t(LocaleHelper.getJobCenterHelpRole())}</b>{i18n.t(LocaleHelper.getJobCenterHelpRoleDesc())}</li>
                                                    <li><b>{i18n.t(LocaleHelper.getJobCenterHelpOrigin())}</b>{i18n.t(LocaleHelper.getJobCenterHelpOriginDesc())}</li>
                                                    <li><b>{i18n.t(LocaleHelper.getJobCenterHelpConcepts())}</b>{i18n.t(LocaleHelper.getJobCenterHelpConceptsDesc())}</li>
                                                    <li><b>{i18n.t(LocaleHelper.getJobCenterHelpTypes())}</b>{i18n.t(LocaleHelper.getJobCenterHelpTypesDesc())}</li>
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
                                <Button type="primary" danger onClick={handleCreate}>{i18n.t(LocaleHelper.getJobCenterTodayNew())}</Button>
                                <Button onClick={handleBatchAssign}>{i18n.t(LocaleHelper.getJobCenterBatchAssign())}</Button>
                                <Button onClick={handleBatchExport}>{i18n.t(LocaleHelper.getJobCenterBatchExport())}</Button>
                                <Button onClick={handleBatchArchive}>{i18n.t(LocaleHelper.getJobCenterBatchArchive())}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AdvancedSearchForm fields={fields} onSearch={handleSearch} />
            <div className='nc-bill-table-area'>
                <Table<CustomsJob>
                    columns={columns}
                    rowSelection={{ ...rowSelection }}
                    rowKey="job_id"
                    dataSource={dataList}
                    loading={loading}
                    pagination={{
                        size: 'small',
                        pageSize: pageSize,
                        showTotal: (total) => `Total ${total}`,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        onShowSizeChange: (current, size) => setPageSize(size),
                    }}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
                    bordered={true}
                    size="small"
                />
            </div>
            <Modal
                title={i18n.t(LocaleHelper.getJobCenterAssign())}
                open={assignModalVisible}
                onOk={handleAssignOk}
                onCancel={handleAssignCancel}
            >
                <Form form={assignForm} layout="vertical">
                    <Form.Item
                        name="assignedTo"
                        label={i18n.t(LocaleHelper.getJobCenterAssignedTo())}
                        rules={[{ required: true, message: i18n.t(LocaleHelper.getSelectPlaceholder()) }]}
                    >
                        <Select placeholder={i18n.t(LocaleHelper.getSelectPlaceholder())}>
                            {userList.map(user => (
                                <Select.Option key={user.UserCode} value={user.UserCode}>
                                    {user.UserName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default JobCenter;

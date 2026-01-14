import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Space, Table, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { getColumnsRight, getJobPositionColumnsLeft } from './columns';
import { assignRoleSearchFields, jobPositionAssignRoleSearchFields } from './search_fields';
import AdvancedSearchForm from '@/components/search-form';
import { RoleManageItemProps } from '@/types/dynamic_configuration_platform/identity/role_manage';
import { getRoleManageList } from '@/api/dynamic_configuration_platform/identity/role_manage_service';
import { TableRowSelection } from 'antd/es/table/interface';
import { EmployeeManageItemProps } from '@/types/dynamic_configuration_platform/org_manage/employee_manage';
import { exportItems } from './menu_items';
import AssignRoleModal from './assign_role_modal';
import { JobPositionItemProps } from '@/types/dynamic_configuration_platform/org_manage/job_position';
import { getJobPositionList } from '@/api/dynamic_configuration_platform/org_manage/job_position_service';

const JobPositionPermission: React.FC = () => {
    const [roleManageList, setRoleManageList] = useState([] as RoleManageItemProps[]);
    const [jobPositionList, setJobPositionList] = useState([] as JobPositionItemProps[]);
    const [pageSize, setPageSize] = useState(50);
    const [openAssignRole, setOpenAssignRole] = useState(false);
    const [employeeCodes, setEmployeeCodes] = useState<string[]>([]);
    const [saving, setSaving] = useState(false);
    // 获取角色管理数据
    useEffect(() => {
        const getData = async () => {
            const roleManageData = await getRoleManageList();
            // 设置角色管理台账数据
            setRoleManageList([...roleManageData]);

            const jobPositionData = await getJobPositionList();
            // 设置岗位台账数据
            setJobPositionList([...jobPositionData]);
        };
        getData();
    }, []);

    const columnsType = getColumnsRight();
    const handleRoleSearch = (values: any) => {
        console.log('handleRoleSearch', values);
    };
    const handleEmployeeSearch = (values: any) => {
        console.log('handleEmployeeSearch', values);
    };

    //表格选中和取消时触发的函数
    const rowSelection: TableRowSelection<RoleManageItemProps> = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log('onchange');
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log('onselect');
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log('onallselect');
            console.log(selected, selectedRows, changeRows);
        },
        type: 'checkbox',
        columnWidth: '20px',
    };
    // 删除用户
    const handleJobPositionDelete = (record: JobPositionItemProps) => {
        alert(record);
    };
    // 批量删除
    const handleEmployeeDeleteBatch = (record: string[]) => {
        alert(record);
    };
    // 批量分配角色
    const handleAssignRoleBatch = (record: string[]) => {
        setEmployeeCodes(record);
        setOpenAssignRole(true);
    };
    // 分配角色
    const handleAssignRole = (record: JobPositionItemProps) => {
        setEmployeeCodes([record.JobCode]);
        setOpenAssignRole(true);
    };

    // 用户表格行点击事件
    const handleJobPositionRowClick = (record: JobPositionItemProps) => {
        console.log('用户行点击事件:', record);
        setEmployeeCodes([record.JobCode]);
        // 这里可以添加你需要的行点击逻辑，比如显示详情、选中等
    };
    // 分配角色取消
    const handleAssignRoleCancel = () => {
        setOpenAssignRole(false);
    };
    const columnsJobPositionType = getJobPositionColumnsLeft(handleAssignRole, handleJobPositionDelete);

    //表格选中和取消时触发的函数
    const rowJobPositionSelection: TableRowSelection<JobPositionItemProps> = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log('onchange');
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log('onselect');
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log('onallselect');
            console.log(selected, selectedRows, changeRows);
        },
        type: 'checkbox',
        columnWidth: '20px',
    };

    // 保存分配角色
    const handleAssignRoleOk = async () => {
        alert('保存分配角色');
    };
    return (
        <div>
            <AssignRoleModal
                open={openAssignRole}
                saving={saving}
                employeeCodes={employeeCodes}
                onCancel={handleAssignRoleCancel}
                onOk={handleAssignRoleOk}
            />
            <Row gutter={2}>

                <Col span={14}>
                    <AdvancedSearchForm fields={jobPositionAssignRoleSearchFields} span={10} onSearch={handleEmployeeSearch} />
                    <Card size="small" title={<span className="modal-body-left-commons-title-text">岗位信息</span>} style={{ textAlign: 'left' }}
                        extra={
                            <div>
                                <Button onClick={() => handleAssignRoleBatch(['1', '2'])}>分配角色</Button>
                                <Dropdown menu={{ items: exportItems }}>
                                    <Button>
                                        <Space>
                                            导出
                                            <DownOutlined />
                                        </Space>
                                    </Button>
                                </Dropdown>
                            </div>
                        }
                    >
                        <Table<JobPositionItemProps>
                            columns={columnsJobPositionType}
                            rowSelection={{ ...rowJobPositionSelection }}
                            rowKey={(record) => `${record.JobCode}`}
                            showSorterTooltip={false}
                            dataSource={jobPositionList}
                            loading={jobPositionList.length === 0}
                            onRow={(record) => ({
                                onClick: () => handleJobPositionRowClick(record),
                            })}
                            pagination={{
                                size: 'small',
                                pageSize: pageSize,
                                showTotal: (total) => `总共 ${total} 条`,
                                showQuickJumper: true,
                                showSizeChanger: true,
                                onShowSizeChange: (current, size) => {
                                    setPageSize(size);
                                },
                                locale: {
                                    items_per_page: '/页',
                                    jump_to: '跳至',
                                    page: '页',
                                }
                            }}
                            scroll={{ x: 'max-content', y: 'calc(100vh - 340px)' }}
                            bordered={true}
                        />
                    </Card>
                </Col>
                <Col span={10}>
                    <AdvancedSearchForm fields={assignRoleSearchFields} span={8} onSearch={handleRoleSearch} />
                    <Card size="small" title={<span className="modal-body-left-commons-title-text">已分配角色</span>} style={{ textAlign: 'left' }}
                        extra={
                            <Button onClick={() => handleEmployeeDeleteBatch(['1', '2'])}>批量删除</Button>
                        }
                    >
                        <Table<RoleManageItemProps>
                            columns={columnsType}
                            rowSelection={{ ...rowSelection }}
                            rowKey={(record) => `${record.RoleCode}`}
                            showSorterTooltip={false}
                            dataSource={roleManageList}
                            loading={roleManageList.length === 0}
                            pagination={{
                                size: 'small',
                                pageSize: pageSize,
                                showTotal: (total) => `总共 ${total} 条`,
                                showQuickJumper: true,
                                showSizeChanger: true,
                                onShowSizeChange: (current, size) => {
                                    setPageSize(size);
                                },
                                locale: {
                                    items_per_page: '/页',
                                    jump_to: '跳至',
                                    page: '页',
                                }
                            }}
                            scroll={{ x: 'max-content', y: 'calc(100vh - 340px)' }}
                            bordered={true}
                        />
                    </Card>
                </Col>
            </Row>
        </div>

    );
};

export default JobPositionPermission;
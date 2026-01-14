
import React, { useEffect, useState } from 'react';
import { Modal, Button, Space, Table, Row, Card, Col, Input, Tooltip } from 'antd';
import { RoleGroupItemProps } from "@/types/dynamic_configuration_platform/identity/role_group";
import dayjs from 'dayjs';
import { TableRowSelection } from 'antd/es/table/interface';
import { getAssignJobPositionColumnsLeft, getAssignJobPositionColumnsRight } from './columns';
import { RedoOutlined } from '@ant-design/icons';
import AdvancedSearchForm from '@/components/search-form';
import { assignRoleSearchFields } from './search_fields';
import { getEmployeeManageList } from '@/api/dynamic_configuration_platform/org_manage/employee_manage_service';
import { JobPositionItemProps } from '@/types/dynamic_configuration_platform/org_manage/job_position';
import { getJobPositionList } from '@/api/dynamic_configuration_platform/org_manage/job_position_service';
interface DetailModalProps {
    open: boolean;
    saving: boolean;
    roleCodes: string[];
    onCancel: () => void;
    onOk: (values: any) => void;
}

const AssignJobPositionModal: React.FC<DetailModalProps> = ({

    open,
    saving,
    roleCodes,
    onCancel,
    onOk,
}) => {
    const [selectJobPositionList, setSelectJobPositionList] = useState([] as JobPositionItemProps[]);
    const [notSelectJobPositionList, setNotSelectJobPositionList] = useState([] as JobPositionItemProps[]);
    const [pageSize, setPageSize] = useState(50);

    // 获取角色管理数据
    useEffect(() => {
        const getData = async () => {
            const allJobPositionData = await getJobPositionList();

            // employeeManageData只要奇数索引的数据
            const jobPositionData = allJobPositionData.filter((_, index) => index % 2 === 1);
            // 设置角色管理台账数据
            setSelectJobPositionList([...jobPositionData]);

            // notEmployeeManageData只要偶数索引的数据
            const notJobPositionData = allJobPositionData.filter((_, index) => index % 2 === 0);
            // 设置角色管理台账数据
            setNotSelectJobPositionList([...notJobPositionData]);
        };
        getData();
    }, []);
    const handleJobPositionDelete = (record: JobPositionItemProps) => {

        alert(record);
    };
    const columnsTypeLeft = getAssignJobPositionColumnsLeft();
    const columnsTypeRight = getAssignJobPositionColumnsRight(handleJobPositionDelete);

    //表格选中和取消时触发的函数
    const rowSelection: TableRowSelection<JobPositionItemProps> = {

        onChange: (selectedRowKeys, selectedRows) => {
            console.log('onchange');
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log('onselect');
            console.log(record, selected, selectedRows);
            
            if (selected) {
                // 选择时：从待选列表移除，添加到已选列表
                // setSelectEmployeeManageList(prev => prev.filter(item => item.EmployeeCode !== record.EmployeeCode));
                setNotSelectJobPositionList(prev => [...prev, record]);
            } else {
                // 取消选择时：从已选列表移除，添加回待选列表
                setNotSelectJobPositionList(prev => prev.filter(item => item.JobCode !== record.JobCode));
                // setSelectEmployeeManageList(prev => [...prev, record]);
            }
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log('onallselect');
            console.log(selected, selectedRows, changeRows);
            
            if (selected) {
                // 全选时：将所有待选用户移动到已选列表
                setNotSelectJobPositionList(prev => [...prev, ...selectJobPositionList]);
                // setSelectJobPositionList([]);
            } else {
                // 取消全选时：将当前页面的已选用户移回待选列表
                const currentPageEmployeeCodes = selectJobPositionList.map(row => row.JobCode);
                // const movedUsers = notSelectEmployeeManageList.filter(item => 
                //     currentPageEmployeeCodes.includes(item.EmployeeCode)
                // );
                // setSelectEmployeeManageList(prev => [...prev, ...movedUsers]);
                setNotSelectJobPositionList(prev => 
                    prev.filter(item => !currentPageEmployeeCodes.includes(item.JobCode))
                );
            }
        },
        type: 'checkbox',
        columnWidth: '40px',
    };
    
    const handleAssignJobPositionBatch = () => {
        setNotSelectJobPositionList(prev => [...prev, ...selectJobPositionList]);
        setSelectJobPositionList([]);
    }
    const handleRemoveAssignJobPositionBatch = (jobCodes: string[]) => {
        alert(jobCodes);
    }
    return (
        <Modal
            open={open}
            title={"分配岗位"}
            onCancel={onCancel}
            width={'95%'}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={(_) => (
                <>
                    <div style={{ textAlign: 'right' }}>
                        <Space>
                            <Button onClick={onCancel}>取消</Button>
                            <Button type="primary" onClick={onOk}>保存</Button>
                        </Space>
                    </div>
                </>
            )}
        >
            <Row gutter={2}>
                <Col span={12}>
                    {/* <AdvancedSearchForm fields={assignRoleSearchFields} span={8} onSearch={handleRoleSearch} /> */}
                    <Card size="small" title={<span className="modal-body-left-commons-title-text">待选分配岗位</span>} style={{ textAlign: 'left' }}
                        extra={
                            <div>
                                <Input.Search placeholder="请输入岗位名称或岗位编码"  style={{ width: '200px',marginTop: '1px' }} />
                                <Button onClick={() => handleAssignJobPositionBatch()}>全部选择</Button>
                                <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>查询框</b></span>根据用户名称或用户编码过滤待选分配用户列表。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>全部选择</b></span>将待选分配用户列表清空，将所有用户添加到已选分配用户列表中。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>复选框</b></span>将选择的待选分配用户，添加到已选分配用户列表中；取消选择待选分配用户时，从已选分配用户列表中移除。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>批量移除</b></span>将选择的已选分配用户，从已选分配用户列表中移除。
                                            </li>
                                        </ol>
                                    </div>
                                }
                                color='white'>
                                <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                            </Tooltip>
                            </div>
                        }
                    >
                        <div className='nc-bill-table-area'>
                            <Table<JobPositionItemProps>

                                columns={columnsTypeLeft}
                                rowSelection={{ ...rowSelection }}
                                rowKey={(record) => `${record.JobCode}`}
                                showSorterTooltip={false}
                                dataSource={selectJobPositionList}
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
                                footer={() => '底部汇总信息'}
                                bordered={true}
                            />
                        </div>
                    </Card>
                </Col>
                <Col span={12}>
                    {/* <AdvancedSearchForm fields={employeeAssignRoleSearchFields} span={10} onSearch={handleEmployeeSearch} /> */}
                    <Card size="small" title={<span className="modal-body-left-commons-title-text">已选分配岗位</span>} style={{ textAlign: 'left' }}
                        extra={
                            <div>
                                <Input.Search placeholder="请输入岗位名称或岗位编码"  style={{ width: '200px',marginTop: '1px' }} />
                                <Button onClick={() => handleRemoveAssignJobPositionBatch(['1', '2'])}>批量移除</Button>
                                <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>查询框</b></span>根据用户名称或用户编码过滤已选分配用户列表。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>批量移除</b></span>将选择的已选分配用户，从已选分配用户列表中移除，同时恢复到未选分配用户列表中。
                                            </li>
                                        </ol>
                                    </div>
                                }
                                color='white'>
                                <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                            </Tooltip>
                            </div>
                        }
                    >
                        <div className='nc-bill-table-area'>
                            <Table<JobPositionItemProps>
                                columns={columnsTypeRight}
                                rowKey={(record) => `${record.JobCode}`}
                                showSorterTooltip={false}
                                dataSource={notSelectJobPositionList}
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
                                footer={() => '底部汇总信息'}
                                bordered={true}
                            />
                        </div>
                    </Card>
                </Col>
            </Row>


        </Modal>
    );
};

export default AssignJobPositionModal;


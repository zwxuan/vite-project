
import React, { useEffect, useState } from 'react';
import { Modal, Button, Space, Table, Row, Card, Col, Input, Tooltip } from 'antd';
import { RoleGroupItemProps } from "@/types/dynamic_configuration_platform/identity/role_group";
import dayjs from 'dayjs';
import { TableRowSelection } from 'antd/es/table/interface';
import { getAssignEmoloyeeColumnsLeft, getAssignEmoloyeeColumnsRight } from './columns';
import { RoleManageItemProps } from '@/types/dynamic_configuration_platform/identity/role_manage';
import { getRoleManageList } from '@/api/dynamic_configuration_platform/identity/role_manage_service';
import { RedoOutlined } from '@ant-design/icons';
import AdvancedSearchForm from '@/components/search-form';
import { assignRoleSearchFields } from './search_fields';
import { EmployeeManageItemProps } from '@/types/dynamic_configuration_platform/org_manage/employee_manage';
import { getEmployeeManageList } from '@/api/dynamic_configuration_platform/org_manage/employee_manage_service';
interface DetailModalProps {
    open: boolean;
    saving: boolean;
    roleCodes: string[];
    onCancel: () => void;
    onOk: (values: any) => void;
}

const AssignEmployeeModal: React.FC<DetailModalProps> = ({

    open,
    saving,
    roleCodes,
    onCancel,
    onOk,
}) => {
    const [selectEmployeeManageList, setSelectEmployeeManageList] = useState([] as EmployeeManageItemProps[]);
    const [notSelectEmployeeManageList, setNotSelectEmployeeManageList] = useState([] as EmployeeManageItemProps[]);
    const [pageSize, setPageSize] = useState(50);

    // 获取角色管理数据
    useEffect(() => {
        const getData = async () => {
            const allEmployeeData = await getEmployeeManageList();

            // employeeManageData只要奇数索引的数据
            const employeeManageData = allEmployeeData.filter((_, index) => index % 2 === 1);
            // 设置角色管理台账数据
            setSelectEmployeeManageList([...employeeManageData]);

            // notEmployeeManageData只要偶数索引的数据
            const notEmployeeManageData = allEmployeeData.filter((_, index) => index % 2 === 0);
            // 设置角色管理台账数据
            setNotSelectEmployeeManageList([...notEmployeeManageData]);
        };
        getData();
    }, []);
    const handleEmployeeDelete = (record: EmployeeManageItemProps) => {
        alert(record);
    };
    const columnsTypeLeft = getAssignEmoloyeeColumnsLeft();
    const columnsTypeRight = getAssignEmoloyeeColumnsRight(handleEmployeeDelete);

    //表格选中和取消时触发的函数
    const rowSelection: TableRowSelection<EmployeeManageItemProps> = {
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
                setNotSelectEmployeeManageList(prev => [...prev, record]);
            } else {
                // 取消选择时：从已选列表移除，添加回待选列表
                setNotSelectEmployeeManageList(prev => prev.filter(item => item.EmployeeCode !== record.EmployeeCode));
                // setSelectEmployeeManageList(prev => [...prev, record]);
            }
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log('onallselect');
            console.log(selected, selectedRows, changeRows);
            
            if (selected) {
                // 全选时：将所有待选用户移动到已选列表
                setNotSelectEmployeeManageList(prev => [...prev, ...selectEmployeeManageList]);
                // setSelectEmployeeManageList([]);
            } else {
                // 取消全选时：将当前页面的已选用户移回待选列表
                const currentPageEmployeeCodes = selectEmployeeManageList.map(row => row.EmployeeCode);
                // const movedUsers = notSelectEmployeeManageList.filter(item => 
                //     currentPageEmployeeCodes.includes(item.EmployeeCode)
                // );
                // setSelectEmployeeManageList(prev => [...prev, ...movedUsers]);
                setNotSelectEmployeeManageList(prev => 
                    prev.filter(item => !currentPageEmployeeCodes.includes(item.EmployeeCode))
                );
            }
        },
        type: 'checkbox',
        columnWidth: '40px',
    };
    
    const handleAssignEmployeeBatch = () => {
        setNotSelectEmployeeManageList(prev => [...prev, ...selectEmployeeManageList]);
        setSelectEmployeeManageList([]);
    }
    const handleRemoveAssignEmployeeBatch = (employeeCodes: string[]) => {
        alert(employeeCodes);
    }
    return (
        <Modal
            open={open}
            title={"分配用户"}
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
                    <Card size="small" title={<span className="modal-body-left-commons-title-text">待选分配用户</span>} style={{ textAlign: 'left' }}
                        extra={
                            <div>
                                <Input.Search placeholder="请输入用户名称或用户编码"  style={{ width: '200px',marginTop: '1px' }} />
                                <Button onClick={() => handleAssignEmployeeBatch()}>全部选择</Button>
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
                            <Table<EmployeeManageItemProps>
                                columns={columnsTypeLeft}
                                rowSelection={{ ...rowSelection }}
                                rowKey={(record) => `${record.EmployeeCode}`}
                                showSorterTooltip={false}
                                dataSource={selectEmployeeManageList}
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
                    <Card size="small" title={<span className="modal-body-left-commons-title-text">已选分配用户</span>} style={{ textAlign: 'left' }}
                        extra={
                            <div>
                                <Input.Search placeholder="请输入用户名称或用户编码"  style={{ width: '200px',marginTop: '1px' }} />
                                <Button onClick={() => handleRemoveAssignEmployeeBatch(['1', '2'])}>批量移除</Button>
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
                            <Table<EmployeeManageItemProps>
                                columns={columnsTypeRight}
                                rowKey={(record) => `${record.EmployeeCode}`}
                                showSorterTooltip={false}
                                dataSource={notSelectEmployeeManageList}
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

export default AssignEmployeeModal;

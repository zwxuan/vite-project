
import React, { useEffect, useState } from 'react';
import { Modal, Button, Space, Table, Row, Card, Col, Input, Tooltip } from 'antd';
import { RoleGroupItemProps } from "@/types/dynamic_configuration_platform/identity/role_group";
import dayjs from 'dayjs';
import { TableRowSelection } from 'antd/es/table/interface';
import { getAssignEmoloyeeColumnsLeft, getAssignEmoloyeeColumnsRight, getAssignRoleColumnsLeft, getAssignRoleColumnsRight } from './columns';
import { RoleManageItemProps } from '@/types/dynamic_configuration_platform/identity/role_manage';
import { getRoleManageList } from '@/api/dynamic_configuration_platform/identity/role_manage_service';
import { RedoOutlined } from '@ant-design/icons';
import AdvancedSearchForm from '@/components/search-form';
import { assignRoleSearchFields } from './search_fields';
interface DetailModalProps {
    open: boolean;
    saving: boolean;
    employeeCodes: string[];
    onCancel: () => void;
    onOk: (values: any) => void;
}

const AssignRoleModal: React.FC<DetailModalProps> = ({

    open,
    saving,
    employeeCodes,
    onCancel,
    onOk,
}) => {
    const [selectRoleManageList, setSelectRoleManageList] = useState([] as RoleManageItemProps[]);
    const [notSelectRoleManageList, setNotSelectRoleManageList] = useState([] as RoleManageItemProps[]);
    const [pageSize, setPageSize] = useState(50);

    // 获取角色管理数据
    useEffect(() => {
        const getData = async () => {
            const allRoleData = await getRoleManageList();

            // roleManageData只要奇数索引的数据
            const roleManageData = allRoleData.filter((_, index) => index % 2 === 1);
            // 设置角色管理台账数据
            setSelectRoleManageList([...roleManageData]);

            // notRoleManageData只要偶数索引的数据
            const notRoleManageData = allRoleData.filter((_, index) => index % 2 === 0);
            // 设置角色管理台账数据
            setNotSelectRoleManageList([...notRoleManageData]);
        };
        getData();
    }, []);
    const handleRoleDelete = (record: RoleManageItemProps) => {
        alert(record);
    };
    const columnsTypeLeft = getAssignRoleColumnsLeft();
    const columnsTypeRight = getAssignRoleColumnsRight(handleRoleDelete);

    //表格选中和取消时触发的函数
    const rowSelectionLeft: TableRowSelection<RoleManageItemProps> = {
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
                setNotSelectRoleManageList(prev => [...prev, record]);
            } else {
                // 取消选择时：从已选列表移除，添加回待选列表
                setNotSelectRoleManageList(prev => prev.filter(item => item.RoleCode !== record.RoleCode));
                setSelectRoleManageList(prev => [...prev, record]);
            }
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log('onallselect');
            console.log(selected, selectedRows, changeRows);
            
            if (selected) {
                // 全选时：将所有待选用户移动到已选列表
                setNotSelectRoleManageList(prev => [...prev, ...selectRoleManageList]);
                // setSelectEmployeeManageList([]);
            } else {
                // 取消全选时：将当前页面的已选用户移回待选列表
                const currentPageRoleCodes = selectRoleManageList.map(row => row.RoleCode);
                // const movedUsers = notSelectEmployeeManageList.filter(item => 
                //     currentPageEmployeeCodes.includes(item.EmployeeCode)
                // );
                // setSelectEmployeeManageList(prev => [...prev, ...movedUsers]);
                setNotSelectRoleManageList(prev => 
                    prev.filter(item => !currentPageRoleCodes.includes(item.RoleCode))
                );
            }
        },
        type: 'checkbox',
        columnWidth: '40px',
    };
    
    const handleAssignRoleBatch = () => {
        setNotSelectRoleManageList(prev => [...prev, ...selectRoleManageList]);
        setSelectRoleManageList([]);
    }
    const handleRemoveAssignRoleBatch = (roleCodes: string[]) => {
        alert(roleCodes);
    }
    return (
        <Modal
            open={open}
            title={"分配角色"}
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
                    <Card size="small" title={<span className="modal-body-left-commons-title-text">待选分配角色</span>} style={{ textAlign: 'left' }}
                        extra={
                            <div>
                                <Input.Search placeholder="请输入角色名称或角色编码"  style={{ width: '200px',marginTop: '1px' }} />
                                <Button onClick={() => handleAssignRoleBatch()}>全部选择</Button>
                                <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>查询框</b></span>根据角色名称或角色编码过滤待选分配角色列表。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>全部选择</b></span>将待选分配角色列表清空，将所有角色添加到已选分配角色列表中。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>复选框</b></span>将选择的待选分配角色添加到已选分配角色列表中；取消选择待选分配角色时，从已选分配角色列表中移除。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>批量移除</b></span>将选择的已选分配角色从已选分配角色列表中移除。
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
                            <Table<RoleManageItemProps>
                                columns={columnsTypeLeft}
                                rowSelection={{ ...rowSelectionLeft }}
                                rowKey={(record) => `${record.RoleCode}`}
                                showSorterTooltip={false}
                                dataSource={selectRoleManageList}
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
                    <Card size="small" title={<span className="modal-body-left-commons-title-text">已选分配角色</span>} style={{ textAlign: 'left' }}
                        extra={
                            <div>
                                <Input.Search placeholder="请输入角色名称或角色编码"  style={{ width: '200px',marginTop: '1px' }} />
                                <Button onClick={() => handleRemoveAssignRoleBatch(['1', '2'])}>批量移除</Button>
                                <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>查询框</b></span>根据角色名称或角色编码过滤已选分配角色列表。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>批量移除</b></span>将选择的已选分配角色添加到未选分配角色列表中，从已选分配角色列表中移除，同时恢复到未选分配角色列表中。
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
                            <Table<RoleManageItemProps>
                                columns={columnsTypeRight}
                                rowKey={(record) => `${record.RoleCode}`}
                                showSorterTooltip={false}
                                dataSource={notSelectRoleManageList}
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

export default AssignRoleModal;

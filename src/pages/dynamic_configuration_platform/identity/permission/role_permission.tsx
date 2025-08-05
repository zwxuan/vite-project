import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Space, Table, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { getEmoloyeeColumnsRight,getColumnsLeft} from './columns';
import { assignRoleSearchFields, employeeAssignRoleSearchFields } from './search_fields';
import AdvancedSearchForm from '@/components/search-form';
import { RoleManageItemProps } from '@/types/dynamic_configuration_platform/identity/role_manage';
import { getRoleManageList } from '@/api/dynamic_configuration_platform/identity/role_manage_service';
import { TableRowSelection } from 'antd/es/table/interface';
import { EmployeeManageItemProps } from '@/types/dynamic_configuration_platform/org_manage/employee_manage';
import { getEmployeeManageList } from '@/api/dynamic_configuration_platform/org_manage/employee_manage_service';
import { importItems, exportItems } from './menu_items';

const RolePermission: React.FC = () => {
    const [roleManageList, setRoleManageList] = useState([] as RoleManageItemProps[]);
    const [employeeManageList, setEmployeeManageList] = useState([] as EmployeeManageItemProps[]);
    const [pageSize, setPageSize] = useState(50);

    // 获取角色管理数据
    useEffect(() => {
        const getData = async () => {
            const roleManageData = await getRoleManageList();
            // 设置角色管理台账数据
            setRoleManageList([...roleManageData]);
            
            const employeeManageData = await getEmployeeManageList();
            // 设置员工台账数据
            setEmployeeManageList([...employeeManageData]);
        };
        getData();
    }, []);

    const columnsType = getColumnsLeft();
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

    const handleEmployeeDelete = (record: EmployeeManageItemProps) => {
        alert(record);
    };

    const handleEmployeeDeleteBatch = (record: string[]) => {
        alert(record);
    };

    const handleEmployeeEdit = (record: EmployeeManageItemProps) => {
        // const newData = employeeManageList.filter((item) => `${item.EmployeeCode}` === `${record.EmployeeCode}`);
    };
    
    const columnsEmployeeType = getEmoloyeeColumnsRight(handleEmployeeEdit, handleEmployeeDelete);

    //表格选中和取消时触发的函数
    const rowEmployeeSelection: TableRowSelection<EmployeeManageItemProps> = {
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

    return (
        <Row gutter={2}> 
            <Col span={12}>
                <AdvancedSearchForm fields={assignRoleSearchFields} span={8} onSearch={handleRoleSearch} />
                <Card size="small" title={<span className="modal-body-left-commons-title-text">角色信息</span>} style={{ textAlign:'left'}}
                    extra={
                        <div>
                        <Dropdown menu={{items:importItems}}>
                            <Button>
                                <Space>
                                    导入
                                <DownOutlined />
                                </Space>
                            </Button>   
                        </Dropdown>
                        <Dropdown menu={{items:exportItems}}>
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
                    <Table<RoleManageItemProps>
                        columns={columnsType}
                        rowSelection={{ ...rowSelection}}
                        rowKey={(record) => `${record.RoleCode}`}
                        showSorterTooltip={false}
                        dataSource={roleManageList}
                        loading={roleManageList.length === 0}
                        pagination={{
                            size:'small',
                            pageSize:pageSize,
                            showTotal: (total) => `总共 ${total} 条`,
                            showQuickJumper:true,
                            showSizeChanger:true,
                            onShowSizeChange: (current, size) => {
                                setPageSize(size);
                            },
                            locale:{
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
            <Col span={12}>
                <AdvancedSearchForm fields={employeeAssignRoleSearchFields} span={10} onSearch={handleEmployeeSearch} />           
                <Card size="small" title={<span className="modal-body-left-commons-title-text">已分配用户</span>} style={{ textAlign:'left'}}
                    extra={
                        <Button onClick={() => handleEmployeeDeleteBatch(['1','2'])}>批量删除</Button>
                    }
                >
                    <Table<EmployeeManageItemProps>
                        columns={columnsEmployeeType}
                        rowSelection={{ ...rowEmployeeSelection}}
                        rowKey={(record) => `${record.EmployeeCode}`}
                        showSorterTooltip={false}
                        dataSource={employeeManageList}
                        loading={employeeManageList.length === 0}
                        pagination={{
                            size:'small',
                            pageSize:pageSize,
                            showTotal: (total) => `总共 ${total} 条`,
                            showQuickJumper:true,
                            showSizeChanger:true,
                            onShowSizeChange: (current, size) => {
                                setPageSize(size);
                            },
                            locale:{
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
    );
};

export default RolePermission;
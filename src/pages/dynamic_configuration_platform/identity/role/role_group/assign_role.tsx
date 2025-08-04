
import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker, Table } from 'antd';
import { RoleGroupItemProps } from "@/types/dynamic_configuration_platform/identity/role_group";
import dayjs from 'dayjs';
import { TableRowSelection } from 'antd/es/table/interface';
import { getRoleManageColumns } from './columns';
import { RoleManageItemProps } from '@/types/dynamic_configuration_platform/identity/role_manage';
import { getRoleManageList } from '@/api/dynamic_configuration_platform/identity/role_manage_service';
interface DetailModalProps {
    open: boolean;
    saving: boolean;
    formData: Partial<RoleGroupItemProps>;
    onCancel: () => void;
    onOk: (values: any) => void;
}

const AssignRoleModal: React.FC<DetailModalProps> = ({
    open,
    saving,
    formData,
    onCancel,
    onOk,
}) => {
    const [roleManageList, setRoleManageList] = useState([] as RoleManageItemProps[]);
    const [pageSize, setPageSize] = useState(50);
    
    // 获取角色管理数据
    useEffect(() => {
        const getData = async () => {
            const roleManageData = await getRoleManageList();
            // 设置角色管理台账数据
            setRoleManageList([...roleManageData]);
        };
        getData();
    }, []);
    const columnsType = getRoleManageColumns();
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
        columnWidth: '40px',
    };
    return (
        <Modal 
            open={open} 
            title={"分配角色"}
            onCancel={onCancel}
            width={'75%'}
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
            <div className='nc-bill-table-area'>
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
                    footer={() => '底部汇总信息'}
                    bordered={true}
                />
            </div>
        </Modal>
    );
};

export default AssignRoleModal;

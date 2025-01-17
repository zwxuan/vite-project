import React, { useState } from 'react';
import { Tree, Table, Button, message, Checkbox, Row, Col } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import type { Key } from 'antd/es/table/interface';
import type { DataNode } from 'antd/es/tree';
import type { ColumnsType } from 'antd/es/table';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import '@/pages/page_list.less';

// import './permission.less';

interface TreeNode extends DataNode {
    title: string;
    key: string;
    children?: TreeNode[];
    checked?: boolean;
}

interface Function_Permission {
    key: string;
    name: string;
    checked: boolean;
}

interface DataType {
    key: string;
    parentKey: string;
    name: string;
    function_names: Function_Permission[];
    checked: boolean;
    indeterminate?:boolean;
}

// Mock API data for different menu items
const mockDataMap: DataType[] =
    [
        {
            name: '应用管理',
            key: 'platform.permission.app',
            parentKey: 'platform.permission',
            checked: false,
            function_names: [
                { key: 'platform.permission.app.query', name: '查看', checked: false },
                { key: 'platform.permission.app.import', name: '导入', checked: false },
                { key: 'platform.permission.app.export', name: '导出', checked: false },
                { key: 'platform.permission.app.add', name: '新增', checked: false },
                { key: 'platform.permission.app.edit', name: '编辑', checked: false },
                { key: 'platform.permission.app.delete', name: '删除', checked: false },
                { key: 'platform.permission.app.enable', name: '启用', checked: false },
                { key: 'platform.permission.app.disable', name: '禁用', checked: false },
            ],
        },
        {
            name: '菜单管理',
            key: 'platform.permission.menu',
            parentKey: 'platform.permission',
            checked: false,
            function_names: [
                { key: 'platform.permission.menu.query', name: '查看', checked: false },
                { key: 'platform.permission.menu.import', name: '导入', checked: false },
                { key: 'platform.permission.menu.export', name: '导出', checked: false },
                { key: 'platform.permission.menu.add', name: '新增', checked: false },
                { key: 'platform.permission.menu.edit', name: '编辑', checked: false },
                { key: 'platform.permission.menu.delete', name: '删除', checked: false },
                { key: 'platform.permission.menu.enable', name: '启用', checked: false },
                { key: 'platform.permission.menu.disable', name: '禁用', checked: false },
            ],
        },
        {
            name: '币制',
            key: 'platform.basic.currency',
            parentKey: 'platform.basic',
            checked: false,
            function_names: [
                { key: 'platform.basic.currency.query', name: '查看', checked: false },
                { key: 'platform.basic.currency.import', name: '导入', checked: false },
                { key: 'platform.basic.currency.export', name: '导出', checked: false },
                { key: 'platform.basic.currency.add', name: '新增', checked: false },
                { key: 'platform.basic.currency.edit', name: '编辑', checked: false },
                { key: 'platform.basic.currency.delete', name: '删除', checked: false },
                { key: 'platform.basic.currency.enable', name: '启用', checked: false },
                { key: 'platform.basic.currency.disable', name: '禁用', checked: false },
            ],
        },
    ];

const PermissionManagement: React.FC = () => {
    const [tableData, setTableData] = useState<DataType[]>(mockDataMap);
    const [checkedKeys, setCheckedKeys] = useState<Record<string, Key[]>>({});
    const [halfCheckedKeys, setHalfCheckedKeys] = useState<Key[]>([]);
    const treeData: TreeNode[] = [
        {
            title: '动态建模平台',
            key: 'platform',
            selectable: false,
            checked: false,
            children: [
                {
                    title: '权限管理',
                    key: 'platform.permission',
                    checked: false,
                },
                {
                    title: '组织管理',
                    key: 'platform.organization',
                    checked: false,
                },
                {
                    title: '基础数据',
                    key: 'platform.basic',
                    checked: false,
                },
                {
                    title: '系统管理',
                    key: 'platform.system',
                    checked: false,
                },
            ],
        },
        {
            title: 'AI驱动结算中心智能化平台',
            key: 'fms',
            selectable: false,
            checked: false,
            children: [
                {
                    title: '业务管理',
                    key: 'fms.business',
                    checked: false,
                },
                {
                    title: '费用管理',
                    key: 'fms.cost',
                    checked: false,
                },
                {
                    title: '财务管理',
                    key: 'fms.finance',
                    checked: false,
                },
                {
                    title: '报表管理',
                    key: 'fms.report',
                    checked: false,
                },
                {
                    title: '系统维护',
                    key: 'fms.system',
                    checked: false,
                },
            ],
        },
    ];
    // Handle menu selection
    const onSelect = (selectedKeys: Key[],info:any) => {
        const key = selectedKeys[0] as string;
        const filterDataMap = mockDataMap.filter(n=>n.parentKey===info.node.key);
        setTableData(filterDataMap);
    };

    //
    const onCheck = (checkedKeys:Key[] | {checked: Key[];halfChecked: Key[]}, info: any) => {
        const newTreeData = treeData.flatMap(n => n.children || []);
        newTreeData.forEach(item => {
            if(item.key === info.node.key){
                item.checked = info.checked;
            }
        });
        
        console.log(newTreeData);
        
    };

    const handleSelectAll = (e: CheckboxChangeEvent) => {

    };

    const handleServiceCheck = (record: DataType, e: CheckboxChangeEvent) => {
        //修改table表单中各个菜单的checkbox状态
        mockDataMap.forEach(item => {
            if(item.key === record.key){
                item.checked = e.target.checked;
                item.function_names.forEach(item_function=>{
                    item_function.checked = e.target.checked;
                });
                item.indeterminate = false;
            }
        });
        const filterDataMap = mockDataMap.filter(n=>n.parentKey === record.parentKey);
        setTableData(filterDataMap);
    };

    const handleActivityCheck = (record: DataType, activityKey: string, e: CheckboxChangeEvent) => {
        
        //修改table表单中各个菜单的checkbox状态
        mockDataMap.forEach(item => {
            item.function_names.forEach(item_function=>{
                if(item_function.key === activityKey){
                    item_function.checked = e.target.checked;
                    return;
                }
            })
            item.indeterminate = item.function_names.some(n=>n.checked);
            const allCheck = item.function_names.every(n=>n.checked);
            const cacelCheck = item.function_names.every(n=>!n.checked);
            if(allCheck){
                item.checked = true;
                item.indeterminate = false;
            }
            if(cacelCheck){
                item.checked = false;
                item.indeterminate = false;
            }
            if(item.key === record.key){
                return;
            }
        });

        const filterDataMap = mockDataMap.filter(n=>n.parentKey === record.parentKey);
        setTableData(filterDataMap);
        
    };

    const columns: ColumnsType<DataType> = [
        {
            title: (
                <div>
                    <Checkbox
                        checked={tableData.every(n => !n.checked)?false:true}
                        indeterminate={tableData.some(n=>n.indeterminate)?true:false}
                        onChange={handleSelectAll}
                    >
                        菜单名称
                    </Checkbox>
                </div>
            ),
            dataIndex: 'name',
            width: 200,
            render: (_: any, record: DataType) => (
                <Checkbox
                    checked={record.checked}
                    indeterminate={record.indeterminate}
                    onChange={(e) => handleServiceCheck(record, e)}
                >
                    {record.name}
                </Checkbox>
            ),
        },
        {
            title: '功能权限',
            dataIndex: 'function_names',
            render: (_: any, record: DataType) => (
                <Row gutter={[8, 8]} style={{ width: "600px" }}>
                    {record.function_names.map(item => (
                        <Col key={item.key} span={6}>
                            <Checkbox
                                checked={item.checked}
                                onChange={(e) => handleActivityCheck(record, item.key, e)}
                            >
                                {item.name}
                            </Checkbox>
                        </Col>
                    ))}
                </Row>
            ),
        },
    ];

    const handleSave = () => {
        message.success('保存成功');
    };

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '20%' }}>
                    <div className="nc-bill-table-area">
                        <Tree
                            showLine
                            checkable
                            defaultExpandedKeys={['sub1']}
                            onSelect={onSelect}
                            onCheck={onCheck}
                            // checkedKeys={{
                            //     checked: checkedKeys,
                            //     halfChecked: halfCheckedKeys,
                            // }}
                            // checkStrictly={true}
                            treeData={treeData}
                            showIcon
                            style={{
                                background: '#fff',
                                borderRadius: '2px',
                                height: 'calc(100vh - 280px)',
                                overflowY: 'auto'
                            }}
                        />
                    </div>
                </div>
                <div style={{ width: '80%', marginLeft: '10px' }}>
                    <div className="nc-bill-table-area">
                        <Table
                            columns={columns}
                            dataSource={tableData}
                            rowKey="key"
                            pagination={false}
                            scroll={{ x: 'max-content', y: 'calc(100vh - 280px)' }}
                            bordered={true}
                        />
                    </div>
                    <div style={{ marginTop: '20px', textAlign: 'right' }}>
                        <Button type="primary" danger onClick={handleSave}>
                            保存
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PermissionManagement;
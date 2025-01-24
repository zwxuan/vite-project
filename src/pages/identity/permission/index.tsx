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
    // indeterminate?:boolean;
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
        {
            name: '订单管理',
            key: 'fms.business.order',
            parentKey: 'fms.business',
            checked: false,
            function_names: [
                { key: 'fms.business.order.query', name: '查看', checked: false },
                { key: 'fms.business.order.import', name: '导入', checked: false },
                { key: 'fms.business.order.export', name: '导出', checked: false },
                { key: 'fms.business.order.add', name: '新增', checked: false },
                { key: 'fms.business.order.edit', name: '编辑', checked: false },
                { key: 'fms.business.order.delete', name: '删除', checked: false },
                { key: 'fms.business.order.enable', name: '启用', checked: false },
                { key: 'fms.business.order.disable', name: '禁用', checked: false },
            ],
        },
    ];
    const initTreeData: TreeNode[] = [
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
const PermissionManagement: React.FC = () => {
    const [tableData, setTableData] = useState<DataType[]>(mockDataMap);
    const [parentKey,setParentKey] = useState<string>('');
    const [treeData,setTreeData] = useState<TreeNode[]>(initTreeData);
    const [treeCheckedKeys, setCheckedKeys] = useState<Key[]>([]);
    const [treeHalfCheckedKeys, setHalfCheckedKeys] = useState<Key[]>([]);
    
    // Handle menu selection
    const onSelect = (selectedKeys: Key[],info:any) => {
        const key = selectedKeys[0] as string;
        const filterDataMap = mockDataMap.filter(n=>n.parentKey===info.node.key);
        setTableData(filterDataMap);
        setParentKey(info.node.key);
    };

    //
    const onCheck = (checkedKeys:Key[] | {checked: Key[];halfChecked: Key[]}, info: any) => {
        
        // let checkedKeysArray = Array.isArray(checkedKeys) ? checkedKeys : checkedKeys.checked;
        // const halfCheckedKeysArray = Array.isArray(checkedKeys) ? [] : checkedKeys.halfChecked;
        
        // treeData.forEach(node => {
        //     // 检查当前节点是否是被选中的节点
        //     if (node.key === info.node.key) {
        //         node.checked = info.checked;
        //         // 选择当前节点时，选中所有子节点
        //         node.children?.forEach(child=>{
        //             child.checked = info.checked;
        //         });
        //     }else{
        //         node.children?.forEach(element => {
        //             if(element.key === info.node.key){
        //                 element.checked = info.checked;
        //             }
        //         });
        //         let allCheck:boolean = node.children?.every(n=>n.checked)||false;
        //         let allNotCheck:boolean = node.children?.every(n=>!n.checked)||false;
        //         if((allCheck || allNotCheck) && info.node.key.startsWith(node.key)){
        //             node.checked = info.checked;
        //         }
        //     }
            
        // });

        // setTreeData(treeData);

        // const fatherKey = treeData.filter(n=>n.checked).map(n=>n.key);
        // const childrenKey = treeData.filter(n => n.children?.some(m => m.checked))
        //                             .flatMap(m => m.children?.filter(n=>n.checked).map(item => item.key) || []);

        // const fatherHalfKey1 = treeData.filter(n=>n.children?.every(m=>m.checked)).map(n=>n.key);
        // const fatherHalfKey2 = treeData.filter(n=>n.children?.every(m=>!m.checked)).map(n=>n.key);
        // const fatherHalfKey = treeData.map(n=>n.key).filter(n=>!fatherHalfKey1.includes(n) && !fatherHalfKey2.includes(n));

        
        // const allCheckKeys = [...fatherKey,...childrenKey].filter(n=>!fatherHalfKey.includes(n));

        // setCheckedKeys(allCheckKeys);
        // setHalfCheckedKeys(fatherHalfKey);


        // mockDataMap.forEach(item => {
        //     if(allCheckKeys.includes(item.parentKey)){
        //         item.checked = true;
        //         item.function_names.forEach(item_function=>{
        //             item_function.checked = true;
        //         });
        //     }else{
        //         item.checked = false;
        //         item.function_names.forEach(item_function=>{
        //             item_function.checked = false;
        //         });
        //     }
        //     item.indeterminate = false;
        // });
        
        // const filterDataMap = mockDataMap.filter(n=>(n.parentKey == parentKey && n.key.startsWith(info.node.key+'.')) || n.parentKey.startsWith(info.node.key+'.'));
        
        // setTableData(filterDataMap);
    };

    const handleSelectAll = (e: CheckboxChangeEvent) => {
        
        mockDataMap.forEach(item => {
            if(parentKey==='' || parentKey == item.parentKey){
                item.checked = e.target.checked;
                item.function_names.forEach(item_function=>{
                    item_function.checked = e.target.checked;
                });
                item.indeterminate = false;
            }
        });
        const filterDataMap = mockDataMap.filter(n=>n.parentKey === parentKey || parentKey==='');
        setTableData(filterDataMap);
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
        const hasCheckParentKey = tableData.map(n=>n.parentKey);
        
        const filterDataMap = mockDataMap.filter(n=>hasCheckParentKey.includes(n.parentKey));
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
        const hasCheckParentKey = tableData.map(n=>n.parentKey);
        let cancelParentKeys:string[] = [];
        // 全部取消
        if(tableData.every(n=>!n.checked)){
            cancelParentKeys = tableData.map(m=>m.parentKey);
        }
        const filterDataMap = mockDataMap.filter(n=>hasCheckParentKey.includes(n.parentKey));
        // // 同步处理tree的checkbox半选中状态
        // const halfParentKey1 = filterDataMap.filter(n=>n.indeterminate).map(m=>m.parentKey)||[];
        // const halfParentKey2 = treeData.filter(n => n.children?.some(m => halfParentKey1.includes(m.key) || cancelParentKeys.includes(m.key))).map(item=>item.key)||[];
        // const allHalfCheckedKeys = [...halfParentKey1,...halfParentKey2];
        // console.log(halfParentKey1);
        // console.log(halfParentKey2);
        // const fatherKey = treeData.filter(n=>n.checked).map(n=>n.key);
        // const childrenKey = treeData.filter(n => n.children?.some(m => m.checked))
        //                             .flatMap(m => m.children?.filter(n=>n.checked).map(item => item.key) || []);
        // const allCheckedKeys = [...fatherKey,...childrenKey].filter(n=>!allHalfCheckedKeys.includes(n) && !cancelParentKeys.includes(n));
        // setCheckedKeys(allCheckedKeys);
        // setHalfCheckedKeys(allHalfCheckedKeys);

        setTableData(filterDataMap);
        
    };

    const columns: ColumnsType<DataType> = [
        {
            title: (
                <div>
                    <Checkbox
                        checked={tableData.every(n => !n.checked)?false:true}
                        indeterminate={tableData.some(n=>n.indeterminate) || (!tableData.every(n=>n.checked) && !tableData.every(n=>!n.checked))?true:false}
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
                            // checkable
                            onSelect={onSelect}
                            onCheck={onCheck}
                            defaultExpandAll={true}
                            // checkedKeys={{
                            //     checked: treeCheckedKeys,
                            //     halfChecked: treeHalfCheckedKeys,
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
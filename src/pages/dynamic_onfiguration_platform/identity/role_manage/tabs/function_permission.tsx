import React, { useState, useEffect } from 'react';
import { Tree, Table, Button, message, Checkbox, Row, Col } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import type { Key } from 'antd/es/table/interface';
import type { DataNode } from 'antd/es/tree';
import type { ColumnsType } from 'antd/es/table';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { menuData } from '@/api/golbal/menu_service';
import '@/pages/page_list.less';

interface TreeNode extends DataNode {
    title: string;
    key: string;
    children?: TreeNode[];
    checked?: boolean;
    parentKey?: string;
}

interface FunctionPermission {
    key: string;
    name: string;
    checked: boolean;
}

interface DataType {
    key: string;
    parentKey: string;
    name: string;
    function_names: FunctionPermission[];
    checked: boolean;
    indeterminate?: boolean;
}

const mockDataMap: DataType[] =
    [
        {
            name: '币制',
            key: 'platform.basic.basic_finance.currency',
            parentKey: 'platform.basic.basic_finance',
            checked: false,
            function_names: [
                { key: 'platform.basic.basic_finance.currency.query', name: '查看', checked: false },
                { key: 'platform.basic.basic_finance.currency.import', name: '导入', checked: false },
                { key: 'platform.basic.basic_finance.currency.export', name: '导出', checked: false },
                { key: 'platform.basic.basic_finance.currency.add', name: '新增', checked: false },
                { key: 'platform.basic.basic_finance.currency.edit', name: '编辑', checked: false },
                { key: 'platform.basic.basic_finance.currency.delete', name: '删除', checked: false },
                { key: 'platform.basic.basic_finance.currency.enable', name: '启用', checked: false },
                { key: 'platform.basic.basic_finance.currency.disable', name: '禁用', checked: false },
            ],
        },
        {
            name: '税率管理',
            key: 'platform.basic.basic_finance.base_tax_rate',
            parentKey: 'platform.basic.basic_finance',
            checked: false,
            function_names: [
                { key: 'platform.basic.basic_finance.base_tax_rate.query', name: '查看', checked: false },
                { key: 'platform.basic.basic_finance.base_tax_rate.import', name: '导入', checked: false },
                { key: 'platform.basic.basic_finance.base_tax_rate.export', name: '导出', checked: false },
                { key: 'platform.basic.basic_finance.base_tax_rate.add', name: '新增', checked: false },
                { key: 'platform.basic.basic_finance.base_tax_rate.edit', name: '编辑', checked: false },
                { key: 'platform.basic.basic_finance.base_tax_rate.delete', name: '删除', checked: false },
                { key: 'platform.basic.basic_finance.base_tax_rate.enable', name: '启用', checked: false },
                { key: 'platform.basic.basic_finance.base_tax_rate.disable', name: '禁用', checked: false },
            ],
        },
        {
            name: '订单管理',
            key: 'ai_settlement.business_manage.entrust_manage.order',
            parentKey: 'ai_settlement.business_manage.entrust_manage',
            checked: false,
            function_names: [
                { key: 'ai_settlement.business_manage.entrust_manage.order.query', name: '查看', checked: false },
                { key: 'ai_settlement.business_manage.entrust_manage.order.import', name: '导入', checked: false },
                { key: 'ai_settlement.business_manage.entrust_manage.order.export', name: '导出', checked: false },
                { key: 'ai_settlement.business_manage.entrust_manage.order.add', name: '新增', checked: false },
                { key: 'ai_settlement.business_manage.entrust_manage.order.edit', name: '编辑', checked: false },
                { key: 'ai_settlement.business_manage.entrust_manage.order.delete', name: '删除', checked: false },
                { key: 'ai_settlement.business_manage.entrust_manage.order.enable', name: '启用', checked: false },
                { key: 'ai_settlement.business_manage.entrust_manage.order.disable', name: '禁用', checked: false },
            ],
        },
        {
            name: '对账',
            key: 'ai_settlement.cost_manage.cost_manage.fee_reconciliation',
            parentKey: 'ai_settlement.cost_manage.cost_manage',
            checked: false,
            function_names: [
                { key: 'ai_settlement.cost_manage.cost_manage.fee_reconciliation.query', name: '查看', checked: false },
                { key: 'ai_settlement.cost_manage.cost_manage.fee_reconciliation.import', name: '导入', checked: false },
                { key: 'ai_settlement.cost_manage.cost_manage.fee_reconciliation.export', name: '导出', checked: false },
                { key: 'ai_settlement.cost_manage.cost_manage.fee_reconciliation.add', name: '新增', checked: false },
                { key: 'ai_settlement.cost_manage.cost_manage.fee_reconciliation.edit', name: '编辑', checked: false },
                { key: 'ai_settlement.cost_manage.cost_manage.fee_reconciliation.delete', name: '删除', checked: false },
                { key: 'ai_settlement.cost_manage.cost_manage.fee_reconciliation.enable', name: '启用', checked: false },
                { key: 'ai_settlement.cost_manage.cost_manage.fee_reconciliation.disable', name: '禁用', checked: false },
            ],
        },
        {
            name: '开票|收票',
            key: 'ai_settlement.cost_manage.invoice_management.unpaid_invoice',
            parentKey: 'ai_settlement.cost_manage.invoice_management',
            checked: false,
            function_names: [
                { key: 'ai_settlement.cost_manage.invoice_management.unpaid_invoice.query', name: '查看', checked: false },
                { key: 'ai_settlement.cost_manage.invoice_management.unpaid_invoice.import', name: '导入', checked: false },
                { key: 'ai_settlement.cost_manage.invoice_management.unpaid_invoice.export', name: '导出', checked: false },
                { key: 'ai_settlement.cost_manage.invoice_management.unpaid_invoice.add', name: '新增', checked: false },
                { key: 'ai_settlement.cost_manage.invoice_management.unpaid_invoice.edit', name: '编辑', checked: false },
                { key: 'ai_settlement.cost_manage.invoice_management.unpaid_invoice.delete', name: '删除', checked: false },
                { key: 'ai_settlement.cost_manage.invoice_management.unpaid_invoice.enable', name: '启用', checked: false },
                { key: 'ai_settlement.cost_manage.invoice_management.unpaid_invoice.disable', name: '禁用', checked: false },
            ],
        }
    ];




const FunctionManagement: React.FC = () => {
    const [tableData, setTableData] = useState<DataType[]>(mockDataMap);
    const [parentKey, setParentKey] = useState<string>('');
    const [treeData, setTreeData] = useState<TreeNode[]>([]);
    const [selectedNodeKey, setSelectedNodeKey] = useState<string>('');
    const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);

    // 将menuData转换为TreeNode格式
    const buildTreeData = (): TreeNode[] => {
        const treeNodes: TreeNode[] = [];

        // 遍历主菜单组
        menuData.forEach(group => {
            const groupNode: TreeNode = {
                title: group.title,
                key: group.key,
                children: []
            };

            // 遍历应用
            group.apps.forEach(app => {
                const appNode: TreeNode = {
                    title: app.name,
                    key: `${group.key}.${app.key}`,
                    parentKey: group.key
                };
                groupNode.children!.push(appNode);
            });

            treeNodes.push(groupNode);
        });

        return treeNodes;
    };

    useEffect(() => {
        // 构建树形数据
        const builtTreeData = buildTreeData();
        setTreeData(builtTreeData);
        setTableData(mockDataMap);

        // 默认展开所有节点
        const allKeys: Key[] = [];
        const collectKeys = (nodes: TreeNode[]) => {
            nodes.forEach(node => {
                allKeys.push(node.key);
                if (node.children) {
                    collectKeys(node.children);
                }
            });
        };
        collectKeys(builtTreeData);
        setExpandedKeys(allKeys);
    }, []);
    // Handle menu selection
    const onSelect = (selectedKeys: Key[], info: any) => {
        const key = selectedKeys[0] as string;
        const filterDataMap = mockDataMap.filter(n => n.parentKey.startsWith(info.node.key));
        setTableData(filterDataMap);
        setParentKey(info.node.key);
    };

    //
    const onCheck = (checkedKeys: Key[] | { checked: Key[]; halfChecked: Key[] }, info: any) => {

    };

    const handleSelectAll = (e: CheckboxChangeEvent) => {

        mockDataMap.forEach(item => {
            if (parentKey === '' || item.parentKey.startsWith(parentKey)) {
                item.checked = e.target.checked;
                item.function_names.forEach(item_function => {
                    item_function.checked = e.target.checked;
                });
                item.indeterminate = false;
            }
        });
        const filterDataMap = mockDataMap.filter(n => n.parentKey.startsWith(parentKey) || parentKey === '');
        setTableData(filterDataMap);
    };

    const handleServiceCheck = (record: DataType, e: CheckboxChangeEvent) => {
        //修改table表单中各个菜单的checkbox状态
        mockDataMap.forEach(item => {
            if (item.key === record.key) {
                item.checked = e.target.checked;
                item.function_names.forEach(item_function => {
                    item_function.checked = e.target.checked;
                });
                item.indeterminate = false;
            }
        });
        const hasCheckParentKey = tableData.map(n => n.parentKey);

        const filterDataMap = mockDataMap.filter(n => hasCheckParentKey.includes(n.parentKey));
        setTableData(filterDataMap);
    };

    const handleActivityCheck = (record: DataType, activityKey: string, e: CheckboxChangeEvent) => {

        //修改table表单中各个菜单的checkbox状态
        mockDataMap.forEach(item => {
            item.function_names.forEach(item_function => {
                if (item_function.key === activityKey) {
                    item_function.checked = e.target.checked;
                    return;
                }
            })
            item.indeterminate = item.function_names.some(n => n.checked);
            const allCheck = item.function_names.every(n => n.checked);
            const cacelCheck = item.function_names.every(n => !n.checked);
            if (allCheck) {
                item.checked = true;
                item.indeterminate = false;
            }
            if (cacelCheck) {
                item.checked = false;
                item.indeterminate = false;
            }
            if (item.key === record.key) {
                return;
            }
        });
        const hasCheckParentKey = tableData.map(n => n.parentKey);
        let cancelParentKeys: string[] = [];
        // 全部取消
        if (tableData.every(n => !n.checked)) {
            cancelParentKeys = tableData.map(m => m.parentKey);
        }
        const filterDataMap = mockDataMap.filter(n => hasCheckParentKey.includes(n.parentKey));

        setTableData(filterDataMap);

    };

    const columns: ColumnsType<DataType> = [
        {
            title: '序号',
            width: 60,
            align: 'center',
            render: (_: any, record: DataType, index: number) => index + 1,
        },
        {
            title: (
                <div>
                    <Checkbox
                        checked={tableData.every(n => !n.checked) ? false : true}
                        indeterminate={tableData.some(n => n.indeterminate) || (!tableData.every(n => n.checked) && !tableData.every(n => !n.checked)) ? true : false}
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
                <Row gutter={[8, 8]}>
                    {record.function_names.map(item => (
                        <Col key={item.key} span={3}>
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

    return (
        <div style={{ display: 'flex',paddingTop:'10px' }}>
            <div style={{ width: '15%' }}>
                <div className="nc-bill-table-area">
                    <Tree
                        showLine
                        onSelect={onSelect}
                        onCheck={onCheck}
                        treeData={treeData}
                        expandedKeys={expandedKeys}
                        onExpand={(keys) => setExpandedKeys(keys)}
                        showIcon
                        style={{
                            background: '#fff',
                            borderRadius: '2px',
                            height: 'calc(100vh - 210px)',
                            overflowY: 'auto'
                        }}
                    />
                </div>
            </div>
            <div style={{ width: '85%', marginLeft: '10px' }}>
                <div className="nc-bill-table-area">
                    <Table
                        columns={columns}
                        dataSource={tableData}
                        rowKey="key"
                        pagination={false}
                        scroll={{ x: 'max-content', y: 'calc(100vh - 210px)' }}
                        bordered={true}
                    />
                </div>
            </div>
        </div>

    );
};

export default FunctionManagement;
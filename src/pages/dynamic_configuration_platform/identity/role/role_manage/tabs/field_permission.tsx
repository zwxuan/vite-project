import React, { useState, useEffect } from 'react';
import { Tree, Table, Button, message, Select, Checkbox, Row, Col, Radio } from 'antd';
import type { TableColumnsType, TreeDataNode, TreeProps } from 'antd';
import type { Key } from 'antd/es/table/interface';
import type { DataNode } from 'antd/es/tree';
import type { ColumnsType } from 'antd/es/table';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { getMainMenuList, getSubMenuList } from '@/api/golbal/menu_service';
import '@/pages/page_list.less';
import { MenuGroup } from '@/types/menu/menu';

interface TreeNode extends DataNode {
    title: string;
    key: string;
    children?: TreeNode[];
    checked?: boolean;
    parentKey?: string;
}


interface DataType {
    key: string;
    parentKey: string;
    name: string;
    fieldPermission: string;
}




const FieldsPermission: React.FC = () => {
    const [tableData, setTableData] = useState<DataType[]>([]);
    const [parentKey, setParentKey] = useState<string>('');
    const [treeData, setTreeData] = useState<TreeNode[]>([]);

    const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);


    useEffect(() => {
        const getData = async () => {
            try {
                const [menuData, subMenuData] = await Promise.all([
                    getMainMenuList(),
                    getSubMenuList()
                ]);

                // 构建树形数据的辅助函数
                const buildTreeDataWithData = (mainMenus: typeof menuData, subMenus: typeof subMenuData): TreeNode[] => {
                    const treeNodes: TreeNode[] = [];

                    // 遍历主菜单组
                    mainMenus.forEach(group => {
                        const groupNode: TreeNode = {
                            title: group.title,
                            key: group.key,
                            children: []
                        };

                        // 遍历主菜单下的应用
                        group.apps.forEach(app => {
                            const appNode: TreeNode = {
                                title: app.name,
                                key: `${group.key}.${app.key}`,
                                parentKey: group.key,
                                children: []
                            };

                            // 查找该应用下的子菜单
                            const subMenus = subMenuData.filter(subMenu => subMenu.parentkey === app.key);
                            subMenus.forEach(subMenu => {
                                const subMenuNode: TreeNode = {
                                    title: subMenu.title,
                                    key: `${group.key}.${app.key}.${subMenu.key}`,
                                    parentKey: `${group.key}.${app.key}`,
                                    children: []
                                };

                                // 遍历子菜单下的应用
                                subMenu.apps.forEach(subApp => {
                                    const subAppNode: TreeNode = {
                                        title: subApp.name,
                                        key: `${group.key}.${app.key}.${subMenu.key}.${subApp.key}`,
                                        parentKey: `${group.key}.${app.key}.${subMenu.key}`
                                    };
                                    subMenuNode.children!.push(subAppNode);
                                });

                                appNode.children!.push(subMenuNode);
                            });

                            groupNode.children!.push(appNode);
                        });

                        treeNodes.push(groupNode);
                    });

                    return treeNodes;
                };

                // 构建树形数据
                const builtTreeData = buildTreeDataWithData(menuData, subMenuData);
                setTreeData(builtTreeData);
                setTableData([]);

                // 默认展开前两级节点
                const expandedKeys: Key[] = [];
                const collectKeysWithLevel = (nodes: TreeNode[], level: number) => {
                    if (level > 1) return; // 只展开前两级
                    nodes.forEach(node => {
                        expandedKeys.push(node.key);
                        if (node.children && level < 2) {
                            collectKeysWithLevel(node.children, level + 1);
                        }
                    });
                };
                collectKeysWithLevel(builtTreeData, 1);
                setExpandedKeys(expandedKeys);
            } catch (error) {
                console.error('获取菜单数据失败:', error);
            }
        };

        getData();
    }, []);
    // Handle menu selection
    const onSelect = (selectedKeys: Key[], info: any) => {
        message.info(`Selected: ${info.node.key}`);

        // 模拟构建字段数据集
        const fieldsData: DataType[] = [
            {
                key: `${info.node.key}_field_1`,
                parentKey: info.node.key,
                name: '字段名称1',
                fieldPermission: 'write',
            },
            {
                key: `${info.node.key}_field_2`,
                parentKey: info.node.key,
                name: '字段名称2',
                fieldPermission: 'read',
            },
            {
                key: `${info.node.key}_field_3`,
                parentKey: info.node.key,
                name: '字段名称3',
                fieldPermission: 'write',
            },
            {
                key: `${info.node.key}_field_4`,
                parentKey: info.node.key,
                name: '字段名称4',
                fieldPermission: 'write',
            },
            {
                key: `${info.node.key}_field_5`,
                parentKey: info.node.key,
                name: '字段名称5',
                fieldPermission: 'write',
            },
        ];

        // 设置表格数据为构建的字段数据集
        setTableData(fieldsData);
        setParentKey(info.node.key);
    };

    const columns: TableColumnsType<DataType> = [
        {
            title: '序号',
            width: 60,
            align: 'center',
            render: (_: any, record: DataType, index: number) => index + 1,
        },
        {
            title: '字段名称',
            width: 160,
            dataIndex: 'name',
        },
        {
            title: '权限',
            dataIndex: 'fieldPermission',
            render: (text: string, record: DataType) => {
                const routeOptions = [
                    { value: 'read', label: '只读' },
                    { value: 'write', label: '读写' },
                    { value: 'disabled', label: '无权限' },
                ];
                return (
                    <Radio.Group
                        style={{ flex: 1, textAlign: 'left' }}
                        defaultValue={record.fieldPermission}
                        options={routeOptions}
                    />

                );
            }
        },
    ];

    return (
        <div style={{ display: 'flex', paddingTop: '10px' }}>
            <div style={{ width: '20%' }}>
                <div className="nc-bill-table-area">
                    <Tree
                        showLine
                        onSelect={onSelect}
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
            <div style={{ width: '80%', marginLeft: '10px' }}>
                <div className="nc-bill-table-area">
                    <Table<DataType>
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

export default FieldsPermission;
import '@/pages/page_list.less';
import './menu_manage.css';
import React, { useState, useEffect, useMemo } from 'react';
import { Button, Form, Space, notification, Card, Row, Col, Dropdown, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, StopOutlined, PlayCircleOutlined, AppstoreOutlined, ApiOutlined, ArrowUpOutlined, ArrowDownOutlined, RedoOutlined, DownOutlined } from '@ant-design/icons';
import { MenuManageItemProps, MenuTreeNode } from '@/types/dynamic_onfiguration_platform/system_manage/menu_manage';
import { getMenuManageList, saveMenuManage, deleteMenuManage, updateMenuStatus } from '@/api/dynamic_onfiguration_platform/system_manage/menu_manage_service';
import CustomIcon from '@/components/custom-icon';
import { exportItems } from './menu_items';
import MenuFormModal from './menu_form_modal';

const MenuManage: React.FC = () => {
    const [menuData, setMenuData] = useState<MenuManageItemProps[]>([]);
    const [selectedLevel1, setSelectedLevel1] = useState<string | null>(null);
    const [selectedLevel2, setSelectedLevel2] = useState<string | null>(null);
    const [selectedLevel3, setSelectedLevel3] = useState<string | null>(null);
    const [selectedNode, setSelectedNode] = useState<MenuTreeNode | null>(null);
    const [isAddingMenu, setIsAddingMenu] = useState<boolean>(false);
    const [refreshKey, setRefreshKey] = useState(0); // 添加刷新键来强制重新渲染

    const [addServiceModalOpen, setAddServiceModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    // 计算属性：动态获取各级菜单数据
    const level1Menus = useMemo(() => {
        return menuData.filter(item => item.level === 1)
            .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    }, [menuData, refreshKey]);

    const level2Menus = useMemo(() => {
        if (!selectedLevel1) return [];
        const level1Item = level1Menus.find(item => item.id === selectedLevel1);
        return (level1Item?.children || [])
            .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    }, [level1Menus, selectedLevel1, refreshKey]);

    const level3Menus = useMemo(() => {
        if (!selectedLevel2) return [];
        const level2Item = level2Menus.find(item => item.id === selectedLevel2);
        return (level2Item?.children || [])
            .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    }, [level2Menus, selectedLevel2, refreshKey]);

    const level4Services = useMemo(() => {
        if (!selectedLevel3) return [];
        const level3Item = level3Menus.find(item => item.id === selectedLevel3);
        return (level3Item?.children || [])
            .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    }, [level3Menus, selectedLevel3, refreshKey]);

    // 判断项目类型（菜单或服务）
    const getItemType = (item: MenuManageItemProps): 'menu' | 'service' => {
        // 如果有明确的type字段，使用type字段
        if (item.type) {
            return item.type;
        }

        return item.children && item.children.length > 0 ? 'menu' : 'service';
    };

    // 获取项目图标
    const getItemIcon = (item: MenuManageItemProps) => {
        const itemType = getItemType(item);
        if (item.icon) {
            return <CustomIcon type={item.icon} style={{ marginRight: 8 }} />;
        }
        // 默认图标：菜单用文件夹图标，服务用API图标
        return itemType === 'menu' ?
            <AppstoreOutlined style={{ marginRight: 8, color: '#1890ff' }} /> :
            <ApiOutlined style={{ marginRight: 8, color: '#52c41a' }} />;
    };

    // 获取菜单数据
    useEffect(() => {
        loadMenuData();
    }, []);

    // 处理一级菜单选择时的自动选择逻辑
    useEffect(() => {
        if (selectedLevel1 && level2Menus.length > 0) {
            setSelectedLevel2(level2Menus[0].id!);
        } else {
            setSelectedLevel2(null);
        }
    }, [selectedLevel1, level2Menus]);

    // 处理二级菜单选择时的自动选择逻辑
    useEffect(() => {
        if (selectedLevel2 && level3Menus.length > 0) {
            setSelectedLevel3(level3Menus[0].id!);
        } else {
            setSelectedLevel3(null);
        }
    }, [selectedLevel2, level3Menus]);

    const loadMenuData = async () => {
        setLoading(true);
        try {
            const data = await getMenuManageList();
            console.log('loadMenuData - 获取到的数据:', data);
            setMenuData([...data]); // 使用展开运算符确保状态更新
            setRefreshKey(prev => prev + 1); // 强制重新渲染
            console.log('loadMenuData - 状态已更新, refreshKey:', refreshKey + 1);
        } catch (error) {
            console.error('loadMenuData - 错误:', error);
            notification.error({
                message: '加载失败',
                description: '获取菜单数据失败，请重试',
            });
        } finally {
            setLoading(false);
        }
    };

    // 处理一级菜单点击
    const handleLevel1Click = (menuId: string) => {
        setSelectedLevel1(menuId);
    };

    // 处理二级菜单点击
    const handleLevel2Click = (menuId: string) => {
        setSelectedLevel2(menuId);
    };

    // 处理三级菜单点击
    const handleLevel3Click = (menuId: string) => {
        setSelectedLevel3(menuId);
    };

    // 添加菜单
    const handleAddMenu = (level: number) => {
        setModalMode('add');
        setIsAddingMenu(true);
        form.resetFields();

        let parentId = null;
        if (level === 2 && selectedLevel1) {
            parentId = selectedLevel1;
        } else if (level === 3 && selectedLevel2) {
            parentId = selectedLevel2;
        } else if (level === 4 && selectedLevel3) {
            parentId = selectedLevel3;
        }

        form.setFieldsValue({
            level: level,
            parentId: parentId,
            isActive: true
        });
        setAddServiceModalOpen(true);
    };

    // 添加服务
    const handleAddService = (level: number) => {
        setModalMode('add');
        setIsAddingMenu(false);
        form.resetFields();

        let parentId = null;
        if (level === 2 && selectedLevel1) {
            parentId = selectedLevel1;
        } else if (level === 3 && selectedLevel2) {
            parentId = selectedLevel2;
        } else if (level === 4 && selectedLevel3) {
            parentId = selectedLevel3;
        }

        form.setFieldsValue({
            level: level,
            parentId: parentId,
            isActive: true
        });
        setAddServiceModalOpen(true);
    };



    // 编辑菜单/服务
    const handleEdit = (item: MenuManageItemProps) => {
        setModalMode('edit');
        const itemType = getItemType(item);
        setIsAddingMenu(itemType === 'menu');
        setSelectedNode({
            key: item.id!,
            title: item.serviceName,
            level: item.level,
            serviceCode: item.serviceCode,
            serviceName: item.serviceName,
            parentId: item.parentId,
            icon: item.icon,
            path: item.path,
            isActive: item.isActive,
            description: item.description
        });
        form.setFieldsValue({
            serviceCode: item.serviceCode,
            serviceName: item.serviceName,
            parentId: item.parentId,
            level: item.level,
            icon: item.icon,
            path: item.path,
            isActive: item.isActive,
            description: item.description
        });
        setAddServiceModalOpen(true);
    };

    // 删除菜单/服务
    const handleDelete = async (id: string) => {
        try {
            await deleteMenuManage(id);
            notification.success({
                message: '成功',
                description: '删除成功'
            });
            // 立即重新加载数据以确保UI更新
            await loadMenuData();
        } catch (error) {
            notification.error({
                message: '错误',
                description: '删除失败'
            });
        }
    };

    // 状态变更
    const handleStatusChange = async (id: string, isActive: boolean) => {
        try {
            // 将 boolean 转换为 number: true -> 1, false -> 0
            const status = isActive ? 1 : 0;
            await updateMenuStatus(id, status);
            notification.success({
                message: '成功',
                description: `${isActive ? '启用' : '禁用'}成功`
            });
            // 立即重新加载数据以确保UI更新
            await loadMenuData();
        } catch (error) {
            notification.error({
                message: '错误',
                description: '状态更新失败'
            });
        }
    };

    // 保存菜单/服务
    const handleSave = async () => {
        try {
            const values = await form.validateFields();

            // 如果是新增且没有设置sortOrder，自动计算sortOrder
            if (modalMode === 'add' && !values.sortOrder) {
                const level = values.level;
                const parentId = values.parentId;

                // 直接从menuData中查找同级菜单
                const findSiblings = (items: MenuManageItemProps[], targetLevel: number, targetParentId?: string): MenuManageItemProps[] => {
                    let siblings: MenuManageItemProps[] = [];

                    const searchItems = (menuItems: MenuManageItemProps[]) => {
                        for (const item of menuItems) {
                            if (item.level === targetLevel && item.parentId === targetParentId) {
                                siblings.push(item);
                            }
                            if (item.children) {
                                searchItems(item.children);
                            }
                        }
                    };

                    if (targetLevel === 1) {
                        // 一级菜单直接从根级查找
                        siblings = items.filter(item => item.level === 1);
                    } else {
                        searchItems(items);
                    }

                    return siblings;
                };

                const siblings = findSiblings(menuData, level, parentId);

                // 设置为当前同级菜单的最大sortOrder + 1
                const maxSortOrder = siblings.length > 0
                    ? Math.max(...siblings.map(item => item.sortOrder || 0))
                    : 0;
                values.sortOrder = maxSortOrder + 1;
            }

            const serviceData: MenuManageItemProps = {
                ...values,
                id: modalMode === 'edit' ? selectedNode?.key : undefined,
                type: isAddingMenu ? 'menu' : 'service' // 设置类型字段
            };

            console.log('handleSave - 保存数据:', serviceData);
            console.log('handleSave - 模式:', modalMode);

            await saveMenuManage(serviceData);
            console.log('handleSave - 保存成功');

            notification.success({
                message: '成功',
                description: `${modalMode === 'add' ? '添加' : '编辑'}成功`
            });
            setAddServiceModalOpen(false);
            // 立即重新加载数据以确保UI更新
            console.log('handleSave - 开始重新加载数据');
            await loadMenuData();
            console.log('handleSave - 数据重新加载完成');

            // 如果是新增操作，自动选中对应的父级菜单以显示新增的项目
            if (modalMode === 'add') {
                const level = values.level;
                const parentId = values.parentId;

                if (level === 1) {
                    // 新增一级菜单，不需要特殊处理
                } else if (level === 2 && parentId) {
                    // 新增二级菜单，确保选中对应的一级菜单
                    setSelectedLevel1(parentId);
                } else if (level === 3 && parentId) {
                    // 新增三级菜单，确保选中对应的二级菜单
                    setSelectedLevel2(parentId);
                } else if (level === 4 && parentId) {
                    // 新增四级服务，确保选中对应的三级菜单
                    setSelectedLevel3(parentId);
                }
            }
        } catch (error) {
            notification.error({
                message: '错误',
                description: `${modalMode === 'add' ? '添加' : '编辑'}失败`
            });
        }
    };

    // 上移菜单项
    const handleMoveUp = async (item: MenuManageItemProps, level: number) => {
        try {
            let siblings: MenuManageItemProps[] = [];

            if (level === 1) {
                siblings = level1Menus;
            } else if (level === 2) {
                siblings = level2Menus;
            } else if (level === 3) {
                siblings = level3Menus;
            } else if (level === 4) {
                siblings = level4Services;
            }

            const currentIndex = siblings.findIndex(menu => menu.id === item.id);
            if (currentIndex > 0) {
                // 重新计算排序值，确保顺序正确
                const currentItem = { ...siblings[currentIndex] };
                const prevItem = { ...siblings[currentIndex - 1] };

                // 确保排序值存在，如果不存在则使用索引
                const currentSort = currentItem.sortOrder ?? currentIndex + 1;
                const prevSort = prevItem.sortOrder ?? currentIndex;

                // 交换排序值
                currentItem.sortOrder = prevSort;
                prevItem.sortOrder = currentSort;

                // 批量更新排序
                await Promise.all([
                    saveMenuManage(currentItem),
                    saveMenuManage(prevItem)
                ]);

                notification.success({
                    message: '成功',
                    description: '上移成功'
                });
                // 立即重新加载数据以确保UI更新
                await loadMenuData();
            }
        } catch (error) {
            notification.error({
                message: '错误',
                description: '上移失败'
            });
        }
    };

    // 下移菜单项
    const handleMoveDown = async (item: MenuManageItemProps, level: number) => {
        try {
            let siblings: MenuManageItemProps[] = [];

            if (level === 1) {
                siblings = level1Menus;
            } else if (level === 2) {
                siblings = level2Menus;
            } else if (level === 3) {
                siblings = level3Menus;
            } else if (level === 4) {
                siblings = level4Services;
            }

            const currentIndex = siblings.findIndex(menu => menu.id === item.id);
            if (currentIndex < siblings.length - 1) {
                // 重新计算排序值，确保顺序正确
                const currentItem = { ...siblings[currentIndex] };
                const nextItem = { ...siblings[currentIndex + 1] };

                // 确保排序值存在，如果不存在则使用索引
                const currentSort = currentItem.sortOrder ?? currentIndex + 1;
                const nextSort = nextItem.sortOrder ?? currentIndex + 2;

                // 交换排序值
                currentItem.sortOrder = nextSort;
                nextItem.sortOrder = currentSort;

                // 批量更新排序
                await Promise.all([
                    saveMenuManage(currentItem),
                    saveMenuManage(nextItem)
                ]);

                notification.success({
                    message: '成功',
                    description: '下移成功'
                });
                // 立即重新加载数据以确保UI更新
                await loadMenuData();
            }
        } catch (error) {
            notification.error({
                message: '错误',
                description: '下移失败'
            });
        }
    };

    // 渲染菜单列表项
    const renderMenuList = (menus: MenuManageItemProps[], level: number) => {
        return (
            <div className="menu-list-container">
                {menus.map(menu => {
                    const itemType = getItemType(menu);
                    const isSelected = (
                        (level === 1 && selectedLevel1 === menu.id) ||
                        (level === 2 && selectedLevel2 === menu.id) ||
                        (level === 3 && selectedLevel3 === menu.id)
                    );

                    return (
                        <div
                            key={menu.id}
                            className={`menu-item ${itemType}-type ${isSelected ? 'selected' : ''}`}
                            onClick={() => {
                                if (level === 1) handleLevel1Click(menu.id!);
                                else if (level === 2) handleLevel2Click(menu.id!);
                                else if (level === 3) handleLevel3Click(menu.id!);
                            }}
                        >
                            <div className="menu-item-content">
                                <div className="menu-item-info">
                                    <div className={`menu-item-icon ${itemType}-type`}>
                                        {getItemIcon(menu)}
                                    </div>
                                    <span className={`menu-item-text ${itemType}-type`}>
                                        {menu.serviceName}
                                    </span>
                                    <span className={`menu-item-type-tag ${itemType}-type`}>
                                        {itemType === 'menu' ? '目录' : '服务'}
                                    </span>
                                </div>
                                <div className="menu-item-actions">
                                    <ArrowUpOutlined title='上移' onClick={(e) => {
                                        e.stopPropagation();
                                        handleMoveUp(menu, level);
                                    }}
                                        className="menu-action-btn"
                                    />

                                    <ArrowDownOutlined title='下移' onClick={(e) => {
                                        e.stopPropagation();
                                        handleMoveDown(menu, level);
                                    }}
                                        className="menu-action-btn"
                                    />
                                    <EditOutlined onClick={(e) => {
                                        e.stopPropagation();
                                        handleEdit(menu);
                                    }}
                                        className="menu-action-btn edit"
                                        title={`编辑${itemType === 'menu' ? '目录' : '服务'}`}
                                    />
                                    <DeleteOutlined onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(menu.id!);
                                    }}
                                        className="menu-action-btn delete"
                                        title={`删除${itemType === 'menu' ? '目录' : '服务'}`}
                                    />
                                    {menu.isActive ? <StopOutlined onClick={(e) => {
                                        e.stopPropagation();
                                        handleStatusChange(menu.id!, !menu.isActive);
                                    }}
                                        className={`menu-action-btn ${menu.isActive ? 'status-active' : 'status-inactive'}`}
                                        title={`${menu.isActive ? '停用' : '启用'}${itemType === 'menu' ? '菜单' : '服务'}`} /> : <PlayCircleOutlined onClick={(e) => {
                                            e.stopPropagation();
                                            handleStatusChange(menu.id!, !menu.isActive);
                                        }}
                                            className={`menu-action-btn ${menu.isActive ? 'status-active' : 'status-inactive'}`}
                                            title={`${menu.isActive ? '停用' : '启用'}${itemType === 'menu' ? '菜单' : '服务'}`} />}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };
    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} /> 菜单管理
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>说明</b></span> 点击页面各级导航目录后的“添加目录”/“添加服务”，可添加对应同级别的目录/服务。目录/服务的名称支持多语编辑。一级导航目录只允许添加目录、四级导航目录只允许添加服务。二、三级级导航目录即允许添加目录，也允许添加服务。目录即是菜单。如果本级目录已为服务，则不允许在其下级创建目录或服务。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>注意</b></span>
                                                <p>1.相同级别导航目录下，新增或修改名称时，进行重名校验。</p>
                                                <p>2.无论几级目录，如果没有关联服务，在菜单中不显示空目录，只有目录下关联服务后才显示。</p>
                                                <p>3.目录由管理员自行编辑添加，服务则需要在已有的服务中进行选择。</p>
                                            </li>
                                        </ol>
                                    </div>
                                }
                                color='white'>
                                <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                            </Tooltip>
                        </span>
                    </div>
                    <span className="orgunit-customize-showOff" style={{ marginLeft: "10px" }}>
                        <div style={{ display: "inline" }}>
                            <label className="u-checkbox nc-checkbox">

                            </label>
                        </div>
                    </span>
                </div>
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{ display: "flex" }}>
                        <div className="buttonGroup-component" style={{ marginLeft: "10px" }}>
                            <div className="u-button-group"></div>
                        </div>
                        <div className="divider-button-wrapper">
                            <Dropdown menu={{ items: exportItems }}>
                                <Button>
                                    <Space>
                                        导出
                                        <DownOutlined />
                                    </Space>
                                </Button>
                            </Dropdown>
                        </div>
                        <span className="u-button">
                            <RedoOutlined className='iconfont' />
                        </span>
                    </div>
                </div>



            </div>
            <div className='nc-bill-table-area'>
                {/* 主要内容区域 - 四栏布局 */}
                <Row gutter={8} className="menu-manage-content">
                    {/* 一级菜单 */}
                    <Col span={6}>
                        <Card
                            title="一级导航目录"
                            size="small"
                            className="menu-card"
                            extra={
                                <Button onClick={() => handleAddMenu(1)}>添加目录</Button>
                            }
                        >
                            {renderMenuList(level1Menus, 1)}
                        </Card>
                    </Col>

                    {/* 二级菜单 */}
                    <Col span={6}>
                        <Card
                            title="二级导航目录"
                            size="small"
                            className="menu-card"
                            extra={
                                <Space>
                                    <Button onClick={() => handleAddMenu(2)}>添加目录</Button>
                                    <Button onClick={() => handleAddService(2)}>添加服务</Button>
                                </Space>
                            }
                        >
                            {renderMenuList(level2Menus, 2)}
                        </Card>
                    </Col>

                    {/* 三级菜单 */}
                    <Col span={6}>
                        <Card
                            title="三级导航目录"
                            size="small"
                            className="menu-card"
                            extra={
                                <Space>
                                    <Button onClick={() => handleAddMenu(3)}>添加目录</Button>
                                    <Button onClick={() => handleAddService(3)}>添加服务</Button>
                                </Space>
                            }
                        >
                            {renderMenuList(level3Menus, 3)}
                        </Card>
                    </Col>

                    {/* 四级服务 */}
                    <Col span={6}>
                        <Card
                            title="四级导航目录"
                            size="small"
                            className="menu-card"
                            extra={
                                <Button onClick={() => handleAddService(4)}>添加服务</Button>
                            }
                        >
                            <div className="menu-list-container">
                                {renderMenuList(level4Services, 4)}
                            </div>
                        </Card>
                    </Col>
                </Row>

                {/* 添加/编辑服务模态框 */}
                <MenuFormModal
                    visible={addServiceModalOpen}
                    mode={modalMode}
                    isAddingMenu={isAddingMenu}
                    selectedNode={selectedNode}
                    form={form}
                    onSave={handleSave}
                    onCancel={() => setAddServiceModalOpen(false)}
                />
            </div>
        </div>


    );
};

export default MenuManage;
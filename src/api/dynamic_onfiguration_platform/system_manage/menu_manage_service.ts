import { MenuManageItemProps } from '@/types/dynamic_onfiguration_platform/system_manage/menu_manage';
import request, { ApiRes } from '../../request';

// 辅助函数：获取所有ID
const getAllIds = (items: MenuManageItemProps[]): number[] => {
    const ids: number[] = [];
    const traverse = (menuItems: MenuManageItemProps[]) => {
        menuItems.forEach(item => {
            if (item.id) {
                ids.push(parseInt(item.id));
            }
            if (item.children) {
                traverse(item.children);
            }
        });
    };
    traverse(items);
    return ids;
};

// 辅助函数：在数据中更新菜单项
const updateMenuItemInData = (items: MenuManageItemProps[], updatedItem: MenuManageItemProps): boolean => {
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === updatedItem.id) {
            items[i] = { ...items[i], ...updatedItem };
            return true;
        }
        if (items[i].children && updateMenuItemInData(items[i].children!, updatedItem)) {
            return true;
        }
    }
    return false;
};

// 辅助函数：在数据中添加菜单项
const addMenuItemToData = (items: MenuManageItemProps[], newItem: MenuManageItemProps): boolean => {
    console.log('addMenuItemToData - 添加新项目:', newItem);
    console.log('addMenuItemToData - 当前数据结构:', items);
    
    if (newItem.level === 1) {
        items.push(newItem);
        console.log('addMenuItemToData - 一级菜单添加成功');
        return true;
    }
    
    // 查找父级菜单
    const findAndAddToParent = (menuItems: MenuManageItemProps[]): boolean => {
        for (let item of menuItems) {
            if (item.id === newItem.parentId) {
                if (!item.children) {
                    item.children = [];
                }
                item.children.push(newItem);
                console.log(`addMenuItemToData - 找到父级菜单 ${item.serviceName}，子菜单添加成功`);
                return true;
            }
            if (item.children && findAndAddToParent(item.children)) {
                return true;
            }
        }
        return false;
    };
    
    const result = findAndAddToParent(items);
    console.log('addMenuItemToData - 添加结果:', result);
    return result;
};

// 辅助函数：在数据中删除菜单项
const deleteMenuItemFromData = (items: MenuManageItemProps[], id: string): boolean => {
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
            items.splice(i, 1);
            return true;
        }
        if (items[i].children && deleteMenuItemFromData(items[i].children!, id)) {
            return true;
        }
    }
    return false;
};

// 模拟数据
const mockMenuData: MenuManageItemProps[] = [
    {
        id: '1',
        serviceCode: 'WBP',
        serviceName: '组件管理',
        level: 1,
        sortOrder: 1,
        isActive: true,
        type: 'menu',
        children: [
            {
                id: '2',
                serviceCode: 'XTMENHU0002',
                serviceName: '我管理的工作台',
                parentId: '1',
                level: 2,
                sortOrder: 1,
                isActive: true,
                type: 'menu',
            },
            {
                id: '3',
                serviceCode: 'XTMENHU0003',
                serviceName: '导航设置',
                parentId: '1',
                level: 2,
                sortOrder: 2,
                isActive: true,
                type: 'menu',
            },
            {
                id: '4',
                serviceCode: 'QYFGSZ',
                serviceName: '企业风格设置',
                parentId: '1',
                level: 2,
                sortOrder: 3,
                isActive: true,
                type: 'menu',
            },
            {
                id: '5',
                serviceCode: 'XTMENHU0001',
                serviceName: '工作台管理',
                parentId: '1',
                level: 2,
                sortOrder: 4,
                isActive: true,
                type: 'menu',
            },
            {
                id: '6',
                serviceCode: 'XTMENHU0004',
                serviceName: '组件设置-web广告',
                parentId: '1',
                level: 2,
                sortOrder: 5,
                isActive: true,
                type: 'menu',
            }
        ]
    },
    {
        id: '7',
        serviceCode: 'SJHJTQ',
        serviceName: '数字化建模',
        level: 1,
        sortOrder: 2,
        isActive: true,
        type: 'menu',
        children: [
            {
                id: '8',
                serviceCode: 'GZGL',
                serviceName: '工作台管理',
                parentId: '7',
                level: 2,
                sortOrder: 1,
                isActive: true,
                type: 'menu',
                children: [
                    {
                        id: '9',
                        serviceCode: 'ZYGL',
                        serviceName: '资产管理',
                        parentId: '8',
                        level: 3,
                        sortOrder: 1,
                        isActive: true,
                        type: 'menu',
                    },
                    {
                        id: '10',
                        serviceCode: 'YWJCSJ',
                        serviceName: '业务基础数据',
                        parentId: '8',
                        level: 3,
                        sortOrder: 2,
                        isActive: true,
                        type: 'menu',
                    }
                ]
            },
            {
                id: '11',
                serviceCode: 'ZZGL',
                serviceName: '组织管理',
                parentId: '7',
                level: 2,
                sortOrder: 2,
                isActive: true,
                type: 'menu',
            },
            {
                id: '12',
                serviceCode: 'QXGL',
                serviceName: '权限管理',
                parentId: '7',
                level: 2,
                sortOrder: 3,
                isActive: true,
                type: 'menu',
            },
            {
                id: '13',
                serviceCode: 'XTGL',
                serviceName: '系统管理',
                parentId: '7',
                level: 2,
                sortOrder: 4,
                isActive: true,
                type: 'menu',
            }
        ]
    },
    {
        id: '14',
        serviceCode: 'SJGL',
        serviceName: '三级菜单',
        level: 1,
        sortOrder: 3,
        isActive: true,
        type: 'menu',
        children: [
            {
                id: '15',
                serviceCode: 'SJGL_L2',
                serviceName: '二级菜单',
                parentId: '14',
                level: 2,
                sortOrder: 1,
                isActive: true,
                type: 'menu',
                children: [
                    {
                        id: '16',
                        serviceCode: 'SJGL_L3',
                        serviceName: '三级菜单',
                        parentId: '15',
                        level: 3,
                        sortOrder: 1,
                        isActive: true,
                        type: 'menu',
                        children: [
                            {
                                id: '17',
                                serviceCode: 'SJGL_L4',
                                serviceName: '四级菜单',
                                parentId: '16',
                                level: 4,
                                sortOrder: 1,
                                isActive: true,
                                type: 'service',
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

// 获取菜单列表
export const getMenuManageList = async (): Promise<MenuManageItemProps[]> => {
    // 模拟API调用
    return new Promise((resolve) => {
        setTimeout(() => {
            // 返回深拷贝的数据，确保React能检测到状态变化
            resolve(JSON.parse(JSON.stringify(mockMenuData)));
        }, 500);
    });
};

// 保存菜单项
export const saveMenuManage = async (
    data: MenuManageItemProps,
    progressCallback?: (progress: number) => void
): Promise<boolean> => {
    return new Promise((resolve) => {
        console.log('saveMenuManage - 开始保存:', data);
        
        // 模拟保存逻辑，实际更新 mockMenuData
        if (data.id) {
            // 编辑现有项目
            console.log('saveMenuManage - 编辑模式');
            updateMenuItemInData(mockMenuData, data);
        } else {
            // 添加新项目
            console.log('saveMenuManage - 新增模式');
            const newId = (Math.max(...getAllIds(mockMenuData)) + 1).toString();
            const newItem = { ...data, id: newId };
            console.log('saveMenuManage - 生成新ID:', newId);
            console.log('saveMenuManage - 新项目数据:', newItem);
            const addResult = addMenuItemToData(mockMenuData, newItem);
            console.log('saveMenuManage - 添加结果:', addResult);
            console.log('saveMenuManage - 更新后的mockMenuData:', mockMenuData);
        }
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += 20;
            if (progressCallback) {
                progressCallback(progress);
            }
            if (progress >= 100) {
                clearInterval(interval);
                resolve(true);
            }
        }, 200);
    });
};

// 删除菜单项
export const deleteMenuManage = async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
        // 实际删除数据
        const success = deleteMenuItemFromData(mockMenuData, id);
        setTimeout(() => {
            resolve(success);
        }, 1000);
    });
};

// 更新菜单状态
export const updateMenuStatus = async (id: string, status: number): Promise<boolean> => {
    return new Promise((resolve) => {
        // 实际更新状态
        const updateStatus = (items: MenuManageItemProps[]): boolean => {
            for (let item of items) {
                if (item.id === id) {
                    item.isActive = status === 1; // 更新isActive字段而不是status字段
                    return true;
                }
                if (item.children && updateStatus(item.children)) {
                    return true;
                }
            }
            return false;
        };
        
        const success = updateStatus(mockMenuData);
        setTimeout(() => {
            resolve(success);
        }, 500);
    });
};
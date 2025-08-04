import { MenuManageItemProps } from '@/types/dynamic_configuration_platform/system_manage/menu_manage';
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

// 直接导入 menu_service.ts 中的数据
import { getMainMenuList, getSubMenuList } from '../../golbal/menu_service';
import { MenuGroup } from '@/types/menu/menu';

// 获取菜单数据的异步函数
const getMenuData = async (): Promise<{ mainMenuData: MenuGroup[], subMenuData: MenuGroup[] }> => {
    const [mainMenuData, subMenuData] = await Promise.all([
        getMainMenuList(),
        getSubMenuList()
    ]);
    return { mainMenuData, subMenuData };
};

// 转换函数：将 MenuGroup 数据转换为 MenuManageItemProps 格式
const convertMenuGroupToMenuManageItems = async (): Promise<MenuManageItemProps[]> => {
    const { mainMenuData, subMenuData } = await getMenuData();
    const result: MenuManageItemProps[] = [];
    let currentId = 1;
    
    // 创建主菜单映射
    const mainMenuMap = new Map<string, MenuManageItemProps>();
    
    // 处理主菜单
    mainMenuData.forEach((mainMenu, index) => {
        const mainMenuItem: MenuManageItemProps = {
            id: currentId.toString(),
            serviceCode: mainMenu.key.toUpperCase(),
            serviceName: mainMenu.title,
            level: 1,
            sortOrder: index + 1,
            isActive: true,
            type: 'menu',
            children: []
        };
        
        mainMenuMap.set(mainMenu.key, mainMenuItem);
        result.push(mainMenuItem);
        currentId++;
        
        // 处理主菜单下的直接子项
        mainMenu.apps.forEach((app, appIndex) => {
            const appItem: MenuManageItemProps = {
                id: currentId.toString(),
                serviceCode: app.key.toUpperCase(),
                serviceName: app.name,
                parentId: mainMenuItem.id,
                level: 2,
                sortOrder: appIndex + 1,
                isActive: true,
                type: 'menu',
                path: app.path,
                children: []
            };
            
            mainMenuItem.children!.push(appItem);
            mainMenuMap.set(app.key, appItem);
            currentId++;
        });
    });
    
    // 处理子菜单数据
    subMenuData.forEach((subMenu) => {
        const parentItem = mainMenuMap.get(subMenu.parentkey!);
        if (parentItem) {
            const subMenuItem: MenuManageItemProps = {
                id: currentId.toString(),
                serviceCode: subMenu.key.toUpperCase(),
                serviceName: subMenu.title,
                parentId: parentItem.id,
                level: parentItem.level + 1,
                sortOrder: (parentItem.children?.length || 0) + 1,
                isActive: true,
                type: 'menu',
                children: []
            };
            
            parentItem.children!.push(subMenuItem);
            currentId++;
            
            // 处理子菜单下的应用
            subMenu.apps.forEach((app, appIndex) => {
                const appItem: MenuManageItemProps = {
                    id: currentId.toString(),
                    serviceCode: app.key.toUpperCase(),
                    serviceName: app.name,
                    parentId: subMenuItem.id,
                    level: subMenuItem.level + 1,
                    sortOrder: appIndex + 1,
                    isActive: true,
                    type: app.path ? 'service' : 'menu',
                    path: app.path
                };
                
                subMenuItem.children!.push(appItem);
                currentId++;
            });
        }
    });
    
    return result;
};

// 生成模拟数据（异步初始化）
let mockMenuData: MenuManageItemProps[] = [];

// 初始化数据
const initMockMenuData = async () => {
    if (mockMenuData.length === 0) {
        mockMenuData = await convertMenuGroupToMenuManageItems();
    }
    return mockMenuData;
};

// 获取菜单列表
export const getMenuManageList = async (): Promise<MenuManageItemProps[]> => {
    // 确保数据已初始化
    await initMockMenuData();
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
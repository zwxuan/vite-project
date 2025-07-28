export interface MenuManageItemProps {
    id?: string;
    serviceCode: string;
    serviceName: string;
    parentId?: string;
    level: number;
    sortOrder?: number;
    status?: number; // 添加 status 属性以支持状态管理
    icon?: string;
    path?: string;
    isActive?: boolean;
    description?: string;
    createTime?: string;
    updateTime?: string;
    children?: MenuManageItemProps[];
    type?: 'menu' | 'service'; // 新增类型字段来区分菜单和服务
}

export interface MenuTreeNode {
    key: string;
    title: string;
    children?: MenuTreeNode[];
    level: number;
    parentId?: string;
    serviceCode: string;
    serviceName: string;
    icon?: string;
    path?: string;
    isActive?: boolean;
    description?: string;
}

export interface AddServiceModalProps {
    open: boolean;
    onCancel: () => void;
    onOk: () => void;
    parentNode?: MenuTreeNode;
    editingNode?: MenuTreeNode;
    mode: 'add' | 'edit';
}
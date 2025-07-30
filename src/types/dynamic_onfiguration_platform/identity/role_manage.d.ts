// 角色管理属性
export interface RoleManageItemProps {
    // 角色编码
    RoleCode:string;
    // 角色名称
    RoleName:string;
    // 所属管理组织
    ManageOrg:string;
    // 系统角色
    SystemRole:string;
    // 状态
    Status:string;
    // 角色类型
    RoleType:string;
    // 角色标签
    RoleTag:string;
    // 角色描述
    RoleDesc:string;
    // 角色组
    RoleGroup:string;
}

export interface DataPermissionItemProps {
    // 序号
    SeqNo:string;
    // 数据权限路径
    DataFullPaths:string;
    // 状态
    Status:string;
}
// 数据权限按角色属性
export interface DataPermissionByRoleItemProps {
    // 角色编码
    RoleCode:string;
    // 角色名称
    RoleName:string;
    // 数据权限
    DataPermission:string;
    // 特殊数据权限规则
    SpecialDataPermission:string;
}
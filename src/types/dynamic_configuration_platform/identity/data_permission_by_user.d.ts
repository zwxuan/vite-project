// 数据权限按用户属性
export interface DataPermissionByUserItemProps {
    // 用户编码
    UserCode:string;
    // 用户名称
    UserName:string;
    // 岗位名称
    PositionName:string;
    // 角色名称
    RoleName:string;
    // 数据权限
    DataPermission:string;
    // 特殊数据权限规则
    SpecialDataPermission:string;
}
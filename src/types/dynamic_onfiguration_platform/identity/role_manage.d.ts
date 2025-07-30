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
    // 所属组织
    Organization:string;
    // 所属部门
    Department:string;
    // 员工类别
    EmployeeCategory:string;
    // 岗位
    Position:string;
    // 上级主管
    Supervisor:string;
    // 任职开始日期
    StartDate:string;
    // 任职结束日期
    EndDate:string;
    // 工作职责
    JobDuty:string;
}
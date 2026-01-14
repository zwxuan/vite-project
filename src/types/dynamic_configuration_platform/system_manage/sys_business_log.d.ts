// 业务日志属性
export interface SysBusinessLogItemProps {
    // 用户编码
    UserCode:string;
    // 用户名称
    UserName:string;
    // 领域
    Domain:string;
    // 应用
    Application:string;
    // 服务
    Service:string;
    // 类型
    LogType:string;
    // 操作分类
    OperationCat:string;
    // 编码
    ObjectCode:string;
    // 名称
    ObjectName:string;
    // IP
    IpAddress:string;
    // 记录时间
    LogTime:string;
    // 状态
    Status:string;
}
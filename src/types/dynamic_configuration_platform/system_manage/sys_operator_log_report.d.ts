// 操作日志统计属性
export interface SysOperatorLogReportItemProps {
    // 部门
    Department:string;
    // 用户名称
    UserName:string;
    // 应用名称
    Application:string;
    // 服务名称
    Service:string;
    // 操作设备
    OperateDevice:string;
    // 访问次数
    VisitCount:number;
}
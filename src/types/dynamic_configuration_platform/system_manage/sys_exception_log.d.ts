// 异常日志属性
export interface SysExceptionLogItemProps {
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
    // 异常级别
    ExceptionLvl:string;
    // 异常信息
    ExceptionMsg:string;
    // 请求地址
    RequestUrl:string;
    // 请求参数
    RequestParam:string;
    // 请求头
    RequestHeader:string;
    // IP
    IpAddress:string;
    // 时间
    ExceptionTime:string;
    // 操作设备
    OperateDevice:string;
    // 状态
    Status:string;
}
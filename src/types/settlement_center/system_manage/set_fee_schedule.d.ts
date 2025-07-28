// 设置费用方案属性
export interface SetFeeScheduleItemProps {
    // 业务类型
    BusinessType:string;
    // 方案名称
    PlanName:string;
    // 委托单位
    Client:string;
    // 承运人
    Carrier:string;
    // 订舱代理
    BookingAgent:string;
    // 货物种类
    CargoType:string;
    // 整拼类型
    LclFclType:string;
    // 航线/区域
    RouteRegion:string;
    // 录入人
    InputPerson:string;
    // 录入日期
    InputDate:string;
    // 生效日期
    EffectiveDate:string;
    // 失效日期
    ExpirationDate:string;
    // 审核状态
    AuditStatus:string;
    // 审核人
    Auditor:string;
    // 审核时间
    AuditTime:string;
    // 方案说明
    PlanDescription:string;
    // 目的港代理
    DestinationAgent:string;
}
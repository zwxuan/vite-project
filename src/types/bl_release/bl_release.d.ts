// 提单放单属性
export interface BlReleaseItemProps {
    // 业务编号
    BusinessId:string;
    // 委托单位
    Consignor:string;
    // 订舱代理
    BookingAgent:string;
    // 船公司
    ShippingCompany:string;
    // 目的港
    PostOfDestination:string;
    // 开航日期
    SailingDate:string;
    // 船名/航次
    VesselVoyage:string;
    // MB/L
    MblNumber:string;
    // 放单审核状态
    ReleaseAuditStatus:string;
    // 提单状态
    BlStatus:string;
    // 审核时间
    AuditTime:string;
    // 销售
    SalesPerson:string;
    // 放单号
    ReleaseNumber:string;
    // 合约是否有效
    ContractValid:string;
    // 是否开票
    Invoiced:string;
    // 是否全部核销
    FullyWrittenOff:string;
    // 是否超期
    Overdue:string;
    // 是否超额
    OverLimit:string;
    // 备注
    Remarks:string;
}
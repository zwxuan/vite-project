// 放单审核属性
export interface ReleaseOrderVerificationItemProps {
    // 业务编号
    BusinessId:string;
    // 委托单位
    Consignor:string;
    // 订舱代理
    BookingAgent:string;
    // 船公司
    ShippingCompany:string;
    // 开航日期
    SailingDate:string;
    // 船名/航次
    VesselVoyage:string;
    // MB/L
    MblNumber:string;
    // MB/L提单方式
    MblType:string;
    // 业务状态
    BusinessStatus:string;
    // 销售
    SalesPerson:string;
    // 提单状态
    BlStatus:string;
    // 放单审核状态
    ReleaseAuditStatus:string;
    // 审核时间
    AuditTime:string;
    // 扣单时间
    HoldTime:string;
    // 扣单原因
    HoldReason:string;
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

// 放单审核费用属性
export interface ReleaseOrderVerificationFeeItemProps {
    // 结算单位(代码)
    SettlementUnitCode:string;
    // 结算单位(简称)
    SettlementUnitName:string;
    // 费用名称
    FeeName:string;
    // 收支类型
    TransactionType:string;
    // 币种
    CurrencyCode:string;
    // 金额
    Amount:number;
    // 国内国外
    DomesticForeign:string;
    // 已销金额
    SettledAmount:number;
    // 未销金额
    UnsettledAmount:number;
    // 可付款
    PayableAmount:number;
    // 关联提单号
    RelatedBlNumber:string;
    // 票据类别
    BillType:string;
    // 销账编号
    SettlementNumber:string;
}
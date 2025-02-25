// 对账单管理属性
export interface StatementOfAccountItemProps {
    // 对账单号
    StatementNumber:string;
    // 结算对象
    SettlementObject:string;
    // 对方对账单号
    CounterpartyStatementNumber:string;
    // 创建人
    Creator:string;
    // 账单类型
    StatementType:string;
    // 发票抬头
    InvoiceTitle:string;
    // 收支类型
    TransactionType:string;
    // 确认状态
    ConfirmationStatus:string;
    // 开票状态
    InvoicingStatus:string;
    // 对账单核销状态
    StatementWriteoffStatus:string;
    // 币种
    Currency:string;
    // 金额
    Amount:number;
    // 已销金额
    WrittenOffAmount:number;
    // 开票信息
    InvoicingInfo:string;
    // 备注
    Remarks:string;
    // 分币种合计
    CurrencyTotal:number;
    // 对账单确认时间
    ConfirmationTime:string;
    // 对账单确认人
    ConfirmationPerson:string;
    // 业务参考号
    BusinessReferenceNumber:string;
    // 承运人
    Carrier:string;
    // 收/发货地
    PickupDeliveryLocation:string;
    // 拖车实际提货时间
    ActualPickupTime:string;
    // 母公司
    ParentCompany:string;
}
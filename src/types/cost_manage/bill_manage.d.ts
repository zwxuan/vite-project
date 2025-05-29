// 账单管理属性
export interface BillManageItemProps {
    // 账单号
    BillNumber:string;
    // 对账单号
    StatementNumber:string;
    // 对方账单号
    CounterpartBillNumber:string;
    // 账单类型
    BillType:string;
    // 收支类型
    PaymentType:string;
    // 账单日期
    BillDate:string;
    // 账单到期日
    DueDate:string;
    // 发票抬头
    InvoiceTitle:string;
    // 开票要求
    InvoiceRequirements:string;
    // 结算对象
    SettlementParty:string;
    // 揽货类型
    CargoType:string;
    // ETD
    Etd:string;
    // ETA
    Eta:string;
    // 账单确认时间
    BillConfirmationTime:string;
    // 业务编号
    BusinessNumber:string;
    // 主单号
    MasterBillNumber:string;
    // 船名航次
    VesselVoyage:string;
    // 起运港
    PortOfLoading:string;
    // 目的港
    PortOfDischarge:string;
    // 创建人
    CreatedBy:string;
    // 账单状态
    BillStatus:string;
    // 开票状态
    InvoiceStatus:string;
    // 核销状态
    WriteOffStatus:string;
    // 币种
    Currency:string;
    // 金额
    Amount:number;
    // 账龄（天）
    AgingDays:number;
    // 核销金额
    WriteOffAmount:number;
    // 分币种合计
    CurrencyTotal:string;
    // 备注
    Remarks:string;
    // 订舱编号
    BookingNumber:string;
    // 标记时间
    MarkTime:string;
    // 标记人
    MarkedBy:string;
    // 标记状态
    MarkStatus:string;
    // 未核销金额
    UnwriteOffAmount:number;
    // 操作
    Operation:string;
    // 账单确认人
    BillConfirmedBy:string;
    // 是否作废
    IsVoid:string;
    // 是否确认
    IsConfirmed:string;
    // 业务参考号
    BusinessReferenceNumber:string;
    // 账单复核人
    BillReviewedBy:string;
    // 账单复核时间
    BillReviewTime:string;
    // 承运人
    Carrier:string;
    // 收/发货地
    ShippingLocation:string;
    // 拖车实际提货时间
    TrailerPickupTime:string;
    // 操作日期
    OperationDate:string;
    // 项目编号
    ProjectNumber:string;
    // 送货完成时间
    DeliveryCompletionTime:string;
    // 账单结算类型
    BillSettlementType:string;
    // 母公司
    ParentCompany:string;
    // 业务日期
    BusinessDate:string;
}
// order_bill属性
export interface OrderBillItemProps {
    // 账单号
    BillNumber:string;
    // 结算对象
    SettlementObject:string;
    // 结算代理
    SettlementAgent:string;
    // 开票抬头
    InvoiceTitle:string;
    // 币种
    Currency:string;
    // 金额
    Amount:number;
    // 分币种合计
    CurrencyTotal:string;
    // 收支类型
    IncomeExpenseType:string;
    // 状态
    Status:string;
    // 开票状态
    InvoiceStatus:string;
    // 核销状态
    VerificationStatus:string;
    // 对账单号
    ReconciliationNumber:string;
    // 对方账单号
    CounterpartBillNumber:string;
    // 发票类型
    InvoiceType:string;
    // 发票种类
    InvoiceCategory:string;
    // 创建人
    Creator:string;
    // 账单确认时间
    BillConfirmationTime:string;
    // 账单到期日
    BillDueDate:string;
    // 账单确认人
    BillConfirmer:string;
    // 是否确认
    IsConfirmed:string;
    // 账单复核状态
    BillReviewStatus:string;
    // 账单复核人
    BillReviewer:string;
    // 账单复核时间
    BillReviewTime:string;
    // 账单结算类型
    BillSettlementType:string;
    // 审批状态
    ApprovalStatus:string;
    // 是否作废
    IsVoid:string;
}

// export interface ExpandedDataType {
//     key: React.Key;
//     date: string;
//     name: string;
//     upgradeNum: string;
//   }
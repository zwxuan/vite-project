// 实收实付属性
export interface ActualPaymentItemProps {
    // 销账流水号
    SalesAccountNumber:string;
    // 结算对象
    SettlementObject:string;
    // 业务编号
    BusinessNumber:string;
    // 结算代理
    SettlementAgent:string;
    // 对方单位
    Counterparty:string;
    // 我方银行
    OurBank:string;
    // 付款通知号
    PaymentNotificationNumber:string;
    // 凭证号
    VoucherNumber:string;
    // 银行水单号
    BankStatementNumber:string;
    // 销账人
    SalesAccountPerson:string;
    // 销账日期
    SalesAccountDate:string;
    // 收付日期
    ReceiptPaymentDate:string;
    // 支付类型
    PaymentType:string;
    // 水单状态
    StatementStatus:string;
    // 收付方式
    ReceiptPaymentMethod:string;
    // 是否预付
    IsAdvancePayment:number;
    // 币种
    Currency:string;
    // 金额
    Amount:number;
    // 已销金额
    SoldAmount:number;
    // 余额
    Balance:number;
    // 实收金额
    ActualReceivedAmount:number;
    // 实付金额
    ActualPaidAmount:number;
    // 财务费用
    FinancialExpenses:string;
    // 汇兑损益
    ExchangeGainLoss:string;
    // 零头短账
    MinorShortAccount:string;
    // 原币汇差
    OriginalCurrencyExchangeDifference:string;
    // 创建人
    Creator:string;
    // 复核
    Review:number;
    // 复核日期
    ReviewDate:string;
    // 作废
    Voided:number;
    // 开票信息
    InvoiceInformation:string;
    // 备注
    Remarks:string;
    // 账期（天）
    AccountPeriodDays:string;
    // 凭证日期
    VoucherDate:string;
    // 复核人
    Reviewer:string;
    // 账单结算类型
    BillSettlementType:string;
    // 预收付备注
    AdvancePaymentRemarks:string;
    // 收付款凭证号
    ReceiptPaymentVoucherNumber:string;
}
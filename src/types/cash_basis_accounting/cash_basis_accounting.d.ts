// 实收实付属性
export interface CashBasisAccountingItemProps {
    // 我方银行
    OurBank:string;
    // 我方账号
    OurAccountNumber:string;
    // 币种
    Currency:string;
    // 收款方式
    PaymentMethod:string;
    // 水单状态
    ReceiptStatus:string;
    // 结算对象
    SettlementObject:string;
    // 对方单位
    CounterpartyUnit:string;
    // 对方银行
    CounterpartyBank:string;
    // 对方账号
    CounterpartyAccountNumber:string;
    // 凭证号
    VoucherNumber:string;
    // 银行水单号
    BankReceiptNumber:string;
}
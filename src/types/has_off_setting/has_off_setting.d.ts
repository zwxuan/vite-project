// 已核销属性
export interface HasOffSettingItemProps {
    // 销账流水号
    Writeoffserialnumber:string;
    // 结算对象
    Settlementobject:string;
    // 业务编号
    Businessnumber:string;
    // 结算代理
    Settlementagent:string;
    // 对方单位
    Counterparty:string;
    // 我方银行
    Ourbank:string;
    // 付款通知号
    Paymentnoticenumber:string;
    // 凭证号
    Vouchernumber:string;
    // 银行水单号
    Bankslipnumber:string;
    // 销账人
    Writeoffperson:string;
    // 销账日期
    Writeoffdate:string;
    // 收付日期
    Receiptpaymentdate:string;
    // 支付类型
    Paymenttype:string;
    // 水单状态
    Slipstatus:string;
    // 收付方式
    Receiptpaymentmethod:string;
    // 是否预付
    Isprepaid:string;
    // 币种
    Currency:string;
    // 金额
    Amount:number;
    // 已销金额
    Writtenoffamount:number;
    // 余额
    Balance:number;
    // 实收金额
    Actualreceivedamount:number;
    // 实付金额
    Actualpaidamount:number;
    // 财务费用
    Financialcharges:number;
    // 汇兑损益
    Exchangegainloss:number;
    // 零头短账
    Shortchange:number;
    // 原币汇差
    Originalcurrencydifference:number;
    // 创建人
    Creator:string;
    // 复核
    Reviewer:string;
    // 复核日期
    Reviewdate:string;
    // 作废
    Iscancelled:string;
    // 开票信息
    Invoiceinformation:string;
    // 备注
    Remarks:string;
    // 账期（天）
    Accountperiod:number;
    // 凭证日期
    Voucherdate:string;
    // 复核人
    Reviewername:string;
    // 账单结算类型
    Billsettlementtype:string;
    // 预收付备注
    Prereceiptpaymentremarks:string;
    // 收付款凭证号
    Receiptpaymentvouchernumber:string;
}

// 核销业务明细属性
export interface OffSettingDetailItemProps {
    // 业务编号
    BusinessNumber:string;
    // 主单号
    MasterOrderNumber:string;
    // 分单号
    SubOrderNumber:string;
    // 委托单位
    EntrustingUnit:string;
    // 结算对象
    SettlementObject:string;
    // 航名/航次
    Voyage:string;
    // 箱型/箱量
    ContainerType:string;
    // 业务日期
    BusinessDate:string;
    // 费用名称
    FeeName:string;
    // 收付类型
    PaymentType:string;
    // 核销币种
    WriteoffCurrency:string;
    // 核销金额
    WriteoffAmount:number;
    // 核销汇率
    WriteoffExchangeRate:number;
    // 费用原币种
    OriginalCurrency:string;
    // 费用原金额
    OriginalAmount:number;
    // 费用原汇率
    OriginalExchangeRate:number;
    // 折算金额
    ConvertedAmount:number;
    // 费用原总金额
    OriginalTotalAmount:number;
    // 发票号码
    InvoiceNumber:string;
    // 销售
    Sales:string;
    // 操作
    Operator:string;
    // 客服
    CustomerService:string;
    // 我方银行
    OurBank:string;
    // 开票日期
    InvoiceDate:string;
    // 销账人
    WriteoffPerson:string;
    // 销账日期
    WriteoffDate:string;
    // 收付日期
    PaymentDate:string;
    // 复核人
    ReviewPerson:string;
    // 复核日期
    ReviewDate:string;
    // 费用备注
    FeeRemark:string;
}
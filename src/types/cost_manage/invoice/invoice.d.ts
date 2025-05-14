// 发票管理属性
export interface InvoiceItemProps {
    // 发票号码
    InvoiceNumber:string;
    // 开票抬头
    BillingTitle:string;
    // 业务编号
    BusinessNumber:string;
    // MBL（主提单号）
    Mbl:string;
    // 结算单位
    SettlementUnit:string;
    // 发票创建人
    InvoiceCreator:string;
    // 发票创建时间
    InvoiceCreateTime:string;
    // 复核状态
    ReviewStatus:string;
    // 复核人
    Reviewer:string;
    // 复核日期
    ReviewDate:string;
    // 发票种类
    InvoiceType:string;
    // 收付期限
    PaymentTerm:string;
    // 客户下载次数
    CustomerDownloadCount:number;
    // 开票日期
    BillingDate:string;
    // 付款通知号
    PaymentNoticeNumber:string;
    // ETD（预计装船日期）
    Etd:string;
    // ETA（预计到货日期）
    Eta:string;
    // 目的港
    DestinationPort:string;
    // 核销状态
    WriteOffStatus:string;
    // 红冲状态
    RedCreditStatus:string;
    // 是否打印
    IsPrinted:string;
    // 是否作废
    IsVoided:string;
    // 船名航次
    VesselVoyage:string;
    // 起运港
    PortOfDeparture:string;
    // 是否导出
    IsExported:string;
    // 发票类型
    InvoiceCategory:string;
    // 开票方式
    BillingMethod:string;
    // 收付类型
    PaymentType:string;
    // 开票币种
    BillingCurrency:string;
    // 发票汇率
    InvoiceExchangeRate:number;
    // 金额
    Amount:number;
    // 核销金额
    WriteOffAmount:number;
    // 税率
    TaxRate:number;
    // 税额
    TaxAmount:number;
    // 不含税额
    TaxExcludedAmount:number;
    // 开票申请人
    BillingApplicant:string;
    // 分币种合计
    CurrencyTotal:number;
    // 操作
    Operation:string;
    // 销售
    Sales:string;
    // 销货单位
    SalesUnit:string;
    // 收货地
    DeliveryLocation:string;
    // 我方银行
    OurBank:string;
    // 我方银行币种
    OurBankCurrency:string;
    // 电子发票发送电票平台状态
    EInvoiceSendStatus:string;
    // 电子发票发送邮箱状态
    EInvoiceEmailStatus:string;
    // 特定约束类型
    SpecificConstraintType:string;
    // 红冲原因
    RedCreditReason:string;
    // 请求税控平台说明
    TaxControlRequest:string;
    // 账单结算类型
    BillingSettlementType:string;
    // 发票ID
    InvoiceId:string;
    // 销账流水号
    WriteOffSerialNumber:string;
    // 收付日期
    PaymentDate:string;
    // 分币种汇率1
    CurrencyRate1:string;
    // 分币种汇率2
    CurrencyRate2:string;
}
// order_fee属性
export interface OrderFeeItemProps {
    // 结算公司
    SettlementCompany:string;
    // 费用名称
    FeeName:string;
    // 结算类型
    SettlementType:string;
    // 结算对象
    SettlementObject:string;
    // 开票抬头
    InvoiceTitle:string;
    // 国内国外
    DomesticForeign:string;
    // 是否需要开票
    NeedInvoice:string;
    // 币种
    Currency:string;
    // 汇率
    ExchangeRate:number;
    // 单位
    Unit:string;
    // 数量
    Quantity:number;
    // 单价
    UnitPrice:number;
    // 含税价
    TaxIncludedPrice:number;
    // 不含税价
    TaxExcludedPrice:number;
    // 税率
    TaxRate:number;
    // 税额
    TaxAmount:number;
    // 折合RMB
    RmbEquivalent:number;
    // 本位币币种
    LocalCurrency:string;
    // 审核人
    Reviewer:string;
    // 备注
    Remarks:string;
    // 联系人
    ContactPerson:string;
    // 关联提单号
    AssociatedBillNumber:string;
    // 关联箱号
    AssociatedContainerNumber:string;
    // 预付到付
    PrepaidCollect:string;
    // 状态
    Status:string;
    // 是否确认
    IsConfirmed:string;
    // 代理分成账单号
    AgentSplitBillNumber:string;
    // 账单号
    BillNumber:string;
    // 计提日期
    AccrualDate:string;
    // 发票号
    InvoiceNumber:string;
    // 开票日期
    InvoiceDate:string;
    // 对方账单号
    CounterpartBillNumber:string;
    // 付款申请号
    PaymentApplicationNumber:string;
    // 核销金额
    WriteOffAmount:number;
    // 未销金额
    UnadjustedAmount:number;
    // 核销日期
    WriteOffDate:string;
    // 收付日期
    PaymentDate:string;
    // 财务日期
    FinancialDate:string;
    // 业务编号
    BusinessNumber:string;
    // 创建人
    Creator:string;
    // 创建时间
    CreateTime:string;
    // 更改人
    Modifier:string;
    // 更改时间
    ModifyTime:string;
    // 销账流水号
    WriteOffSerialNumber:string;
    // 是否已生成凭证
    IsVoucherGenerated:string;
    // 分摊
    Allocation:string;
    // 锁定状态
    LockStatus:string;
    // 锁定时间
    LockTime:string;
    // 数据来源
    DataSource:string;
    // 是否调整费用
    IsAdjustedFee:string;
    // 费用变更人
    FeeModifier:string;
    // 结算代理
    SettlementAgent:string;
    // 费用同步状态
    FeeSyncStatus:string;
    // 更改费用申请进度
    ModifyFeeApplicationProgress:string;
    // 分摊关联业务
    AllocationRelatedBusiness:string;
    // 分摊类型
    AllocationType:string;
    // 关联费用ID
    RelatedFeeId:string;
    // 费用ID
    FeeId:string;
    // 收支类型
    CreditDebit:string;
};
export interface FeeNameItemProps {
    FeeName:string;
    FeeId:string;
    FeeDisplayName:string;
};
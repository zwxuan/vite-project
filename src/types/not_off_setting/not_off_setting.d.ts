// 未核销属性
export interface NotOffSettingItemProps {
    // 业务编号
    BusinessNumber:string;
    // 结算单位
    SettlementUnit:string;
    // 国内国外
    DomesticOrForeign:string;
    // 
    MasterOrderNumber:string;
    // 分单号
    SubOrderNumber:string;
    // 开票抬头
    InvoiceTitle:string;
    // 发票号码
    InvoiceNumber:string;
    // 账单号
    BillNumber:string;
    // 对账单号
    ReconciliationNumber:string;
    // 客户
    Customer:string;
    // 业务类型
    BusinessType:string;
    // 业务日期
    BusinessDate:string;
    // 船名航次
    VesselAndVoyage:string;
    // 起运港
    PortOfLoading:string;
    // 单价
    UnitPrice:number;
    // 目的港
    PortOfDestination:string;
    // 账单到期日
    BillDueDate:string;
    // 销售
    Sales:string;
    // 已计提
    ProvisionallyAccrued:string;
    // 海外客服
    OverseasCustomerService:string;
    // 现场操作
    OnSiteOperation:string;
    // 操作
    Operation:string;
    // 财务日期
    FinanceDate:string;
    // 支付类型
    PaymentType:string;
    // 费用状态
    FeeStatus:string;
    // 确认状态
    ConfirmationStatus:string;
    // 费用名称
    FeeName:string;
    // 币种
    Currency:string;
    // 自定义业务类型
    CustomBusinessType:string;
    // 数量
    Quantity:number;
    // 含税价
    TaxInclusivePrice:number;
    // 不含税价
    TaxExclusivePrice:number;
    // 税率
    TaxRate:number;
    // 税额
    TaxAmount:number;
    // 联系人
    ContactPerson:string;
    // 核销金额
    WriteOffAmount:number;
    // 未销金额
    UnwriteOffAmount:number;
    // 费用备注
    FeeRemark:string;
    // 自定义岗位1
    CustomPosition1:string;
    // 自定义岗位2
    CustomPosition2:string;
    // ETD
    Etd:string;
    // ETA
    Eta:string;
    // 承运人
    Carrier:string;
    // 收/发货地
    PickupDeliveryLocation:string;
    // 实际提货时间
    ActualPickupTime:string;
    // 提单号
    Sono:string;
    // 业务状态
    BusinessStatus:string;
}
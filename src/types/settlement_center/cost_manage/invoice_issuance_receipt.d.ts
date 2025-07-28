// 开票收票属性
export interface InvoiceIssuanceReceiptItemProps {
    // 业务编号
    BusinessId:string;
    // 结算单位
    SettlementUnit:string;
    // 主单号
    MasterOrderNo:string;
    // 分单号
    SubOrderNo:string;
    // 开票抬头
    InvoiceTitle:string;
    // 对账单号
    ReconciliationNo:string;
    // 客户
    Customer:string;
    // 业务类型
    BusinessType:string;
    // 业务日期
    BusinessDate:string;
    // 驳船开航日期
    BargeSailingDate:string;
    // 船名航次
    VesselVoyage:string;
    // 起运港
    PortOfLoading:string;
    // 目的港
    PortOfDestination:string;
    // 销售
    Sales:string;
    // 已计提
    Accrued:string;
    // 操作
    Operator:string;
    // 财务日期
    FinanceDate:string;
    // 国内国外
    DomesticOrForeign:string;
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
    UnsettledAmount:number;
    // 费用备注
    FeeRemark:string;
    // 合约状态
    ContractStatus:string;
    // 自定义岗位1
    CustomPosition1:string;
    // 自定义岗位2
    CustomPosition2:string;
    // 预计开船时间
    Etd:string;
    // 预计到港时间
    Eta:string;
    // 承运人
    Carrier:string;
    // 收/发货地
    PickupDeliveryLocation:string;
    // 拖车实际提货时间
    TruckPickupTime:string;
    // 业务状态
    BusinessStatus:string;
}
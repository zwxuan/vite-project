// 付款申请费用属性
export interface PaymentApplicationFeeItemProps {
    // 业务编号
    BusinessNumber:string;
    // 进仓编号
    InWarehouseNumber:string;
    // 订舱编号
    BookingNumber:string;
    // 截单日期
    CutOffDate:string;
    // 项目编号
    ProjectNumber:string;
    // 订舱单号
    Sono:string;
    // 箱号
    ContainerNumber:string;
    // 海外客服
    OverseasCustomerService:string;
    // 付款申请单号
    PaymentApplicationNumber:string;
    // 账单号
    BillNumber:string;
    // 结算对象
    SettlementObject:string;
    // 揽货类型
    ConsignmentType:string;
    // 主单号
    MasterWaybillNumber:string;
    // 分单号
    SubWaybillNumber:string;
    // 委托单位
    Consignor:string;
    // 业务类型
    BusinessType:string;
    // 业务日期
    BusinessDate:string;
    // 船名航次
    VesselVoyage:string;
    // 起运港
    PortOfLoading:string;
    // 目的港
    PortOfDestination:string;
    // 始发站
    PlaceOfDeparture:string;
    // 目的站
    PlaceOfDestination:string;
    // 过境站
    TransitPort:string;
    // 目的港代理
    DestinationAgent:string;
    // 销售
    Sales:string;
    // 操作
    Operation:string;
    // 客服
    CustomerService:string;
    // 单证
    Document:string;
    // 业务参考号
    BusinessReferenceNumber:string;
    // 国内/国外
    DomesticOrForeign:string;
    // 收支类型
    RevenueOrExpenditureType:string;
    // 费用状态
    FeeStatus:string;
    // 审核人
    Reviewer:string;
    // 确认状态
    ConfirmationStatus:string;
    // 费用名称
    FeeName:string;
    // 单位
    Unit:string;
    // 币种
    Currency:string;
    // 数量
    Quantity:number;
    // 单价
    UnitPrice:number;
    // 含税价
    TaxInclusivePrice:number;
    // 不含税价
    TaxExclusivePrice:number;
    // 税额
    TaxAmount:number;
    // 税率
    TaxRate:number;
    // 业务状态
    BusinessStatus:string;
}
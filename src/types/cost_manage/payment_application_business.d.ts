// 付款申请业务属性
export interface PaymentApplicationBusinessItemProps {
    // 业务编号
    BusinessNumber:string;
    // 主单号
    MasterOrderNumber:string;
    // 委托单位
    Consignor:string;
    // 结算对象
    SettlementObject:string;
    // 承运人
    Carrier:string;
    // SONO
    Sono:string;
    // 海外客服
    OverseasCustomerService:string;
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
    // 操作
    Operation:string;
    // 销售
    Sales:string;
    // 已计提
    AccruedAmount:number;
    // 币种
    Currency:string;
    // 含税价
    TaxInclusivePrice:number;
}
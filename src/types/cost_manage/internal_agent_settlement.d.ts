// 内部代理结算属性
export interface InternalAgentSettlementItemProps {
    // 主键
    Id:string;
    // 结算单号
    SettlementNumber:string;
    // 订单号
    OrderNumber:string;
    // 服务单号
    ServiceNumber:string;
    // 费用编号
    CostId:string;
    // 费用名称
    CostName:string;
    // 币制
    Currency:string;
    // 国内付香港
    DomesticToHk:number;
    // 香港收国内
    HkReceiveDomestic:number;
    // 香港代理支付
    HkAgentPayment:number;
    // 状态
    Status:string;
}
// 费用审核属性
export interface ExpenseReviewItemProps {
    // 业务编号
    BusinessNumber:string;
    // 整拼类型
    ContainerType:string;
    // 业务类型
    BusinessType:string;
    // 主单号
    MasterNumber:string;
    // 分单号
    SplitNumber:string;
    // 客户
    CustomerName:string;
    // 货物类型
    CargoType:string;
    // 客户级别
    CustomerLevel:string;
    // 合约状态
    ContractStatus:string;
    // 承运人
    CarrierName:string;
    // 船名
    VesselName:string;
    // 航次/航班
    VoyageFlight:string;
    // 装货港/起运港
    LoadingPort:string;
    // 目的港
    DestinationPort:string;
    // 交货地
    DeliveryPlace:string;
    // 卸货港
    DischargingPort:string;
    // ETD
    Etd:string;
    // ETA
    Eta:string;
    // 业务日期
    BusinessDate:string;
    // 订舱代理
    BookingAgent:string;
    // 创建日期
    CreationDate:string;
    // 凭证字
    VoucherWord:string;
    // 凭证号
    VoucherNumber:string;
    // 业务参考号
    BusinessRefNumber:string;
    // 项目编号
    ProjectNumber:string;
    // 操作
    OperationStaff:string;
    // 销售
    SalesStaff:string;
    // 客服
    CustomerServiceStaff:string;
    // 单证
    DocumentStaff:string;
    // 揽货类型
    SolicitationType:string;
    // 状态
    Status:string;
    // 实际计费重量
    ActualChargeableWeight:number;
    // 利润
    Profit:number;
    // 总收入
    TotalRevenue:number;
    // 总成本
    TotalCost:number;
    // 应付核销状态
    PayableReconciliationStatus:string;
    // 应收核销状态
    ReceivableReconciliationStatus:string;
    // 业务创建人
    BusinessCreator:string;
    // 箱量描述
    ContainerDescription:string;
    // 指定货代理
    AppointedAgent:string;
    // 主单运费条款
    MasterFreightTerms:string;
    // 分单运费条款
    SplitFreightTerms:string;
    // 贸易条款
    TradeTerms:string;
    // 操作模式
    OperationMode:string;
    // 自定义字段1
    CustomField1:string;
    // 自定义字段2
    CustomField2:string;
    // 自定义字段3
    CustomField3:string;
    // 利润审核状态
    ProfitReviewStatus:string;
    // 航线
    RouteName:string;
    // 航线负责人
    RouteManager:string;
    // 目的港代理
    DestinationAgent:string;
    // 自定义岗位1
    CustomPosition1:string;
    // 自定义岗位2
    CustomPosition2:string;
    // 收/发货地
    PickupDeliveryLocation:string;
    // 拖车实际提货时间
    TruckPickupTime:string;
    // 订舱编号
    BookingNumber:string;
    // SOP状态
    SopStatus:string;
    // 取消审核原因
    CancellationReviewReason:string;
    // 应收费用锁定时间
    ChargeLockTime:string;
    // 应付费用锁定时间
    PayableLockTime:string;
}
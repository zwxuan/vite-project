// 订单管理表，存储与业务相关的订单信息属性
export interface OrdersItemProps {
    // 业务编号
    BusinessId:string;
    // 主单号
    MainOrderNumber:string;
    // 承运人名称
    Carrier:string;
    // 船名
    ShipName:string;
    // 航次
    Voyage:string;
    // 客户名称
    Customer:string;
    // 业务日期
    BusinessDate:string;
    // 合约状态
    ContractStatus:string;
    // 起运港
    DeparturePort:string;
    // 目的港
    DestinationPort:string;
    // 开航日期
    DepartureDate:string;
    // 客服名称
    CustomerService:string;
    // 空运制单计费重量
    AirWaybillChargedWeight:number;
    // 空运订舱计费重量
    AirBookingChargedWeight:number;
    // 订/换单窗口
    BookingAgent:string;
    // 项目编号
    ProjectId:string;
    // 操作
    Operation:string;
    // 销售人员
    Sales:string;
    // 销售部门
    SalesDepartment:string;
    // 海外客服
    OverseasService:string;
    // 状态
    Status:string;
    // 业务类型
    BusinessType:string;
    // 实际计费重量
    ActualChargedWeight:number;
    // 委托件数
    EntrustedPieces:number;
    // 箱号
    ContainerNumber:string;
    // 委托毛重
    EntrustedGrossWeight:number;
    // 委托体积
    EntrustedVolume:number;
    // 实际件数
    ActualPieces:number;
    // 实际毛重
    ActualGrossWeight:number;
    // 实际体积
    ActualVolume:number;
    // 应付核销状态
    PayableVerificationStatus:string;
    // 应收核销状态
    ReceivableVerificationStatus:string;
    // 买价
    PurchasePrice:number;
    // 卖价
    SellingPrice:number;
    // 到港日期
    ArrivalDate:string;
    // 指定货代理
    DesignatedFreightAgent:string;
    // 最终目的地
    FinalDestination:string;
    // 本地服务
    LocalService:string;
    // 创建日期，默认当前日期时间
    CreationDate:string;
    // 自定义业务类型
    CustomBusinessType:string;
    // 业务参考号
    BusinessReferenceNumber:string;
    // 送货日期
    DeliveryDate:string;
    // 船公司约号
    ShippingCompanyContractNumber:string;
    // 内部约号
    InternalContractNumber:string;
    // 报价单号
    QuotationNumber:string;
    // 航线
    ShippingRoute:string;
    // TEU（标准箱数）
    Teu:number;
    // 箱型箱量
    ContainerTypeQuantity:string;
    // 揽货销售
    CollectionSales:string;
    // 操作日期
    OperationDate:string;
    // 实际开航日期
    ActualDepartureDateAtd:string;
    // 实际到港日期
    ActualArrivalDateAta:string;
    // 收货人
    Consignee:string;
    // 发货人
    Shipper:string;
    // 应收开票状态
    ReceivableInvoiceStatus:string;
    // 应付开票状态
    PayableInvoiceStatus:string;
    // 客户联系人
    CustomerContact:string;
    // SOP状态
    SopStatus:string;
    // SOP模板名称
    SopTemplateName:string;
    // 货物类型
    CargoType:string;
    // 实际提重时间
    ActualPickupTime:string;
    // 实际还空时间
    ActualReturnEmptyTime:string;
    // 分单号
    SubOrderNumber:string;
    // 客户级别
    CustomerLevel:string;
    // 实际送货时间
    ActualDeliveryTime:string;
    // 客服部门
    CustomerServiceDepartment:string;
    // 单证部门
    DocumentationDepartment:string;
    // 应收费用是否录入
    ReceivableFeesEntered:string;
    // 应付费用是否录入
    PayableFeesEntered:string;
    // 支线开航日期
    BranchDepartureDate:string;
    // 支线到港日期
    BranchArrivalDate:string;
    // 驳车发运日期
    BargeDepartureDate:string;
    // 驳车抵运日期
    BargeArrivalDate:string;
    // 唛头
    Mark:string;
    // 进场时间
    EntryTime:string;
    // 揽货类型
    CollectionType:string;
    // 利润
    Profit:number;
    // 收入
    Income:number;
    // 支出
    Expenditure:number;
}
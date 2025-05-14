// 费用对账属性
export interface FeeReconciliationItemProps {
    // 船公司约号
    ShippingCompany:string;
    // 约价性质
    PricingNature:string;
    // 实际进港日期
    ActualPortEntryDate:string;
    // 业务模式
    BusinessModel:string;
    // 业务编号
    BusinessNumber:string;
    // 进仓编号
    WarehouseEntryNumber:string;
    // 订舱编号
    BookingNumber:string;
    // 截单日期
    CutoffDate:string;
    // 项目编号
    ProjectNumber:string;
    // SONO
    Sono:string;
    // 箱号
    ContainerNumber:string;
    // 海外客服
    OverseasCustomerService:string;
    // 现场操作
    SiteOperation:string;
    // 付款申请单号
    PaymentApplicationNumber:string;
    // 预计到港时间
    Eta:string;
    // 预计开船时间
    Etd:string;
    // 实际开船时间
    Atd:string;
    // 实际到港时间
    Ata:string;
    // 汇率
    ExchangeRate:number;
    // 账单号
    BillNumber:string;
    // 结算对象
    SettlementObject:string;
    // 揽货类型
    CargoType:string;
    // 主单号
    MasterWaybillNumber:string;
    // 分单号
    HouseWaybillNumber:string;
    // 委托单位
    Consignor:string;
    // 业务类型
    BusinessType:string;
    // 业务日期
    BusinessDate:string;
    // 是否FBA
    IsFba:string;
    // 亚马逊仓库编码
    AmazonWarehouseCode:string;
    // 目的地配送方式
    DestinationDeliveryMethod:string;
    // 快递单号
    CourierNumber:string;
    // 是否偏远仓
    IsRemoteWarehouse:string;
    // 船名航次
    ShipNameAndVoyage:string;
    // 起运港
    PortOfLoading:string;
    // 目的港
    PortOfDestination:string;
    // 订舱代理
    BookingAgent:string;
    // 始发站
    OriginStation:string;
    // 目的站
    DestinationStation:string;
    // 过境站
    TransitStation:string;
    // 目的港代理
    DestinationAgent:string;
    // 销售
    SalesPerson:string;
    // 操作
    OperationPerson:string;
    // 客服
    CustomerServicePerson:string;
    // 单证
    DocumentPerson:string;
    // 业务参考号
    BusinessReferenceNumber:string;
    // 已计提
    AccrualAmount:number;
    // 财务日期
    FinancialDate:string;
    // 国内/国外
    DomesticOrForeign:string;
    // 收支类型
    RevenueOrExpenditureType:string;
    // 费用状态
    FeeStatus:string;
    // 审核人
    Auditor:string;
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
    // 核销金额
    WriteOffAmount:number;
    // 未销金额
    UnwrittenAmount:number;
    // 联系人
    ContactPerson:string;
    // 创建人
    Creator:string;
    // 备注
    Remark:string;
    // 往来关联号
    RelatedNumber:string;
    // 委托关联号
    ConsignmentRelatedNumber:string;
    // 承运人
    Carrier:string;
    // 确认日期
    ConfirmationDate:string;
    // 费用确认人
    FeeConfirmationPerson:string;
    // 航线负责人
    RouteManager:string;
    // 开票日期
    InvoiceDate:string;
    // 发票号码
    InvoiceNumber:string;
    // 开票抬头
    InvoiceTitle:string;
    // 是否需要开票
    IsInvoiceRequired:string;
    // 销账日期
    WriteOffDate:string;
    // 业务状态
    BusinessStatus:string;
    // 驳船开航日期
    BargeSailingDate:string;
    // 驳船船名
    BargeName:string;
    // 驳船航次
    BargeVoyage:string;
    // 驳船起运港(POL)
    BargePortOfLoading:string;
    // 收付日期
    PaymentDate:string;
    // 销售部门
    SalesDepartment:string;
    // 送货时间
    DeliveryTime:string;
    // 确认备注
    ConfirmationRemark:string;
    // 费用核销状态
    FeeWriteOffStatus:string;
    // 操作日期
    OperationDate:string;
    // 预计装箱日期
    EstimatedLoadingDate:string;
    // 实际还空时间
    ActualReturnEmptyTime:string;
    // 箱量描述
    ContainerQuantityDescription:string;
    // 费用创建日期
    FeeCreationDate:string;
    // 客户级别
    CustomerLevel:string;
    // 送货完成时间
    DeliveryCompletionTime:string;
    // 费用变更人
    FeeChanger:string;
    // 结算代理
    SettlementAgent:string;
    // 是否调整费用
    IsFeeAdjusted:string;
    // 航线
    Route:string;
    // 费用修改时间
    FeeModificationTime:string;
    // 费用修改人
    FeeModifier:string;
    // 账单日期
    BillDate:string;
    // 账单到期日
    InvoiceDueDate:string;
    // 对方账单号
    CounterpartyInvoiceNumber:string;
    // 应收核销状态
    ReceivableWriteOffStatus:string;
    // 指定货代理
    DesignatedForwarder:string;
    // 实际装箱日期
    ActualLoadingDate:string;
    // 对方对账单号
    CounterpartyCounterNumber:string;
    // 费用到期日
    FeeDueDate:string;
    // 关联费用ID
    RelatedFeeId:string;
    // 费用ID
    FeeId:string;
    // 数据来源
    DataSource:string;
    // 费用箱号
    FeeContainerNumber:string;
    // 收/发货地
    PickupDeliveryLocation:string;
    // 拖车实际提货时间
    ActualPickupTime:string;
    // 销账银行
    WriteOffBank:string;
    // 母公司
    ParentCompany:string;
    // 结算部门
    SettlementDepartment:string;
    // 揽货销售
    CargoSales:string;
    // 销售分公司
    SalesBranch:string;
    // 操作分公司
    OperationBranch:string;
    // 费用同步状态
    FeeSyncStatus:string;
    // 换单代理
    ExchangeAgent:string;
    // 对账金额
    ReconciliationAmount:number;
    // 差额
    Difference:string;
    // 是否确认
    IsConfirmed:string;
    // 结算对象账期
    SettlementObjectTerm:string;
    // 结算方式
    SettlementMethod:string;
    // 审核日期
    AuditDate:string;
    // GP说明
    GpDescription:string;
    // 计费重量(实)
    ChargeableWeightActual:number;
    // 计费重量(委)
    ChargeableWeightCommission:number;
    // 件数(实)
    NumberOfPiecesActual:number;
    // 件数(委)
    NumberOfPiecesCommission:number;
    // 体积(实)
    VolumeActual:number;
    // 体积(委)
    VolumeCommission:number;
    // 毛重(委)
    GrossWeightCommission:number;
    // 毛重(实)
    GrossWeightActual:number;
}
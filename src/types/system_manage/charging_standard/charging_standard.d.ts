// 计费标准属性
export interface ChargingStandardItemProps {
    // 
    Id:string;
    // 收付
    PaymentMethod:string;
    // 费用名称
    FeeName:string;
    // 是否受控
    IsControlled:string;
    // 结算单位类型
    SettlementUnitType:string;
    // 固定结算单位
    FixedSettlementUnit:string;
    // 币种
    Currency:string;
    // 所在城市
    City:string;
    // 计费单位
    BillingUnit:string;
    // 数值下限（含）
    ValueLowerLimit:number;
    // 数值上限（不含）
    ValueUpperLimit:number;
    // 箱型
    ContainerType:string;
    // 箱种
    ContainerCategory:string;
    // 数量
    Quantity:number;
    // 计费单元
    BillingUnitPrice:string;
    // 单价
    UnitPrice:number;
    // 最低收费
    MinimumCharge:number;
    // 税率
    TaxRate:number;
    // 备注
    Remarks:string;
    // 是否需要开票
    RequiresInvoice:string;
}
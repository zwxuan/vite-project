// 结算方式对照属性
export interface BaseSettlementMethodMapperItemProps {
    // 所属组织名称
    OrgName:string;
    // 结算方式
    SettlementMode:string;
    // 币种
    CurrencyCode:string;
    // 银行类别
    BankType:string;
    // 银行网点
    BankBranch:string;
    // 银行账号
    BankAccount:string;
    // 现金账号
    CashAccount:string;
    // 是否默认
    IsDefault:string;
    // 备注
    Remark:string;
    // 创建人
    CreatedBy:string;
    // 创建时间
    CreatedTime:string;
    // 修改人
    UpdatedBy:string;
    // 修改时间
    UpdatedTime:string;
}
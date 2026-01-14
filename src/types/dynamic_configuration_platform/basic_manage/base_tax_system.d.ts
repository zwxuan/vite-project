// 税制档案属性
export interface BaseTaxSystemItemProps {
    // 税制编码
    TaxSystemCode:string;
    // 税制名称
    TaxSystemName:string;
    // 国家地区
    CountryRegion:string;
    // 税制级别
    TaxLevel:string;
    // 默认纳税币种
    DefaultTaxCurrency:string;
    // 默认精度
    DefaultPrecision:number;
    // 默认舍入规则
    DefaultRoundingRule:string;
    // 默认汇率类型
    DefaultExchangeType:string;
    // 生效日期
    EffectiveDate:string;
    // 失效日期
    ExpiryDate:string;
    // 状态
    Status:string;
}
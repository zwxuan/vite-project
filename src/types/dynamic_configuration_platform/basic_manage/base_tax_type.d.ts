// 税种档案属性
export interface BaseTaxTypeItemProps {
    // 税种编码
    TaxTypeCode:string;
    // 税种名称
    TaxTypeName:string;
    // 税制名称
    TaxSystemName:string;
    // 国家地区
    CountryRegion:string;
    // 纳税期限
    TaxPeriod:string;
    // 纳税币种
    TaxCurrency:string;
    // 精度
    PrecisionVal:number;
    // 舍入规则
    RoundingRule:string;
    // 汇率类型
    ExchangeType:string;
    // 生效日期
    EffectiveDate:string;
    // 失效日期
    ExpiryDate:string;
    // 创建人
    CreatedBy:string;
    // 创建时间
    CreatedTime:string;
    // 状态
    Status:string;
}
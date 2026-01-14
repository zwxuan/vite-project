// 税率管理属性
export interface BaseTaxRateItemProps {
    // 税率编码
    TaxRateCode:string;
    // 税率描述
    TaxRateDescription:string;
    // 税制
    TaxSystem:string;
    // 税种
    TaxType:string;
    // 国家地区
    CountryRegion:string;
    // 精度
    Precision:string;
    // 舍入规则
    RoundingRule:string;
    // 税率
    TaxRateValue:string;
    // 币种
    Currency:string;
    // 单位
    Unit:string;
    // 状态
    Status:string;
    // 创建日期
    CreationDate:string;
}
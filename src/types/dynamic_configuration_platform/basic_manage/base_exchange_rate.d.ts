// 汇率管理属性
export interface BaseExchangeRateItemProps {
    // 汇率代码
    Rate_Code:string;
    // 目的币种
    PurposeCurrency:string;
    // 汇率类型
    ExchangeRateType:string;
    // 源币种
    SourceCurrency:string;
    // 报价日期
    QuotationDate:string;
    // 直接汇率
    DirectExchangeRate:number;
    // 间接汇率
    IndirectExchangeRate:number;
}
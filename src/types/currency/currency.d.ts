// 菜单项属性
export interface CurrencyItemProps {
    Code: string;
    CurrencyFullName:string;
    CurrencyShortName:string;
    CurrencyMark:string;
    PricePrecision:number;
    PriceRoundingRule:string;
    AmountPrecision:number;
    AmountRoundingRule:string;
    Remark:string;
    //0 启用，1 禁用 2 删除
    Status:number;
}
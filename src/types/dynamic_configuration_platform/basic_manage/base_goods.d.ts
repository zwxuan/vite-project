// 海关商品属性
export interface BaseGoodsItemProps {
    // 商品编码
    GoodsCode:string;
    // 品名
    GoodsName:string;
    // 最惠国税率
    MostFavoredNationRate:number;
    // 普通税率
    OrdinaryRate:number;
    // 增值税
    ValueAddedTax:number;
    // 法定单位
    LegalUnit:string;
    // 英文品名 (MSC)
    EnglishGoodsName:string;
    // 第二单位
    SecondUnit:string;
    // 监管方式
    RegulatoryMode:string;
}
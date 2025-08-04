// 提单条款属性
export interface BaseBillTermsItemProps {
    // 编码
    Code:string;
    // 名称
    Name:string;
    // 本地化名称
    LocalName:string;
    // 交换码
    ExchangeCode:string;
    // ISO 码
    IsoCode:string;
    // 提单类型
    BillType:string;
    // 备注
    Remarks:string;
    // 放货方式
    ReleaseType:string;
}
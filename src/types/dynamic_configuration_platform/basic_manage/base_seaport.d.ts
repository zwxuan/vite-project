// 海运港口属性
export interface BaseSeaportItemProps {
    // 序号
    Id:string;
    // 代码
    Code:string;
    // 中文名
    NameCn:string;
    // 英文名
    NameEn:string;
    // 国家(地区)
    CountryRegion:string;
    // 城市编码
    CityCode:string;
    // 城市名称
    CityName:string;
    // 区域
    Area:string;
    // 基港
    BasePort:string;
    // 交换码
    ExchangeCode:string;
    // ISO代码
    IsoCode:string;
    // 港口要求
    PortRequirements:string;
}
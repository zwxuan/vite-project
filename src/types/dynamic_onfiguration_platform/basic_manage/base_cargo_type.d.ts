// 货物类型属性
export interface BaseCargoTypeItemProps {
    // 编码
    Id:string;
    // 英文名称
    EnglishName:string;
    // 中文名称
    ChineseName:string;
    // 说明
    Description:string;
    // 海运使用
    OceanUse:string;
    // 空运使用
    AirUse:string;
    // FBA海运使用
    FbaOceanUse:string;
    // FBA空运使用
    FbaAirUse:string;
    // FBA铁路使用
    FbaRailUse:string;
}
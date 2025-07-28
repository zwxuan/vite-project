// 舱位承运人属性
export interface SpaceCarrierItemProps {
    // 编号
    Id:string;
    // 承运人
    CarrierName:string;
    // 承运人类型
    CarrierType:string;
    // 订舱方式
    BookingMethod:string;
    // 起运港
    DeparturePort:string;
    // 航线
    Route:string;
    // 目的港
    DestinationPort:string;
    // 国家
    Country:string;
    // 联系人
    ContactPerson:string;
    // 联系电话
    ContactNumber:string;
    // 邮箱
    Email:string;
}
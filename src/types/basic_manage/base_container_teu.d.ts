// 箱型 TEU属性
export interface BaseContainerTeuItemProps {
    // 编码
    ContainerCode:string;
    // 尺寸
    ContainerSize:string;
    // 箱种
    ContainerType:string;
    // 交换码
    ExchangeCode:string;
    // ISO编码
    IsoCode:string;
    // TEU
    TeuValue:number;
    // 更新人
    UpdatedBy:string;
    // 更新时间
    UpdatedTime:string;
    // 创建人
    CreatedBy:string;
    // 创建时间
    CreatedTime:string;
}
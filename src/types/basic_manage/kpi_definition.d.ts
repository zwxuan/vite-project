// 绩效指标定义表属性
export interface KpiDefinitionItemProps {
    RowKey:string;
    // KPI唯一标识符（UUID格式）
    KpiId:string;
    // KPI代码（业务唯一标识，如OTD_DELIVERY）
    KpiCode:string;
    // KPI中文名称（如"准时交货率"）
    KpiName:string;
    // KPI详细描述
    Description:string;
    // 数据类型：数值/百分比/布尔值/文本
    DataType:string;
    // 是否为否决型指标（1=是，触发即终止合作）
    IsCritical:string;
    // 关联的数据源ID
    SourceId:string;
    // 适用伙伴类型列表（JSON数组，如["CO_LOADER","OVERSEAS_AGENT"]）
    PartnerTypes:string;
}
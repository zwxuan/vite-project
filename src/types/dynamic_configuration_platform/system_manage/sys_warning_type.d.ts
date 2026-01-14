// 预警类型属性
export interface SysWarningTypeItemProps {
    // 所属应用
    AppCode:string;
    // 类型编码
    TypeCode:string;
    // 类型名称
    TypeName:string;
    // 类型模式
    TypeSchema:string;
    // 报表中心
    ReportCenter:string;
    // 创建人
    CreatedBy:string;
    // 创建时间
    CreatedTime:string;
}

// 接口模式条件属性
export interface SysWarningTypeParamItemProps {
    // 序号
    SeqNo:string;
    // 参数名称
    ParamName:string;
    // 参数编码
    ParamCode:string;
    // 数据类型
    DataType:string;
    // 取值范围
    ValueRange:string;
    // 默认值
    DefaultValue:string;
    // 是否必填
    Required:string;
    // 参数说明
    ParamDesc:string;
}
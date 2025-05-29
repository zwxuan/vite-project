// excel模板实体
export interface ImportTemplateItem {
    SerialNo: number;
    Version: string;
    TemplateCode: string;
    TemplateName:string;
    TemplateSource:string;
    CreatDate:string;
    LastDate:string;
    Operator:string;
    //0 未发布，1已发布
    Status:number;
    Country:string;
    //0 否，1 是
    IsDefault:number;
}
export interface ImportTemplateFieldItem {
    SerialNo: number;
    FieldCode: string;
    FieldName:string;
    IsSystemRequired :boolean
    IsSetRequired :boolean
    IsInclude :boolean
    ComponentType:string   
}
export interface ImportLogItem {
    SerialNo: number;
    BatchNo: string;
    ServiceName: string;
    TemplateName:string;
    ImportType:string;
    SuccessCount:string;
    ErrorCount:string;
    ImportStartDate:string;
    ImportEndDate:string;
    //0 异常，1成功,2失败
    Status:number;
    Operator:string;
}
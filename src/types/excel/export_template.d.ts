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
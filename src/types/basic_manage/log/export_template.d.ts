export interface ExportLogItem {
    SerialNo: number;
    BatchNo: string;
    ServiceName: string;
    TemplateName:string;
    ExportType:string;
    ExportCount:string;
    ExportStartDate:string;
    ExportEndDate:string;
    //0 异常，1成功,2失败
    Status:number;
    Operator:string;
    ExportFile:string;
}
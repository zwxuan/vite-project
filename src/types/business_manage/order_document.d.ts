// 订单文档属性
export interface OrderDocumentItemProps {
    // 文件名
    FileName:string;
    // 版本
    Version:string;
    // 文件类型
    FileType:string;
    // 文件格式
    FileFormat:string;
    // 文件大小
    FileSize:number;
    // 创建人
    CreatedBy:string;
    // 创建日期
    CreatedDate:string;
    // 文件来源
    FileSource:string;
    // 属性详情
    AttributeDetails:string;
    // 同步状态
    SyncStatus:string;
    // 外部文件类型
    ExternalFileType:string;
    // 最后同步时间
    LastSyncTime:string;
    // 操作
    Operation:string;
}
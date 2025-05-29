// 实体发票属性
export interface PhysicalInvoiceItemProps {
    // 发票流水号
    InvoiceSerialNumber:string;
    // 发票类型
    InvoiceType:string;
    // 购方名称
    PurchaserName:string;
    // 购方税号
    PurchaserTaxNumber:string;
    // 发票代码
    InvoiceCode:string;
    // 发票号码
    InvoiceNumber:string;
    // 发票日期
    InvoiceDate:string;
    // 销方名称
    SellerName:string;
    // 销方税号
    SellerTaxNumber:string;
    // 合计金额
    TotalAmount:number;
    // 文件名称
    FileName:string;
    // 文件路径
    FilePath:string;
    // 下载次数
    DownloadCount:number;
}
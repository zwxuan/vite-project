// 开票要求属性
export interface InvoiceRequirementItemProps {
    // 开票抬头
    CustomerNo:string;
    // 纳税人识别号
    TaxpayerId:string;
    // 发票地址
    InvoiceAddress:string;
    // 电话
    Phone:string;
    // 是否默认
    IsDefault:string;
    // 开户行及账号
    BankAccount:string;
    // 开票抬头银行
    BillingHeadBank:string;
    // 客户邮箱
    CustomerEmail:string;
    // 系统自动推送
    SystemAutoPush:string;
    // 系统自动发送对象
    SystemAutoSendTarget:string;
    // 税控平台发送
    TaxControlPlatformSend:string;
    // 税控平台发送对象
    TaxControlPlatformSendTarget:string;
    // 操作
    Operation:string;
    // 发票类型
    InvoiceType:string;
    // 发票种类
    InvoiceKind:string;
    // 国内国外
    DomesticOrAbroad:string;
    // 适用 WHT 税
    ApplicableWhtTax:string;
    // 开票要求
    BillingRequirements:string;
}
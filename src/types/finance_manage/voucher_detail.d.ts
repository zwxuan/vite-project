// 凭证明细属性
export interface VoucherDetailItemProps {
    // 流水号
    Id:number;
    // 摘要
    Summary:string;
    // 科目编码
    SubjectCode:string;
    // 科目名称
    SubjectName:string;
    // 币种
    Currency:string;
    // 原币金额
    OriginalAmount:number;
    // 汇率
    ExchangeRate:number;
    // 借方本位币
    DebitAmount:number;
    // 贷方本位币
    CreditAmount:number;
    // 单据号
    DocumentNumber:string;
}
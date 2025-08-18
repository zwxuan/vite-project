// 银行网点属性
export interface BaseBankBranchItemProps {
    // 银行网点编码
    BankBranchCode:string;
    // 银行网点名称
    BankBranchName:string;
    // 银行类别
    BankType:string;
    // 联行号
    BankUnionCode:string;
    // 状态
    Status:string;
    // 详细地址
    DetailAddress:string;
    // swift码
    SwiftCode:string;
    // IBAN
    Iban:string;
}
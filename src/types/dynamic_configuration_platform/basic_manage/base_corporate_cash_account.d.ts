// 企业现金账户属性
export interface BaseCorporateCashAccountItemProps {
    // 账户编码
    AccountCode:string;
    // 账户名称
    AccountName:string;
    // 所属组织
    OwningOrg:string;
    // 币种
    CurrencyCode:string;
    // 开户日期
    OpenDate:string;
    // 是否默认
    IsDefault:string;
    // 账户状态
    AccountStatus:string;
    // 备注
    Remark:string;
}
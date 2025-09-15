// 企业资金账户属性
export interface BaseCorporateFundAccountItemProps {
    // 账户编码
    AccountCode:string;
    // 开户类型
    OpenAccountType:string;
    // 结算中心
    SettlementCenter:string;
    // 所属组织
    OwningOrg:string;
    // 开户组织
    OpenAccountOrg:string;
    // 账户名称
    AccountName:string;
    // 银行账号
    BankAccountNo:string;
    // 开户名
    AccountHolderName:string;
    // 开户行
    OpeningBank:string;
    // 电票代理行
    EbillAgentBank:string;
    // 账户用途
    AccountPurpose:string;
    // 账户等级
    AccountLevel:string;
    // 账户性质
    AccountNature:string;
    // 账户类型
    AccountType:string;
    // 开户日期
    OpenDate:string;
    // 纳税登记
    TaxRegister:string;
    // 账户状态
    AccountStatus:string;
    // 备注
    Remark:string;
}
// 账套设置属性
export interface AccountingBookItemProps {
    // 账套ID
    BookId:number;
    // 公司编码
    CompanyCode:string;
    // 公司名称
    CompanyName:string;
    // 账套编码
    BookCode:string;
    // 账套名称
    BookName:string;
    // 会计年度
    FiscalYear:string;
    // 本位币代码
    Currency:string;
    // 对接第三方系统名称
    ThirdSystemName:string;
    // 接口方案
    ApiRemark:string;
    // 是否启用标识，1表示启用，0表示禁用
    IsActive:number;
    // 创建时间
    CreatedAt:string;
    // 更新时间
    UpdatedAt:string;
}
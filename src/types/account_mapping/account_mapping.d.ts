// 科目映射属性
export interface AccountMappingItemProps {
    // 映射关系ID
    MappingId:string;
    // 所属账套
    BookName:string;
    // 分组数据类型
    RuleName:string;
    // 分录数据类型
    EntryName:string;
    // 科目明细名称
    AccountName:string;
    // 科目明细分组条件
    AccountGroupBy:string;
    // 财务科目代码
    FinanceCode:string;
    // 备注
    Remark:string;
}
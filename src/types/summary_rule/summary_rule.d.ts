// 分录摘要规则属性
export interface SummaryRuleItemProps {
    // 摘要规则ID
    SummaryRuleCode:string;
    // 所属账套
    BookName:string;
    // 分组数据类型
    RuleName:string;
    // 分录数据类型
    EntryName:string;
    // 分组条件
    GroupBy:string;
}
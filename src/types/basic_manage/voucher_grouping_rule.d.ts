// 凭证分组规则属性
export interface VoucherGroupingRuleItemProps {
    // 分组规则ID
    RuleCode:string;
    // 所属账套ID
    BookName:string;
    // 规则名称
    RuleName:string;
    // 记账方式
    BookkeepingMethod:string;
    // 分组依据
    GroupBy:string;
}
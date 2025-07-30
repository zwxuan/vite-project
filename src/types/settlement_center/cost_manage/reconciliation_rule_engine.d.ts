// 对账规则引擎
export interface ReconciliationRuleEngineItemProps {
    SeqNo:string;
    // 公司名称
    CompanyName:string;
    // 对账规则名称
    ReconciliationRuleName:string;
}
// 对账规则引擎匹配字段
export interface ReconciliationMatchFieldsItemProps {
    SeqNo:string;
    // 匹配字段名称
    MatchFieldsName:string;
    // 匹配字段关系
    MatchFieldRelation:string;
    // 匹配字段排序
    MatchFieldOrderBy:string;
}
// 对账规则引擎比较字段
export interface ReconciliationCompareFieldsItemProps {
    SeqNo:string;
    // 对比字段名称
    CompareFieldsName:string;
    // 匹配字段关系
    CompareFieldRelation:string;
    // 匹配字段操作
    CompareFieldOperator:string;
    // 匹配字段排序
    CompareFieldOrderBy:string;
}
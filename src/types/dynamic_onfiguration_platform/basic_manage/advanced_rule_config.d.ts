// 高级规则扩展配置表属性
export interface AdvancedRuleConfigItemProps {
    // 关联的规则ID
    RuleId:string;
    // 动态权重计算公式（如基于紧急状态的权重调整）
    DynamicWeightFormula:string;
    // 连坐惩罚规则配置（JSON数组，定义关联处罚逻辑）
    PenaltyRules:string;
    // 自动执行动作规则（JSON数组，如分数<70时自动冻结合作）
    AutoActionRules:string;
}
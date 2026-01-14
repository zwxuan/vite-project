
export const AdvancedRuleConfigLocale = {
    // 关联的规则ID
    getAdvancedRuleConfigRuleId() {
      return "advanced_rule_config.ruleid";
    },
    // 动态权重计算公式（如基于紧急状态的权重调整）
    getAdvancedRuleConfigDynamicWeightFormula() {
      return "advanced_rule_config.dynamicweightformula";
    },
    // 连坐惩罚规则配置（JSON数组，定义关联处罚逻辑）
    getAdvancedRuleConfigPenaltyRules() {
      return "advanced_rule_config.penaltyrules";
    },
    // 自动执行动作规则（JSON数组，如分数<70时自动冻结合作）
    getAdvancedRuleConfigAutoActionRules() {
      return "advanced_rule_config.autoactionrules";
    },

};

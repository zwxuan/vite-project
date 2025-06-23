// 合作伙伴绩效规则主表属性
export interface PartnerPerformanceRuleItemProps {
    RowKey:string;
    // 规则唯一标识符（UUID格式）
    RuleId:string;
    // 规则名称（如"美线同行Q3评估规则"）
    RuleName:string;
    // 合作伙伴类型：供应商/客户/同行/海外代理
    PartnerType:string;
    // 规则生效日期
    EffectiveDate:string;
    // 规则失效日期（表示NULL长期有效）
    ExpireDate:string;
    // 规则启用状态（1=启用，0=停用）
    IsActive:string;
    // 规则创建人
    CreatedBy:string;
    // 规则创建时间
    CreatedAt:string;
}
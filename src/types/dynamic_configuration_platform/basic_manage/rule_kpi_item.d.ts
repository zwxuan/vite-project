// 规则与KPI关联关系表属性
export interface RuleKpiItemItemProps {
    RowKey:string;
    // 关联项唯一ID
    ItemId:string;
    // 关联的规则ID
    RuleId:string;
    // 关联的KPI ID
    KpiId:string;
    // 该KPI在规则中的权重（0-100%）
    Weight:number;
    // 评分规则配置（JSON结构，存储算法类型和参数）
    ScoringConfig:string;
    // 描述
    Description:string;
}
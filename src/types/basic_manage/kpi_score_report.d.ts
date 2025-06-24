// kpi 打分属性
export interface KpiScoreReportItemProps {
    // 评估维度
    AssessmentDimension:string;
    // 指标 KP
    IndicatorKpi:string;
    // 权重
    Weight:number;
    // 目标值
    TargetValue:number;
    // 实际值
    ActualValue:number;
    // 评分规则
    ScoringRule:string;
    // 自动评分
    AutoScore:number;
    // 人工修正
    ManualCorrection:number;
    // 最终得分
    FinalScore:string;
}
// 结算方式属性
export interface BaseSettlementMethodItemProps {
    // 编码
    Code:string;
    // 结算方式中文
    SettlementMethodCn:string;
    // 结算方式英文
    SettlementMethodEn:string;
    // 启用状态
    EnabledStatus:string;
    // 是否默认
    IsDefault:string;
    // 适用场景
    ApplicableScenario:string;
}
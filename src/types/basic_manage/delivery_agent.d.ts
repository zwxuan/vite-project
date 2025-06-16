// 换单代理属性
export interface DeliveryAgentItemProps {
    // 编号
    Id:string;
    // 代理中文名称
    AgentChineseName:string;
    // 代理英文名称
    AgentEnglishName:string;
    // 代理英文缩写
    AgentEnglishAbbreviation:string;
    // 所属分公司
    AffiliatedBranchCompany:string;
    // 是否默认
    IsDefault:string;
    // 代理信息
    AgentInfo:string;
}
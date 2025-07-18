// 管理组织属性
export interface ManageOrgItemProps {
    // 编码
    OrgCode:string;
    // 名称
    OrgName:string;
    // 简称
    OrgAbbr:string;
    // 状态
    OrgStatus:string;
    // 备注
    OrgRemark:string;
    // 子节点
    children?: ManageOrgItemProps[];
}
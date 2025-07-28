// 凭证分录规则属性
export interface EntryGroupingRuleItemProps {
    // 分录类型编码
    EntryId:string;
    // 所属账套
    BookName:string;
    // 分组类型名称
    RuleName:string;
    // 分录类型名称
    EntryName:string;
    // 科目分级
    AccountLevel:number;
    // 科目分组条件1
    AccountGroup1By:string;
    // 科目分组条件2
    AccountGroup2By:string;
    // 科目分组条件3
    AccountGroup3By:string;
    // 科目分组条件4
    AccountGroup4By:string;
    // 科目分组条件5
    AccountGroup5By:string;
    // 科目分组条件6
    AccountGroup6By:string;
    // 辅助核算分组条件1
    AuxiliaryGroup1By:string;
    // 辅助核算分组条件2
    AuxiliaryGroup2By:string;
    // 辅助核算分组条件3
    AuxiliaryGroup3By:string;
    // 辅助核算分组条件4
    AuxiliaryGroup4By:string;
    // 辅助核算分组条件5
    AuxiliaryGroup5By:string;
    // 辅助核算分组条件6
    AuxiliaryGroup6By:string;
    // 分录创建时间
    CreatedAt:string;
    // 分录最后更新时间
    UpdatedAt:string;
}
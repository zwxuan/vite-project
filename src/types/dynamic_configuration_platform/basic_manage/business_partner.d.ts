// 合作伙伴属性
export interface BusinessPartnerItemProps {
    // 编号
    Id:string;
    // 简称
    AbbreviatedName:string;
    // 代码
    Code:string;
    // 国家(地区)
    CountryRegion:string;
    // 中文名称
    ChineseName:string;
    // 英文名称
    EnglishName:string;
    // 客户合同签约状态
    CustomerContractStatus:string;
    // 附加说明
    AdditionalRemarks:string;
    // 所属分公司
    BranchCompany:string;
    // 审核状态
    AuditStatus:string;
    // 拒绝原因
    RejectionReason:string;
    // 审核人
    Auditor:string;
    // 审核日期
    AuditDate:string;
    // 创建人
    Creator:string;
    // 创建日期
    CreationDate:string;
    // 修改人
    Modifier:string;
    // 修改日期
    ModificationDate:string;
    // 是否有效
    IsActive:string;
    // 电商客户
    ECommerceCustomer:string;
    // 销售
    Sales:string;
    // 结算类型
    SettlementType:string;
    // 信控日期类型
    CreditControlDateType:string;
    // 结算方式
    SettlementMethod:string;
    // 黑名单
    Blacklist:string;
    // 揽货类型
    FreightType:string;
    // 收支类型
    RevenueExpenditureType:string;
    // 账期
    CreditPeriod:string;
    // 额度
    CreditLimit:string;
    // 信控额度
    CreditControlLimit:string;
    // 信控币种
    CreditCurrency:string;
    // 30天(票)
    Over30Days:string;
    // 60天(票)
    Over60Days:string;
    // 90天(票)
    Over90Days:string;
    // 大于90天(票)
    Over90PlusDays:string;
    // 来源
    Source:string;
    // 客户来源
    CustomerSource:string;
    // 客户接触渠道
    CustomerContactChannel:string;
    // 供应商负责人
    SupplierResponsiblePerson:string;
    // 客商类型
    BusinessType:string;
    // 地址
    Address:string;
    // 客户级别
    CustomerLevel:string;
    // 归属部门
    AffiliationDepartment:string;
    // 海外客服
    OverseasCustomerService:string;
    // 客户编码
    CustomerCode:string;
    // 供应商编码
    SupplierCode:string;
    // 信用账款附加说明
    CreditAccountsReceivableRemarks:string;
    // 供应商合同签约状态
    SupplierContractStatus:string;
    // 海外代理合同签约状态
    OverseasAgentContractStatus:string;
    // 其他合同签约状态
    OtherContractStatus:string;
    // 合同约号状态
    ContractNumberStatus:string;
    // 舱位承运人类型
    CarriageType:string;
    // 文件编号
    DocumentNumber:string;
    // 是否上传合同附件
    IsContractAttachmentUploaded:string;
}
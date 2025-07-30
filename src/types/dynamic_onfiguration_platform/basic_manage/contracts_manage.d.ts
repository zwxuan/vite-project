// 合同管理属性
export interface ContractsManageItemProps {
    // 合同编号
    ContractId:string;
    // 合作伙伴
    Partner:string;
    // 客户级别
    CustomerLevel:string;
    // 审核状态
    AuditStatus:string;
    // 合同状态
    ContractStatus:string;
    // 合同类型
    ContractType:string;
    // 生效日期
    EffectiveDate:string;
    // 失效日期
    ExpirationDate:string;
    // 附件数量
    AttachmentCount:string;
    // 操作员
    Operator:string;
    // 操作日期
    OperationDate:string;
    // 合同协议
    ContractAgreement:string;
    // 日志记录
    LogRecord:string;
    // 额度
    CreditLimit:number;
    // 额度币种
    CreditCurrency:string;
    // 日期类型
    DateType:string;
    // 账期周期
    PaymentCycle:number;
    // 是否顺延
    IsExtension:string;
    // 顺延周期
    ExtensionPeriod:number;
    // 备注
    Remarks:string;
    // 是否已上传订舱章
    IsShippingChapterUploaded:string;
    // 是否已上传合同协议
    IsContractUploaded:string;
    // 是否需要更新
    IsNeedUpdate:string;
    // 合同所属分公司
    CompanyBranch:string;
    // 销售
    SalesRep:string;
    // 结算方式
    SettlementMethod:string;
}


// 合同规则引擎
export interface ContractsRuleEngineItemProps {
    SeqNo:string;
    // 对账规则名称
    ReconciliationRuleName:string;
    // 匹配字段关系
    MatchFieldRelation:string;
}

// 合同规则比较字段
export interface ContractsCompareFieldsItemProps {
    SeqNo:string;
    // 对比字段名称
    CompareFieldsName:string;
    // 匹配字段关系
    CompareFieldRelation:string;
    // 匹配字段值
    CompareFieldValue:string;
}
// 付款申请属性
export interface PaymentApplicationItemProps {
    // 付款通知号
    PaymentNotificationNumber:string;
    // 结算对象
    SettlementObject:string;
    // 结算代理
    SettlementAgent:string;
    // 委托单位
    EntrustingUnit:string;
    // 更改时间
    ModificationTime:string;
    // 更改人
    Modifier:string;
    // 开票抬头
    InvoiceTitle:string;
    // 业务编号
    BusinessNumber:string;
    // 申请日期
    ApplicationDate:string;
    // 申请人
    Applicant:string;
    // 申请部门
    ApplicantDepartment:string;
    // 付款期限
    PaymentDeadline:string;
    // 付款方式
    PaymentMethod:string;
    // 发票号码
    InvoiceNumber:string;
    // 币种
    CurrencyCode:string;
    // 金额
    Amount:number;
    // 核销金额分币种合计
    ReconciliationAmountByCurrency:string;
    // 审批状态
    ApprovalStatus:string;
    // 核销状态
    ReconciliationStatus:string;
    // 备注
    Remarks:string;
    // 流程编号
    ProcessNumber:string;
    // 分币种合计
    TotalByCurrency:string;
    // 凭证号
    VoucherNumber:string;
    // 凭证创建日期
    VoucherCreationDate:string;
    // 承运人
    Carrier:string;
    // 收/发货地
    ShippingLocation:string;
    // 拖车实际提货时间
    ActualTrailerPickupTime:string;
    // 单据日期
    DocumentDate:string;
    // 财务应付单状态
    FinancialPayableStatus:string;
}
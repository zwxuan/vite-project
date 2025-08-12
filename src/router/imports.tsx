import React from "react";
const Demo = React.lazy(() => import("@/pages/demo"));
const Currency = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/dic_manage/currency"));
const Orders = React.lazy(() => import("@/pages/settlement_center/business_manage/index"));
const FeeReconciliation = React.lazy(() => import("@/pages/settlement_center/cost_manage/fee_reconciliation"));
const FeeReconciliationCompare = React.lazy(() => import("@/pages/settlement_center/cost_manage/fee_reconciliation/recociliation/reconciliation"));
const BillManage = React.lazy(() => import("@/pages/settlement_center/cost_manage/bill_manage"));
const StatementOfAccount = React.lazy(() => import("@/pages/settlement_center/cost_manage/statement_of_account"));
const OrderFeeRelation = React.lazy(() => import("@/pages/settlement_center/cost_manage/order_fee_relation/index_relation"));
const OrderDetail = React.lazy(() => import("@/pages/settlement_center/business_manage/detail"));
const OrderFeeSplit = React.lazy(() => import("@/pages/settlement_center/cost_manage/order_fee_split"));
const LCLFeeShare = React.lazy(() => import("@/pages/settlement_center/cost_manage/lcl_fee_share"));
const InvoiceDetail = React.lazy(() => import("@/pages/settlement_center/cost_manage/invoice/invoice_detail"));
const Invoice = React.lazy(() => import("@/pages/settlement_center/cost_manage/invoice"));
const InvoiceIssuanceReceipt = React.lazy(() => import("@/pages/settlement_center/cost_manage/invoice_issuance_receipt"));
const PhysicalInvoice = React.lazy(() => import("@/pages/settlement_center/cost_manage/physical_invoice"));
import ReconciliationRuleEngine from "@/pages/settlement_center/cost_manage/reconciliation_rule_engine";
const PermissionManagementUser = React.lazy(() => import("@/pages/dynamic_configuration_platform/identity/permission/permission_assign_user"));
const PermissionManagementPost = React.lazy(() => import("@/pages/dynamic_configuration_platform/identity/permission/permission_assign_post"));
const ExportLog = React.lazy(() => import("@/pages/dynamic_configuration_platform/system_manage/log/export_log"));
const ImportLog = React.lazy(() => import("@/pages/dynamic_configuration_platform/system_manage/log/import_log"));
const Login = React.lazy(() => import("@/pages/login"));
const SetFeeSchedule = React.lazy(() => import("@/pages/settlement_center/system_manage/set_fee_schedule"));
const ChargingStandard = React.lazy(() => import("@/pages/settlement_center/system_manage/charging_standard"));
const NotOffSetting = React.lazy(() => import("@/pages/settlement_center/finance_manage/not_off_setting"));
const HasOffSetting = React.lazy(() => import("@/pages/settlement_center/finance_manage/has_off_setting"));
const VoucherGroupingRule = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/voucher/voucher_grouping_rule"));
const EntryGroupingRule = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/voucher/entry_grouping_rule"));
const AccountingBook = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/voucher/accounting_book"));
const SummaryRule = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/voucher/summary_rule"));
const VoucherType = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/voucher/voucher_type"));
const VoucherCodeMapping = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/voucher/code_mapping"));
const AccountMapping = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/voucher/account_mapping"));
const PaymentApplication = React.lazy(() => import("@/pages/settlement_center/cost_manage/payment_application"));
const ReleaseOrderVerification = React.lazy(() => import("@/pages/settlement_center/cost_manage/release_order_verification"));
const BlRelease = React.lazy(() => import("@/pages/settlement_center/cost_manage/bl_release"));
const ExpenseReview = React.lazy(() => import("@/pages/settlement_center/finance_manage/expense_review"));
const FeeAdjustment = React.lazy(() => import("@/pages/settlement_center/finance_manage/fee_adjustment"));
const ActualPayment = React.lazy(() => import("@/pages/settlement_center/finance_manage/actual_payment"));
const FinanceQuery = React.lazy(() => import("@/pages/settlement_center/finance_manage/finance_query"));
const VoucherLog = React.lazy(() => import("@/pages/settlement_center/finance_manage/voucher_log"));
const SalesBusinessAmountReport = React.lazy(() => import("@/pages/settlement_center/report/sales_business_amount"));

const OutstandingReceivablesPayablesReport = React.lazy(() => import("@/pages/settlement_center/report/outstanding_receivables_payables"));
const NotReceivablesFeeReport = React.lazy(() => import("@/pages/settlement_center/report/not_receivables_fee"));
const NotReceivablesOrderReport = React.lazy(() => import("@/pages/settlement_center/report/not_receivables_order"));
const SalesBusinessWeightReport = React.lazy(() => import("@/pages/settlement_center/report/sales_business_weight"));
const CustomerArrearsAnalysisReport = React.lazy(() => import("@/pages/settlement_center/report/customer_arrears_analysis"));
const SalesProfitReport = React.lazy(() => import("@/pages/settlement_center/report/sales_profit"));
const DepartmentBusinessWeightReport = React.lazy(() => import("@/pages/settlement_center/report/department_business_weight"));
const SingleTicketProfitStatisticsReport = React.lazy(() => import("@/pages/settlement_center/report/single_ticket_profit_statistics"));
const OperatorShipmentSummaryReport = React.lazy(() => import("@/pages/settlement_center/report/operator_shipment_summary"));
const TransportationLineTeuReport = React.lazy(() => import("@/pages/settlement_center/report/transportation_line_teu"));
const CustomerWeightProfitReport = React.lazy(() => import("@/pages/settlement_center/report/customer_weight_profit"));
const AccountsReceivableAgingReport = React.lazy(() => import("@/pages/settlement_center/report/accounts_receivable_aging"));
const NotPayFeeReport = React.lazy(() => import("@/pages/settlement_center/report/not_pay_fee"));
const NotPayOrderReport = React.lazy(() => import("@/pages/settlement_center/report/not_pay_order"));
const BaseGoods = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/dic_manage/base_goods"));
const BaseSeaPort = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/dic_manage/sea_port"));
const BaseAirPort = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/dic_manage/air_port"));
const BaseRailwayPort = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/dic_manage/base_railway_port"));
const BaseExchangeRate = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/base_exchange_rate"));
const BaseTaxRate = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/base_tax_rate"));
const BaseSettlementMethod = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/base_settlement_method"));
const BaseTradeLanes = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/dic_manage/base_trade_lanes"));
const BaseTradeLanesGrouping = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/dic_manage/base_trade_lanes_grouping"));
const BaseShipmentType = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/dic_manage/base_shipment_type"));
const BaseBusinessType = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/dic_manage/base_business_type"));
const BaseTransportationTerms = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/dic_manage/base_transportation_terms"));
const BaseTradeTerms = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/dic_manage/base_trade_terms"));
const BaseFreightTerms = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/dic_manage/base_freight_terms"));
const BaseBillTerms = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/dic_manage/base_bill_terms"));
const BaseContainerTeu = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/dic_manage/base_container_teu"));
const BaseCargoType = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/dic_manage/base_cargo_type"));
const BaseContainerType = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/dic_manage/base_container_type"));
const ContractsManage = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/contracts_manage"));
const BusinessPartner = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/business_partner"));
const ParterDetail = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/business_partner/detail"));
const InternalAgentSettlement = React.lazy(() => import("@/pages/settlement_center/cost_manage/internal_agent_settlement"));
const PartnerPerformance = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/partner_performance"));
const ContainerLoading = React.lazy(() => import("@/pages/settlement_center/system_manage/container_loading/ContainerLoading"));
const CustomerLevel = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/dic_manage/customer_level"));
const CustomerType = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/dic_manage/customer_type"));
const CustomerIndustry = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/dic_manage/customer_industry"));
const ManageOrg = React.lazy(() => import("@/pages/dynamic_configuration_platform/org_manage/manage_org"));
const ManageOrgDetail = React.lazy(() => import("@/pages/dynamic_configuration_platform/org_manage/manage_org/detail"));
const AdminOrg = React.lazy(() => import("@/pages/dynamic_configuration_platform/org_manage/admin_org"));
const AdminOrgDetail = React.lazy(() => import("@/pages/dynamic_configuration_platform/org_manage/admin_org/detail"));
const Department = React.lazy(() => import("@/pages/dynamic_configuration_platform/org_manage/department/department"));
const JobPosition = React.lazy(() => import("@/pages/dynamic_configuration_platform/org_manage/job_position"));
const EmployeeCategory = React.lazy(() => import("@/pages/dynamic_configuration_platform/org_manage/employee_category"));
const EmployeeManage = React.lazy(() => import("@/pages/dynamic_configuration_platform/org_manage/employee_manage"));
const EmployeeManageDetail = React.lazy(() => import("@/pages/dynamic_configuration_platform/org_manage/employee_manage/detail"));
const MenuManage = React.lazy(() => import("@/pages/dynamic_configuration_platform/system_manage/menu_manage"));
const RoleManage = React.lazy(() => import("@/pages/dynamic_configuration_platform/identity/role/role_manage"));
const RoleManageDetail = React.lazy(() => import("@/pages/dynamic_configuration_platform/identity/role/role_manage/detail"));
const RoleGroup = React.lazy(() => import("@/pages/dynamic_configuration_platform/identity/role/role_group"));
const RoleTags = React.lazy(() => import("@/pages/dynamic_configuration_platform/identity/role/role_tags"));
const FunctionPermissionRole = React.lazy(() => import("@/pages/dynamic_configuration_platform/identity/function/function_permission_by_role"));
const FunctionPermissionUser = React.lazy(() => import("@/pages/dynamic_configuration_platform/identity/function/function_permission_by_user"));
const ChainMap = React.lazy(() => import("@/pages/settlement_center/report/3d_large_screen/china_map"));
const Lev1Department = React.lazy(() => import("@/pages/settlement_center/report/3d_large_screen/lev1_department"));
const Home = React.lazy(() => import("@/layout/home"));

export {
  Demo,ContainerLoading,Home,Lev1Department,
  Currency,Orders,FeeReconciliation,FeeReconciliationCompare,BillManage,StatementOfAccount,OrderFeeRelation,OrderDetail,
  OrderFeeSplit,LCLFeeShare,InvoiceDetail,Invoice,InvoiceIssuanceReceipt,PhysicalInvoice,ReconciliationRuleEngine,PermissionManagementUser,ExportLog,ImportLog,Login,
  SetFeeSchedule,ChargingStandard,NotOffSetting,HasOffSetting,AccountingBook,VoucherGroupingRule,EntryGroupingRule,SummaryRule,VoucherType,VoucherCodeMapping,AccountMapping,
  PaymentApplication,ReleaseOrderVerification,BlRelease,ExpenseReview,FeeAdjustment,ActualPayment,FinanceQuery,VoucherLog,SalesBusinessAmountReport,
  OutstandingReceivablesPayablesReport,NotReceivablesFeeReport,NotReceivablesOrderReport,SalesBusinessWeightReport,CustomerArrearsAnalysisReport,SalesProfitReport,DepartmentBusinessWeightReport,SingleTicketProfitStatisticsReport,OperatorShipmentSummaryReport,TransportationLineTeuReport,CustomerWeightProfitReport,
  AccountsReceivableAgingReport,NotPayFeeReport,NotPayOrderReport,BaseGoods,BaseSeaPort,BaseAirPort,BaseRailwayPort,BaseExchangeRate,BaseTaxRate,BaseSettlementMethod,
  BaseTradeLanes,BaseTradeLanesGrouping,BaseShipmentType,BaseBusinessType,BaseTransportationTerms,BaseTradeTerms,BaseFreightTerms,BaseBillTerms,BaseContainerTeu,BaseCargoType,
  BaseContainerType,ContractsManage,BusinessPartner,ParterDetail,InternalAgentSettlement,PartnerPerformance,CustomerLevel,CustomerType,CustomerIndustry,ManageOrg,AdminOrg,
  ChainMap,AdminOrgDetail,ManageOrgDetail,Department,JobPosition,EmployeeCategory,EmployeeManage,EmployeeManageDetail,MenuManage,RoleManage,RoleManageDetail,RoleGroup,RoleTags,
  FunctionPermissionRole,PermissionManagementPost,FunctionPermissionUser,

};
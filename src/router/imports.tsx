import React from "react";
const Demo = React.lazy(() => import("@/pages/demo"));
const Currency = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/basic_finance/currency"));
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
const BaseExchangeRate = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/basic_finance/base_exchange_rate"));
const BaseTaxRate = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/basic_finance/base_tax_rate"));
const BaseTaxSystem = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/basic_finance/base_tax_system"));
const BaseTaxType = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/basic_finance/base_tax_type"));
const BaseSettlementMethod = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/basic_finance/base_settlement_method"));
const BaseSettlementMethodMapper = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/basic_finance/base_settlement_method_mapper"));
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
const DataPermissionRole = React.lazy(() => import("@/pages/dynamic_configuration_platform/identity/data/data_permission_by_role"));
const DataPermissionUser = React.lazy(() => import("@/pages/dynamic_configuration_platform/identity/data/data_permission_by_user"));
const BaseBankType = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/basic_finance/base_bank_type"));
const BaseBankBranch = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/basic_finance/base_bank_branch"));
const BasePeriodicBilling = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/basic_finance/base_periodic_billing"));
const BaseSettlementCycle = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/basic_finance/base_settlement_cycle"));
const BaseCompanySize = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/basic_company/base_company_size"));
const BaseCompanyNature = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/basic_company/base_company_nature"));
const BaseAccountPurpose = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/basic_company/base_account_purpose"));
const BaseCorporateFundAccount = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/basic_company/base_corporate_fund_account"));
const AccountDetail = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/basic_company/base_corporate_fund_account/detail"));
const BaseCorporateCashAccount = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/basic_company/base_corporate_cash_account"));
const SysBusinessLog = React.lazy(() => import("@/pages/dynamic_configuration_platform/system_manage/sys_business_log"));
const SysLoginLog = React.lazy(() => import("@/pages/dynamic_configuration_platform/system_manage/sys_login_log"));
const SysOperatorLog = React.lazy(() => import("@/pages/dynamic_configuration_platform/system_manage/sys_operator_log"));
const SysExceptionLog = React.lazy(() => import("@/pages/dynamic_configuration_platform/system_manage/sys_exception_log"));
const SysOperatorLogReport = React.lazy(() => import("@/pages/dynamic_configuration_platform/system_manage/sys_operator_log_report"));
const SysWarningType = React.lazy(() => import("@/pages/dynamic_configuration_platform/system_manage/sys_warning_type"));
const SysWarningTypeDetail = React.lazy(() => import("@/pages/dynamic_configuration_platform/system_manage/sys_warning_type/detail"));
const SysWarningTask = React.lazy(() => import("@/pages/dynamic_configuration_platform/system_manage/sys_warning_task"));
const SysWarningTaskDetail = React.lazy(() => import("@/pages/dynamic_configuration_platform/system_manage/sys_warning_task/detail"));
const TaskCalendarView = React.lazy(() => import("@/pages/dynamic_configuration_platform/basic_manage/calendar"));

const ChainMap = React.lazy(() => import("@/pages/settlement_center/report/3d_large_screen/china_map"));
const Lev1Department = React.lazy(() => import("@/pages/settlement_center/report/3d_large_screen/lev1_department"));
const CustomsJobCenter = React.lazy(() => import("@/pages/customs_compliance/customs_job_management/job_center"));
const CustomsJobDetail = React.lazy(() => import("@/pages/customs_compliance/customs_job_management/job_detail"));
const CustomsJobDashboard = React.lazy(() => import("@/pages/customs_compliance/customs_job_management/dashboard"));
const CustomsSlaMonitor = React.lazy(() => import("@/pages/customs_compliance/customs_job_management/sla_monitor"));
const CustomsCreateJob = React.lazy(() => import("@/pages/customs_compliance/customs_job_management/create_job"));
const CustomsBatchOperation = React.lazy(() => import("@/pages/customs_compliance/customs_job_management/batch_operation"));
const CustomsJobStatistics = React.lazy(() => import("@/pages/customs_compliance/customs_job_management/job_statistics"));
const CustomsJobArchiving = React.lazy(() => import("@/pages/customs_compliance/customs_job_management/job_archiving"));
const CcsmScreeningTaskCenter = React.lazy(() => import("@/pages/customs_compliance/compliance_screening_management/screening_task_center"));
const CcsmInitiateScreening = React.lazy(() => import("@/pages/customs_compliance/compliance_screening_management/initiate_screening"));
const CcsmScreeningResultQuery = React.lazy(() => import("@/pages/customs_compliance/compliance_screening_management/screening_result_query"));
const CcsmHitProcessing = React.lazy(() => import("@/pages/customs_compliance/compliance_screening_management/hit_processing"));
const CcsmExemptionRequestManagement = React.lazy(() => import("@/pages/customs_compliance/compliance_screening_management/exemption_request_management"));
const CcsmScreeningRuleConfig = React.lazy(() => import("@/pages/customs_compliance/compliance_screening_management/screening_rule_config"));
const CcsmDatabaseManagement = React.lazy(() => import("@/pages/customs_compliance/compliance_screening_management/database_management"));
const CcsmScreeningStatisticsReport = React.lazy(() => import("@/pages/customs_compliance/compliance_screening_management/screening_statistics_report"));
const CcsdmDocumentWorkbench = React.lazy(() => import("@/pages/customs_compliance/supporting_documents_management/document_workbench/index"));
const CcsdmChecklistGeneration = React.lazy(() => import("@/pages/customs_compliance/supporting_documents_management/checklist_generation/index"));
const CcsdmCollectionManagement = React.lazy(() => import("@/pages/customs_compliance/supporting_documents_management/collection_management/index"));
const CcsdmReviewCenter = React.lazy(() => import("@/pages/customs_compliance/supporting_documents_management/review_center/index"));
const CcsdmDocumentSearch = React.lazy(() => import("@/pages/customs_compliance/supporting_documents_management/document_search/index"));
const CcsdmTemplateManagement = React.lazy(() => import("@/pages/customs_compliance/supporting_documents_management/template_management/index"));
const CcsdmArchiveManagement = React.lazy(() => import("@/pages/customs_compliance/supporting_documents_management/archive_management/index"));
const CcsdmReminderSettings = React.lazy(() => import("@/pages/customs_compliance/supporting_documents_management/reminder_settings/index"));
const CcsdmStatisticsReport = React.lazy(() => import("@/pages/customs_compliance/supporting_documents_management/statistics_report/index"));
const Home = React.lazy(() => import("@/layout/home"));
const JobList = React.lazy(() => import("@/pages/freight_forwarding/job_management/job_list"));
const JobDetail = React.lazy(() => import("@/pages/freight_forwarding/job_management/job_detail"));
const JobMonitoring = React.lazy(() => import("@/pages/freight_forwarding/job_management/monitoring"));
const MyJobs = React.lazy(() => import("@/pages/freight_forwarding/job_management/my_jobs"));
const TeamJobs = React.lazy(() => import("@/pages/freight_forwarding/job_management/team_jobs"));
const JobAssignment = React.lazy(() => import("@/pages/freight_forwarding/job_management/job_assignment"));
const AssignmentRules = React.lazy(() => import("@/pages/freight_forwarding/job_management/rules"));
const PerformanceAnalysis = React.lazy(() => import("@/pages/freight_forwarding/job_management/analysis"));
const BookingList = React.lazy(() => import("@/pages/freight_forwarding/booking_management/list"));
const BookingCreate = React.lazy(() => import("@/pages/freight_forwarding/booking_management/create"));
const BookingQuery = React.lazy(() => import("@/pages/freight_forwarding/booking_management/query"));
const BookingPickupPlan = React.lazy(() => import("@/pages/freight_forwarding/booking_management/pickup_plan"));
const BookingCarrierIntegration = React.lazy(() => import("@/pages/freight_forwarding/booking_management/carrier_integration"));
const BookingSpace = React.lazy(() => import("@/pages/freight_forwarding/booking_management/space"));
const BookingStatistics = React.lazy(() => import("@/pages/freight_forwarding/booking_management/statistics"));
const BookingTemplate = React.lazy(() => import("@/pages/freight_forwarding/booking_management/template"));
const BookingTemplateDetail = React.lazy(() => import("@/pages/freight_forwarding/booking_management/template/detail"));
const BookingTemplateEdit = React.lazy(() => import("@/pages/freight_forwarding/booking_management/template/edit"));
const WaybillList = React.lazy(() => import("@/pages/freight_forwarding/waybill_management/list"));
const WaybillCreate = React.lazy(() => import("@/pages/freight_forwarding/waybill_management/create"));
const WaybillQuery = React.lazy(() => import("@/pages/freight_forwarding/waybill_management/query"));
const WaybillTemplate = React.lazy(() => import("@/pages/freight_forwarding/waybill_management/template"));
const WaybillTemplateDetail = React.lazy(() => import("@/pages/freight_forwarding/waybill_management/template/detail"));
const WaybillStatistics = React.lazy(() => import("@/pages/freight_forwarding/waybill_management/statistics"));
const WaybillArchive = React.lazy(() => import("@/pages/freight_forwarding/waybill_management/archive"));
const OrderManagementList = React.lazy(() => import("@/pages/freight_forwarding/order_management/list"));
const OrderManagementDetail = React.lazy(() => import("@/pages/freight_forwarding/order_management/detail"));
const OrderManagementStatistics = React.lazy(() => import("@/pages/freight_forwarding/order_management/statistics"));
const OrderQuery = React.lazy(() => import("@/pages/freight_forwarding/order_management/query"));
const StandaloneService = React.lazy(() => import("@/pages/freight_forwarding/order_management/standalone_service"));
const StandaloneServiceDetail = React.lazy(() => import("@/pages/freight_forwarding/order_management/standalone_service/detail"));
const ServiceConfig = React.lazy(() => import("@/pages/freight_forwarding/order_management/service_config"));
const ServiceConfigDetail = React.lazy(() => import("@/pages/freight_forwarding/order_management/service_config/detail"));
const ServiceTemplate = React.lazy(() => import("@/pages/freight_forwarding/order_management/service_template"));
const ServiceTemplateDetail = React.lazy(() => import("@/pages/freight_forwarding/order_management/service_template/detail"));
const ServicePerformance = React.lazy(() => import("@/pages/freight_forwarding/order_management/service_performance"));
const OrderAudit = React.lazy(() => import("@/pages/freight_forwarding/order_management/audit"));
const OrderBreakdown = React.lazy(() => import("@/pages/freight_forwarding/order_management/breakdown"));
const BreakdownRules = React.lazy(() => import("@/pages/freight_forwarding/order_management/breakdown_rules"));
const BreakdownRulesDetail = React.lazy(() => import("@/pages/freight_forwarding/order_management/breakdown_rules/detail"));
const TrackingOverview = React.lazy(() => import("@/pages/freight_forwarding/milestone_tracking/tracking_overview"));
const TrackingOverviewDetail = React.lazy(() => import("@/pages/freight_forwarding/milestone_tracking/tracking_overview/detail"));
const MilestoneConfig = React.lazy(() => import("@/pages/freight_forwarding/milestone_tracking/milestone_config"));
const RealtimeTracking = React.lazy(() => import("@/pages/freight_forwarding/milestone_tracking/realtime_tracking"));
const ExceptionAlert = React.lazy(() => import("@/pages/freight_forwarding/milestone_tracking/exception_alert"));
const CustomerNotification = React.lazy(() => import("@/pages/freight_forwarding/milestone_tracking/customer_notification"));
const TrackingReport = React.lazy(() => import("@/pages/freight_forwarding/milestone_tracking/tracking_report"));
const InterfaceManagement = React.lazy(() => import("@/pages/freight_forwarding/milestone_tracking/interface_management"));

const MilestoneConfigEdit = React.lazy(() => import("@/pages/freight_forwarding/milestone_tracking/milestone_config/edit"));
const TemplateList = React.lazy(() => import("@/pages/freight_forwarding/milestone_tracking/customer_notification/template_list"));
const TemplateDetail = React.lazy(() => import("@/pages/freight_forwarding/milestone_tracking/customer_notification/template_detail"));
const InterfaceConfigEdit = React.lazy(() => import("@/pages/freight_forwarding/milestone_tracking/interface_management/edit"));

const DocumentOverview = React.lazy(() => import("@/pages/freight_forwarding/document_management/overview"));
const DocumentList = React.lazy(() => import("@/pages/freight_forwarding/document_management/list"));
const DocumentCreate = React.lazy(() => import("@/pages/freight_forwarding/document_management/create"));
const DocumentQuery = React.lazy(() => import("@/pages/freight_forwarding/document_management/query"));
const DocumentReview = React.lazy(() => import("@/pages/freight_forwarding/document_management/review"));
const DocumentTemplate = React.lazy(() => import("@/pages/freight_forwarding/document_management/template"));
const DocumentSignature = React.lazy(() => import("@/pages/freight_forwarding/document_management/signature"));
const DocumentVersion = React.lazy(() => import("@/pages/freight_forwarding/document_management/version"));
const DocumentDetail = React.lazy(() => import("@/pages/freight_forwarding/document_management/detail"));
const DocumentArchive = React.lazy(() => import("@/pages/freight_forwarding/document_management/archive"));
const DocumentCompliance = React.lazy(() => import("@/pages/freight_forwarding/document_management/compliance"));
const DocumentComplianceDetail = React.lazy(() => import("@/pages/freight_forwarding/document_management/compliance/detail"));
const DocumentBatch = React.lazy(() => import("@/pages/freight_forwarding/document_management/batch"));
const DocumentInterface = React.lazy(() => import("@/pages/freight_forwarding/document_management/interface"));
const DocumentReport = React.lazy(() => import("@/pages/freight_forwarding/document_management/report"));
const DocumentTemplateEdit = React.lazy(() => import("@/pages/freight_forwarding/document_management/template/edit"));
const DocumentTemplateDetail = React.lazy(() => import("@/pages/freight_forwarding/document_management/template/detail"));
const DocumentSignatureEdit = React.lazy(() => import("@/pages/freight_forwarding/document_management/signature/edit"));
const DocumentReviewDetail = React.lazy(() => import("@/pages/freight_forwarding/document_management/review/detail"));
const DocumentVersionDetail = React.lazy(() => import("@/pages/freight_forwarding/document_management/version/detail"));
const DocumentVersionCompare = React.lazy(() => import("@/pages/freight_forwarding/document_management/version/compare"));

// 费用管理
const ReceivableCostList = React.lazy(() => import("@/pages/freight_forwarding/cost_management/receivable_cost"));
const ReceivableCostForm = React.lazy(() => import("@/pages/freight_forwarding/cost_management/receivable_cost/form"));
const PayableCostList = React.lazy(() => import("@/pages/freight_forwarding/cost_management/payable_cost"));
const PayableCostForm = React.lazy(() => import("@/pages/freight_forwarding/cost_management/payable_cost/form"));
const CostOverview = React.lazy(() => import("@/pages/freight_forwarding/cost_management/cost_overview"));
const CostDetail = React.lazy(() => import("@/pages/freight_forwarding/cost_management/cost_overview/detail"));
const CostCalculation = React.lazy(() => import("@/pages/freight_forwarding/cost_management/cost_overview/calculation"));
const ProfitAnalysis = React.lazy(() => import("@/pages/freight_forwarding/cost_management/cost_overview/profit_analysis"));
const CostReviewCenter = React.lazy(() => import("@/pages/freight_forwarding/cost_management/cost_review_center"));
const AllocationOverview = React.lazy(() => import("@/pages/freight_forwarding/cost_management/allocation_overview"));
const AllocationOverviewDetail = React.lazy(() => import("@/pages/freight_forwarding/cost_management/allocation_overview/detail"));
const AllocationRules = React.lazy(() => import("@/pages/freight_forwarding/cost_management/allocation_rules"));
const AllocationRulesDetail = React.lazy(() => import("@/pages/freight_forwarding/cost_management/allocation_rules/detail"));
const ManualAdjustmentApproval = React.lazy(() => import("@/pages/freight_forwarding/cost_management/manual_adjustment_approval"));
const AllocationHistory = React.lazy(() => import("@/pages/freight_forwarding/cost_management/allocation_history"));
const SalesDepartmentPerformance = React.lazy(() => import("@/pages/freight_forwarding/cost_management/sales_department_performance"));
const OperationDepartmentProfit = React.lazy(() => import("@/pages/freight_forwarding/cost_management/operation_department_profit"));
const ProfitTrendAnalysis = React.lazy(() => import("@/pages/freight_forwarding/cost_management/profit_trend_analysis"));
const DepartmentPerformanceComparison = React.lazy(() => import("@/pages/freight_forwarding/cost_management/department_performance_comparison"));

const FinancialDataSyncStatusMonitoring = React.lazy(() => import("@/pages/freight_forwarding/cost_management/financial_data_sync/status_monitoring"));
const FinancialDataSyncTaskManagement = React.lazy(() => import("@/pages/freight_forwarding/cost_management/financial_data_sync/task_management"));
const FinancialDataSyncLogQuery = React.lazy(() => import("@/pages/freight_forwarding/cost_management/financial_data_sync/log_query"));
const FinancialDataSyncExceptionCenter = React.lazy(() => import("@/pages/freight_forwarding/cost_management/financial_data_sync/exception_center"));

export {
  JobList, JobDetail, JobMonitoring, MyJobs,
  TeamJobs, JobAssignment, AssignmentRules, PerformanceAnalysis,
  BookingList, BookingCreate, BookingQuery, BookingPickupPlan, BookingCarrierIntegration, BookingSpace, BookingStatistics, BookingTemplate, BookingTemplateDetail, BookingTemplateEdit,
  WaybillList, WaybillCreate, WaybillQuery, WaybillTemplate, WaybillTemplateDetail, WaybillStatistics, WaybillArchive,
  OrderManagementList, OrderManagementDetail, OrderManagementStatistics,
  OrderQuery, StandaloneService, StandaloneServiceDetail, ServiceConfig, ServiceConfigDetail, ServiceTemplate, ServiceTemplateDetail, ServicePerformance, OrderAudit, OrderBreakdown, BreakdownRules, BreakdownRulesDetail,
  TrackingOverview, TrackingOverviewDetail, MilestoneConfig, MilestoneConfigEdit, RealtimeTracking, ExceptionAlert, CustomerNotification, TemplateList, TemplateDetail, TrackingReport, InterfaceManagement, InterfaceConfigEdit,
  DocumentOverview, DocumentList, DocumentCreate, DocumentQuery, DocumentReview, DocumentReviewDetail, DocumentTemplate, DocumentTemplateDetail, DocumentTemplateEdit, DocumentSignature, DocumentSignatureEdit, DocumentVersion, DocumentVersionDetail, DocumentVersionCompare, DocumentDetail,
  DocumentArchive, DocumentCompliance, DocumentBatch, DocumentInterface, DocumentReport,
  DocumentComplianceDetail,
  ReceivableCostList, ReceivableCostForm, PayableCostList, PayableCostForm, CostOverview, CostDetail, CostCalculation, ProfitAnalysis, CostReviewCenter,
  AllocationOverview, AllocationOverviewDetail, AllocationRules, AllocationRulesDetail, ManualAdjustmentApproval, AllocationHistory,
  SalesDepartmentPerformance, OperationDepartmentProfit, ProfitTrendAnalysis, DepartmentPerformanceComparison,
  FinancialDataSyncStatusMonitoring, FinancialDataSyncTaskManagement, FinancialDataSyncLogQuery, FinancialDataSyncExceptionCenter,
  Demo, ContainerLoading, Lev1Department, CustomsJobCenter, CustomsJobDetail, CustomsJobDashboard, CustomsSlaMonitor,
    CustomsCreateJob,
    CustomsBatchOperation,
    CustomsJobStatistics,
    CustomsJobArchiving,
    CcsmScreeningTaskCenter, CcsmInitiateScreening, CcsmScreeningResultQuery, CcsmHitProcessing,
    CcsmExemptionRequestManagement, CcsmScreeningRuleConfig, CcsmDatabaseManagement, CcsmScreeningStatisticsReport,
    CcsdmDocumentWorkbench, CcsdmChecklistGeneration, CcsdmCollectionManagement, CcsdmReviewCenter,
    CcsdmDocumentSearch, CcsdmTemplateManagement, CcsdmArchiveManagement, CcsdmReminderSettings, CcsdmStatisticsReport,
    Home,
  Currency, Orders, FeeReconciliation, FeeReconciliationCompare, BillManage, StatementOfAccount, OrderFeeRelation, OrderDetail,
  OrderFeeSplit, LCLFeeShare, InvoiceDetail, Invoice, InvoiceIssuanceReceipt, PhysicalInvoice, ReconciliationRuleEngine, PermissionManagementUser, ExportLog, ImportLog, Login,
  SetFeeSchedule, ChargingStandard, NotOffSetting, HasOffSetting, AccountingBook, VoucherGroupingRule, EntryGroupingRule, SummaryRule, VoucherType, VoucherCodeMapping, AccountMapping,
  PaymentApplication, ReleaseOrderVerification, BlRelease, ExpenseReview, FeeAdjustment, ActualPayment, FinanceQuery, VoucherLog, SalesBusinessAmountReport,
  OutstandingReceivablesPayablesReport, NotReceivablesFeeReport, NotReceivablesOrderReport, SalesBusinessWeightReport, CustomerArrearsAnalysisReport, SalesProfitReport, DepartmentBusinessWeightReport, SingleTicketProfitStatisticsReport, OperatorShipmentSummaryReport, TransportationLineTeuReport, CustomerWeightProfitReport,
  AccountsReceivableAgingReport, NotPayFeeReport, NotPayOrderReport, BaseGoods, BaseSeaPort, BaseAirPort, BaseRailwayPort, BaseExchangeRate, BaseTaxRate, BaseSettlementMethod,
  BaseTradeLanes, BaseTradeLanesGrouping, BaseShipmentType, BaseBusinessType, BaseTransportationTerms, BaseTradeTerms, BaseFreightTerms, BaseBillTerms, BaseContainerTeu, BaseCargoType,
  BaseContainerType, ContractsManage, BusinessPartner, ParterDetail, InternalAgentSettlement, PartnerPerformance, CustomerLevel, CustomerType, CustomerIndustry, ManageOrg, AdminOrg,
  ChainMap, AdminOrgDetail, ManageOrgDetail, Department, JobPosition, EmployeeCategory, EmployeeManage, EmployeeManageDetail, MenuManage, RoleManage, RoleManageDetail, RoleGroup, RoleTags,
  FunctionPermissionRole, PermissionManagementPost, FunctionPermissionUser, DataPermissionRole, DataPermissionUser, BaseTaxSystem, BaseTaxType, BaseBankType, BaseBankBranch,
  BaseSettlementMethodMapper, BasePeriodicBilling, BaseSettlementCycle, BaseCompanySize, BaseCompanyNature, BaseAccountPurpose, BaseCorporateFundAccount, AccountDetail,
  BaseCorporateCashAccount, SysBusinessLog, SysLoginLog, SysOperatorLog, SysExceptionLog, SysOperatorLogReport, SysWarningType, SysWarningTypeDetail,
  SysWarningTask, SysWarningTaskDetail, TaskCalendarView,
};

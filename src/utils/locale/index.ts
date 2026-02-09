import { OrdersLocale } from '@/utils/locale/settlement_center/business_manage/orders';
import { OrderFeeLocale } from '@/utils/locale/settlement_center/business_manage/order_fee';
import { FeeReconciliationLocale } from '@/utils/locale/settlement_center/cost_manage/fee_reconciliation';
import { OrderBillLocale } from '@/utils/locale/settlement_center/business_manage/order_bill';
import { OrderDocumentLocale } from '@/utils/locale/settlement_center/business_manage/order_document';
import { CommonLocale } from '@/utils/locale/common.ts';
import { PhysicalInvoiceLocale } from '@/utils/locale/settlement_center/cost_manage/physical_invoice';
import { InvoiceLocale } from '@/utils/locale/settlement_center/cost_manage/invoice';
import { StatementOfAccountLocale } from '@/utils/locale/settlement_center/cost_manage/statement_of_account';
import { BillManageLocale } from '@/utils/locale/settlement_center/cost_manage/bill_manage';
import { SetFeeScheduleLocale } from '@/utils/locale/settlement_center/system_manage/set_fee_schedule';
import { ChargingStandardLocale } from '@/utils/locale/settlement_center/system_manage/charging_standard';
import { NotOffSettingLocale } from '@/utils/locale/settlement_center/finance_manage/not_off_setting';
import { HasOffSettingLocale, OffSettingDetailLocale } from '@/utils/locale/settlement_center/finance_manage/has_off_setting';
import { CashBasisAccountingLocale } from '@/utils/locale/settlement_center/finance_manage/cash_basis_accounting';
import { AccountingBookLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/accounting_book';
import { VoucherGroupingRuleLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/voucher_grouping_rule';
import { EntryGroupingRuleLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/entry_grouping_rule';
import { SummaryRuleLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/summary_rule';
import { VoucherTypeLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/voucher_type';
import { CodeMappingLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/code_mapping';
import { AccountMappingLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/account_mapping';
import { PaymentApplicationLocale } from '@/utils/locale/settlement_center/cost_manage/payment_application';
import { PaymentApplicationFeeLocale } from '@/utils/locale/settlement_center/cost_manage/payment_application_fee';
import { PaymentApplicationBusinessLocale } from '@/utils/locale/settlement_center/cost_manage/payment_application_business';
import { ReleaseOrderVerificationLocale } from '@/utils/locale/settlement_center/cost_manage/release_order_verification';
import { ReleaseOrderVerificationFeeLocale } from '@/utils/locale/settlement_center/cost_manage/release_order_verification_fee';
import { BlReleaseLocale } from '@/utils/locale/settlement_center/cost_manage/bl_release';
import { ReconciliationRuleEngineLocale } from '@/utils/locale/settlement_center/cost_manage/reconciliation_rule_engine';
import { ExpenseReviewLocale } from '@/utils/locale/settlement_center/finance_manage/expense_review';
import { FeeAdjustmentFeeLocale, FeeAdjustmentLocale } from '@/utils/locale/settlement_center/finance_manage/fee_adjustment';
import { ActualPaymentLocale } from '@/utils/locale/settlement_center/finance_manage/actual_payment';
import { StatementObjectLocale } from '@/utils/locale/settlement_center/finance_manage/statement_object';
import { VoucherLogLocale } from '@/utils/locale/settlement_center/finance_manage/voucher_log';
import { VoucherDetailLocale } from '@/pages/settlement_center/finance_manage/voucher_log/voucher_detail';
import { BaseGoodsLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_goods';
import { BaseAmsPortLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_ams_port';
import { BaseEdiPortLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_edi_port';
import { BaseSeaportLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_seaport';
import { BaseRailwayPortLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_railway_port';
import { BaseExchangeRateLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_exchange_rate';
import { BaseTaxRateLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_tax_rate';
import { BaseTaxSystemLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_tax_system';
import { BaseTaxTypeLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_tax_type';
import { BaseSettlementMethodLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_settlement_method';
import { BaseSettlementMethodMapperLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_settlement_method_mapper';
import { BaseTradeLanesLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_trade_lanes';
import { BaseTradeLanesGroupingLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_trade_lanes_grouping';
import { BaseShipmentTypeLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_shipment_type';
import { BaseBusinessTypeLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_business_type';
import { BaseTransportationTermsLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_transportation_terms';
import { BaseTradeTermsLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_trade_terms';
import { BaseFreightTermsLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_freight_terms';
import { BaseBillTermsLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_bill_terms';
import { BaseContainerTeuLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_container_teu';
import { BaseCargoTypeLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_cargo_type';
import { BaseContainerTypeLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_container_type';
import { ContractsManageLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/contracts_manage';
import { BusinessPartnerLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/business_partner';
import { ContactLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/contact';
import { PortDestinationAgentLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/port_destination_agent';
import { InvoiceRequirementLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/invoice_requirement';
import { DeliveryAgentLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/delivery_agent';
import { SpaceCarrierLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/space_carrier';
import { EdiConfigLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/edi_config';
import { VisitCustomerLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/visit_customer';
import { InternalAgentSettlementLocale } from '@/utils/locale/settlement_center/cost_manage/internal_agent_settlement';
import { PartnerPerformanceRuleLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/partner_performance_rule';
import { AdvancedRuleConfigLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/advanced_rule_config';
import { KpiDefinitionLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/kpi_definition';
import { RuleKpiItemLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/rule_kpi_item';
import { KpiScoreReportLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/kpi_score_report';
import { CustomerLevelLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/customer_level';
import { CustomerTypeLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/customer_type';
import { CustomerIndustryLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/customer_industry';
import { ManageOrgLocale } from '@/utils/locale/dynamic_configuration_platform/org_manage/manage_org';
import { AdminOrgLocale } from '@/utils/locale/dynamic_configuration_platform/org_manage/admin_org';
import { JobPositionLocale } from '@/utils/locale/dynamic_configuration_platform/org_manage/job_position';
import { EmployeeCategoryLocale } from '@/utils/locale/dynamic_configuration_platform/org_manage/employee_category';
import { EmployeeManageLocale, PrimaryJobLocale, EmployeeBankAccountLocale } from '@/utils/locale/dynamic_configuration_platform/org_manage/employee_manage';
import { RoleManageLocale } from './dynamic_configuration_platform/identity/role_manage';
import { RoleGroupLocale } from '@/utils/locale/dynamic_configuration_platform/identity/role_group';
import { RoleTagsLocale } from '@/utils/locale/dynamic_configuration_platform/identity/role_tags';
import { FunctionPermissionByRoleLocale } from '@/utils/locale/dynamic_configuration_platform/identity/function_permission_by_role';
import { FunctionPermissionByUserLocale } from '@/utils/locale/dynamic_configuration_platform/identity/function_permission_by_user';
import { DataPermissionByRoleLocale } from '@/utils/locale/dynamic_configuration_platform/identity/data_permission_by_role';
import { DataPermissionByUserLocale } from '@/utils/locale/dynamic_configuration_platform/identity/data_permission_by_user';
import { BaseBankTypeLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_bank_type';
import { BaseBankBranchLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_bank_branch';
import { BasePeriodicBillingLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_periodic_billing';
import { BaseSettlementCycleLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_settlement_cycle';
import { BaseCompanySizeLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_company_size';
import { BaseCompanyNatureLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_company_nature';
import { BaseAccountPurposeLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_account_purpose';
import { BaseCorporateFundAccountLocale } from './dynamic_configuration_platform/basic_manage/base_corporate_fund_account';
import { BaseFundAccountCurrencyLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_fund_account_currency';
import { BaseCorporateCashAccountLocale } from '@/utils/locale/dynamic_configuration_platform/basic_manage/base_corporate_cash_account';
import { SysBusinessLogLocale } from '@/utils/locale/dynamic_configuration_platform/sys_manage/sys_business_log';
import { SysLoginLogLocale } from '@/utils/locale/dynamic_configuration_platform/sys_manage/sys_login_log';
import { SysOperatorLogLocale } from '@/utils/locale/dynamic_configuration_platform/sys_manage/sys_operator_log';
import { SysExceptionLogLocale } from '@/utils/locale/dynamic_configuration_platform/sys_manage/sys_exception_log';
import { SysOperatorLogReportLocale } from '@/utils/locale/dynamic_configuration_platform/sys_manage/sys_operator_log_report';
import { SysWarningTypeLocale } from '@/utils/locale/dynamic_configuration_platform/sys_manage/sys_warning_type';
import { SysWarningTypeParamLocale } from '@/utils/locale/dynamic_configuration_platform/sys_manage/sys_warning_type_param';
import { SysWarningTaskLocale } from '@/utils/locale/dynamic_configuration_platform/sys_manage/sys_warning_task';
import { JobListLocale } from '@/utils/locale/freight_forwarding/job_management/job_list';
import { JobDetailLocale } from '@/utils/locale/freight_forwarding/job_management/job_detail';
import { JobMonitoringLocale } from '@/utils/locale/freight_forwarding/job_management/monitoring';
import { MyJobsLocale } from '@/utils/locale/freight_forwarding/job_management/my_jobs';
import { TeamJobsLocale } from '@/utils/locale/freight_forwarding/job_management/team_jobs';
import { JobAssignmentLocale } from '@/utils/locale/freight_forwarding/job_management/job_assignment';
import { AssignmentRulesLocale } from '@/utils/locale/freight_forwarding/job_management/rules';
import { PerformanceAnalysisLocale } from '@/utils/locale/freight_forwarding/job_management/analysis';
import { BookingCommonLocale } from '@/utils/locale/freight_forwarding/booking_management/common';
import { BookingListLocale } from '@/utils/locale/freight_forwarding/booking_management/list';
import { BookingCreateLocale } from '@/utils/locale/freight_forwarding/booking_management/create';
import { WaybillListLocale } from '@/utils/locale/freight_forwarding/waybill_management/list';
import { WaybillCreateLocale } from '@/utils/locale/freight_forwarding/waybill_management/create';
import { WaybillQueryLocale } from '@/utils/locale/freight_forwarding/waybill_management/query';
import { WaybillTemplateLocale } from '@/utils/locale/freight_forwarding/waybill_management/template';
import { WaybillStatisticsLocale } from '@/utils/locale/freight_forwarding/waybill_management/statistics';
import { WaybillArchiveLocale } from '@/utils/locale/freight_forwarding/waybill_management/archive';
import { OrderListLocale } from '@/utils/locale/freight_forwarding/order_management/list';
import { OrderDetailLocale } from '@/utils/locale/freight_forwarding/order_management/detail';
import { OrderStatisticsLocale } from '@/utils/locale/freight_forwarding/order_management/statistics';
import { OrderQueryLocale } from '@/utils/locale/freight_forwarding/order_management/query';
import { OrderAuditLocale } from '@/utils/locale/freight_forwarding/order_management/audit';
import { OrderBreakdownLocale } from '@/utils/locale/freight_forwarding/order_management/breakdown';
import { BreakdownRulesLocale } from '@/utils/locale/freight_forwarding/order_management/breakdown_rules';
import { StandaloneServiceLocale } from '@/utils/locale/freight_forwarding/order_management/standalone_service';
import { ServiceConfigLocale } from '@/utils/locale/freight_forwarding/order_management/service_config';
import { ServiceTemplateLocale } from '@/utils/locale/freight_forwarding/order_management/service_template';
import { ServicePerformanceLocale } from '@/utils/locale/freight_forwarding/order_management/service_performance';
import { TrackingOverviewLocale } from '@/utils/locale/freight_forwarding/milestone_tracking/tracking_overview';
import { MilestoneConfigLocale } from '@/utils/locale/freight_forwarding/milestone_tracking/milestone_config';
import { RealtimeTrackingLocale } from '@/utils/locale/freight_forwarding/milestone_tracking/realtime_tracking';
import { ExceptionAlertLocale } from '@/utils/locale/freight_forwarding/milestone_tracking/exception_alert';
import { CustomerNotificationLocale } from '@/utils/locale/freight_forwarding/milestone_tracking/customer_notification';
import { TrackingReportLocale } from '@/utils/locale/freight_forwarding/milestone_tracking/tracking_report';
import { InterfaceManagementLocale } from '@/utils/locale/freight_forwarding/milestone_tracking/interface_management';
import { DocumentOverviewLocale } from '@/utils/locale/freight_forwarding/document_management/overview';
import { DocumentListLocale } from '@/utils/locale/freight_forwarding/document_management/list';
import { DocumentCreateLocale } from '@/utils/locale/freight_forwarding/document_management/create';
import { DocumentQueryLocale } from '@/utils/locale/freight_forwarding/document_management/query';
import { DocumentReviewLocale } from '@/utils/locale/freight_forwarding/document_management/review';
import { DocumentTemplateLocale } from '@/utils/locale/freight_forwarding/document_management/template';
import { DocumentSignatureLocale } from '@/utils/locale/freight_forwarding/document_management/signature';
import { DocumentVersionLocale } from '@/utils/locale/freight_forwarding/document_management/version';
import { DocumentDetailLocale } from '@/utils/locale/freight_forwarding/document_management/detail';
import { DocumentArchiveLocale } from '@/utils/locale/freight_forwarding/document_management/archive';
import { DocumentComplianceLocale } from '@/utils/locale/freight_forwarding/document_management/compliance';
import { DocumentBatchLocale } from '@/utils/locale/freight_forwarding/document_management/batch';
import { DocumentInterfaceLocale } from '@/utils/locale/freight_forwarding/document_management/interface';
import { DocumentReportLocale } from '@/utils/locale/freight_forwarding/document_management/report';
import { CostOverviewLocale } from '@/utils/locale/freight_forwarding/cost_management/cost_overview';
import { ReceivableCostLocale } from '@/utils/locale/freight_forwarding/cost_management/receivable_cost';
import { PayableCostLocale } from '@/utils/locale/freight_forwarding/cost_management/payable_cost';
import { CostReviewCenterLocale } from '@/utils/locale/freight_forwarding/cost_management/cost_review_center';
import { AllocationOverviewLocale } from '@/utils/locale/freight_forwarding/cost_management/allocation_overview';
import { AllocationRulesLocale } from '@/utils/locale/freight_forwarding/cost_management/allocation_rules';
import { ManualAdjustmentApprovalLocale } from '@/utils/locale/freight_forwarding/cost_management/manual_adjustment_approval';
import { AllocationHistoryLocale } from '@/utils/locale/freight_forwarding/cost_management/allocation_history';
import { DepartmentProfitAnalysisLocale } from '@/utils/locale/freight_forwarding/cost_management/department_profit_analysis';
import { FinancialDataSyncLocale } from '@/utils/locale/freight_forwarding/cost_management/financial_data_sync';
import { JobCenterLocale } from './customs_compliance/customs_job_management/job_center';
import { DashboardLocale } from './customs_compliance/customs_job_management/dashboard';
import { CreateJobLocale } from './customs_compliance/customs_job_management/create_job';
import { BatchOperationLocale } from './customs_compliance/customs_job_management/batch_operation';
import { JobStatisticsLocale } from './customs_compliance/customs_job_management/job_statistics';
import { JobArchivingLocale } from '@/utils/locale/customs_compliance/customs_job_management/job_archiving';
import { ScreeningTaskCenterLocale } from './customs_compliance/compliance_screening_management/screening_task_center';
import { InitiateScreeningLocale } from '@/utils/locale/customs_compliance/compliance_screening_management/initiate_screening';
import { ScreeningResultQueryLocale } from '@/utils/locale/customs_compliance/compliance_screening_management/screening_result_query';
import { HitProcessingLocale } from '@/utils/locale/customs_compliance/compliance_screening_management/hit_processing';
import { ExemptionRequestManagementLocale } from '@/utils/locale/customs_compliance/compliance_screening_management/exemption_request_management';
import ScreeningRuleConfigLocale from '@/utils/locale/customs_compliance/compliance_screening_management/screening_rule_config';
import { DatabaseManagementLocale } from '@/utils/locale/customs_compliance/compliance_screening_management/database_management';
import { ScreeningStatisticsReportLocale } from '@/utils/locale/customs_compliance/compliance_screening_management/screening_statistics_report';

export {
  OrdersLocale, OrderFeeLocale, FeeReconciliationLocale, OrderBillLocale,
  OrderDocumentLocale, CommonLocale, PhysicalInvoiceLocale, InvoiceLocale, StatementOfAccountLocale, BillManageLocale, SetFeeScheduleLocale, ChargingStandardLocale, NotOffSettingLocale,
  CashBasisAccountingLocale, HasOffSettingLocale, OffSettingDetailLocale, AccountingBookLocale, VoucherGroupingRuleLocale, EntryGroupingRuleLocale, SummaryRuleLocale, VoucherTypeLocale, CodeMappingLocale, AccountMappingLocale,
  PaymentApplicationLocale, PaymentApplicationFeeLocale, PaymentApplicationBusinessLocale, ReleaseOrderVerificationLocale, ReleaseOrderVerificationFeeLocale, BlReleaseLocale, ReconciliationRuleEngineLocale, ExpenseReviewLocale, FeeAdjustmentFeeLocale, FeeAdjustmentLocale,
  ActualPaymentLocale, StatementObjectLocale, VoucherLogLocale, VoucherDetailLocale, BaseGoodsLocale, BaseAmsPortLocale, BaseEdiPortLocale, BaseSeaportLocale, BaseRailwayPortLocale, BaseExchangeRateLocale, BaseTaxRateLocale,
  BaseSettlementMethodLocale, BaseTradeLanesLocale, BaseTradeLanesGroupingLocale, BaseShipmentTypeLocale, BaseBusinessTypeLocale, BaseTransportationTermsLocale, BaseTradeTermsLocale, BaseFreightTermsLocale, BaseBillTermsLocale,
  BaseContainerTeuLocale, BaseCargoTypeLocale, BaseContainerTypeLocale, ContractsManageLocale, BusinessPartnerLocale, ContactLocale, PortDestinationAgentLocale, InvoiceRequirementLocale, DeliveryAgentLocale,
  SpaceCarrierLocale, EdiConfigLocale, VisitCustomerLocale, InternalAgentSettlementLocale, PartnerPerformanceRuleLocale, AdvancedRuleConfigLocale, KpiDefinitionLocale, RuleKpiItemLocale, KpiScoreReportLocale,
  CustomerLevelLocale, CustomerTypeLocale, CustomerIndustryLocale, ManageOrgLocale, AdminOrgLocale, JobPositionLocale, EmployeeCategoryLocale, EmployeeManageLocale, PrimaryJobLocale, EmployeeBankAccountLocale,
  RoleManageLocale, RoleGroupLocale, RoleTagsLocale, FunctionPermissionByRoleLocale, FunctionPermissionByUserLocale, DataPermissionByRoleLocale, DataPermissionByUserLocale, BaseTaxSystemLocale, BaseTaxTypeLocale,
  BaseBankTypeLocale, BaseBankBranchLocale, BaseSettlementMethodMapperLocale, BasePeriodicBillingLocale, BaseSettlementCycleLocale, BaseCompanySizeLocale, BaseCompanyNatureLocale, BaseAccountPurposeLocale, BaseCorporateFundAccountLocale,
  BaseFundAccountCurrencyLocale, BaseCorporateCashAccountLocale, SysBusinessLogLocale, SysLoginLogLocale, SysOperatorLogLocale, SysExceptionLogLocale, SysOperatorLogReportLocale,
  SysWarningTypeLocale, SysWarningTypeParamLocale, SysWarningTaskLocale, JobListLocale,
  JobDetailLocale, JobMonitoringLocale, MyJobsLocale,
  TeamJobsLocale, JobAssignmentLocale, AssignmentRulesLocale, PerformanceAnalysisLocale,
  BookingCommonLocale, BookingListLocale, BookingCreateLocale,
  WaybillListLocale, WaybillCreateLocale, WaybillQueryLocale, WaybillTemplateLocale, WaybillStatisticsLocale, WaybillArchiveLocale,
  OrderListLocale, OrderDetailLocale, OrderStatisticsLocale,
  OrderQueryLocale, OrderAuditLocale, OrderBreakdownLocale, BreakdownRulesLocale, StandaloneServiceLocale, ServiceConfigLocale, ServiceTemplateLocale, ServicePerformanceLocale,
  TrackingOverviewLocale, MilestoneConfigLocale, RealtimeTrackingLocale, ExceptionAlertLocale, CustomerNotificationLocale, TrackingReportLocale, InterfaceManagementLocale,
  DocumentOverviewLocale, DocumentListLocale, DocumentCreateLocale, DocumentQueryLocale, DocumentReviewLocale, DocumentTemplateLocale, DocumentSignatureLocale, DocumentVersionLocale, DocumentDetailLocale,
  DocumentArchiveLocale, DocumentComplianceLocale, DocumentBatchLocale, DocumentInterfaceLocale, DocumentReportLocale,
  CostOverviewLocale, ReceivableCostLocale, PayableCostLocale, CostReviewCenterLocale,
  AllocationOverviewLocale, AllocationRulesLocale, ManualAdjustmentApprovalLocale, AllocationHistoryLocale, DepartmentProfitAnalysisLocale, FinancialDataSyncLocale, JobCenterLocale, DashboardLocale, CreateJobLocale, BatchOperationLocale, JobStatisticsLocale, JobArchivingLocale,
  ScreeningTaskCenterLocale, InitiateScreeningLocale, ScreeningResultQueryLocale, HitProcessingLocale, ExemptionRequestManagementLocale, ScreeningRuleConfigLocale, DatabaseManagementLocale, ScreeningStatisticsReportLocale,
};

export default {
  ...OrdersLocale, ...OrderFeeLocale, ...FeeReconciliationLocale, ...PhysicalInvoiceLocale, ...OrderBillLocale, ...OrderDocumentLocale, ...CommonLocale, ...InvoiceLocale, ...BillManageLocale, ...StatementOfAccountLocale,
  ...SetFeeScheduleLocale, ...ChargingStandardLocale, ...NotOffSettingLocale, ...HasOffSettingLocale, ...CashBasisAccountingLocale, ...OffSettingDetailLocale, ...AccountingBookLocale, ...VoucherGroupingRuleLocale, ...EntryGroupingRuleLocale,
  ...SummaryRuleLocale, ...VoucherTypeLocale, ...CodeMappingLocale, ...AccountMappingLocale, ...PaymentApplicationLocale, ...PaymentApplicationFeeLocale, ...PaymentApplicationBusinessLocale, ...ReleaseOrderVerificationLocale,
  ...ReleaseOrderVerificationFeeLocale, ...BlReleaseLocale, ...ReconciliationRuleEngineLocale, ...ExpenseReviewLocale, ...FeeAdjustmentFeeLocale, ...FeeAdjustmentLocale, ...ActualPaymentLocale, ...StatementObjectLocale,
  ...VoucherLogLocale, ...VoucherDetailLocale, ...BaseGoodsLocale, ...BaseAmsPortLocale, ...BaseEdiPortLocale, ...BaseSeaportLocale, ...BaseRailwayPortLocale, ...BaseExchangeRateLocale,
  ...BaseTaxRateLocale, ...BaseSettlementMethodLocale, ...BaseTradeLanesLocale, ...BaseTradeLanesGroupingLocale, ...BaseShipmentTypeLocale, ...BaseBusinessTypeLocale, ...BaseTransportationTermsLocale, ...BaseTradeTermsLocale,
  ...BaseFreightTermsLocale, ...BaseBillTermsLocale, ...BaseContainerTeuLocale, ...BaseCargoTypeLocale, ...BaseContainerTypeLocale, ...ContractsManageLocale, ...BusinessPartnerLocale, ...ContactLocale,
  ...PortDestinationAgentLocale, ...InvoiceRequirementLocale, ...DeliveryAgentLocale, ...SpaceCarrierLocale, ...EdiConfigLocale, ...VisitCustomerLocale, ...InternalAgentSettlementLocale,
  ...PartnerPerformanceRuleLocale, ...AdvancedRuleConfigLocale, ...KpiDefinitionLocale, ...RuleKpiItemLocale, ...KpiScoreReportLocale, ...CustomerLevelLocale, ...CustomerTypeLocale, ...CustomerIndustryLocale,
  ...ManageOrgLocale, ...AdminOrgLocale, ...JobPositionLocale, ...EmployeeCategoryLocale, ...EmployeeManageLocale, ...PrimaryJobLocale, ...EmployeeBankAccountLocale, ...RoleManageLocale, ...RoleGroupLocale, ...RoleTagsLocale,
  ...FunctionPermissionByRoleLocale, ...FunctionPermissionByUserLocale, ...DataPermissionByRoleLocale, ...DataPermissionByUserLocale, ...BaseTaxSystemLocale, ...BaseTaxTypeLocale,
  ...BaseBankTypeLocale, ...BaseBankBranchLocale, ...BaseSettlementMethodMapperLocale, ...BasePeriodicBillingLocale, ...BaseSettlementCycleLocale, ...BaseCompanySizeLocale, ...BaseCompanyNatureLocale, ...BaseAccountPurposeLocale,
  ...BaseCorporateFundAccountLocale, ...BaseFundAccountCurrencyLocale, ...BaseCorporateCashAccountLocale, ...SysBusinessLogLocale, ...SysLoginLogLocale, ...SysOperatorLogLocale, ...SysExceptionLogLocale,
  ...SysOperatorLogReportLocale, ...SysWarningTypeLocale, ...SysWarningTypeParamLocale, ...SysWarningTaskLocale, ...JobListLocale,
  ...JobDetailLocale, ...JobMonitoringLocale, ...MyJobsLocale,
  ...TeamJobsLocale, ...JobAssignmentLocale, ...AssignmentRulesLocale, ...PerformanceAnalysisLocale,
  ...BookingCommonLocale, ...BookingListLocale, ...BookingCreateLocale,
  ...WaybillListLocale, ...WaybillCreateLocale, ...WaybillQueryLocale, ...WaybillTemplateLocale, ...WaybillStatisticsLocale, ...WaybillArchiveLocale,
  ...OrderListLocale, ...OrderDetailLocale, ...OrderStatisticsLocale,
  ...OrderQueryLocale, ...StandaloneServiceLocale, ...ServiceConfigLocale, ...ServiceTemplateLocale, ...ServicePerformanceLocale, ...OrderAuditLocale, ...OrderBreakdownLocale, ...BreakdownRulesLocale,
  ...TrackingOverviewLocale, ...MilestoneConfigLocale, ...RealtimeTrackingLocale, ...ExceptionAlertLocale, ...CustomerNotificationLocale, ...TrackingReportLocale, ...InterfaceManagementLocale,
  ...DocumentOverviewLocale, ...DocumentListLocale, ...DocumentCreateLocale, ...DocumentQueryLocale, ...DocumentReviewLocale, ...DocumentTemplateLocale, ...DocumentSignatureLocale, ...DocumentVersionLocale, ...DocumentDetailLocale,
  ...DocumentArchiveLocale, ...DocumentComplianceLocale, ...DocumentBatchLocale, ...DocumentInterfaceLocale, ...DocumentReportLocale,
  ...CostOverviewLocale, ...ReceivableCostLocale, ...PayableCostLocale, ...CostReviewCenterLocale,
  ...AllocationOverviewLocale, ...AllocationRulesLocale, ...ManualAdjustmentApprovalLocale, ...AllocationHistoryLocale, ...DepartmentProfitAnalysisLocale, ...FinancialDataSyncLocale, ...JobCenterLocale, ...DashboardLocale, ...CreateJobLocale, ...BatchOperationLocale, ...JobArchivingLocale,
  ...ScreeningTaskCenterLocale, ...InitiateScreeningLocale, ...ScreeningResultQueryLocale, ...HitProcessingLocale, ...ExemptionRequestManagementLocale, ...ScreeningRuleConfigLocale, ...DatabaseManagementLocale, ...ScreeningStatisticsReportLocale,
};

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
import { EmployeeManageLocale,PrimaryJobLocale,EmployeeBankAccountLocale } from '@/utils/locale/dynamic_configuration_platform/org_manage/employee_manage';
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
export {
  OrdersLocale,OrderFeeLocale,FeeReconciliationLocale,OrderBillLocale,
  OrderDocumentLocale,CommonLocale,PhysicalInvoiceLocale,InvoiceLocale,StatementOfAccountLocale,BillManageLocale,SetFeeScheduleLocale,ChargingStandardLocale,NotOffSettingLocale,
  CashBasisAccountingLocale,HasOffSettingLocale,OffSettingDetailLocale,AccountingBookLocale,VoucherGroupingRuleLocale,EntryGroupingRuleLocale,SummaryRuleLocale,VoucherTypeLocale,CodeMappingLocale,AccountMappingLocale,
  PaymentApplicationLocale,PaymentApplicationFeeLocale,PaymentApplicationBusinessLocale,ReleaseOrderVerificationLocale,ReleaseOrderVerificationFeeLocale,BlReleaseLocale,ReconciliationRuleEngineLocale,ExpenseReviewLocale,FeeAdjustmentFeeLocale,FeeAdjustmentLocale,
  ActualPaymentLocale,StatementObjectLocale,VoucherLogLocale,VoucherDetailLocale,BaseGoodsLocale,BaseAmsPortLocale,BaseEdiPortLocale,BaseSeaportLocale,BaseRailwayPortLocale,BaseExchangeRateLocale,BaseTaxRateLocale,
  BaseSettlementMethodLocale,BaseTradeLanesLocale,BaseTradeLanesGroupingLocale,BaseShipmentTypeLocale,BaseBusinessTypeLocale,BaseTransportationTermsLocale,BaseTradeTermsLocale,BaseFreightTermsLocale,BaseBillTermsLocale,
  BaseContainerTeuLocale,BaseCargoTypeLocale,BaseContainerTypeLocale,ContractsManageLocale,BusinessPartnerLocale,ContactLocale,PortDestinationAgentLocale,InvoiceRequirementLocale,DeliveryAgentLocale,
  SpaceCarrierLocale,EdiConfigLocale,VisitCustomerLocale,InternalAgentSettlementLocale,PartnerPerformanceRuleLocale,AdvancedRuleConfigLocale,KpiDefinitionLocale,RuleKpiItemLocale,KpiScoreReportLocale,
  CustomerLevelLocale,CustomerTypeLocale,CustomerIndustryLocale,ManageOrgLocale,AdminOrgLocale,JobPositionLocale,EmployeeCategoryLocale,EmployeeManageLocale,PrimaryJobLocale,EmployeeBankAccountLocale,
  RoleManageLocale,RoleGroupLocale,RoleTagsLocale,FunctionPermissionByRoleLocale,FunctionPermissionByUserLocale,DataPermissionByRoleLocale,DataPermissionByUserLocale,BaseTaxSystemLocale,BaseTaxTypeLocale,
  BaseBankTypeLocale,BaseBankBranchLocale,BaseSettlementMethodMapperLocale,BasePeriodicBillingLocale,BaseSettlementCycleLocale,
};

export default {
  ...OrdersLocale,...OrderFeeLocale,...FeeReconciliationLocale,...PhysicalInvoiceLocale,...OrderBillLocale,...OrderDocumentLocale,...CommonLocale,...InvoiceLocale,...BillManageLocale,...StatementOfAccountLocale,
  ...SetFeeScheduleLocale,...ChargingStandardLocale,...NotOffSettingLocale,...HasOffSettingLocale,...CashBasisAccountingLocale,...OffSettingDetailLocale,...AccountingBookLocale,...VoucherGroupingRuleLocale,...EntryGroupingRuleLocale,
  ...SummaryRuleLocale,...VoucherTypeLocale,...CodeMappingLocale,...AccountMappingLocale,...PaymentApplicationLocale,...PaymentApplicationFeeLocale,...PaymentApplicationBusinessLocale,...ReleaseOrderVerificationLocale,
  ...ReleaseOrderVerificationFeeLocale,...BlReleaseLocale,...ReconciliationRuleEngineLocale,...ExpenseReviewLocale,...FeeAdjustmentFeeLocale,...FeeAdjustmentLocale,...ActualPaymentLocale,...StatementObjectLocale,
  ...VoucherLogLocale,...VoucherDetailLocale,...BaseGoodsLocale,...BaseAmsPortLocale,...BaseEdiPortLocale,...BaseSeaportLocale,...BaseRailwayPortLocale,...BaseExchangeRateLocale,
  ...BaseTaxRateLocale,...BaseSettlementMethodLocale,...BaseTradeLanesLocale,...BaseTradeLanesGroupingLocale,...BaseShipmentTypeLocale,...BaseBusinessTypeLocale,...BaseTransportationTermsLocale,...BaseTradeTermsLocale,
  ...BaseFreightTermsLocale,...BaseBillTermsLocale,...BaseContainerTeuLocale,...BaseCargoTypeLocale,...BaseContainerTypeLocale,...ContractsManageLocale,...BusinessPartnerLocale,...ContactLocale,
  ...PortDestinationAgentLocale,...InvoiceRequirementLocale,...DeliveryAgentLocale,...SpaceCarrierLocale,...EdiConfigLocale,...VisitCustomerLocale,...InternalAgentSettlementLocale,
  ...PartnerPerformanceRuleLocale,...AdvancedRuleConfigLocale,...KpiDefinitionLocale,...RuleKpiItemLocale,...KpiScoreReportLocale,...CustomerLevelLocale,...CustomerTypeLocale,...CustomerIndustryLocale,
  ...ManageOrgLocale,...AdminOrgLocale,...JobPositionLocale,...EmployeeCategoryLocale,...EmployeeManageLocale,...PrimaryJobLocale,...EmployeeBankAccountLocale,...RoleManageLocale,...RoleGroupLocale,...RoleTagsLocale,
  ...FunctionPermissionByRoleLocale,...FunctionPermissionByUserLocale,...DataPermissionByRoleLocale,...DataPermissionByUserLocale,...BaseTaxSystemLocale,...BaseTaxTypeLocale,
  ...BaseBankTypeLocale,...BaseBankBranchLocale,...BaseSettlementMethodMapperLocale,...BasePeriodicBillingLocale,...BaseSettlementCycleLocale
};
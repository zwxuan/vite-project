import React from "react";
const Currency = React.lazy(() => import("@/pages/basic_manage/dic_manage/currency"));
const Orders = React.lazy(() => import("@/pages/business_manage/index"));
const FeeReconciliation = React.lazy(() => import("@/pages/cost_manage/fee_reconciliation"));
// import FeeReconciliation from "@/pages/cost_manage/fee_reconciliation";
const FeeReconciliationCompare = React.lazy(() => import("@/pages/cost_manage/fee_reconciliation/recociliation/reconciliation"));
// import FeeReconciliationCompare from "@/pages/cost_manage/fee_reconciliation/recociliation/reconciliation";
const BillManage = React.lazy(() => import("@/pages/cost_manage/bill_manage"));
// import BillManage from "@/pages/cost_manage/bill_manage";
const StatementOfAccount = React.lazy(() => import("@/pages/cost_manage/statement_of_account"));
// import StatementOfAccount from "@/pages/cost_manage/statement_of_account";
const OrderFeeRelation = React.lazy(() => import("@/pages/cost_manage/order_fee_relation/index_relation"));
// import OrderFeeRelation from "@/pages/cost_manage/order_fee_relation/index_relation";
const OrderDetail = React.lazy(() => import("@/pages/business_manage/detail"));
// import OrderDetail from "@/pages/business_manage/detail";
const OrderFeeSplit = React.lazy(() => import("@/pages/cost_manage/order_fee_split"));
// import OrderFeeSplit from "@/pages/cost_manage/order_fee_split";
const LCLFeeShare = React.lazy(() => import("@/pages/cost_manage/lcl_fee_share"));
// import LCLFeeShare from "@/pages/cost_manage/lcl_fee_share";
const InvoiceDetail = React.lazy(() => import("@/pages/cost_manage/invoice/invoice_detail"));
// import InvoiceDetail from "@/pages/cost_manage/invoice/invoice_detail";
const Invoice = React.lazy(() => import("@/pages/cost_manage/invoice"));
// import Invoice from "@/pages/cost_manage/invoice";
const InvoiceIssuanceReceipt = React.lazy(() => import("@/pages/cost_manage/invoice_issuance_receipt"));
// import InvoiceIssuanceReceipt from "@/pages/cost_manage/invoice_issuance_receipt";
const PhysicalInvoice = React.lazy(() => import("@/pages/cost_manage/physical_invoice"));
// import PhysicalInvoice from "@/pages/cost_manage/physical_invoice";
// const ReconciliationRuleEngine = React.lazy(() => import("@/pages/cost_manage/reconciliation_rule_engine"));
import ReconciliationRuleEngine from "@/pages/cost_manage/reconciliation_rule_engine";
const PermissionManagement = React.lazy(() => import("@/pages/identity/permission"));
// import PermissionManagement from "@/pages/identity/permission";
const ExportLog = React.lazy(() => import("@/pages/basic_manage/log/export_log"));
// import ExportLog from "@/pages/basic_manage/log/export_log";
const ImportLog = React.lazy(() => import("@/pages/basic_manage/log/import_log"));
// import ImportLog from "@/pages/basic_manage/log/import_log";
const Login = React.lazy(() => import("@/pages/login"));
// import Login from "@/pages/login";
const SetFeeSchedule = React.lazy(() => import("@/pages/system_manage/set_fee_schedule"));
// import SetFeeSchedule from "@/pages/system_manage/set_fee_schedule";
const ChargingStandard = React.lazy(() => import("@/pages/system_manage/charging_standard"));
// import ChargingStandard from "@/pages/system_manage/charging_standard";
const NotOffSetting = React.lazy(() => import("@/pages/finance_manage/not_off_setting"));
// import NotOffSetting from "@/pages/finance_manage/not_off_setting";
const HasOffSetting = React.lazy(() => import("@/pages/finance_manage/has_off_setting"));
// import HasOffSetting from "@/pages/finance_manage/has_off_setting";
const VoucherGroupingRule = React.lazy(() => import("@/pages/basic_manage/voucher/voucher_grouping_rule"));
const EntryGroupingRule = React.lazy(() => import("@/pages/basic_manage/voucher/entry_grouping_rule"));
const AccountingBook = React.lazy(() => import("@/pages/basic_manage/voucher/accounting_book"));
// import AccountingBook from "@/pages/basic_manage/voucher/accounting_book";
// import VoucherGroupingRule from "@/pages/basic_manage/voucher/voucher_grouping_rule";
// import EntryGroupingRule from "@/pages/basic_manage/voucher/entry_grouping_rule";
const SummaryRule = React.lazy(() => import("@/pages/basic_manage/voucher/summary_rule"));
// import SummaryRule from "@/pages/basic_manage/voucher/summary_rule";
const VoucherType = React.lazy(() => import("@/pages/basic_manage/voucher/voucher_type"));
// import VoucherType from "@/pages/basic_manage/voucher/voucher_type";
const VoucherCodeMapping = React.lazy(() => import("@/pages/basic_manage/voucher/code_mapping"));
// import VoucherCodeMapping from "@/pages/basic_manage/voucher/code_mapping";
const AccountMapping = React.lazy(() => import("@/pages/basic_manage/voucher/account_mapping"));
// import AccountMapping from "@/pages/basic_manage/voucher/account_mapping";
const PaymentApplication = React.lazy(() => import("@/pages/cost_manage/payment_application"));
// import PaymentApplication from "@/pages/cost_manage/payment_application";
const ReleaseOrderVerification = React.lazy(() => import("@/pages/cost_manage/release_order_verification"));
// import ReleaseOrderVerification from "@/pages/cost_manage/release_order_verification";
const BlRelease = React.lazy(() => import("@/pages/cost_manage/bl_release"));
// import BlRelease from "@/pages/cost_manage/bl_release";
const ExpenseReview = React.lazy(() => import("@/pages/finance_manage/expense_review"));
const FeeAdjustment = React.lazy(() => import("@/pages/finance_manage/fee_adjustment"));
const ActualPayment = React.lazy(() => import("@/pages/finance_manage/actual_payment"));
// import ActualPayment from "@/pages/finance_manage/actual_payment";
const FinanceQuery  = React.lazy(() => import("@/pages/finance_manage/finance_query"));
// import FinanceQuery from "@/pages/finance_manage/finance_query";
const VoucherLog = React.lazy(() => import("@/pages/finance_manage/voucher_log"));
// import VoucherLog from "@/pages/finance_manage/voucher_log";
const SalesBusinessAmountReport = React.lazy(() => import("@/pages/report/sales_business_amount"));

// import SalesBusinessAmountReport from "@/pages/report/sales_business_amount";
const OutstandingReceivablesPayablesReport = React.lazy(() => import("@/pages/report/outstanding_receivables_payables"));
// import OutstandingReceivablesPayablesReport from "@/pages/report/outstanding_receivables_payables";
const NotReceivablesFeeReport = React.lazy(() => import("@/pages/report/not_receivables_fee"));
// import NotReceivablesFeeReport from "@/pages/report/not_receivables_fee";
const NotReceivablesOrderReport = React.lazy(() => import("@/pages/report/not_receivables_order"));
// import NotReceivablesOrderReport from "@/pages/report/not_receivables_order";
const SalesBusinessWeightReport = React.lazy(() => import("@/pages/report/sales_business_weight"));
// import SalesBusinessWeightReport from "@/pages/report/sales_business_weight";
const CustomerArrearsAnalysisReport = React.lazy(() => import("@/pages/report/customer_arrears_analysis"));
export {
  Currency,
  Orders,
  FeeReconciliation,
  FeeReconciliationCompare,
  BillManage,
  StatementOfAccount,
  OrderFeeRelation,
  OrderDetail,
  OrderFeeSplit,
  LCLFeeShare,
  InvoiceDetail,
  Invoice,
  InvoiceIssuanceReceipt,
  PhysicalInvoice,
  ReconciliationRuleEngine,
  PermissionManagement,
  ExportLog,
  ImportLog,
  Login,
  SetFeeSchedule,
  ChargingStandard,
  NotOffSetting,
  HasOffSetting,
  AccountingBook,
  VoucherGroupingRule,
  EntryGroupingRule,
  SummaryRule,
  VoucherType,
  VoucherCodeMapping,
  AccountMapping,
  PaymentApplication,
  ReleaseOrderVerification,
  BlRelease,
  ExpenseReview,
  FeeAdjustment,
  ActualPayment,
  FinanceQuery,
  VoucherLog,
  SalesBusinessAmountReport,
  OutstandingReceivablesPayablesReport,
  NotReceivablesFeeReport,
  NotReceivablesOrderReport,
  SalesBusinessWeightReport,
  CustomerArrearsAnalysisReport,
};
//router/index.tsx
import { createBrowserRouter,createMemoryRouter } from "react-router-dom";
import AppLayout from "@/layout/index";
import { Currency, Orders, FeeReconciliation,FeeReconciliationCompare,BillManage,StatementOfAccount,OrderFeeRelation,OrderFeeSplit,LCLFeeShare,ReconciliationRuleEngine
  , OrderDetail, PermissionManagement, ExportLog, ImportLog, Login, InvoiceDetail,Invoice, InvoiceIssuanceReceipt,PhysicalInvoice 
  , SetFeeSchedule,ChargingStandard,NotOffSetting,HasOffSetting,AccountingBook,VoucherGroupingRule,EntryGroupingRule
  ,SummaryRule,VoucherType,VoucherCodeMapping,AccountMapping,PaymentApplication,ReleaseOrderVerification,BlRelease,ExpenseReview
  ,FeeAdjustment,ActualPayment,FinanceQuery,VoucherLog,SalesBusinessAmountReport,OutstandingReceivablesPayablesReport
  ,NotReceivablesFeeReport,NotReceivablesOrderReport,SalesBusinessWeightReport,CustomerArrearsAnalysisReport,
  SalesProfitReport,
  DepartmentBusinessWeightReport,
  SingleTicketProfitStatisticsReport,
  OperatorShipmentSummaryReport,
  TransportationLineTeuReport,
  CustomerWeightProfitReport,
  AccountsReceivableAgingReport,
  NotPayFeeReport,
  NotPayOrderReport,
  BaseSeaPort,
  BaseAirPort,
  BaseRailwayPort,
  Demo,
  BaseExchangeRate,
  BaseTaxRate,
  BaseSettlementMethod,
  BaseTradeLanes,BaseTradeLanesGrouping,BaseGoods,
  BaseShipmentType,
  BaseBusinessType,
  BaseTransportationTerms,
  BaseTradeTerms} from "./imports";
import RouterGuard from "@/components/router_guard";

const routers = createMemoryRouter([
  {
    path: "/",
    element: (
      <RouterGuard>
        <AppLayout />
      </RouterGuard>),
    children: [
      {
        path: "/demo",
        handle: { title: '测试' },
        element: (
            <Demo />
          )
      },
      {
        path: "/currency",
        handle: { title: '币制管理' },
        element: (
          <RouterGuard>
            <Currency />
          </RouterGuard>),
      },
      {
        path: "/base_tax_rate",
        handle: { title: '税率管理' },
        element: (
          <RouterGuard>
            <BaseTaxRate />
          </RouterGuard>),
      },
      {
        path: "/base_settlement_method",
        handle: { title: '结算方式' },
        element: (
          <RouterGuard>
            <BaseSettlementMethod />
          </RouterGuard>),
      },
      {
        path: "/base_trade_lanes",
        handle: { title: '航线' },
        element: (
          <RouterGuard>
            <BaseTradeLanes />
          </RouterGuard>),
      },
      {
        path: "/base_trade_lanes_grouping",
        handle: { title: '航线归类' },
        element: (
          <RouterGuard>
            <BaseTradeLanesGrouping />
          </RouterGuard>),
      },
      {
        path: "/base_shipment_type",
        handle: { title: '出运类型' },
        element: (
          <RouterGuard>
            <BaseShipmentType />
          </RouterGuard>),
      },
      {
        path: "/base_business_type",
        handle: { title: '业务类型' },
        element: (
          <RouterGuard>
            <BaseBusinessType />
          </RouterGuard>),
      },
      {
        path: "/base_transportation_terms",
        handle: { title: '运输条款' },
        element: (
          <RouterGuard>
            <BaseTransportationTerms />
          </RouterGuard>),
      },
      {
        path: "/base_trade_terms",
        handle: { title: '贸易条款' },
        element: (
          <RouterGuard>
            <BaseTradeTerms />
          </RouterGuard>),
      },
      {
        path: "/base_exchange_rate",
        handle: { title: '汇率管理' },
        element: (
          <RouterGuard>
            <BaseExchangeRate />
          </RouterGuard>),
      },
      {
        path: "/base_goods",
        handle: { title: '海关商品' },
        element: (
          <RouterGuard>
            <BaseGoods />
          </RouterGuard>),
      },
      {
        path: "/base_seaport",
        handle: { title: '海港' },
        element: (
          <RouterGuard>
            <BaseSeaPort />
          </RouterGuard>),
      },
      {
        path: "/base_airport",
        handle: { title: '空港' },
        element: (
          <RouterGuard>
            <BaseAirPort />
          </RouterGuard>),
      },
      {
        path: "/base_railwayport",
        handle: { title: '铁港' },
        element: (
          <RouterGuard>
            <BaseRailwayPort />
          </RouterGuard>),
      },
      {
        path: "/orders",
        handle: { title: '订单管理' },
        element: (
          <RouterGuard>
            <Orders />
          </RouterGuard>),
      },
      {
        path: "/orders/detail",
        handle: { title: '订单明细' },
        element: (
          <RouterGuard>
            <OrderDetail />
          </RouterGuard>),
      },
      {
        path: "/fee_reconciliation",
        handle: { title: '对账' },
        element: (
          <RouterGuard>
            <FeeReconciliation />
          </RouterGuard>),
      },
      {
        path: "/fee_reconciliation/compare",
        handle: { title: '自动对账' }, 
        element: (
          <RouterGuard>
            <FeeReconciliationCompare />
          </RouterGuard>),
      },
      {
        path: "/bill_manage",
        handle: { title: '账单' },
        element: (
          <RouterGuard>
            <BillManage />
          </RouterGuard>),
      },
      {
        path: "/statement_of_account",
        handle: { title: '对账单' },
        element: (
          <RouterGuard>
            <StatementOfAccount />
          </RouterGuard>),
      },
      {
        path: "/order_fee_relation",
        handle: { title: '关联交易' },
        element: (
          <RouterGuard>
            <OrderFeeRelation />
          </RouterGuard>),
      },
      {
        path: "/order_fee_split",
        handle: { title: '费用拆分' },
        element: (
          <RouterGuard>
            <OrderFeeSplit />
          </RouterGuard>),
      },
      {
        path: "/lcl_fee_share",
        handle: { title: '拼箱分摊模式' },
        element: (
          <RouterGuard>
            <LCLFeeShare />
          </RouterGuard>),
      },
      {
        path: "/reconciliation_rule_engine",
        handle: { title: '对账规则引擎配置' },
        element: (
          <RouterGuard>
            <ReconciliationRuleEngine />
          </RouterGuard>),
      },
      {
        path: "/invoice_detail",
        handle: { title: '发票明细' },
        element: (
          <RouterGuard>
            <InvoiceDetail />
          </RouterGuard>),
      },
      {
        path: "/receipt_invoice",
        handle: { title: '收款发票' },
        element: (
          <RouterGuard>
            <Invoice />
          </RouterGuard>),
      },
      {
        path: "/receipt_invoice",
        handle: { title: '收款发票' },
        element: (
          <RouterGuard>
            <Invoice />
          </RouterGuard>),
      },
      {
        path: "/physical_invoice_receipt",
        handle: { title: '实体收款发票' },
        element: (
          <RouterGuard>
            <PhysicalInvoice />
          </RouterGuard>),
      },
      {
        path: "/payment_invoice",
        handle: { title: '付款发票' },
        element: (
          <RouterGuard>
            <Invoice />
          </RouterGuard>),
      },
      {
        path: "/physical_invoice_payment",
        handle: { title: '实体付款发票' },
        element: (
          <RouterGuard>
            <PhysicalInvoice />
          </RouterGuard>),
      },
      {
        path: "/invoice_issuance_receipt",
        handle: { title: '开票|收票' },
        element: (
          <RouterGuard>
            <InvoiceIssuanceReceipt />
          </RouterGuard>),
      },
      {
        path: "/payment_application",
        handle: { title: '付款申请' },
        element: (
          <RouterGuard>
            <PaymentApplication />
          </RouterGuard>),
      },
      {
        path: "/release_order_verification",
        handle: { title: '放单审核' },
        element: (
          <RouterGuard>
            <ReleaseOrderVerification />
          </RouterGuard>),
      },
      {
        path: "/bl_release",
        handle: { title: '提单放单' },
        element: (
          <RouterGuard>
            <BlRelease />
          </RouterGuard>),
      },
      {
        path: "/finance_query",
        handle: { title: '综合财务查询' },
        element: (
          <RouterGuard>
            <FinanceQuery />
          </RouterGuard>),
      },
      {
        path: "/voucher_log",
        handle: { title: '凭证查询' },
        element: (
          <RouterGuard>
            <VoucherLog />
          </RouterGuard>),
      },
      {
        path: "/identity/permission",
        handle: { title: '权限分配' },
        element: (
          <RouterGuard>
            <PermissionManagement />
          </RouterGuard>),
      },
      {
        path: "/exportlog",
        handle: { title: '导出日志' },
        element: (
          <RouterGuard>
            <ExportLog />
          </RouterGuard>),
      },
      {
        path: "/importlog",
        handle: { title: '导入日志' },
        element: (
          <RouterGuard>
            <ImportLog />
          </RouterGuard>),
      },
      {
        path: "/set_fee_schedule",
        handle: { title: '费用方案' },
        element: (
          <RouterGuard>
            <SetFeeSchedule />
          </RouterGuard>),
      },
      {
        path: "/charging_standard",
        handle: { title: '计费标准' },
        element: (
          <RouterGuard>
            <ChargingStandard />
          </RouterGuard>),
      },
      {
        path: "/actual_payment",
        handle: { title: '实收实付' },
        element: (
          <RouterGuard>
            <ActualPayment />
          </RouterGuard>),
      },
      {
        path: "/not_off_setting",
        handle: { title: '未核销列表' },
        element: (
          <RouterGuard>
            <NotOffSetting />
          </RouterGuard>),
      },
      {
        path: "/has_off_setting",
        handle: { title: '已核销列表' },
        element: (
          <RouterGuard>
            <HasOffSetting />
          </RouterGuard>),
      },
      {
        path: "/expense_review",
        handle: { title: '费用审核' },
        element: (
          <RouterGuard>
            <ExpenseReview />
          </RouterGuard>),
      },
      {
        path: "/fee_adjustment",
        handle: { title: '费用调整' },
        element: (
          <RouterGuard>
            <FeeAdjustment />
          </RouterGuard>),
      },
      {
        path: "/accounting_book",
        handle: { title: '账套设置' },
        element: (
          <RouterGuard>
            <AccountingBook />
          </RouterGuard>),
      },
      {
        path: "/voucher_grouping_rule",
        handle: { title: '凭证分组规则' },
        element: (
          <RouterGuard>
            <VoucherGroupingRule />
          </RouterGuard>),
      },
      {
        path: "/entry_grouping_rule",
        handle: { title: '凭证分录规则' },
        element: (
          <RouterGuard>
            <EntryGroupingRule />
          </RouterGuard>),
      },
      {
        path: "/entry_summary_rule",
        handle: { title: '分录摘要规则' },
        element: (
          <RouterGuard>
            <SummaryRule />
          </RouterGuard>),
      },
      {
        path: "/voucher_type",
        handle: { title: '凭证类型' },
        element: (
          <RouterGuard>
            <VoucherType />
          </RouterGuard>),
      },
      {
        path: "/voucher_code_mapping",
        handle: { title: '编码映射' },
        element: (
          <RouterGuard>
            <VoucherCodeMapping />
          </RouterGuard>),
      },
      {
        path: "/account_mapping",
        handle: { title: '科目映射' },
        element: (
          <RouterGuard>
            <AccountMapping />
          </RouterGuard>),
      },
      {
        path: "/sales_business_amount_report",
        handle: { title: '业务对比分析表' },
        element: (
          <RouterGuard>
            <SalesBusinessAmountReport />
          </RouterGuard>),
      },
      {
        path: "/outstanding_receivables_payables_report",
        handle: { title: '未收未付统计对账表' },
        element: (
          <RouterGuard>
            <OutstandingReceivablesPayablesReport />
          </RouterGuard>),
      },
      {
        path: "/not_receivables_fee_report",
        handle: { title: '未收对账表（按费用明细）' },
        element: (
          <RouterGuard>
            <NotReceivablesFeeReport />
          </RouterGuard>),
      },
      {
        path: "/not_receivables_order_report",
        handle: { title: '未收对账表（按业务单号明细）' },
        element: (
          <RouterGuard>
            <NotReceivablesOrderReport />
          </RouterGuard>),
      },
      {
        path: "/sales_business_weight_report",
        handle: { title: '销售箱量统计表' },
        element: (
          <RouterGuard>
            <SalesBusinessWeightReport />
          </RouterGuard>),
      },
      {
        path: "/customer_arrears_analysis_report",
        handle: { title: '客户欠款分析表' },
        element: (
          <RouterGuard>
            <CustomerArrearsAnalysisReport />
          </RouterGuard>),
      },
      {
        path: "/sales_profit_report",
        handle: { title: '销售毛利润统计表' },
        element: (
          <RouterGuard>
            <SalesProfitReport />
          </RouterGuard>),
      },
      {
        path: "/department_business_weight_report",
        handle: { title: '接单部门箱量利润汇总表' },
        element: (
          <RouterGuard>
            <DepartmentBusinessWeightReport />
          </RouterGuard>),
      },
      {
        path: "/single_ticket_profit_statistics_report",
        handle: { title: '单票利润统计' },
        element: (
          <RouterGuard>
            <SingleTicketProfitStatisticsReport />
          </RouterGuard>),
      },
      {
        path: "/operator_shipment_summary_report",
        handle: { title: '操作员票数箱量利润汇总表' },
        element: (
          <RouterGuard>
            <OperatorShipmentSummaryReport />
          </RouterGuard>),
      },
      {
        path: "/transportation_line_teu_report",
        handle: { title: '航线货量分析' },
        element: (
          <RouterGuard>
            <TransportationLineTeuReport />
          </RouterGuard>),
      },
      {
        path: "/customer_weight_profit_report",
        handle: { title: '客户箱量利润汇总表' },
        element: (
          <RouterGuard>
            <CustomerWeightProfitReport />
          </RouterGuard>),
      },
      {
        path: "/accounts_receivable_aging_report",
        handle: { title: '应收未收对账表（按业务单号）' },
        element: (
          <RouterGuard>
            <AccountsReceivableAgingReport />
          </RouterGuard>),
      },
      {
        path: "/not_pay_fee_report",
        handle: { title: '未付对账表（按费用明细）' },
        element: (
          <RouterGuard>
            <NotPayFeeReport />
          </RouterGuard>),
      },
      {
        path: "/not_pay_order_report",
        handle: { title: '未付对账表（按业务单号）' },
        element: (
          <RouterGuard>
            <NotPayOrderReport />
          </RouterGuard>),
      },
    ], // 如果需要子路由，可以在这里添加
  },
  {
    path: "/login",
    element: <Login />,
  },
]); 
 
export default routers;
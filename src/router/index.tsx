//router/index.tsx
import { createBrowserRouter,createMemoryRouter } from "react-router-dom";
import AppLayout from "@/layout/index";
import { Currency, Orders, FeeReconciliation,BillManage,StatementOfAccount,OrderFeeRelation,OrderFeeSplit,LCLFeeShare,ReconciliationRuleEngine, OrderDetail, PermissionManagement, ExportLog, ImportLog, Login, InvoiceDetail,Invoice, InvoiceIssuanceReceipt } from "./imports";
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
        path: "/currency",
        handle: { title: '币制管理' },
        element: (
          <RouterGuard>
            <Currency />
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
        path: "/payment_invoice",
        handle: { title: '付款发票' },
        element: (
          <RouterGuard>
            <Invoice />
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
    ], // 如果需要子路由，可以在这里添加
  },
  {
    path: "/login",
    element: <Login />,
  },
]); 
 
export default routers;
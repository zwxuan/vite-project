//router/index.tsx
import { createBrowserRouter, createMemoryRouter, Outlet } from "react-router-dom";
import AppLayout from "@/layout/index";
import {
  Currency, Orders, FeeReconciliation, FeeReconciliationCompare, BillManage, StatementOfAccount, OrderFeeRelation, OrderFeeSplit, LCLFeeShare, ReconciliationRuleEngine
  , OrderDetail, PermissionManagementUser, ExportLog, ImportLog, Login, InvoiceDetail, Invoice, InvoiceIssuanceReceipt, PhysicalInvoice
  , SetFeeSchedule, ChargingStandard, NotOffSetting, HasOffSetting, AccountingBook, VoucherGroupingRule, EntryGroupingRule
  , SummaryRule, VoucherType, VoucherCodeMapping, AccountMapping, PaymentApplication, ReleaseOrderVerification, BlRelease, ExpenseReview
  , FeeAdjustment, ActualPayment, FinanceQuery, VoucherLog, SalesBusinessAmountReport, OutstandingReceivablesPayablesReport
  , NotReceivablesFeeReport, NotReceivablesOrderReport, SalesBusinessWeightReport, CustomerArrearsAnalysisReport,
  SalesProfitReport, DepartmentBusinessWeightReport, SingleTicketProfitStatisticsReport, OperatorShipmentSummaryReport, TransportationLineTeuReport, CustomerWeightProfitReport, AccountsReceivableAgingReport, NotPayFeeReport, NotPayOrderReport, BaseSeaPort, BaseAirPort, BaseRailwayPort, Demo, BaseExchangeRate,
  BaseTaxRate, BaseSettlementMethod, BaseTradeLanes, BaseTradeLanesGrouping, BaseGoods, BaseShipmentType, BaseBusinessType, BaseTransportationTerms, BaseTradeTerms, BaseFreightTerms, BaseBillTerms, BaseContainerTeu, BaseCargoType, BaseContainerType, ContractsManage, BusinessPartner,
  ParterDetail,
  InternalAgentSettlement,
  PartnerPerformance,
  ContainerLoading,
  Home,
  CustomerLevel,
  CustomerType,
  CustomerIndustry,
  ManageOrg,
  AdminOrg,
  ChainMap,
  AdminOrgDetail,
  ManageOrgDetail,
  Department,
  JobPosition,
  EmployeeCategory,
  EmployeeManage,
  EmployeeManageDetail,
  MenuManage,
  RoleManage,
  RoleManageDetail,
  Lev1Department,
  RoleGroup,
  RoleTags,
  FunctionPermissionRole,
  PermissionManagementPost,
  FunctionPermissionUser,
  DataPermissionRole,
  DataPermissionUser,
  BaseTaxSystem,
  BaseTaxType,
  BaseBankType,
  BaseBankBranch,
  BaseSettlementMethodMapper,
  BasePeriodicBilling,
  BaseSettlementCycle,
  BaseCompanySize,
  BaseCompanyNature,
  BaseAccountPurpose,
  BaseCorporateFundAccount,
  AccountDetail,
  BaseCorporateCashAccount,
  SysBusinessLog,
  SysLoginLog,
  SysOperatorLog,
  SysExceptionLog,
  SysOperatorLogReport,
  SysWarningType,
  SysWarningTypeDetail,
  SysWarningTask,
  SysWarningTaskDetail,
} from "./imports";
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
        index: true,
        element: (
          <RouterGuard>
            <Home />
          </RouterGuard>
        )
      },
      {
        path: "/demo",
        handle: { title: '测试' },
        element: (
          <Demo />
        )
      },
      {
        path: "/basic_finance",
        handle: { title: '财务基础数据' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "currency",
            handle: { title: '币制管理' },
            element: (
              <RouterGuard>
                <Currency />
              </RouterGuard>),
          },
          {
            path: "base_tax_system",
            handle: { title: '税制档案' },
            element: (
              <RouterGuard>
                <BaseTaxSystem />
              </RouterGuard>),
          },
          {
            path: "base_tax_type",
            handle: { title: '税种档案' },
            element: (
              <RouterGuard>
                <BaseTaxType />
              </RouterGuard>),
          },
          {
            path: "base_tax_rate",
            handle: { title: '税率档案' },
            element: (
              <RouterGuard>
                <BaseTaxRate />
              </RouterGuard>),
          },
          {
            path: "base_bank_type",
            handle: { title: '银行类别' },
            element: (
              <RouterGuard>
                <BaseBankType />
              </RouterGuard>),
          },
          {
            path: "base_bank_branch",
            handle: { title: '银行网点' },
            element: (
              <RouterGuard>
                <BaseBankBranch />
              </RouterGuard>),
          },
          {
            path: "base_settlement_method",
            handle: { title: '结算方式' },
            element: (
              <RouterGuard>
                <BaseSettlementMethod />
              </RouterGuard>),
          },
          {
            path: "base_settlement_method_mapper",
            handle: { title: '结算方式映射' },
            element: (
              <RouterGuard>
                <BaseSettlementMethodMapper />
              </RouterGuard>),
          },
          {
            path: "base_periodic_billing",
            handle: { title: '开票周期' },
            element: (
              <RouterGuard>
                <BasePeriodicBilling />
              </RouterGuard>),
          },
          {
            path: "base_settlement_cycle",
            handle: { title: '结算周期' },
            element: (
              <RouterGuard>
                <BaseSettlementCycle />
              </RouterGuard>),
          },
          {
            path: "base_exchange_rate",
            handle: { title: '汇率管理' },
            element: (
              <RouterGuard>
                <BaseExchangeRate />
              </RouterGuard>),
          },
        ]
      },

      // 业务基础数据
      {
        path: "/base_business_manage",
        handle: { title: '业务基础数据' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "base_trade_lanes",
            handle: { title: '航线' },
            element: (
              <RouterGuard>
                <BaseTradeLanes />
              </RouterGuard>),
          },
          {
            path: "base_trade_lanes_grouping",
            handle: { title: '航线归类' },
            element: (
              <RouterGuard>
                <BaseTradeLanesGrouping />
              </RouterGuard>),
          },
          {
            path: "base_shipment_type",
            handle: { title: '出运类型' },
            element: (
              <RouterGuard>
                <BaseShipmentType />
              </RouterGuard>),
          },
          {
            path: "base_business_type",
            handle: { title: '业务类型' },
            element: (
              <RouterGuard>
                <BaseBusinessType />
              </RouterGuard>),
          },
          {
            path: "base_transportation_terms",
            handle: { title: '运输条款' },
            element: (
              <RouterGuard>
                <BaseTransportationTerms />
              </RouterGuard>),
          },
          {
            path: "base_trade_terms",
            handle: { title: '贸易条款' },
            element: (
              <RouterGuard>
                <BaseTradeTerms />
              </RouterGuard>),
          },
          {
            path: "base_freight_terms",
            handle: { title: '运费条款' },
            element: (
              <RouterGuard>
                <BaseFreightTerms />
              </RouterGuard>),
          },
          {
            path: "base_bill_terms",
            handle: { title: '提单条款' },
            element: (
              <RouterGuard>
                <BaseBillTerms />
              </RouterGuard>),
          },
          {
            path: "base_cargo_type",
            handle: { title: '货物类型' },
            element: (
              <RouterGuard>
                <BaseCargoType />
              </RouterGuard>),
          },
          {
            path: "base_container_type",
            handle: { title: '箱型种类' },
            element: (
              <RouterGuard>
                <BaseContainerType />
              </RouterGuard>),
          },
          {
            path: "base_container_teu",
            handle: { title: '箱型TEU' },
            element: (
              <RouterGuard>
                <BaseContainerTeu />
              </RouterGuard>),
          },

          {
            path: "base_goods",
            handle: { title: '海关商品' },
            element: (
              <RouterGuard>
                <BaseGoods />
              </RouterGuard>),
          },
          {
            path: "base_seaport",
            handle: { title: '海港' },
            element: (
              <RouterGuard>
                <BaseSeaPort />
              </RouterGuard>),
          },
          {
            path: "base_airport",
            handle: { title: '空港' },
            element: (
              <RouterGuard>
                <BaseAirPort />
              </RouterGuard>),
          },
          {
            path: "base_railwayport",
            handle: { title: '铁港' },
            element: (
              <RouterGuard>
                <BaseRailwayPort />
              </RouterGuard>),
          },
        ]
      },
      // 企业基础数据
      {
        path: "/basic_company",
        handle: { title: '企业基础数据' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "base_company_size",
            handle: { title: '企业规模' },
            element: <BaseCompanySize />,
          },
          {
            path: "base_company_nature",
            handle: { title: '企业性质' },
            element: <BaseCompanyNature />,
          },
          {
            path: "base_account_purpose",
            handle: { title: '账户用途' },
            element: <BaseAccountPurpose />,
          },
          {
            path: "base_corporate_fund_account",
            handle: { title: '企业资金账户' },
            element: <BaseCorporateFundAccount />,
          },
          {
            path: "base_corporate_fund_account/detail",
            handle: { title: '企业资金账户详情' },
            element: <AccountDetail />,
          },
          {
            path: "base_corporate_cash_account",
            handle: { title: '企业现金账户' },
            element: <BaseCorporateCashAccount />,
          },
        ]
      },
      // 合作伙伴
      {
        path: "/cooperation_party",
        handle: { title: '合作伙伴' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "contracts_manage",
            handle: { title: '合同管理' },
            element: <ContractsManage />,
          },
          {
            path: "business_partner",
            handle: { title: '合作伙伴' },
            element: <BusinessPartner />,
          },
          {
            path: "business_partner/detail",
            handle: { title: '基础信息' },
            element: <ParterDetail />,
          },
          {
            path: "partner_performance_rule",
            handle: { title: '绩效规则' },
            element: <PartnerPerformance />,
          },
          {
            path: "customer_level",
            handle: { title: '客户级别' },
            element: <CustomerLevel />,
          },
          {
            path: "customer_type",
            handle: { title: '客户分类' },
            element: <CustomerType />,
          },
          {
            path: "customer_industry",
            handle: { title: '客户行业' },
            element: <CustomerIndustry />,
          },
        ]
      },
      //托书管理
      {
        path: "/entrust_manage",
        handle: { title: '托书管理' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "orders",
            handle: { title: '订单管理' },
            element: (
              <RouterGuard>
                <Orders />
              </RouterGuard>),
          },
          {
            path: "orders/detail",
            handle: { title: '订单明细' },
            element: (
              <RouterGuard>
                <OrderDetail />
              </RouterGuard>),
          },
        ]
      },
      // 费用管理
      {
        path: "/cost_manage",
        handle: { title: '费用管理' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "fee_reconciliation",
            handle: { title: '对账' },
            element: (
              <RouterGuard>
                <FeeReconciliation />
              </RouterGuard>),
          },
          {
            path: "fee_reconciliation/compare",
            handle: { title: '自动对账' },
            element: (
              <RouterGuard>
                <FeeReconciliationCompare />
              </RouterGuard>),
          },
          {
            path: "bill_manage",
            handle: { title: '账单' },
            element: (
              <RouterGuard>
                <BillManage />
              </RouterGuard>),
          },
          {
            path: "statement_of_account",
            handle: { title: '对账单' },
            element: (
              <RouterGuard>
                <StatementOfAccount />
              </RouterGuard>),
          },
          {
            path: "order_fee_relation",
            handle: { title: '关联交易' },
            element: (
              <RouterGuard>
                <OrderFeeRelation />
              </RouterGuard>),
          },
          {
            path: "order_fee_split",
            handle: { title: '费用拆分' },
            element: (
              <RouterGuard>
                <OrderFeeSplit />
              </RouterGuard>),
          },
          {
            path: "lcl_fee_share",
            handle: { title: '拼箱分摊模式' },
            element: (
              <RouterGuard>
                <LCLFeeShare />
              </RouterGuard>),
          },
          {
            path: "internal_agent_settlement",
            handle: { title: '内部代理结算' },
            element: (
              <RouterGuard>
                <InternalAgentSettlement />
              </RouterGuard>),
          },
          {
            path: "reconciliation_rule_engine",
            handle: { title: '对账规则引擎配置' },
            element: (
              <RouterGuard>
                <ReconciliationRuleEngine />
              </RouterGuard>),
          },
        ]
      },
      // 发票管理
      {
        path: "/invoice_manage",
        handle: { title: '发票管理' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "invoice_detail",
            handle: { title: '发票明细' },
            element: (
              <RouterGuard>
                <InvoiceDetail />
              </RouterGuard>),
          },
          {
            path: "receipt_invoice",
            handle: { title: '收款发票' },
            element: (
              <RouterGuard>
                <Invoice />
              </RouterGuard>),
          },
          {
            path: "receipt_invoice",
            handle: { title: '收款发票' },
            element: (
              <RouterGuard>
                <Invoice />
              </RouterGuard>),
          },
          {
            path: "physical_invoice_receipt",
            handle: { title: '实体收款发票' },
            element: (
              <RouterGuard>
                <PhysicalInvoice />
              </RouterGuard>),
          },
          {
            path: "payment_invoice",
            handle: { title: '付款发票' },
            element: (
              <RouterGuard>
                <Invoice />
              </RouterGuard>),
          },
          {
            path: "physical_invoice_payment",
            handle: { title: '实体付款发票' },
            element: (
              <RouterGuard>
                <PhysicalInvoice />
              </RouterGuard>),
          },
          {
            path: "invoice_issuance_receipt",
            handle: { title: '开票|收票' },
            element: (
              <RouterGuard>
                <InvoiceIssuanceReceipt />
              </RouterGuard>),
          },
        ]
      },
      // 付款申请
      {
        path: "/payment_apply",
        handle: { title: '付款申请' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "payment_application",
            handle: { title: '付款申请' },
            element: (
              <RouterGuard>
                <PaymentApplication />
              </RouterGuard>),
          },
        ]
      },
      // 主单放单管理
      {
        path: "/main_order",
        handle: { title: '主单放单管理' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "release_order_verification",
            handle: { title: '放单审核' },
            element: (
              <RouterGuard>
                <ReleaseOrderVerification />
              </RouterGuard>),
          },
          {
            path: "bl_release",
            handle: { title: '提单放单' },
            element: (
              <RouterGuard>
                <BlRelease />
              </RouterGuard>),
          },
        ]
      },
      // 综合财务查询
      {
        path: "/finance_query",
        handle: { title: '综合财务查询' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "finance_query",
            handle: { title: '综合财务查询' },
            element: (
              <RouterGuard>
                <FinanceQuery />
              </RouterGuard>),
          },
          {
            path: "voucher_log",
            handle: { title: '凭证查询' },
            element: (
              <RouterGuard>
                <VoucherLog />
              </RouterGuard>),
          },
        ]
      },

      // 组织机构
      {
        path: "/org",
        handle: { title: '组织机构' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "manage_org",
            handle: { title: '管理组织' },
            element: (
              <RouterGuard>
                <ManageOrg />
              </RouterGuard>),
          },
          {
            path: "manage_org/detail",
            handle: { title: '管理组织明细' },
            element: (
              <RouterGuard>
                <ManageOrgDetail />
              </RouterGuard>),
          },
          {
            path: "admin_org",
            handle: { title: '行政组织' },
            element: (
              <RouterGuard>
                <AdminOrg />
              </RouterGuard>),
          },
          {
            path: "admin_org/detail",
            handle: { title: '行政组织明细' },
            element: (
              <RouterGuard>
                <AdminOrgDetail />
              </RouterGuard>),
          },
          {
            path: "department",
            handle: { title: '部门' },
            element: (
              <RouterGuard>
                <Department />
              </RouterGuard>),
          },
          {
            path: "job_position",
            handle: { title: '岗位' },
            element: (
              <RouterGuard>
                <JobPosition />
              </RouterGuard>),
          },
        ]
      },

      // 员工
      {
        path: "/employee",
        handle: { title: '员工' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "employee_category",
            handle: { title: '员工类别' },
            element: (
              <RouterGuard>
                <EmployeeCategory />
              </RouterGuard>),
          },
          {
            path: "employee_manage",
            handle: { title: '员工管理' },
            element: (
              <RouterGuard>
                <EmployeeManage />
              </RouterGuard>),
          },
          {
            path: "employee_manage/detail",
            handle: { title: '员工管理明细' },
            element: (
              <RouterGuard>
                <EmployeeManageDetail />
              </RouterGuard>),
          },
        ]
      },
      // 预警任务
      {
        path: "/warning_task",
        handle: { title: '预警任务' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "sys_warning_task",
            handle: { title: '预警任务' },
            element: (
              <RouterGuard>
                <SysWarningTask />
              </RouterGuard>),
          },
          {
            path: "sys_warning_task/detail",
            handle: { title: '预警任务明细' },
            element: (
              <RouterGuard>
                <SysWarningTaskDetail />
              </RouterGuard>),
          },
          {
            path: "sys_warning_type",
            handle: { title: '预警类型' },
            element: (
              <RouterGuard>
                <SysWarningType />
              </RouterGuard>),
          },
          {
            path: "sys_warning_type/detail",
            handle: { title: '预警类型明细' },
            element: (
              <RouterGuard>
                <SysWarningTypeDetail />
              </RouterGuard>),
          },
        ]
      },
      // 日志管理
      {
        path: "/log_manage",
        handle: { title: '日志管理' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "exportlog",
            handle: { title: '导出日志' },
            element: (
              <RouterGuard>
                <ExportLog />
              </RouterGuard>),
          },
          {
            path: "importlog",
            handle: { title: '导入日志' },
            element: (
              <RouterGuard>
                <ImportLog />
              </RouterGuard>),
          },
          {
            path: "sys_business_log",
            handle: { title: '业务日志' },
            element: (
              <RouterGuard>
                <SysBusinessLog />
              </RouterGuard>),
          },
          {
            path: "sys_login_log",
            handle: { title: '登录日志' },
            element: (
              <RouterGuard>
                <SysLoginLog />
              </RouterGuard>),
          },
          {
            path: "sys_operator_log",
            handle: { title: '操作日志' },
            element: (
              <RouterGuard>
                <SysOperatorLog />
              </RouterGuard>),
          },
          {
            path: "sys_operator_log_report",
            handle: { title: '操作日志统计' },
            element: (
              <RouterGuard>
                <SysOperatorLogReport />
              </RouterGuard>),
          },
          {
            path: "sys_exception_log",
            handle: { title: '异常日志' },
            element: (
              <RouterGuard>
                <SysExceptionLog />
              </RouterGuard>),
          },

        ]
      },



      // 模板管理
      {
        path: "/template_manage",
        handle: { title: '模板管理' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "set_fee_schedule",
            handle: { title: '费用方案' },
            element: (
              <RouterGuard>
                <SetFeeSchedule />
              </RouterGuard>),
          },
          {
            path: "charging_standard",
            handle: { title: '计费标准' },
            element: (
              <RouterGuard>
                <ChargingStandard />
              </RouterGuard>),
          },
        ]
      },

      // 财务审核
      {
        path: "/finance_audit",
        handle: { title: '财务审核' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "expense_review",
            handle: { title: '费用审核' },
            element: (
              <RouterGuard>
                <ExpenseReview />
              </RouterGuard>),
          },
          {
            path: "fee_adjustment",
            handle: { title: '费用调整' },
            element: (
              <RouterGuard>
                <FeeAdjustment />
              </RouterGuard>),
          },
        ]
      },
      // TMO管理
      {
        path: "/tmo_manage",
        handle: { title: 'TMO管理' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "actual_payment",
            handle: { title: '实收实付' },
            element: (
              <RouterGuard>
                <ActualPayment />
              </RouterGuard>),
          },
        ]
      },
      // 财务管理
      {
        path: "/actual_payment",
        handle: { title: '财务管理' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "not_off_setting",
            handle: { title: '未核销列表' },
            element: (
              <RouterGuard>
                <NotOffSetting />
              </RouterGuard>),
          },
          {
            path: "has_off_setting",
            handle: { title: '已核销列表' },
            element: (
              <RouterGuard>
                <HasOffSetting />
              </RouterGuard>),
          },
        ]
      },
      // 凭证设置
      {
        path: "/voucher_setting",
        handle: { title: '凭证设置' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "accounting_book",
            handle: { title: '账套设置' },
            element: (
              <RouterGuard>
                <AccountingBook />
              </RouterGuard>),
          },
          {
            path: "voucher_grouping_rule",
            handle: { title: '凭证分组规则' },
            element: (
              <RouterGuard>
                <VoucherGroupingRule />
              </RouterGuard>),
          },
          {
            path: "entry_grouping_rule",
            handle: { title: '凭证分录规则' },
            element: (
              <RouterGuard>
                <EntryGroupingRule />
              </RouterGuard>),
          },
          {
            path: "entry_summary_rule",
            handle: { title: '分录摘要规则' },
            element: (
              <RouterGuard>
                <SummaryRule />
              </RouterGuard>),
          },
          {
            path: "voucher_type",
            handle: { title: '凭证类型' },
            element: (
              <RouterGuard>
                <VoucherType />
              </RouterGuard>),
          },
          {
            path: "voucher_code_mapping",
            handle: { title: '编码映射' },
            element: (
              <RouterGuard>
                <VoucherCodeMapping />
              </RouterGuard>),
          },
          {
            path: "account_mapping",
            handle: { title: '科目映射' },
            element: (
              <RouterGuard>
                <AccountMapping />
              </RouterGuard>),
          },
        ]
      },
      // 业务统计
      {
        path: "/business_statistics",
        handle: { title: '业务统计' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "sales_business_amount_report",
            handle: { title: '业务对比分析表' },
            element: (
              <RouterGuard>
                <SalesBusinessAmountReport />
              </RouterGuard>),
          },
          {
            path: "sales_business_weight_report",
            handle: { title: '销售箱量统计表' },
            element: (
              <RouterGuard>
                <SalesBusinessWeightReport />
              </RouterGuard>),
          },
          {
            path: "sales_profit_report",
            handle: { title: '销售毛利润统计表' },
            element: (
              <RouterGuard>
                <SalesProfitReport />
              </RouterGuard>),
          },
          {
            path: "department_business_weight_report",
            handle: { title: '接单部门箱量利润汇总表' },
            element: (
              <RouterGuard>
                <DepartmentBusinessWeightReport />
              </RouterGuard>),
          },
          {
            path: "single_ticket_profit_statistics_report",
            handle: { title: '单票利润统计' },
            element: (
              <RouterGuard>
                <SingleTicketProfitStatisticsReport />
              </RouterGuard>),
          },
          {
            path: "operator_shipment_summary_report",
            handle: { title: '操作员票数箱量利润汇总表' },
            element: (
              <RouterGuard>
                <OperatorShipmentSummaryReport />
              </RouterGuard>),
          },
          {
            path: "transportation_line_teu_report",
            handle: { title: '航线货量分析' },
            element: (
              <RouterGuard>
                <TransportationLineTeuReport />
              </RouterGuard>),
          },
          {
            path: "customer_weight_profit_report",
            handle: { title: '客户箱量利润汇总表' },
            element: (
              <RouterGuard>
                <CustomerWeightProfitReport />
              </RouterGuard>),
          },
        ]
      },
      // 财务统计
      {
        path: "/finance_statistics",
        handle: { title: '财务统计' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "outstanding_receivables_payables_report",
            handle: { title: '未收未付统计对账表' },
            element: (
              <RouterGuard>
                <OutstandingReceivablesPayablesReport />
              </RouterGuard>),
          },
          {
            path: "not_receivables_fee_report",
            handle: { title: '未收对账表（按费用明细）' },
            element: (
              <RouterGuard>
                <NotReceivablesFeeReport />
              </RouterGuard>),
          },
          {
            path: "not_receivables_order_report",
            handle: { title: '未收对账表（按业务单号明细）' },
            element: (
              <RouterGuard>
                <NotReceivablesOrderReport />
              </RouterGuard>),
          },

          {
            path: "customer_arrears_analysis_report",
            handle: { title: '客户欠款分析表' },
            element: (
              <RouterGuard>
                <CustomerArrearsAnalysisReport />
              </RouterGuard>),
          },

          {
            path: "accounts_receivable_aging_report",
            handle: { title: '应收未收对账表（按业务单号）' },
            element: (
              <RouterGuard>
                <AccountsReceivableAgingReport />
              </RouterGuard>),
          },
          {
            path: "not_pay_fee_report",
            handle: { title: '未付对账表（按费用明细）' },
            element: (
              <RouterGuard>
                <NotPayFeeReport />
              </RouterGuard>),
          },
          {
            path: "not_pay_order_report",
            handle: { title: '未付对账表（按业务单号）' },
            element: (
              <RouterGuard>
                <NotPayOrderReport />
              </RouterGuard>),
          },
        ]
      },
      // 集成工具
      {
        path: "/container",
        handle: { title: '集装箱' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "container_loading",
            handle: { title: '集装箱装箱' },
            element: (
              <RouterGuard>
                <ContainerLoading />
              </RouterGuard>),
          },
        ]
      },

      // 系统管理
      {
        path: "/menu_manage",
        handle: { title: '菜单管理' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "menu_manage",
            handle: { title: '菜单管理' },
            element: (
              <RouterGuard>
                <MenuManage />
              </RouterGuard>),
          },
        ]
      },

      // 角色管理
      {
        path: "/role",
        handle: { title: '角色管理' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "role_manage",
            handle: { title: '角色管理' },
            element: (
              <RouterGuard>
                <RoleManage />
              </RouterGuard>),
          },
          {
            path: "role_manage/detail",
            handle: { title: '角色详情' },
            element: (
              <RouterGuard>
                <RoleManageDetail />
              </RouterGuard>),
          },
          {
            path: "role_group",
            handle: { title: '角色组' },
            element: (
              <RouterGuard>
                <RoleGroup />
              </RouterGuard>),
          },
          {
            path: "role_tags",
            handle: { title: '角色标签' },
            element: (
              <RouterGuard>
                <RoleTags />
              </RouterGuard>),
          },
        ]
      },
      // 授权
      {
        path: "/authorization",
        handle: { title: '授权' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "permission_assign_post",
            handle: { title: '授权分配岗位' },
            element: (
              <RouterGuard>
                <PermissionManagementPost />
              </RouterGuard>),
          },
          {
            path: "permission_assign_user",
            handle: { title: '授权分配用户' },
            element: (
              <RouterGuard>
                <PermissionManagementUser />
              </RouterGuard>),
          },
        ]
      },
      // 权限查询
      {
        path: "/authorization_query",
        handle: { title: '权限查询' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "function_permission_by_role",
            handle: { title: '功能权限查询（按角色）' },
            element: (
              <RouterGuard>
                <FunctionPermissionRole />
              </RouterGuard>),
          },
          {
            path: "function_permission_by_user",
            handle: { title: '功能权限查询（按用户）' },
            element: (
              <RouterGuard>
                <FunctionPermissionUser />
              </RouterGuard>),
          },
          {
            path: "data_permission_by_role",
            handle: { title: '数据权限查询（按角色）' },
            element: (
              <RouterGuard>
                <DataPermissionRole />
              </RouterGuard>),
          },
          {
            path: "data_permission_by_user",
            handle: { title: '数据权限查询（按用户）' },
            element: (
              <RouterGuard>
                <DataPermissionUser />
              </RouterGuard>),
          },


        ]
      },
      // 3D大屏
      {
        path: "/large_screen",
        handle: { title: '3D大屏' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "china_map",
            handle: { title: '中国地图' },
            element: (
              <RouterGuard>
                <ChainMap />
              </RouterGuard>),
          },
          {
            path: "lev1_department",
            handle: { title: '集团大屏' },
            element: (
              <RouterGuard>
                <Lev1Department />
              </RouterGuard>),
          },
        ]
      },
    ], // 如果需要子路由，可以在这里添加
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default routers;
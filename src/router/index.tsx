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
  JobList,
  JobDetail,
  JobMonitoring,
  MyJobs,
  TeamJobs, JobAssignment, AssignmentRules, PerformanceAnalysis,
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
  TaskCalendarView,
  WaybillArchive, WaybillList, WaybillCreate,
  WaybillQuery, WaybillTemplate, WaybillTemplateDetail, WaybillStatistics,
  OrderManagementList, OrderManagementDetail, OrderManagementStatistics,
  OrderQuery, OrderAudit, OrderBreakdown, BreakdownRules, BreakdownRulesDetail, StandaloneService, StandaloneServiceDetail, ServiceConfig, ServiceConfigDetail, ServiceTemplate, ServiceTemplateDetail, ServicePerformance,
  BookingList, BookingCreate, BookingQuery, BookingPickupPlan, BookingCarrierIntegration, BookingSpace, BookingStatistics, BookingTemplate, BookingTemplateDetail, BookingTemplateEdit,
  TrackingOverview, TrackingOverviewDetail, TrackingReport, RealtimeTracking, MilestoneConfig, MilestoneConfigEdit, InterfaceManagement, InterfaceConfigEdit, ExceptionAlert, CustomerNotification, TemplateList, TemplateDetail,
  DocumentCreate, DocumentQuery, DocumentDetail, DocumentOverview, DocumentList, DocumentReview, DocumentReviewDetail, DocumentSignature, DocumentTemplate, DocumentVersion,
  DocumentArchive, DocumentCompliance, DocumentComplianceDetail, DocumentBatch, DocumentInterface, DocumentReport, DocumentTemplateDetail, DocumentSignatureEdit, DocumentTemplateEdit, DocumentVersionDetail, DocumentVersionCompare,
  ReceivableCostList, ReceivableCostForm, PayableCostList, PayableCostForm, CostOverview, CostDetail, CostCalculation, ProfitAnalysis, CostReviewCenter,
  AllocationRules, AllocationOverview, AllocationOverviewDetail, AllocationRulesDetail, ManualAdjustmentApproval, AllocationHistory,
  SalesDepartmentPerformance, OperationDepartmentProfit, ProfitTrendAnalysis, DepartmentPerformanceComparison,
  FinancialDataSyncStatusMonitoring, FinancialDataSyncTaskManagement, FinancialDataSyncLogQuery, FinancialDataSyncExceptionCenter,
  CustomsJobCenter, CustomsJobDetail, CustomsJobDashboard, CustomsSlaMonitor, CustomsCreateJob, CustomsBatchOperation, CustomsJobStatistics, CustomsJobArchiving,
  CcsmScreeningTaskCenter, CcsmInitiateScreening, CcsmScreeningResultQuery, CcsmHitProcessing,CcsmExemptionRequestManagement, CcsmScreeningRuleConfig, CcsmDatabaseManagement, CcsmScreeningStatisticsReport,
  CcsdmDocumentWorkbench, CcsdmChecklistGeneration, CcsdmCollectionManagement,CcsdmDocumentSearch, CcsdmTemplateManagement, CcsdmArchiveManagement, CcsdmReminderSettings, CcsdmStatisticsReport,
  CpecPreEntryWorkbench, CpecClassificationCenter, CpecKnowledgeBase, CpecNewPreEntry, CpecClassificationTools, CpecPreEntryStatistics,CpecClassificationDetail,
  CpecHistoryDetail, CpecSuggestionDetail, CpecTariffDetail,CpecClassificationReview,
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
        path: "/customs_job_management",
        handle: { title: '关务作业管理' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "job_center",
            handle: { title: '作业中心' },
            element: <RouterGuard><CustomsJobCenter /></RouterGuard>
          },
          {
            path: "detail/:id",
            handle: { title: '作业详情' },
            element: <RouterGuard><CustomsJobDetail /></RouterGuard>
          },
          {
            path: "dashboard",
            handle: { title: '作业看板' },
            element: <RouterGuard><CustomsJobDashboard /></RouterGuard>
          },
          {
            path: "sla_monitor",
            handle: { title: 'SLA监控' },
            element: <RouterGuard><CustomsSlaMonitor /></RouterGuard>
          },
          {
            path: "create_job",
            handle: { title: '新建作业' },
            element: <RouterGuard><CustomsCreateJob /></RouterGuard>
          },
          {
            path: "batch_operation",
            handle: { title: '批量操作' },
            element: <RouterGuard><CustomsBatchOperation /></RouterGuard>
          },
          {
            path: "job_statistics",
            handle: { title: '作业效能分析' },
            element: <RouterGuard><CustomsJobStatistics /></RouterGuard>
          },
          {
            path: "job_archiving",
            handle: { title: '作业归档' },
            element: <RouterGuard><CustomsJobArchiving /></RouterGuard>
          }
        ]
      },
      {
        path: "/compliance_screening_management",
        handle: { title: '合规筛查管理' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "screening_task_center",
            handle: { title: '筛查任务中心' },
            element: <RouterGuard><CcsmScreeningTaskCenter /></RouterGuard>
          },
          {
            path: "initiate_screening",
            handle: { title: '发起筛查' },
            element: <RouterGuard><CcsmInitiateScreening /></RouterGuard>
          },
          {
            path: "screening_result_query",
            handle: { title: '筛查结果查询' },
            element: <RouterGuard><CcsmScreeningResultQuery /></RouterGuard>
          },
          {
            path: "hit_processing",
            handle: { title: '命中项处理' },
            element: <RouterGuard><CcsmHitProcessing /></RouterGuard>
          },
          {
            path: "exemption_request_management",
            handle: { title: '豁免申请管理' },
            element: <RouterGuard><CcsmExemptionRequestManagement /></RouterGuard>
          },
          {
            path: "screening_rule_config",
            handle: { title: '筛查规则配置' },
            element: <RouterGuard><CcsmScreeningRuleConfig /></RouterGuard>
          },
          {
            path: "database_management",
            handle: { title: '数据库管理' },
            element: <RouterGuard><CcsmDatabaseManagement /></RouterGuard>
          },
          {
            path: "screening_statistics_report",
            handle: { title: '筛查统计报表' },
            element: <RouterGuard><CcsmScreeningStatisticsReport /></RouterGuard>
          },
        ]
      },
      {
        path: "/supporting_documents_management",
        handle: { title: '随附单证管理' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "document_workbench",
            handle: { title: '单证工作台' },
            element: <RouterGuard><CcsdmDocumentWorkbench /></RouterGuard>
          },
          {
            path: "checklist_generation",
            handle: { title: '单证清单生成' },
            element: <RouterGuard><CcsdmChecklistGeneration /></RouterGuard>
          },
          {
            path: "collection_management",
            handle: { title: '单证收集管理' },
            element: <RouterGuard><CcsdmCollectionManagement /></RouterGuard>
          },
          {
            path: "document_search",
            handle: { title: '单证查询检索' },
            element: <RouterGuard><CcsdmDocumentSearch /></RouterGuard>
          },
          {
            path: "template_management",
            handle: { title: '单证模板管理' },
            element: <RouterGuard><CcsdmTemplateManagement /></RouterGuard>
          },
          {
            path: "archive_management",
            handle: { title: '单证归档管理' },
            element: <RouterGuard><CcsdmArchiveManagement /></RouterGuard>
          },
          {
            path: "reminder_settings",
            handle: { title: '单证提醒设置' },
            element: <RouterGuard><CcsdmReminderSettings /></RouterGuard>
          },
          {
            path: "statistics_report",
            handle: { title: '单证统计报表' },
            element: <RouterGuard><CcsdmStatisticsReport /></RouterGuard>
          },
        ]
      },
      {
        path: "/pre_entry_classification",
        handle: { title: '预录入与归类' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "pre_entry_workbench",
            handle: { title: '预录入工作台' },
            element: <RouterGuard><CpecPreEntryWorkbench /></RouterGuard>
          },
          {
            path: "classification_center",
            handle: { title: '商品归类中心' },
            element: <RouterGuard><CpecClassificationCenter /></RouterGuard>
          },
          {
            path: "classification_review",
            handle: { title: '归类审核' },
            element: <RouterGuard><CpecClassificationReview /></RouterGuard>
          },
          {
            path: "knowledge_base",
            handle: { title: '归类知识库' },
            element: <RouterGuard><CpecKnowledgeBase /></RouterGuard>
          },
          {
            path: "new_pre_entry",
            handle: { title: '新建预录入' },
            element: <RouterGuard><CpecNewPreEntry /></RouterGuard>
          },
          {
            path: "pre_entry_stats",
            handle: { title: '预录入统计报表' },
            element: <RouterGuard><CpecPreEntryStatistics /></RouterGuard>
          },
          {
            path: "classification_tools",
            handle: { title: '归类查询工具' },
            element: <RouterGuard><CpecClassificationTools /></RouterGuard>
          },
          {
            path: "classification_tools/history/detail/:id",
            handle: { title: '历史归类详情' },
            element: <RouterGuard><CpecHistoryDetail /></RouterGuard>
          },
          {
            path: "classification_tools/suggestion/detail/:id",
            handle: { title: '归类建议详情' },
            element: <RouterGuard><CpecSuggestionDetail /></RouterGuard>
          },
          {
            path: "classification_tools/tariff/detail/:id",
            handle: { title: '税则详情' },
            element: <RouterGuard><CpecTariffDetail /></RouterGuard>
          },
          {
            path: "classification_detail",
            handle: { title: '商品归类详情' },
            element: <RouterGuard><CpecClassificationDetail /></RouterGuard>
          },
        ]
      },
      {
        path: "/demo",
        handle: { title: '测试' },
        element: (
          <Demo />
        )
      },
      {
        path: "/order_management",
        handle: { title: '订单管理' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          { path: "list", handle: { title: '订单列表' }, element: <RouterGuard><OrderManagementList /></RouterGuard> },
          { path: "new_order", handle: { title: '新建订单' }, element: <RouterGuard><OrderManagementDetail /></RouterGuard> },
          { path: "detail", handle: { title: '订单详情' }, element: <RouterGuard><OrderManagementDetail /></RouterGuard> },
          { path: "order_query", handle: { title: '订单查询' }, element: <RouterGuard><OrderQuery /></RouterGuard> },
          { path: "order_audit", handle: { title: '订单审核' }, element: <RouterGuard><OrderAudit /></RouterGuard> },
          { path: "order_breakdown", handle: { title: '订单拆解' }, element: <RouterGuard><OrderBreakdown /></RouterGuard> },
          { path: "breakdown_rules", handle: { title: '拆解规则配置' }, element: <RouterGuard><BreakdownRules /></RouterGuard> },
          { path: "breakdown_rules/detail", handle: { title: '拆解规则详情' }, element: <RouterGuard><BreakdownRulesDetail /></RouterGuard> },
          { path: "order_statistics", handle: { title: '订单统计报表' }, element: <RouterGuard><OrderManagementStatistics /></RouterGuard> },
          { path: "standalone_service", handle: { title: '单项服务管理' }, element: <RouterGuard><StandaloneService /></RouterGuard> },
          { path: "standalone_service/detail", handle: { title: '单项服务详情' }, element: <RouterGuard><StandaloneServiceDetail /></RouterGuard> },
          { path: "service_config", handle: { title: '服务配置' }, element: <RouterGuard><ServiceConfig /></RouterGuard> },
          { path: "service_config/detail", handle: { title: '服务配置详情' }, element: <RouterGuard><ServiceConfigDetail /></RouterGuard> },
          { path: "service_template", handle: { title: '服务组合模板' }, element: <RouterGuard><ServiceTemplate /></RouterGuard> },
          { path: "service_template/detail", handle: { title: '模板详情' }, element: <RouterGuard><ServiceTemplateDetail /></RouterGuard> },
          { path: "service_performance", handle: { title: '服务绩效分析' }, element: <RouterGuard><ServicePerformance /></RouterGuard> },
        ]
      },
      {
        path: "/job_management",
        handle: { title: '作业管理' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          { path: "list", handle: { title: '作业列表' }, element: <RouterGuard><JobList /></RouterGuard> },
          { path: "detail/:id", handle: { title: '作业详情' }, element: <RouterGuard><JobDetail /></RouterGuard> },
          { path: "monitoring", handle: { title: '作业监控' }, element: <RouterGuard><JobMonitoring /></RouterGuard> },
          { path: "my_jobs", handle: { title: '我的作业' }, element: <RouterGuard><MyJobs /></RouterGuard> },
          { path: "team_jobs", handle: { title: '团队作业' }, element: <RouterGuard><TeamJobs /></RouterGuard> },
          { path: "assignment", handle: { title: '作业分派' }, element: <RouterGuard><JobAssignment /></RouterGuard> },
          { path: "rules", handle: { title: '分派规则配置' }, element: <RouterGuard><AssignmentRules /></RouterGuard> },
          { path: "analysis", handle: { title: '作业绩效分析' }, element: <RouterGuard><PerformanceAnalysis /></RouterGuard> },
        ]
      },
      {
        path: "/booking_management",
        handle: { title: '订舱管理' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          { path: "list", handle: { title: '订舱列表' }, element: <RouterGuard><BookingList /></RouterGuard> },
          { path: "create", handle: { title: '新建订舱' }, element: <RouterGuard><BookingCreate /></RouterGuard> },
          { path: "query", handle: { title: '订舱查询' }, element: <RouterGuard><BookingQuery /></RouterGuard> },
          { path: "pickup_plan", handle: { title: '提货计划' }, element: <RouterGuard><BookingPickupPlan /></RouterGuard> },
          { path: "carrier_integration", handle: { title: '承运商对接' }, element: <RouterGuard><BookingCarrierIntegration /></RouterGuard> },
          { path: "space", handle: { title: '舱位管理' }, element: <RouterGuard><BookingSpace /></RouterGuard> },
          { path: "statistics", handle: { title: '订舱统计' }, element: <RouterGuard><BookingStatistics /></RouterGuard> },
          { path: "template", handle: { title: '订舱模板' }, element: <RouterGuard><BookingTemplate /></RouterGuard> },
          { path: "template/create", handle: { title: '新建模板' }, element: <RouterGuard><BookingTemplateEdit /></RouterGuard> },
          { path: "template/edit/:id", handle: { title: '编辑模板' }, element: <RouterGuard><BookingTemplateEdit /></RouterGuard> },
          { path: "template/detail/:id", handle: { title: '模板详情' }, element: <RouterGuard><BookingTemplateDetail /></RouterGuard> },
        ]
      },
      {
        path: "/waybill_management",
        handle: { title: '运单管理' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          { path: "list", handle: { title: '运单列表' }, element: <RouterGuard><WaybillList /></RouterGuard> },
          { path: "create", handle: { title: '新建运单' }, element: <RouterGuard><WaybillCreate /></RouterGuard> },
          { path: "query", handle: { title: '运单查询' }, element: <RouterGuard><WaybillQuery /></RouterGuard> },
          { path: "template", handle: { title: '运单模板' }, element: <RouterGuard><WaybillTemplate /></RouterGuard> },
          { path: "template/create", handle: { title: '新建模板' }, element: <RouterGuard><WaybillTemplateDetail /></RouterGuard> },
          { path: "template/detail/:id", handle: { title: '模板详情' }, element: <RouterGuard><WaybillTemplateDetail /></RouterGuard> },
          { path: "statistics", handle: { title: '统计分析' }, element: <RouterGuard><WaybillStatistics /></RouterGuard> },
          { path: "archive", handle: { title: '归档管理' }, element: <RouterGuard><WaybillArchive /></RouterGuard> },
        ]
      },
      {
        path: "/milestone_tracking",
        handle: { title: '里程碑跟踪' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          { path: "tracking_overview", handle: { title: '跟踪总览' }, element: <RouterGuard><TrackingOverview /></RouterGuard> },
          { path: "tracking_overview/detail/:id", handle: { title: '跟踪详情' }, element: <RouterGuard><TrackingOverviewDetail /></RouterGuard> },
          { path: "milestone_config", handle: { title: '里程碑配置' }, element: <RouterGuard><MilestoneConfig /></RouterGuard> },
          { path: "milestone_config/create", handle: { title: '新建配置' }, element: <RouterGuard><MilestoneConfigEdit /></RouterGuard> },
          { path: "milestone_config/edit/:id", handle: { title: '编辑配置' }, element: <RouterGuard><MilestoneConfigEdit /></RouterGuard> },
          { path: "realtime_tracking", handle: { title: '实时跟踪' }, element: <RouterGuard><RealtimeTracking /></RouterGuard> },
          { path: "exception_alert", handle: { title: '异常预警' }, element: <RouterGuard><ExceptionAlert /></RouterGuard> },
          { path: "customer_notification", handle: { title: '客户通知' }, element: <RouterGuard><CustomerNotification /></RouterGuard> },
          { path: "customer_notification/templates", handle: { title: '模板管理' }, element: <RouterGuard><TemplateList /></RouterGuard> },
          { path: "customer_notification/templates/detail/:id", handle: { title: '模板详情' }, element: <RouterGuard><TemplateDetail /></RouterGuard> },
          { path: "tracking_report", handle: { title: '跟踪报表' }, element: <RouterGuard><TrackingReport /></RouterGuard> },
          { path: "interface_management", handle: { title: '第三方接口管理' }, element: <RouterGuard><InterfaceManagement /></RouterGuard> },
          { path: "interface_management/create", handle: { title: '新建接口' }, element: <RouterGuard><InterfaceConfigEdit /></RouterGuard> },
          { path: "interface_management/edit/:id", handle: { title: '编辑接口' }, element: <RouterGuard><InterfaceConfigEdit /></RouterGuard> },
        ]
      },
      {
        path: "/document_management",
        handle: { title: '单证管理' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          { path: "overview", handle: { title: '单证概览' }, element: <RouterGuard><DocumentOverview /></RouterGuard> },
          { path: "list", handle: { title: '单证列表' }, element: <RouterGuard><DocumentList /></RouterGuard> },
          { path: "create", handle: { title: '单证生成' }, element: <RouterGuard><DocumentCreate /></RouterGuard> },
          { path: "query", handle: { title: '单证查询' }, element: <RouterGuard><DocumentQuery /></RouterGuard> },
          { path: "review", handle: { title: '单证审核' }, element: <RouterGuard><DocumentReview /></RouterGuard> },
          { path: "review/detail/:id", handle: { title: '审核详情' }, element: <RouterGuard><DocumentReviewDetail /></RouterGuard> },
          { path: "template", handle: { title: '模板管理' }, element: <RouterGuard><DocumentTemplate /></RouterGuard> },
          { path: "template/detail/:id", handle: { title: '模板详情' }, element: <RouterGuard><DocumentTemplateDetail /></RouterGuard> },
          { path: "template/edit/:id", handle: { title: '模板编辑' }, element: <RouterGuard><DocumentTemplateEdit /></RouterGuard> },
          { path: "template/create", handle: { title: '新建模板' }, element: <RouterGuard><DocumentTemplateEdit /></RouterGuard> },
          { path: "signature", handle: { title: '电子签章' }, element: <RouterGuard><DocumentSignature /></RouterGuard> },
          { path: "signature/edit/:id", handle: { title: '编辑电子签章' }, element: <RouterGuard><DocumentSignatureEdit /></RouterGuard> },
          { path: "signature/create", handle: { title: '新建电子签章' }, element: <RouterGuard><DocumentSignatureEdit /></RouterGuard> },
          { path: "version", handle: { title: '版本控制' }, element: <RouterGuard><DocumentVersion /></RouterGuard> },
          { path: "version/detail/:id", handle: { title: '版本详情' }, element: <RouterGuard><DocumentVersionDetail /></RouterGuard> },
          { path: "version/compare", handle: { title: '版本对比' }, element: <RouterGuard><DocumentVersionCompare /></RouterGuard> },
          { path: "archive", handle: { title: '单证归档' }, element: <RouterGuard><DocumentArchive /></RouterGuard> },
          { path: "compliance", handle: { title: '合规检查' }, element: <RouterGuard><DocumentCompliance /></RouterGuard> },
          { path: "compliance/detail/:id", handle: { title: '合规检查详情' }, element: <RouterGuard><DocumentComplianceDetail /></RouterGuard> },
          { path: "batch", handle: { title: '批量操作' }, element: <RouterGuard><DocumentBatch /></RouterGuard> },
          { path: "interface", handle: { title: '第三方接口' }, element: <RouterGuard><DocumentInterface /></RouterGuard> },
          { path: "report", handle: { title: '单证统计报表' }, element: <RouterGuard><DocumentReport /></RouterGuard> },
          { path: "detail/:id", handle: { title: '单证详情' }, element: <RouterGuard><DocumentDetail /></RouterGuard> },
        ]
      },
      // 费用管理
      {
        path: "/cost_management",
        handle: { title: '费用管理' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          { path: "cost_overview", handle: { title: '费用总览' }, element: <RouterGuard><CostOverview /></RouterGuard> },
          { path: "cost_detail/:id", handle: { title: '费用详情' }, element: <RouterGuard><CostDetail /></RouterGuard> },
          { path: "cost_calculation", handle: { title: '费用计算' }, element: <RouterGuard><CostCalculation /></RouterGuard> },
          { path: "profit_analysis", handle: { title: '毛利分析' }, element: <RouterGuard><ProfitAnalysis /></RouterGuard> },
          { path: "receivable_cost", handle: { title: '应收费用管理' }, element: <RouterGuard><ReceivableCostList /></RouterGuard> },
          { path: "receivable_cost/create", handle: { title: '新建应收费用' }, element: <RouterGuard><ReceivableCostForm /></RouterGuard> },
          { path: "receivable_cost/edit/:id", handle: { title: '编辑应收费用' }, element: <RouterGuard><ReceivableCostForm /></RouterGuard> },
          { path: "payable_cost", handle: { title: '应付费用管理' }, element: <RouterGuard><PayableCostList /></RouterGuard> },
          { path: "payable_cost/create", handle: { title: '新建应付费用' }, element: <RouterGuard><PayableCostForm /></RouterGuard> },
          { path: "payable_cost/edit/:id", handle: { title: '编辑应付费用' }, element: <RouterGuard><PayableCostForm /></RouterGuard> },
          { path: "cost_review_center", handle: { title: '费用审核中心' }, element: <RouterGuard><CostReviewCenter /></RouterGuard> },
          { path: "allocation_overview", handle: { title: '订单费用分配总览' }, element: <RouterGuard><AllocationOverview /></RouterGuard> },
          { path: "allocation_overview/detail/:id", handle: { title: '订单费用分配详情' }, element: <RouterGuard><AllocationOverviewDetail /></RouterGuard> },
          { path: "allocation_rules", handle: { title: '分配规则管理' }, element: <RouterGuard><AllocationRules /></RouterGuard> },
          { path: "allocation_rules/detail", handle: { title: '分配规则配置' }, element: <RouterGuard><AllocationRulesDetail /></RouterGuard> },
          { path: "manual_adjustment_approval", handle: { title: '手动调整审核' }, element: <RouterGuard><ManualAdjustmentApproval /></RouterGuard> },
          { path: "allocation_history", handle: { title: '分配历史记录' }, element: <RouterGuard><AllocationHistory /></RouterGuard> },
          { path: "sales_department_performance", handle: { title: '销售部门业绩' }, element: <RouterGuard><SalesDepartmentPerformance /></RouterGuard> },
          { path: "operation_department_profit", handle: { title: '作业部门利润' }, element: <RouterGuard><OperationDepartmentProfit /></RouterGuard> },
          { path: "profit_trend_analysis", handle: { title: '利润趋势分析' }, element: <RouterGuard><ProfitTrendAnalysis /></RouterGuard> },
          { path: "department_performance_comparison", handle: { title: '部门绩效对比' }, element: <RouterGuard><DepartmentPerformanceComparison /></RouterGuard> },
          { path: "financial_data_sync/status_monitoring", handle: { title: '同步状态监控' }, element: <RouterGuard><FinancialDataSyncStatusMonitoring /></RouterGuard> },
          { path: "financial_data_sync/task_management", handle: { title: '同步任务管理' }, element: <RouterGuard><FinancialDataSyncTaskManagement /></RouterGuard> },
          { path: "financial_data_sync/log_query", handle: { title: '同步日志查询' }, element: <RouterGuard><FinancialDataSyncLogQuery /></RouterGuard> },
          { path: "financial_data_sync/exception_center", handle: { title: '异常处理中心' }, element: <RouterGuard><FinancialDataSyncExceptionCenter /></RouterGuard> },
        ]
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


      // 日期管理
      {
        path: "/date",
        handle: { title: '日期管理' },
        element: (
          <RouterGuard>
            <Outlet />
          </RouterGuard>
        ),
        children: [
          {
            path: "task_calendar_view",
            handle: { title: '节假日设定' },
            element: (
              <RouterGuard>
                <TaskCalendarView />
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

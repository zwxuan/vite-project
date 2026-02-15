//currency_service.ts
import { MenuGroup } from '@/types/menu/menu';
import request, { ApiRes } from '../request'


const menuData: MenuGroup[] = [
    {
        title: "动态建模平台",
        key: "platform",
        apps: [
            {
                name: "组织机构", key: "org_manage",
            },
            {
                name: "基础数据", key: "basic_manage",
            },
            {
                name: "权限管理", key: "permission",
            },
            {
                name: "系统管理", key: "system",
            },
        ]
    },
    {
        title: "AI驱动结算中心智能化平台",
        key: "ai_settlement",
        apps: [
            {
                name: "业务管理", key: "business_manage",
            },
            {
                name: "费用管理", key: "cost_manage",
            },
            {
                name: "财务管理", key: "finance_manage",
            },
            {
                name: "系统维护", key: "system_maintenance",
            },
            {
                name: "报表管理", key: "report_manage",
            },
            {
                name: "集成工具", key: "integration_tool",
            },
        ]
    },
    {
        title: "集成平台",
        key: "integration",
        apps: [
            {
                name: "数据交换管理", key: "dataexchange",
            },
            {
                name: "标准接口", key: "standard",
            },
        ]
    },
    {
        title: "货代操作系统",
        key: "freight_forwarding",
        apps: [
            {
                name: "订单管理", key: "order_management",
            },
            {
                name: "作业管理", key: "job_management",
            },
            {
                name: "订舱管理", key: "booking_management",
            },
            {
                name: "里程碑跟踪", key: "milestone_tracking",
            },
            {
                name: "运单管理", key: "waybill_management",
            },
            {
                name: "单证管理", key: "document_management",
            },
            {
                name: "费用管理", key: "cost_management",
            },
        ]
    },

    {
        title: "关务与合规",
        key: "customs_compliance",
        apps: [
            {
                name: "关务作业管理", key: "customs_job_management",
            },
            {
                name: "合规筛查管理", key: "compliance_screening_management",
            },
            {
                name: "预录入与归类", key: "pre_entry_classification",
            },
            {
                name: "随附单证管理", key: "supporting_documents_management",
            },
            {
                name: "舱单与安全申报", key: "manifest_security",
            },
            
        ]
    },

];
const childrenMenuData: MenuGroup[] = [{
    title: "财务基础数据",
    key: "basic_finance",
    parentkey: "basic_manage",
    apps: [
        {
            name: "币种", key: "currency", path: "/basic_finance/currency",
        },
        {
            name: "税制档案", key: "base_tax_system", path: "/basic_finance/base_tax_system",
        },
        {
            name: "税种档案", key: "base_tax_type", path: "/basic_finance/base_tax_type",
        },
        {
            name: "税率档案", key: "base_tax_rate", path: "/basic_finance/base_tax_rate",
        },
        {
            name: "银行类别", key: "base_bank_type", path: "/basic_finance/base_bank_type",
        },
        {
            name: "银行网点", key: "base_bank_branch", path: "/basic_finance/base_bank_branch",
        },
        {
            name: "结算方式", key: "base_settlement_method", path: "/basic_finance/base_settlement_method",
        },
        {
            name: "结算方式对照", key: "base_settlement_method_mapper", path: "/basic_finance/base_settlement_method_mapper",
        },
        {
            name: "开票周期", key: "base_periodic_billing", path: "/basic_finance/base_periodic_billing",
        },
        {
            name: "结算周期", key: "settlement_cycle", path: "/basic_finance/base_settlement_cycle",
        },
        {
            name: "汇率管理", key: "base_exchange_rate", path: "/basic_finance/base_exchange_rate",
        },
        {
            name: "测试页面", key: "demo", path: "/demo",
        },
    ]
},
{
    title: "集装箱",
    key: "container",
    parentkey: "integration_tool",
    apps: [
        {
            name: "集装箱装箱", key: "container_loading", path: "/container/container_loading",
        },

    ]
},
{
    title: "凭证设置",
    key: "voucher_setting",
    parentkey: "basic_manage",
    apps: [
        {
            name: "账套设置", key: "accounting_set", path: "/voucher_setting/accounting_book",
        },
        {
            name: "凭证分组规则", key: "voucher_grouping_rule", path: "/voucher_setting/voucher_grouping_rule",
        },
        {
            name: "凭证分录规则", key: "entry_grouping_rule", path: "/voucher_setting/entry_grouping_rule",
        },
        {
            name: "分录摘要规则", key: "entry_summary_rule", path: "/voucher_setting/entry_summary_rule",
        },
        {
            name: "凭证类型", key: "voucher_type", path: "/voucher_setting/voucher_type",
        },
        {
            name: "编码映射", key: "code_mapping", path: "/voucher_setting/voucher_code_mapping",
        },
        {
            name: "科目映射", key: "account_mapping", path: "/voucher_setting/account_mapping",
        },
        {
            name: "科目设置", key: "subject_setting",
        },
    ]
},
{
    title: "企业基础数据",
    key: "basic_company",
    parentkey: "basic_manage",
    apps: [
        {
            name: "企业规模", key: "company_size", path: "/basic_company/base_company_size",
        },
        {
            name: "企业性质", key: "company_nature", path: "/basic_company/base_company_nature",
        },
        {
            name: "账户用途", key: "base_account_purpose", path: "/basic_company/base_account_purpose",
        },
        {
            name: "企业资金账户", key: "base_corporate_fund_account", path: "/basic_company/base_corporate_fund_account",
        },
        {
            name: "企业现金账户", key: "base_corporate_cash_account", path: "/basic_company/base_corporate_cash_account",
        },
    ]
},
{
    title: "业务基础数据",
    key: "base_business_manage",
    parentkey: "basic_manage",
    apps: [
        {
            name: "海关编码", key: "base_goods", path: "/base_business_manage/base_goods",
        },
        {
            name: "海港", key: "base_seaport", path: "/base_business_manage/base_seaport",
        },
        {
            name: "空港", key: "base_airport", path: "/base_business_manage/base_airport",
        },
        {
            name: "铁港", key: "base_railwayport", path: "/base_business_manage/base_railwayport",
        },
        {
            name: "航线", key: "base_trade_lanes", path: "/base_business_manage/base_trade_lanes",
        },
        {
            name: "航线归类", key: "base_trade_lanes_grouping", path: "/base_business_manage/base_trade_lanes_grouping",
        },
        {
            name: "业务类型", key: "base_business_type", path: "/base_business_manage/base_business_type",
        },
        {
            name: "出运类型", key: "base_shipment_type", path: "/base_business_manage/base_shipment_type",
        },
        {
            name: "运输条款", key: "base_transportation_terms", path: "/base_business_manage/base_transportation_terms",
        },
        {
            name: "贸易条款", key: "transport_method", path: "/base_business_manage/base_trade_terms",
        },
        {
            name: "运费条款", key: "base_freight_terms", path: "/base_business_manage/base_freight_terms",
        },
        {
            name: "提单条款", key: "base_bill_terms", path: "/base_business_manage/base_bill_terms",
        },
        {
            name: "货物类型", key: "base_cargo_type", path: "/base_business_manage/base_cargo_type",
        },
        {
            name: "箱型种类", key: "base_container_type", path: "/base_business_manage/base_container_type",
        },
        {
            name: "箱型TEU", key: "base_container_teu", path: "/base_business_manage/base_container_teu",
        },
    ]
},
{
    title: "合作伙伴",
    key: "cooperation_party",
    parentkey: "basic_manage",
    apps: [
        {
            name: "合同管理", key: "contracts_manage", path: "/cooperation_party/contracts_manage",
        },
        {
            name: "基本信息", key: "business_partner", path: "/cooperation_party/business_partner",
        },
        {
            name: "绩效规则", key: "performance", path: "/cooperation_party/partner_performance_rule",
        },
        {
            name: "客户级别", key: "customer_level", path: "/cooperation_party/customer_level",
        },
        {
            name: "客户分类", key: "customer_type", path: "/cooperation_party/customer_type",
        },
        {
            name: "客户行业", key: "customer_industry", path: "/cooperation_party/customer_industry",
        },
    ]
},
{
    title: "日期管理",
    key: "date",
    parentkey: "basic_manage",
    apps: [
        {
            name: "日历管理", key: "task_calendar_view", path: "/date/task_calendar_view",
        },
    ]
},
{
    title: "组织机构",
    key: "org",
    parentkey: "org_manage",
    apps: [
        {
            name: "管理组织", key: "manage_org", path: "/org/manage_org",
        },
        {
            name: "行政组织", key: "admin_org", path: "/org/admin_org",
        },
        {
            name: "部门", key: "department", path: "/org/department",
        },
        // {
        //     name: "职务类别", key: "job_type",
        // },
        // {
        //     name: "职务", key: "job",
        // },
        // {
        //     name: "职等", key: "grade",
        // },
        // {
        //     name: "职级", key: "level",
        // },
        {
            name: "岗位", key: "job_position", path: "/org/job_position",
        },
    ]
},
{
    title: "员工",
    key: "employee",
    parentkey: "org_manage",
    apps: [
        {
            name: "员工类别", key: "employee_category", path: "/employee/employee_category",
        },
        {
            name: "员工管理", key: "employee_manage", path: "/employee/employee_manage",
        },
    ]
},
{
    title: "角色管理",
    key: "role",
    parentkey: "permission",
    apps: [
        {
            name: "角色管理", key: "role_manage", path: "/role/role_manage",
        },
        {
            name: "角色组", key: "role_group", path: "/role/role_group",
        },
        {
            name: "角色标签", key: "role_tag", path: "/role/role_tags",
        },
    ]
},
{
    title: "授权",
    key: "authorization",
    parentkey: "permission",
    apps: [
        {
            name: "授权分配岗位", key: "permission_assign_post", path: "/authorization/permission_assign_post",
        },
        {
            name: "授权分配用户", key: "permission_assign_user", path: "/authorization/permission_assign_user",
        },
    ]
},
{
    title: "权限查询",
    key: "authorization_query",
    parentkey: "permission",
    apps: [
        {
            name: "功能权限查询（按角色）", key: "function_permission_by_role", path: "/authorization_query/function_permission_by_role",
        },
        {
            name: "功能权限查询（按用户）", key: "function_permission_by_user", path: "/authorization_query/function_permission_by_user",
        },
        {
            name: "数据权限查询（按角色）", key: "data_permission_by_role", path: "/authorization_query/data_permission_by_role",
        },
        {
            name: "数据权限查询（按用户）", key: "data_permission_by_user", path: "/authorization_query/data_permission_by_user",
        },
    ]
},
{
    title: "编码规则",
    key: "code_rule",
    parentkey: "system",
    apps: [
        {
            name: "编码规则", key: "code_rule",
        },
    ]
},
{
    title: "菜单管理",
    key: "menu_manage",
    parentkey: "system",
    apps: [
        {
            name: "菜单管理", key: "menu_manage", path: "/menu_manage/menu_manage",
        },
        {
            name: "功能按钮", key: "function_button",
        },
    ]
},
{
    title: "调度任务",
    key: "schedule_task",
    parentkey: "system",
    apps: [
        {
            name: "调度任务", key: "schedule_task",
        },
    ]
},
{
    title: "预警任务",
    key: "warning_task",
    parentkey: "system",
    apps: [
        {
            name: "预警任务", key: "sys_warning_task", path: "/warning_task/sys_warning_task",
        },
        {
            name: "预警类型", key: "sys_warning_type", path: "/warning_task/sys_warning_type",
        },
    ]
},
{
    title: "消息平台",
    key: "message_platform",
    parentkey: "system",
    apps: [
        {
            name: "消息模版", key: "message_template",
        },
        {
            name: "消息通道", key: "message_channel",
        },
        {
            name: "消息配置", key: "message_config",
        },
        {
            name: "消息发送策略", key: "message_send_strategy",
        },
        {
            name: "消息日志查询", key: "message_log_query",
        },
    ]
},
{
    title: "日志管理",
    key: "log_manage",
    parentkey: "system",
    apps: [
        {
            name: "登录日志", key: "sys_login_log", path: "/log_manage/sys_login_log",
        },
        {
            name: "业务日志", key: "sys_business_log", path: "/log_manage/sys_business_log",
        },
        {
            name: "操作日志", key: "sys_operator_log", path: "/log_manage/sys_operator_log",
        },
        {
            name: "异常日志", key: "sys_exception_log", path: "/log_manage/sys_exception_log",
        },
        {
            name: "操作日志统计", key: "sys_operator_log_report", path: "/log_manage/sys_operator_log_report",
        },
        {
            name: "导入日志", key: "import_log", path: "/log_manage/importlog",
        },
        {
            name: "导出日志", key: "export_log", path: "/log_manage/exportlog",
        },
    ]
},
{
    title: "托书管理",
    key: "entrust_manage",
    parentkey: "business_manage",
    apps: [
        {
            name: "订单管理", key: "order", path: "/entrust_manage/orders",
        },
        {
            name: "海运服务", key: "sea_service",
        },
        {
            name: "空运服务", key: "air_service",
        },
        {
            name: "铁运服务", key: "railway_service",
        },
        {
            name: "报关服务", key: "customs_service",
        },
        {
            name: "仓储服务", key: "warehouse_service",
        },
        {
            name: "物流服务", key: "logistics_service",
        },
        {
            name: "关联服务", key: "related_entrust",
        },

    ]
},
{
    title: "费用管理",
    key: "cost_manage",
    parentkey: "cost_manage",
    apps: [
        {
            name: "对账", key: "fee_reconciliation", path: "/cost_manage/fee_reconciliation",
        },
        {
            name: "账单", key: "bill_manage", path: "/cost_manage/bill_manage",
        },
        {
            name: "对账单", key: "statement_of_account", path: "/cost_manage/statement_of_account",
        },
        {
            name: "关联交易", key: "order_fee_relation", path: "/cost_manage/order_fee_relation",
        },
        {
            name: "费用拆分", key: "order_fee_split", path: "/cost_manage/order_fee_split",
        },
        {
            name: "拼箱分摊模式", key: "lcl_fee_share", path: "/cost_manage/lcl_fee_share",
        },
        {
            name: "内部代理结算", key: "internal_agent_settlement", path: "/cost_manage/internal_agent_settlement",
        },
        {
            name: "对账规则引擎配置", key: "reconciliation_rule_engine", path: "/cost_manage/reconciliation_rule_engine",
        },
    ]
},
{
    title: "发票管理",
    key: "invoice_manage",
    parentkey: "cost_manage",
    apps: [
        {
            name: "开票|收票", key: "unpaid_invoice", path: "/invoice_manage/invoice_issuance_receipt",
        },
        {
            name: "收款发票", key: "receipt_invoice", path: "/invoice_manage/receipt_invoice?type=receipt",
        },
        {
            name: "实体收款发票", key: "receipt_invoice_download", path: "/invoice_manage/physical_invoice_receipt?type=receipt",
        },
        {
            name: "付款发票", key: "payment_invoice", path: "/invoice_manage/payment_invoice?type=payment",
        },
        {
            name: "实体付款发票", key: "payment_invoice_download", path: "/invoice_manage/physical_invoice_payment?type=payment",
        },
    ]
},
{
    title: "付款申请",
    key: "payment_apply",
    parentkey: "cost_manage",
    apps: [
        {
            name: "付款申请", key: "payment_apply", path: "/payment_apply/payment_application",
        },
    ]
},
{
    title: "主单放单管理",
    key: "main_order",
    parentkey: "cost_manage",
    apps: [
        {
            name: "放单审核", key: "release_order_verification", path: "/main_order/release_order_verification",
        },
        {
            name: "提单放单", key: "bl_release", path: "/main_order/bl_release",
        },
    ]
},
{
    title: "TMO管理",
    key: "tmo_manage",
    parentkey: "finance_manage",
    apps: [
        {
            name: "实收实付", key: "actual_payment", path: "/tmo_manage/actual_payment",
        },
        //   {
        //       name: "现金收款", key: "cash_receipt",
        //   },
        //   {
        //       name: "银行转账", key: "bank_transfer",
        //   },
        //   {
        //       name: "支票收款", key: "cheque_receipt",
        //   },
        //   {
        //       name: "第三方支付平台", key: "third_party_payment",
        //   },
        //   {
        //       name: "其他收款", key: "other_receipt",
        //   },
    ]
},
{
    title: "财务管理",
    key: "actual_payment",
    parentkey: "finance_manage",
    apps: [
        {
            name: "销账", key: "write_off_order", path: "/actual_payment/has_off_setting",
        },
        {
            name: "未销账综合查询", key: "unwrite_off_query", path: "/actual_payment/not_off_setting",
        },
    ]
},
{
    title: "财务审核",
    key: "finance_audit",
    parentkey: "finance_manage",
    apps: [
        {
            name: "费用审核", key: "expense_review", path: "/finance_audit/expense_review",
        },
        {
            name: "费用调整", key: "fee_adjustment", path: "/finance_audit/fee_adjustment",
        },
    ]
},
{
    title: "综合财务查询",
    key: "finance_query",
    parentkey: "finance_manage",
    apps: [
        {
            name: "综合财务查询", key: "finance_query", path: "/finance_query/finance_query",
        },
        {
            name: "凭证查询", key: "voucher_log", path: "/finance_query/voucher_log",
        },
    ]
},
{
    title: "管理凭证",
    key: "manage_voucher",
    parentkey: "finance_manage",
    apps: [
        {
            name: "操作费凭证", key: "operation_voucher",
        },
    ]
},
{
    title: "税务管理",
    key: "tax_manage",
    parentkey: "finance_manage",
    apps: [
        {
            // 发票结转,未开票未认证已销账发票结转,代收代付,收入和成本以及代收代付结转NCC
            name: "结转凭证", key: "settlement_voucher",
        },
    ]
},
{
    title: "模板管理",
    key: "template_manage",
    parentkey: "system_maintenance",
    apps: [
        {
            name: "费用模板", key: "cost_template", path: "/template_manage/set_fee_schedule",
        },
        {
            name: "银行对账模板", key: "bank_template",
        },
        {
            name: "客户对账模板", key: "customer_template",
        },
        {
            name: "供应商对账模板", key: "supplier_template",
        },
    ]
},
{
    title: "结账周期",
    key: "settlement_cycle",
    parentkey: "system_maintenance",
    apps: [
        {
            name: "结账日期设定", key: "settlement_date",
        },
    ]
},
{
    title: "分成规则",
    key: "split_rule",
    parentkey: "system_maintenance",
    apps: [
        {
            name: "销售站和操作站分成规则", key: "sales_operator_split",
        },
        {
            name: "销售站和销售站分成规则", key: "sales_sales_split",
        },
    ]
},
{
    title: "3D大屏",
    key: "large_screen",
    parentkey: "report_manage",
    apps: [
        {
            name: "中国地图", key: "china_map", path: "/large_screen/china_map",
        },
        {
            name: "集团大屏", key: "lev1_department", path: "/large_screen/lev1_department",
        },
    ]
},
{
    title: "业务统计",
    key: "business_statistics",
    parentkey: "report_manage",
    apps: [
        {
            name: "销售箱量统计表", key: "sales_business_weight_report", path: "/business_statistics/sales_business_weight_report",
        },
        {
            name: "业务对比分析表", key: "sales_business_amount_report", path: "/business_statistics/sales_business_amount_report",
        },
        {
            name: "销售毛利润统计表", key: "sales_profit_report", path: "/business_statistics/sales_profit_report",
        },
        {
            name: "接单部门箱量利润汇总表", key: "department_business_weight_report", path: "/business_statistics/department_business_weight_report",
        },
        {
            name: "单票利润统计", key: "single_ticket_profit_statistics_report", path: "/business_statistics/single_ticket_profit_statistics_report",
        },
        {
            name: "操作员票数箱量利润汇总表", key: "operator_shipment_summary_report", path: "/business_statistics/operator_shipment_summary_report",
        },
        {
            name: "航线货量分析", key: "transportation_line_teu_report", path: "/business_statistics/transportation_line_teu_report",
        },
        {
            name: "客户箱量利润汇总表", key: "customer_weight_profit_report", path: "/business_statistics/customer_weight_profit_report",
        },
    ]
},

{
    title: "财务统计",
    key: "finance_statistics",
    parentkey: "report_manage",
    apps: [
        {
            name: "未收未付统计对账表", key: "outstanding_receivables_payables_report", path: "/finance_statistics/outstanding_receivables_payables_report",
        },
        {
            name: "未收对账表（按费用）", key: "not_receivables_fee_report", path: "/finance_statistics/not_receivables_fee_report",
        },
        {
            name: "未收对账表（按业务单号）", key: "not_receivables_order_report", path: "/finance_statistics/not_receivables_order_report",
        },
        {
            name: "应收未收对账表（按业务单号）", key: "accounts_receivable_aging_report", path: "/finance_statistics/accounts_receivable_aging_report",
        },
        {
            name: "未付对账表（按费用）", key: "not_pay_fee_report", path: "/finance_statistics/not_pay_fee_report",
        },
        {
            name: "未付对账表（按业务单号）", key: "unpaid_work_order_statement", path: "/finance_statistics/not_pay_order_report",
        },
        {
            name: "客户欠账分析", key: "customer_arrears_analysis_report", path: "/finance_statistics/customer_arrears_analysis_report",
        },
    ]
},
{
    title: "订单管理",
    key: "order_management",
    parentkey: "order_management",
    apps: [
        { name: "订单列表", key: "order_list", path: "/order_management/list" },
        { name: "新建订单", key: "new_order", path: "/order_management/new_order" },
        { name: "订单查询", key: "order_query", path: "/order_management/order_query" },
        { name: "订单审核", key: "order_audit", path: "/order_management/order_audit" },
        { name: "订单拆解", key: "order_breakdown", path: "/order_management/order_breakdown" },
        { name: "拆解规则配置", key: "breakdown_rules", path: "/order_management/breakdown_rules" },
        { name: "订单统计报表", key: "order_statistics", path: "/order_management/order_statistics" },
        { name: "单项服务管理", key: "standalone_service", path: "/order_management/standalone_service" },
        { name: "服务配置", key: "service_config", path: "/order_management/service_config" },
        { name: "服务组合模板", key: "service_template", path: "/order_management/service_template" },
        { name: "服务绩效分析", key: "service_performance", path: "/order_management/service_performance" },
    ]
},
{
    title: "舱单与安全申报管理",
    key: "manifest_security",
    parentkey: "manifest_security",
    apps: [
        {
            name: "舱单申报列表", key: "manifest_declaration_list", path: "/manifest_security/manifest_declaration_list",
        },
        {
            name: "新建舱单申报", key: "new_manifest_declaration", path: "/manifest_security/new_manifest_declaration",
        },
        {
            name: "安全申报管理", key: "security_filing_management", path: "/manifest_security/security_filing_management",
        },
        {
            name: "差错更正处理", key: "error_correction_handling", path: "/manifest_security/error_correction_handling",
        },
        {
            name: "回执管理", key: "receipt_management", path: "/manifest_security/receipt_management",
        },
        {
            name: "申报规则配置", key: "declaration_rule_config", path: "/manifest_security/declaration_rule_config",
        },
        {
            name: "申报统计报表", key: "declaration_statistics_report", path: "/manifest_security/declaration_statistics_report",
        },
    ]
},
{
    title: "订舱管理",
    key: "booking_management",
    parentkey: "booking_management",
    apps: [
        { name: "订舱列表", key: "booking_list", path: "/booking_management/list" },
        { name: "新建订舱", key: "booking_create", path: "/booking_management/create" },
        { name: "订舱查询", key: "booking_query", path: "/booking_management/query" },
        { name: "提箱计划", key: "booking_pickup_plan", path: "/booking_management/pickup_plan" },
        { name: "承运商对接", key: "booking_carrier_integration", path: "/booking_management/carrier_integration" },
        { name: "舱位管理", key: "booking_space", path: "/booking_management/space" },
        { name: "订舱统计", key: "booking_statistics", path: "/booking_management/statistics" },
        { name: "订舱模板", key: "booking_template", path: "/booking_management/template" },
    ]
},
{
    title: "里程碑跟踪",
    key: "milestone_tracking",
    parentkey: "milestone_tracking",
    apps: [
        { name: "跟踪总览", key: "tracking_overview", path: "/milestone_tracking/tracking_overview" },
        { name: "里程碑配置", key: "milestone_config", path: "/milestone_tracking/milestone_config" },
        // { name: "实时跟踪", key: "realtime_tracking", path: "/milestone_tracking/realtime_tracking" },
        { name: "异常预警", key: "exception_alert", path: "/milestone_tracking/exception_alert" },
        { name: "客户通知", key: "customer_notification", path: "/milestone_tracking/customer_notification" },
        { name: "跟踪报表", key: "tracking_report", path: "/milestone_tracking/tracking_report" },
        { name: "第三方接口管理", key: "interface_management", path: "/milestone_tracking/interface_management" },
    ]
},
{
    title: "作业管理",
    key: "job_management",
    parentkey: "job_management",
    apps: [
        { name: "作业列表", key: "job_list", path: "/job_management/list" },
        { name: "作业分派", key: "job_assignment", path: "/job_management/assignment" },
        { name: "我的作业", key: "my_jobs", path: "/job_management/my_jobs" },
        { name: "团队作业", key: "team_jobs", path: "/job_management/team_jobs" },
        { name: "作业监控", key: "job_monitoring", path: "/job_management/monitoring" },
        { name: "分派规则配置", key: "assignment_rules", path: "/job_management/rules" },
        { name: "作业绩效分析", key: "performance_analysis", path: "/job_management/analysis" },
    ]
},
{
    title: "运单管理",
    key: "waybill_management",
    parentkey: "waybill_management",
    apps: [
        { name: "运单列表", key: "waybill_list", path: "/waybill_management/list" },
        { name: "新建运单", key: "waybill_create", path: "/waybill_management/create" },
        { name: "运单查询", key: "waybill_query", path: "/waybill_management/query" },
        { name: "运单模板", key: "waybill_template", path: "/waybill_management/template" },
        { name: "统计分析", key: "waybill_statistics", path: "/waybill_management/statistics" },
        { name: "归档管理", key: "waybill_archive", path: "/waybill_management/archive" },
    ]
},
{
    title: "单证管理",
    key: "document_management",
    parentkey: "document_management",
    apps: [
        { name: "单证概览", key: "document_overview", path: "/document_management/overview" },
        { name: "单证列表", key: "document_list", path: "/document_management/list" },
        { name: "单证生成", key: "document_create", path: "/document_management/create" },
        { name: "单证查询", key: "document_query", path: "/document_management/query" },
        { name: "单证审核", key: "document_review", path: "/document_management/review" },
        { name: "模板管理", key: "document_template", path: "/document_management/template" },
        { name: "电子签章", key: "document_signature", path: "/document_management/signature" },
        { name: "版本控制", key: "document_version", path: "/document_management/version" },
        { name: "单证归档", key: "document_archive", path: "/document_management/archive" },
        { name: "合规检查", key: "document_compliance", path: "/document_management/compliance" },
        { name: "批量操作", key: "document_batch", path: "/document_management/batch" },
        { name: "第三方接口", key: "document_interface", path: "/document_management/interface" },
        { name: "单证统计报表", key: "document_report", path: "/document_management/report" },
    ]
},
{
    title: "费用管理",
    key: "cost_management",
    parentkey: "cost_management",
    apps: [
        { name: "费用总览", key: "cost_overview", path: "/cost_management/cost_overview" },
        { name: "应收费用管理", key: "receivable_cost", path: "/cost_management/receivable_cost" },
        { name: "应付费用管理", key: "payable_cost", path: "/cost_management/payable_cost" },
        { name: "费用审核中心", key: "cost_review_center", path: "/cost_management/cost_review_center" },
        { name: "订单费用分配总览", key: "allocation_overview", path: "/cost_management/allocation_overview" },
        { name: "分配规则管理", key: "allocation_rules", path: "/cost_management/allocation_rules" },
        { name: "手动调整审核", key: "manual_adjustment_approval", path: "/cost_management/manual_adjustment_approval" },
        { name: "分配历史记录", key: "allocation_history", path: "/cost_management/allocation_history" },
        { name: "销售部门业绩", key: "sales_department_performance", path: "/cost_management/sales_department_performance" },
        { name: "作业部门利润", key: "operation_department_profit", path: "/cost_management/operation_department_profit" },
        { name: "利润趋势分析", key: "profit_trend_analysis", path: "/cost_management/profit_trend_analysis" },
        { name: "部门绩效对比", key: "department_performance_comparison", path: "/cost_management/department_performance_comparison" },
        { name: "同步状态监控", key: "financial_data_sync_status_monitoring", path: "/cost_management/financial_data_sync/status_monitoring" },
        { name: "同步任务管理", key: "financial_data_sync_task_management", path: "/cost_management/financial_data_sync/task_management" },
        { name: "同步日志查询", key: "financial_data_sync_log_query", path: "/cost_management/financial_data_sync/log_query" },
        { name: "异常处理中心", key: "financial_data_sync_exception_center", path: "/cost_management/financial_data_sync/exception_center" },
    ]
},
    {
        title: "关务作业管理",
        key: "customs_job_management",
        parentkey: "customs_job_management",
        apps: [
            { name: "作业单中心", key: "job_center", path: "/customs_job_management/job_center" },
            { name: "作业看板", key: "dashboard", path: "/customs_job_management/dashboard" },
            { name: "新建作业单", key: "create_job", path: "/customs_job_management/create_job" },
            { name: "SLA监控", key: "sla_monitor", path: "/customs_job_management/sla_monitor" },
            { name: "批量操作", key: "batch_operation", path: "/customs_job_management/batch_operation" },
            { name: "作业效能分析", key: "job_statistics", path: "/customs_job_management/job_statistics" },
            { name: "作业归档", key: "job_archiving", path: "/customs_job_management/job_archiving" },
        ]
    },
    {
        title: "合规筛查管理",
        key: "compliance_screening_management",
        parentkey: "compliance_screening_management",
        apps: [
            { name: "筛查任务中心", key: "screening_task_center", path: "/compliance_screening_management/screening_task_center" },
            { name: "发起筛查", key: "initiate_screening", path: "/compliance_screening_management/initiate_screening" },
            { name: "筛查结果查询", key: "screening_result_query", path: "/compliance_screening_management/screening_result_query" },
            { name: "命中项处理", key: "hit_processing", path: "/compliance_screening_management/hit_processing" },
            { name: "豁免申请管理", key: "exemption_request_management", path: "/compliance_screening_management/exemption_request_management" },
            { name: "筛查规则配置", key: "screening_rule_config", path: "/compliance_screening_management/screening_rule_config" },
            { name: "数据库管理", key: "database_management", path: "/compliance_screening_management/database_management" },
            { name: "筛查统计报表", key: "screening_statistics_report", path: "/compliance_screening_management/screening_statistics_report" },
        ]
    },
    {
        title: "随附单证管理",
        key: "supporting_documents_management",
        parentkey: "supporting_documents_management",
        apps: [
            { name: "单证工作台", key: "document_workbench", path: "/supporting_documents_management/document_workbench" },
            { name: "单证清单生成", key: "checklist_generation", path: "/supporting_documents_management/checklist_generation" },
            { name: "单证模板管理", key: "template_management", path: "/supporting_documents_management/template_management" },
            { name: "单证归档管理", key: "archive_management", path: "/supporting_documents_management/archive_management" },
            { name: "单证提醒设置", key: "reminder_settings", path: "/supporting_documents_management/reminder_settings" },
            { name: "单证统计报表", key: "statistics_report", path: "/supporting_documents_management/statistics_report" },
        ]
    },
    {
        title: "预录入与归类",
        key: "pre_entry_classification",
        parentkey: "pre_entry_classification",
        apps: [
            { name: "预录入工作台", key: "pre_entry_workbench", path: "/pre_entry_classification/pre_entry_workbench" },
            { name: "预录入统计", key: "pre_entry_stats", path: "/pre_entry_classification/pre_entry_stats" },
            { name: "商品归类中心", key: "classification_center", path: "/pre_entry_classification/classification_center" },
            { name: "归类审核", key: "classification_review", path: "/pre_entry_classification/classification_review" },
            { name: "归类查询工具", key: "classification_tools", path: "/pre_entry_classification/classification_tools" },
            { name: "归类知识库", key: "knowledge_base", path: "/pre_entry_classification/knowledge_base" },
        ]
    },
]

// 获取当前用户信息
export const getMainMenuList = async (): Promise<MenuGroup[]> => {
    // const response = await request({
    //   method: 'GET',
    //   url: '/mainmenu'
    // });
    // const responseData = response?.data as ApiRes<MenuGroup[]>;
    // return responseData.data || [];
    return menuData;
}

export const getSubMenuList = async (): Promise<MenuGroup[]> => {
    // const response = await request({
    //   method: 'GET',
    //   url: '/submenu'
    // });
    // const responseData = response?.data as ApiRes<MenuGroup[]>;
    // return responseData.data || [];
    return childrenMenuData;
}

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
            name: "税制档案", key: "base_tax_system",path: "/basic_finance/base_tax_system",
        },
        {
            name: "税种档案", key: "base_tax_type",path: "/basic_finance/base_tax_type",
        },
        {
            name: "税率档案", key: "base_tax_rate",path: "/basic_finance/base_tax_rate",
        },
        {
            name: "银行类别", key: "base_bank_type",path: "/basic_finance/base_bank_type",
        },
        {
            name: "银行网点", key: "base_bank_branch",path: "/basic_finance/base_bank_branch",
        },
        {
            name: "结算方式", key: "base_settlement_method",path: "/basic_finance/base_settlement_method",
        },
        {
            name: "结算方式对照", key: "base_settlement_method_contrast",
        },
        {
            name: "开票方式", key: "invoice_method",
        },
        {
            name: "结算周期", key: "settlement_cycle",
        },
        {
            name: "发票类型", key: "invoice_type",
        },
        {
            name: "汇率管理", key: "base_exchange_rate",path: "/basic_finance/base_exchange_rate",
        },
        {
            name: "TMO类型", key: "tmo_type",
        },
        {
            name: "测试页面", key: "demo",path: "/demo",
        },
    ]
},
{
    title: "集装箱",
    key: "container",
    parentkey: "integration_tool",
    apps: [
        {
            name: "集装箱装箱", key: "container_loading",path: "/container/container_loading",
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
    key: "company",
    parentkey: "basic_manage",
    apps: [
        {
            name: "企业规模", key: "company_size",
        },
        {
            name: "企业性质", key: "company_nature",
        },
        {
            name: "企业类型", key: "company_type",
        },
        {
            name: "账户用途", key: "account_use",
        },
        {
            name: "企业银行账户", key: "company_bank_account",
        },
        {
            name: "企业现金账户", key: "company_cash_account",
        },
    ]
},
{
    title: "业务基础数据",
    key: "base_business_manage",
    parentkey: "basic_manage",
    apps: [
        {
            name: "海关编码", key: "base_goods",path: "/base_business_manage/base_goods",
        },
        {
            name: "海港", key: "base_seaport",path: "/base_business_manage/base_seaport",
        },
        {
            name: "空港", key: "base_airport",path: "/base_business_manage/base_airport",
        },
        {
            name: "铁港", key: "base_railwayport",path: "/base_business_manage/base_railwayport",
        },
        {
            name: "航线", key: "base_trade_lanes",path: "/base_business_manage/base_trade_lanes",
        },
        {
            name: "航线归类", key: "base_trade_lanes_grouping",path: "/base_business_manage/base_trade_lanes_grouping",
        },
        {
            name: "业务类型", key: "base_business_type",path: "/base_business_manage/base_business_type",
        },
        {
            name: "出运类型", key: "base_shipment_type",path: "/base_business_manage/base_shipment_type",
        },
        {
            name: "运输条款", key: "base_transportation_terms",path: "/base_business_manage/base_transportation_terms",
        },
        {
            name: "贸易条款", key: "transport_method",path: "/base_business_manage/base_trade_terms",
        },
        {
            name: "运费条款", key: "base_freight_terms",path: "/base_business_manage/base_freight_terms",
        },
        {
            name: "提单条款", key: "base_bill_terms",path: "/base_business_manage/base_bill_terms",
        },
        {
            name: "货物类型", key: "base_cargo_type",path: "/base_business_manage/base_cargo_type",
        },
        {
            name: "箱型种类", key: "base_container_type",path: "/base_business_manage/base_container_type",
        },
        {
            name: "箱型TEU", key: "base_container_teu",path: "/base_business_manage/base_container_teu",
        },
    ]
},
{
    title: "合作伙伴",
    key: "cooperation_party",
    parentkey: "basic_manage",
    apps: [
        {
            name: "合同管理", key: "contracts_manage",path: "/cooperation_party/contracts_manage",
        },
        {
            name: "基本信息", key: "business_partner",path: "/cooperation_party/business_partner",
        },
        {
            name: "绩效规则", key: "performance",path: "/cooperation_party/partner_performance_rule",
        },
        {
            name: "客户级别", key: "customer_level",path: "/cooperation_party/customer_level",
        },
        {
            name: "客户分类", key: "customer_type",path: "/cooperation_party/customer_type",
        },
        {
            name: "客户行业", key: "customer_industry",path: "/cooperation_party/customer_industry",
        },
    ]
},
{
    title: "日期管理",
    key: "date",
    parentkey: "basic_manage",
    apps: [
        {
            name: "节假日设定", key: "holiday",
        },
    ]
},
{
    title: "组织机构",
    key: "org",
    parentkey: "org_manage",
    apps: [
        {
            name: "管理组织", key: "manage_org",path: "/org/manage_org",
        },
        {
            name: "行政组织", key: "admin_org",path: "/org/admin_org",
        },
        {
            name: "部门", key: "department",path: "/org/department",
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
            name: "岗位", key: "job_position",path: "/org/job_position",
        },
    ]
},
{
    title: "员工",
    key: "employee",
    parentkey: "org_manage",
    apps: [
        {
            name: "员工类别", key: "employee_category",path: "/employee/employee_category",
        },
        {
            name: "员工管理", key: "employee_manage",path: "/employee/employee_manage",
        },
    ]
},
{
    title: "角色管理",
    key: "role",
    parentkey: "permission",
    apps: [
        {
            name: "角色管理", key: "role_manage",path: "/role/role_manage",
        },
        {
            name: "角色组", key: "role_group",path: "/role/role_group",
        },
        {
            name: "角色标签", key: "role_tag",path: "/role/role_tags",
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
            name: "功能权限查询（按角色）", key: "function_permission_by_role",path: "/authorization_query/function_permission_by_role",
        },
        {
            name: "功能权限查询（按用户）", key: "function_permission_by_user",path: "/authorization_query/function_permission_by_user",
        },
        {
            name: "数据权限查询（按角色）", key: "data_permission_by_role",path: "/authorization_query/data_permission_by_role",
        },
        {
            name: "数据权限查询（按用户）", key: "data_permission_by_user",path: "/authorization_query/data_permission_by_user",
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
            name: "菜单管理", key: "menu_manage",path: "/menu_manage/menu_manage",
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
            name: "预警任务", key: "warning_task",
        },
        {
            name: "预警类型", key: "warning_type",
        },
    ]
},

{
    title: "日志管理",
    key: "log_manage",
    parentkey: "system",
    apps: [
        {
            name: "登录日志", key: "login_log",
        },
        {
            name: "操作日志", key: "operation_log",
        },
        {
            name: "异常日志", key: "exception_log",
        },
        {
            name: "操作日志统计", key: "business_log_statistics",
        },
        {
            name: "导入日志", key: "import_log",
        },
        {
            name: "导出日志", key: "export_log",
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
            name: "综合财务查询", key: "finance_query",path: "/finance_query/finance_query",
        },
        {
            name: "凭证查询", key: "voucher_log",path: "/finance_query/voucher_log",
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
            name: "中国地图", key: "china_map",path: "/large_screen/china_map",
        },
        {
            name: "集团大屏", key: "lev1_department",path: "/large_screen/lev1_department",
        },
    ]
},
{
    title: "业务统计",
    key: "business_statistics",
    parentkey: "report_manage",
    apps: [
        {
            name: "销售箱量统计表", key: "sales_business_weight_report",path: "/business_statistics/sales_business_weight_report",
        },
        {
            name: "业务对比分析表", key: "sales_business_amount_report",path: "/business_statistics/sales_business_amount_report",
        },
        {
            name: "销售毛利润统计表", key: "sales_profit_report",path: "/business_statistics/sales_profit_report",
        },
        {
            name: "接单部门箱量利润汇总表", key: "department_business_weight_report", path: "/business_statistics/department_business_weight_report",
        },
        {
            name: "单票利润统计", key: "single_ticket_profit_statistics_report",path: "/business_statistics/single_ticket_profit_statistics_report",
        },
        {
            name: "操作员票数箱量利润汇总表", key: "operator_shipment_summary_report",path: "/business_statistics/operator_shipment_summary_report",
        },
        {
            name: "航线货量分析", key: "transportation_line_teu_report",path: "/business_statistics/transportation_line_teu_report",
        },
        {
            name: "客户箱量利润汇总表", key: "customer_weight_profit_report",path: "/business_statistics/customer_weight_profit_report",
        },
    ]
},

{
    title: "财务统计",
    key: "finance_statistics",
    parentkey: "report_manage",
    apps: [
        {
            name: "未收未付统计对账表", key: "outstanding_receivables_payables_report",path: "/finance_statistics/outstanding_receivables_payables_report",
        },
        {
            name: "未收对账表（按费用）", key: "not_receivables_fee_report",path: "/finance_statistics/not_receivables_fee_report",
        },
        {
            name: "未收对账表（按业务单号）", key: "not_receivables_order_report",path: "/finance_statistics/not_receivables_order_report",
        },
        {
            name: "应收未收对账表（按业务单号）", key: "accounts_receivable_aging_report",path: "/finance_statistics/accounts_receivable_aging_report",
        },
        {
            name: "未付对账表（按费用）", key: "not_pay_fee_report",path: "/finance_statistics/not_pay_fee_report",
        },
        {
            name: "未付对账表（按业务单号）", key: "unpaid_work_order_statement",path: "/finance_statistics/not_pay_order_report",
        },
        {
            name: "客户欠账分析", key: "customer_arrears_analysis_report",path: "/finance_statistics/customer_arrears_analysis_report",
        },
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

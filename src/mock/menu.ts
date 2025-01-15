import type { MenuGroup } from "@/types/menu/menu.d";
// 修正icon的类型问题，因为JSX元素不能作为JSON对象的一部分，这里已经改为字符串
const menuData: MenuGroup[] = [
    {
        title: "动态建模平台",
        key: "platform",
        apps: [
            {
                name: "组织管理", key: "org_manage",
            },
            {
                name: "基础数据", key: "basic",
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
    key: "finance",
    parentkey: "basic",
    apps: [
        {
            name: "币制", key: "currency", path: "/currency",
        },
        {
            name: "费用科目", key: "expense",
        },
        {
            name: "科目账套", key: "account",
        },
        {
            name: "税率管理", key: "taxrate",
        },
        {
            name: "结算方式", key: "settlement_method",
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
            name: "汇率管理", key: "exchange_rate",
        },
        {
            name: "TMO类型", key: "tmo_type",
        },
        {
            name: "银行信息", key: "bank_info",
        },
        {
            name: "企业规模", key: "company_size",
        },
        {
            name: "企业性质", key: "company_nature",
        },
        {
            name: "企业类型", key: "company_type",
        },
    ]
},
{
    title: "企业基础数据",
    key: "company",
    parentkey: "basic",
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
    ]
},
{
    title: "业务基础数据",
    key: "business",
    parentkey: "basic",
    apps: [
        {
            name: "海关编码", key: "customs_code",
        },
        {
            name: "海关监管方式", key: "customs_supervision",
        },
        {
            name: "海港", key: "sea_port",
        },
        {
            name: "空港", key: "air_port",
        },
        {
            name: "铁港", key: "railway_port",
        },
        {
            name: "航线", key: "route",
        },
        {
            name: "航线归类", key: "route_classification",
        },
        {
            name: "业务类型", key: "business_type",
        },
        {
            name: "出运类型", key: "export_type",
        },
        {
            name: "交货方式", key: "delivery_method",
        },
        {
            name: "运输类型", key: "transport_method",
        },
        {
            name: "揽货方式", key: "pickup_method",
        },
        {
            name: "进出口标记", key: "import_export_mark",
        },
        {
            name: "货物来源", key: "goods_source",
        },
        {
            name: "货物状态", key: "goods_status",
        },
        {
            name: "货物类型", key: "goods_type",
        },
        {
            name: "包装类型", key: "packaging_type",
        },
        {
            name: "包装单位", key: "packaging_unit",
        },
        {
            name: "箱型箱量", key: "box_type",
        },
    ]
},
{
    title: "供应商管理",
    key: "supplier",
    parentkey: "basic",
    apps: [
        {
            name: "合同管理", key: "contract",
        },
        {
            name: "基本信息", key: "basic",
        },
        {
            name: "商品管理", key: "goods",
        },
        {
            name: "商品价格", key: "price",
        },
        {
            name: "绩效管理", key: "performance",
        },
    ]
},
{
    title: "客户管理",
    key: "customer",
    parentkey: "basic",
    apps: [
        {
            name: "合同管理", key: "contract",
        },
        {
            name: "基本信息", key: "basic",
        },
        {
            name: "绩效管理", key: "performance",
        },
        {
            name: "客户级别", key: "customer_level",
        },
        {
            name: "客户分类", key: "customer_class",
        },
        {
            name: "客户行业", key: "customer_industry",
        },
    ]
},
{
    title: "日期管理",
    key: "date",
    parentkey: "basic",
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
            name: "组织单元", key: "org_unit",
        },
        {
            name: "部门", key: "department",
        },
        {
            name: "组织形态", key: "org_type",
        },
        {
            name: "职务类别", key: "job_type",
        },
        {
            name: "职务", key: "job",
        },
        {
            name: "职等", key: "grade",
        },
        {
            name: "职级", key: "level",
        },
        {
            name: "岗位", key: "position",
        },
    ]
},
{
    title: "员工",
    key: "employee",
    parentkey: "org_manage",
    apps: [
        {
            name: "员工类别", key: "employee_type",
        },
        {
            name: "员工", key: "employee",
        },
    ]
},
{
    title: "菜单管理",
    key: "menu_manage",
    parentkey: "permission",
    apps: [
        {
            name: "应用管理", key: "app_manage",
        },
        {
            name: "菜单管理", key: "menu_manage",
        },
    ]
},
{
    title: "角色管理",
    key: "role",
    parentkey: "permission",
    apps: [
        {
            name: "角色管理", key: "role_manage",
        },
        {
            name: "角色组", key: "role_group",
        },
        {
            name: "角色标签", key: "role_tag",
        },
    ]
},
{
    title: "授权",
    key: "authorization",
    parentkey: "permission",
    apps: [
        {
            name: "功能权限", key: "function_permission",
        },
        {
            name: "数据权限", key: "data_permission",
        },
        {
            name: "数据权限规则定义", key: "data_permission_rule",
        },
    ]
},
{
    title: "权限查询",
    key: "authorization_query",
    parentkey: "permission",
    apps: [
        {
            name: "功能权限查询（按角色）", key: "function_permission_role_query",
        },
        {
            name: "数据权限查询（按角色）", key: "data_permission_role_query",
        },
        {
            name: "数据权限查询（按用户）", key: "data_permission_user_query",
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
            name: "订单管理", key: "order",
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
            name: "对账", key: "settlement",
        },
        {
            name: "账单", key: "bill",
        },
        {
            name: "对账单", key: "settlement_bill",
        },
        {
            name: "关联交易", key: "related_transaction",
        },
        {
            name: "费用拆分", key: "cost_split",
        },
        {
            name: "拼箱分摊模式", key: "lcl_allocation",
        },
    ]
},
{
    title: "发票管理",
    key: "invoice_manage",
    parentkey: "cost_manage",
    apps: [
        {
            name: "收款发票", key: "receipt_invoice",
        },
        {
            name: "实体收款发票查询", key: "receipt_invoice_download",
        },
        {
            name: "付款发票", key: "payment_invoice",
        },
        {
            name: "实体付款发票查询", key: "payment_invoice_download",
        },
    ]
},
{
    title: "付款申请",
    key: "payment_apply",
    parentkey: "cost_manage",
    apps: [
        {
            name: "付款申请", key: "payment_apply",
        },
    ]
},
{
    title: "管理凭证",
    key: "manage_voucher",
    parentkey: "cost_manage",
    apps: [
        {
            name: "操作费凭证", key: "operation_voucher",
        },
        {
            name: "结账凭证", key: "settlement_voucher",
        },
        {
            name: "凭证下载", key: "cost_voucher_download",
        },
    ]
},
{
    title: "主单放单管理",
    key: "main_order",
    parentkey: "cost_manage",
    apps: [
        {
            name: "放单审核", key: "order_review",
        },
        {
            name: "提单管理", key: "order_manage",
        },
    ]
},
{
    title: "TMO管理",
    key: "tmo_manage",
    parentkey: "cost_manage",
    apps: [
        {
            name: "现金收款", key: "cash_receipt",
        },
        {
            name: "银行转账", key: "bank_transfer",
        },
        {
            name: "支票收款", key: "cheque_receipt",
        },
        {
            name: "第三方支付平台", key: "third_party_payment",
        },
        {
            name: "其他收款", key: "other_receipt",
        },
    ]
},
{
    title: "银行对账",
    key: "bank_reconciliation",
    parentkey: "finance_manage",
    apps: [
        {
            name: "银行对账", key: "bank_reconciliation",
        },

    ]
},
{
    title: "实收实付",
    key: "actual_payment",
    parentkey: "finance_manage",
    apps: [
        {
            name: "付款单", key: "payment_order",
        },
        {
            name: "核销单", key: "write_off_order",
        },
    ]
},
{
    title: "凭证管理",
    key: "voucher_manage",
    parentkey: "finance_manage",
    apps: [
        {
            name: "凭证查询", key: "voucher_query",
        },
    ]
},
{
    title: "财务审核",
    key: "finance_audit",
    parentkey: "finance_manage",
    apps: [
        {
            name: "费用审核", key: "cost_audit",
        },
        {
            name: "批量审核", key: "batch_audit",
        },
        {
            name: "增减费用", key: "add_cost",
        },
    ]
},
{
    title: "综合财务查询",
    key: "finance_query",
    parentkey: "finance_manage",
    apps: [
        {
            name: "综合财务查询", key: "finance_query",
        },
    ]
},
{
    title: "模板管理",
    key: "template_manage",
    parentkey: "system_maintenance",
    apps: [
        {
            name: "费用模板", key: "cost_template",
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
    title: "税务管理",
    key: "tax_manage",
    parentkey: "finance_manage",
    apps: [
        {
            name: "结账凭证", key: "settlement_voucher",
        },
        {
            name: "凭证查询", key: "voucher_query",
        },
    ]
},
{
    title: "业务统计",
    key: "business_statistics",
    parentkey: "report_manage",
    apps: [
        {
            name: "销售箱量统计表", key: "sales_volume",
        },
        {
            name: "业务对比分析表", key: "business_comparison",
        },
        {
            name: "销售毛利润统计表", key: "gross_profit",
        },
        {
            name: "部门箱量利润分析表", key: "department_profit",
        },
        {
            name: "客户委托明细统计表", key: "customer_consignment",
        },
        {
            name: "货量统计表(按操作)", key: "volume_operation",
        },
        {
            name: "海运开箱利润统计表", key: "sea_open_profit",
        },
        {
            name: "操作员货量箱量利润汇总表", key: "operator_volume_profit",
        },
        {
            name: "客户箱量利润汇总表", key: "customer_volume_profit",
        },
    ]
},
{
    title: "财务统计",
    key: "finance_statistics",
    parentkey: "report_manage",
    apps: [
        {
            name: "未收未付统计对账表", key: "unpaid_receivable_payable_statement",
        },
        {
            name: "未收对账表（按费用）", key: "unpaid_cost",
        },
        {
            name: "未收对账表（按工作单）", key: "unpaid_work_order",
        },
        {
            name: "应收未收对账表（按工作单）", key: "receivable_unpaid_work_order",
        },
        {
            name: "未付对账表（按费用）", key: "unpaid_cost_statement",
        },
        {
            name: "未付对账表（按工作单）", key: "unpaid_work_order_statement",
        },
        {
            name: "客户欠账分析", key: "customer_arrears_analysis",
        },
        {
            name: "供应商欠账分析", key: "supplier_arrears_analysis",
        },
    ]
},
]

export default [
    // 用户登录
    {
        url: "/api/mainmenu",
        method: "GET",
        response: () => {
            return {
                code: 200,
                success: true,
                message: "请求成功。",
                data: menuData,
            };
        },
    },
    {
        url: "/api/submenu",
        method: "GET",
        response: () => {
            return {
                code: 200,
                success: true,
                message: "请求成功。",
                data: childrenMenuData,
            };
        },
    },
];
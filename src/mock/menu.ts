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
                name: "基础数据",key: "basic",
            },
            {
                name: "权限管理",key: "permission",
            },
            {
                name: "系统管理",key: "system",
            },
        ]
    },
    {
        title: "AI驱动供应链智能化平台",
        key: "ai_supply_chain",
        apps: [
            {
                name: "业务管理",key: "business_manage",
            },
            {
                name: "费用管理",key: "cost_manage",
            },
            {
                name: "财务管理",key: "finance_manage",
            },
            {
                name: "税务管理",key: "tax_manage",
            },
            {
                name: "发票管理",key: "invoice_manage",
            },
            {
                name: "结算管理",key: "settlement_manage",
            },
            {
                name: "报表管理",key: "report_manage",
            },
        ]
    },
    {
        title: "集成平台",
        key: "integration",
        apps: [
            {
                name: "数据交换管理",key: "dataexchange",
            },
            {
                name: "标准接口",key: "standard",
            },
        ]
    },

];
const childrenMenuData: MenuGroup[] = [{
    title: "财务基础数据",
    key : "finance",
    parentkey: "basic",
    apps: [
        {
            name: "币制", key: "currency",path:"/currency",
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
            name: "结算方式", key: "settlement",
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
            name: "企业规模", key: "company_size",
        },
        {
            name: "企业性质", key: "company_nature",
        },
        {
            name: "企业类型", key: "company_type",
        },
        {
            name: "银行信息", key: "bank_info",
        },
    ]
},
{
    title: "供应商管理",
    key : "supplier",
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
    key : "customer",
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
    title: "组织机构",
    key : "org",
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
    key : "employee",
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
    title: "角色管理",
    key : "role",
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
    key : "authorization",
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
    key : "authorization_query",
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
    key : "code_rule",
    parentkey: "system",
    apps: [
        {
            name: "编码规则", key: "code_rule",
        },
    ]
},
{
    title: "调度任务",
    key : "schedule_task",
    parentkey: "system",
    apps: [
        {
            name: "调度任务", key: "schedule_task",
        },
    ]
},
{
    title: "预警任务",
    key : "warning_task",
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
    title: "菜单管理",
    key : "menu_manage",
    parentkey: "system",
    apps: [
        {
            name: "菜单管理", key: "menu_manage",
        },
    ]
},
{
    title: "日志管理",
    key : "log_manage",
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
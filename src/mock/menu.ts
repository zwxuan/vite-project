
// 修正icon的类型问题，因为JSX元素不能作为JSON对象的一部分，这里已经改为字符串
const menuData: MenuGroup[] = [
    {
        title: "动态建模平台",
        key: "platform",
        apps: [
            {
                name: "组织管理", key: "org",
            },
            {
                name: "基础数据", active: true,key: "basic",
            },
            {
                name: "流程管理",key: "flow",
            },
            {
                name: "会计平台",key: "account",
            },
            {
                name: "客户化配置",key: "custom",
            },
            {
                name: "系统管理",key: "system",
            },
            {
                name: "开发配置",key: "dev",
            },
            {
                name: "报表平台",key: "report",
            },
            {
                name: "企业绩效管理平台",key: "performance",
            },
            {
                name: "工程基础数据",key: "engineering",
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
    ]
}]
 
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
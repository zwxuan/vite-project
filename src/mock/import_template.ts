import { ImportTemplateItem,ImportTemplateFieldItem } from "@/types/excel/import_template.d";
// 修正icon的类型问题，因为JSX元素不能作为JSON对象的一部分，这里已经改为字符串
const importTemplateItems:ImportTemplateItem[] = [
  {
    SerialNo: 1,
    Version: "V1.0",
    TemplateCode: "MB10001",
    TemplateName: "币制详情测试模板一",
    TemplateSource: "币制详情",
    CreatDate: "2021-01-01",
    LastDate: "2021-01-01",
    Operator: "admin",
    Status: 1,
    Country: "中国",
    IsDefault: 1,
  },
  {
    SerialNo: 2,
    Version: "V1.0",
    TemplateCode: "MB10002",
    TemplateName: "币制详情测试模板一",
    TemplateSource: "币制详情",
    CreatDate: "2021-01-01",
    LastDate: "2021-01-01",
    Operator: "admin",
    Status: 1,
    Country: "中国",
    IsDefault: 1,
  },
];

const templateFieldItems:ImportTemplateFieldItem[] = [
  {
    SerialNo: 1,
    FieldCode: "CurrencyCode",
    FieldName: "输入框",
    IsSystemRequired: true,
    IsSetRequired: true,
    IsInclude: true,
    ComponentType: "input",
  },
  {
    SerialNo: 2,
    FieldCode: "CurrencyFullName",
    FieldName: "币制全称",
    IsSystemRequired: true,
    IsSetRequired: true,
    IsInclude: true,
    ComponentType: "输入框",
  },
  {
    SerialNo: 3,
    FieldCode: "CurrencyShortName",
    FieldName: "币制简称",
    IsSystemRequired: true,
    IsSetRequired: true,
    IsInclude: true,
    ComponentType: "输入框",
  },
  {
    SerialNo: 4,
    FieldCode: "CurrencyName",
    FieldName: "币制名称",
    IsSystemRequired: true,
    IsSetRequired: true,
    IsInclude: true,
    ComponentType: "输入框",
  },
  {
    SerialNo: 5,
    FieldCode: "CurrencyMark",
    FieldName: "币制标识",
    IsSystemRequired: true,
    IsSetRequired: true,
    IsInclude: true,
    ComponentType: "输入框",
  },
  {
    SerialNo: 6,
    FieldCode: "CurrencySymbol",
    FieldName: "币制符号",
    IsSystemRequired: true,
    IsSetRequired: true,
    IsInclude: true,
    ComponentType: "输入框",
  },
  {
    SerialNo: 7,
    FieldCode: "CurrencyUnit",
    FieldName: "币制单位",
    IsSystemRequired: false,
    IsSetRequired: true,
    IsInclude: true,
    ComponentType: "输入框",
  },
  {
    SerialNo: 8,
    FieldCode: "CreateDate",
    FieldName: "创建时间",
    IsSystemRequired: false,
    IsSetRequired: true,
    IsInclude: true,
    ComponentType: "日期",
  },
  {
    SerialNo: 9,
    FieldCode: "CreateUser",
    FieldName: "创建人",
    IsSystemRequired: false,
    IsSetRequired: true,
    IsInclude: true,
    ComponentType: "自动完成",
  },
];

export default [
  // 模板列表
  {
    url: "/api/excel/import_template/list",
    method: "GET",
    response: () => {
      return {
        code: 200,
        success: true,
        message: "请求成功。",
        data: importTemplateItems,
      };
    },
  },
  {
    url: "/api/excel/template_field/list",
    method: "GET",
    response: () => {
      return {
        code: 200,
        success: true,
        message: "请求成功。",
        data: templateFieldItems,
      };
    },
  },
];
import Mock from "mockjs";
import { ImportTemplateProps } from "@/types/excel/import_template.d";
// 修正icon的类型问题，因为JSX元素不能作为JSON对象的一部分，这里已经改为字符串
const importTemplateItems:ImportTemplateProps[] = [
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
];
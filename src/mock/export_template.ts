import Mock from "mockjs";
import { ExportLogItem } from "@/types/dynamic_configuration_platform/system_manage/export_template";
// 修正icon的类型问题，因为JSX元素不能作为JSON对象的一部分，这里已经改为字符串
const exportLogItems:ExportLogItem[] = [
  {
    SerialNo: 1,
    BatchNo: Mock.mock("@id"),
    ServiceName: "币制详情",
    TemplateName: "币制详情测试模板一",
    ExportType: "导出",
    ExportCount: "100",
    ExportStartDate: Mock.mock("@datetime"),
    ExportEndDate: Mock.mock("@datetime"),
    Status: 1,
    Operator: "admin",
    ExportFile: "币制详情.xlsx",
  },
  {
    SerialNo: 2,
    BatchNo: Mock.mock("@id"),
    ServiceName: "币制详情",
    TemplateName: "币制详情测试模板一",
    ExportType: "导出",
    ExportCount: "100",
    ExportStartDate: Mock.mock("@datetime"),
    ExportEndDate: Mock.mock("@datetime"),
    Status: 1,
    Operator: "admin",
    ExportFile: "币制详情.xlsx",
  },
  {
    SerialNo: 3,
    BatchNo: Mock.mock("@id"),
    ServiceName: "币制详情",
    TemplateName: "币制详情测试模板一",
    ExportType: "导出",
    ExportCount: "100",
    ExportStartDate: Mock.mock("@datetime"),
    ExportEndDate: Mock.mock("@datetime"),
    Status: 1,
    Operator: "admin",
    ExportFile: "币制详情.xlsx",
  },
  {
    SerialNo: 4,
    BatchNo: Mock.mock("@id"),
    ServiceName: "币制详情",
    TemplateName: "币制详情测试模板一",
    ExportType: "导出",
    ExportCount: "100",
    ExportStartDate: Mock.mock("@datetime"),
    ExportEndDate: Mock.mock("@datetime"),
    Status: 1,
    Operator: "admin",
    ExportFile: "币制详情.xlsx",
  },   
];

export default [
  // 导出日志列表
  {
    url: "/api/excel/export_log/list",
    method: "GET",
    response: () => {
      return {
        code: 200,
        success: true,
        message: "请求成功。",
        data: exportLogItems,
      };
    },
  },
];
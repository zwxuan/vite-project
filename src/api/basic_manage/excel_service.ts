//excel_service.ts
import { ExportLogItem } from '@/types/basic_manage/export_template';
import request, { ApiRes, requestWithProgress } from '../request'
import { ImportLogItem, ImportTemplateItem, ImportTemplateFieldItem } from '@/types/basic_manage/import_template';
import Mock from "mockjs";

// 模拟导出日志数据
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

// 获取导出日志列表
export const getExportLogList = async (): Promise<ExportLogItem[]> => {
  return exportLogItems;
}

// 原有API接口代码（已注释）
/*
export const getExportLogList = async () : Promise<ExportLogItem[]> => {
  const reponse = await request({
    method: 'GET',
    url: '/excel/export_log/list'
  });
  const responseData = reponse?.data as ApiRes<ExportLogItem[]>;
  return responseData.data || [];
}
*/

// 模拟导入模板数据
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

// 模拟导入模板字段数据
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
];

// 获取导入模板列表
export const getImportTemplateList = async (): Promise<ImportTemplateItem[]> => {
  return importTemplateItems;
}

// 获取导入模板字段列表
export const getImportTemplateFieldList = async (): Promise<ImportTemplateFieldItem[]> => {
  return templateFieldItems;
}

// 获取导入日志列表
export const getImportLogList = async (): Promise<ImportLogItem[]> => {
  return [];
}

// 原有API接口代码（已注释）
/*
export const getImportLogList = async () : Promise<ImportLogItem[]> => {
  const reponse = await request({
    method: 'GET',
    url: '/excel/import_log/list'
  });
  const responseData = reponse?.data as ApiRes<ImportLogItem[]>;
  return responseData.data || [];
}
*/
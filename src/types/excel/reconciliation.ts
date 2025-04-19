// 对账功能相关类型定义

// Excel数据项类型
export interface ExcelDataItem {
  [key: string]: any;
}

// 系统数据项类型
export interface SystemDataItem {
  [key: string]: any;
}

// 匹配字段类型
export interface MatchField {
  excelField: string;
  systemField: string;
}

// 比较字段类型
export interface CompareField {
  excelField: string;
  systemField: string;
}

// 匹配结果类型
export interface MatchResult {
  matched: boolean;
  color: string;
}

// 对账结果项类型
export interface ReconciliationResultItem {
  excel: ExcelDataItem;
  system: SystemDataItem;
  matched: boolean;
}
//currency_service.ts
import { ImportTemplateFieldItem, ImportTemplateItem } from '@/types/excel/import_template';
import request, { ApiRes, requestWithProgress } from '../request'
import { CurrencyItemProps } from "@/types/currency/currency"
import Mock from "mockjs";

// 模拟币制数据
const currencyItems:CurrencyItemProps[] = [
  {
    Code: Mock.mock("@id"),
    CurrencyFullName: "人民币",
    CurrencyShortName: "RMB",
    CurrencyMark: "￥",
    PricePrecision: 2,
    PriceRoundingRule: "四舍五入",
    AmountPrecision: 2,
    AmountRoundingRule: "四舍五入",
    Remark: "备注",
    Status:0,
  },
  {
    Code: Mock.mock("@id"),
    CurrencyFullName: "美元",
    CurrencyShortName: "USD",
    CurrencyMark: "$",
    PricePrecision: 2,
    PriceRoundingRule: "四舍五入",
    AmountPrecision: 2,
    AmountRoundingRule: "四舍五入",
    Remark: "备注",
    Status:1,
  },
  {
    Code: Mock.mock("@id"),
    CurrencyFullName: "欧元",
    CurrencyShortName: "EUR",
    CurrencyMark: "€",
    PricePrecision: 2,
    PriceRoundingRule: "四舍五入",
    AmountPrecision: 2,
    AmountRoundingRule: "四舍五入",
    Remark: "备注",
    Status:2,
  },
  {
    Code: Mock.mock("@id"),
    CurrencyFullName: "英镑",
    CurrencyShortName: "GBP",
    CurrencyMark: "£",
    PricePrecision: 2,
    PriceRoundingRule: "四舍五入",
    AmountPrecision: 2,
    AmountRoundingRule: "四舍五入",
    Remark: "备注",
    Status:0,
  },
  {
    Code: Mock.mock("@id"),
    CurrencyFullName: "日元",
    CurrencyShortName: "JPY", 
    CurrencyMark: "¥",
    PricePrecision: 2,
    PriceRoundingRule: "四舍五入",
    AmountPrecision: 2,
    AmountRoundingRule: "四舍五入",
    Remark: "备注",
    Status:0,
  },
  {
    Code: Mock.mock("@id"),
    CurrencyFullName: "韩元",
    CurrencyShortName: "KRW",
    CurrencyMark: "₩",
    PricePrecision: 2,
    PriceRoundingRule: "四舍五入",
    AmountPrecision: 2,
    AmountRoundingRule: "四舍五入",
    Remark: "备注",
    Status:0,
  },
  {
    Code: Mock.mock("@id"),
    CurrencyFullName: "泰铢",
    CurrencyShortName: "THB",
    CurrencyMark: "฿",
    PricePrecision: 2,
    PriceRoundingRule: "四舍五入",
    AmountPrecision: 2,
    AmountRoundingRule: "四舍五入",
    Remark: "备注",
    Status:0,
  },
  {
    Code: Mock.mock("@id"),
    CurrencyFullName: "越南盾",
    CurrencyShortName: "VND",
    CurrencyMark: "₫",
    PricePrecision: 2,
    PriceRoundingRule: "四舍五入",
    AmountPrecision: 2,
    AmountRoundingRule: "四舍五入",
    Remark: "备注",
    Status:0,
  },
  {
    Code: Mock.mock("@id"),
    CurrencyFullName: "卢布",
    CurrencyShortName: "RUB",
    CurrencyMark: "₽",
    PricePrecision: 2,
    PriceRoundingRule: "四舍五入",
    AmountPrecision: 2,
    AmountRoundingRule: "四舍五入",
    Remark: "备注",
    Status:0,
  },
  {
    Code: Mock.mock("@id"),
    CurrencyFullName: "新西兰元",
    CurrencyShortName: "NZD",
    CurrencyMark: "$" ,
    PricePrecision: 2,
    PriceRoundingRule: "四舍五入",
    AmountPrecision: 2,
    AmountRoundingRule: "四舍五入",
    Remark: "备注",
    Status:0,
  },
  {
    Code: Mock.mock("@id"),
    CurrencyFullName: "澳大利亚元",
    CurrencyShortName: "AUD",
    CurrencyMark: "$",
    PricePrecision: 2,
    PriceRoundingRule: "四舍五入",
    AmountPrecision: 2,
    AmountRoundingRule: "四舍五入",
    Remark: "备注",
    Status:0,
  },
  {
    Code: Mock.mock("@id"),
    CurrencyFullName: "加拿大元",
    CurrencyShortName: "CAD",
    CurrencyMark: "$",
    PricePrecision: 2,
    PriceRoundingRule: "四舍五入",
    AmountPrecision: 2,
    AmountRoundingRule: "四舍五入",
    Remark: "备注",
    Status:0,
  },
  {
    Code: Mock.mock("@id"),
    CurrencyFullName: "瑞士法郎",
    CurrencyShortName: "CHF",
    CurrencyMark: "CHF",
    PricePrecision: 2,
    PriceRoundingRule: "四舍五入",
    AmountPrecision: 2,
    AmountRoundingRule: "四舍五入",
    Remark: "备注",
    Status:0,
  },
  {
    Code: Mock.mock("@id"),
    CurrencyFullName: "新加坡元",
    CurrencyShortName: "SGD",
    CurrencyMark: "$",
    PricePrecision: 2,
    PriceRoundingRule: "四舍五入",
    AmountPrecision: 2,
    AmountRoundingRule: "四舍五入",
    Remark: "备注",
    Status:0,
  },
];

// 获取币制列表
export const getCurrencyList = async (): Promise<CurrencyItemProps[]> => {
  return currencyItems;
}

// 保存币制
export const saveCurrency = async (data: CurrencyItemProps, onUploadProgress?: (progress: number) => void): Promise<CurrencyItemProps> => {
  // 模拟上传进度
  if (onUploadProgress) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      onUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 1000);
  }
  return data;
}

// 原有API接口代码（已注释）
/*
// 获取币制列表
export const getCurrencyList = async () : Promise<CurrencyItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/currency"
  });
  const responseData = response?.data as ApiRes<CurrencyItemProps[]>;
  return responseData.data || [];
}

// 保存币制
export const saveCurrency = (data:CurrencyItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/currency/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/

// 获取模板信息
export const getImportTemplateList = async () : Promise<ImportTemplateItem[]> => {
  const response = await request({
    method: 'GET',
    url: '/excel/import_template/list'
  });
  const responseData = response?.data as ApiRes<ImportTemplateItem[]>;
  return responseData.data || [];
}

export const getTemplateFieldList = async () : Promise<ImportTemplateFieldItem[]> => {
  const response = await request({
    method: 'GET',
    url: '/excel/template_field/list'
  });
  const responseData = response?.data as ApiRes<ImportTemplateFieldItem[]>;
  return responseData.data || [];
}
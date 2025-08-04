
import request, { ApiRes, requestWithProgress } from '../../request'
import { BaseTaxRateItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_tax_rate";
import Mock from "mockjs";
//
const baseTaxRateItems: BaseTaxRateItemProps[] = [
    {
        "TaxRateCode": "VAT5",
        "TaxRateDescription": "5%",
        "TaxSystem": "中国税制",
        "TaxType": "增值税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "5",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-12-15 21:21:32"
    },
    {
        "TaxRateCode": "VAT0",
        "TaxRateDescription": "0%",
        "TaxSystem": "中国税制",
        "TaxType": "增值税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "0",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-12-15 21:21:32"
    },
    {
        "TaxRateCode": "VAT3",
        "TaxRateDescription": "3%",
        "TaxSystem": "中国税制",
        "TaxType": "增值税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "3",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-12-15 21:21:32"
    },
    {
        "TaxRateCode": "VAT6",
        "TaxRateDescription": "6%",
        "TaxSystem": "中国税制",
        "TaxType": "增值税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "6",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-12-15 21:21:32"
    },
    {
        "TaxRateCode": "NO VAT",
        "TaxRateDescription": "不征税",
        "TaxSystem": "中国税制",
        "TaxType": "增值税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "0",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-12-15 21:21:32"
    },
    {
        "TaxRateCode": "VAT9",
        "TaxRateDescription": "9%",
        "TaxSystem": "中国税制",
        "TaxType": "增值税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "9",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-12-15 21:21:32"
    },
    {
        "TaxRateCode": "VAT FREE",
        "TaxRateDescription": "免税",
        "TaxSystem": "中国税制",
        "TaxType": "增值税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "0",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-12-15 21:21:32"
    },
    {
        "TaxRateCode": "VAT13",
        "TaxRateDescription": "13%",
        "TaxSystem": "中国税制",
        "TaxType": "增值税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "13",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-12-15 21:21:32"
    },
    {
        "TaxRateCode": "VAT1.5",
        "TaxRateDescription": "1.5%",
        "TaxSystem": "中国税制",
        "TaxType": "增值税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "1.5",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-12-15 21:21:32"
    },
    {
        "TaxRateCode": "VATR2",
        "TaxRateDescription": "9%增值税税率",
        "TaxSystem": "中国税制",
        "TaxType": "增值税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "9",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-12-15 21:21:32"
    },
    {
        "TaxRateCode": "VATR3",
        "TaxRateDescription": "6%增值税税率",
        "TaxSystem": "中国税制",
        "TaxType": "增值税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "6",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-12-15 21:21:32"
    },
    {
        "TaxRateCode": "VATR4",
        "TaxRateDescription": "5%增值税税率",
        "TaxSystem": "中国税制",
        "TaxType": "增值税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "5",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-12-15 21:21:32"
    },
    {
        "TaxRateCode": "VATR5",
        "TaxRateDescription": "3%增值税税率",
        "TaxSystem": "中国税制",
        "TaxType": "增值税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "3",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-12-15 21:21:32"
    },
    {
        "TaxRateCode": "VATR1",
        "TaxRateDescription": "13%增值税税率",
        "TaxSystem": "中国税制",
        "TaxType": "增值税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "13",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-12-15 21:21:32"
    },
    {
        "TaxRateCode": "VATR6",
        "TaxRateDescription": "1.5%增值税税率",
        "TaxSystem": "中国税制",
        "TaxType": "增值税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "1.5",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-12-15 21:21:32"
    },
    {
        "TaxRateCode": "VATZR",
        "TaxRateDescription": "0%增值税税率",
        "TaxSystem": "中国税制",
        "TaxType": "增值税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "0",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-12-15 21:21:32"
    },
    {
        "TaxRateCode": "TE",
        "TaxRateDescription": "增值税免税",
        "TaxSystem": "中国税制",
        "TaxType": "增值税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "0",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-12-15 21:21:32"
    },
    {
        "TaxRateCode": "NL",
        "TaxRateDescription": "不征增值税",
        "TaxSystem": "中国税制",
        "TaxType": "增值税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "0",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-12-15 21:21:32"
    },
    {
        "TaxRateCode": "RT9",
        "TaxRateDescription": "50%",
        "TaxSystem": "中国税制",
        "TaxType": "资源税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "0.5",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-06-13 20:06:13"
    },
    {
        "TaxRateCode": "RT8",
        "TaxRateDescription": "9%",
        "TaxSystem": "中国税制",
        "TaxType": "资源税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "0.09",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-06-13 20:06:13"
    },
    {
        "TaxRateCode": "RT7",
        "TaxRateDescription": "6%",
        "TaxSystem": "中国税制",
        "TaxType": "资源税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "0.06",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-06-13 20:06:13"
    },
    {
        "TaxRateCode": "RT6",
        "TaxRateDescription": "5%",
        "TaxSystem": "中国税制",
        "TaxType": "资源税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "0.05",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-06-13 20:06:13"
    },
    {
        "TaxRateCode": "RT5",
        "TaxRateDescription": "4.8%",
        "TaxSystem": "中国税制",
        "TaxType": "资源税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "0.05",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-06-13 20:06:13"
    },
    {
        "TaxRateCode": "RT4",
        "TaxRateDescription": "4%",
        "TaxSystem": "中国税制",
        "TaxType": "资源税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "0.04",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-06-13 20:06:13"
    },
    {
        "TaxRateCode": "RT3",
        "TaxRateDescription": "3%",
        "TaxSystem": "中国税制",
        "TaxType": "资源税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "0.03",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-06-13 20:06:13"
    },
    {
        "TaxRateCode": "RT2",
        "TaxRateDescription": "2%",
        "TaxSystem": "中国税制",
        "TaxType": "资源税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "0.02",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-06-13 20:06:13"
    },
    {
        "TaxRateCode": "RT1",
        "TaxRateDescription": "1%",
        "TaxSystem": "中国税制",
        "TaxType": "资源税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "0.01",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-06-13 20:06:13"
    },
    {
        "TaxRateCode": "SDR5",
        "TaxRateDescription": "0.05‰",
        "TaxSystem": "中国税制",
        "TaxType": "印花税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "0.0",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-02-19 03:36:13"
    },
    {
        "TaxRateCode": "SDR4",
        "TaxRateDescription": "0.25‰",
        "TaxSystem": "中国税制",
        "TaxType": "印花税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "0.0",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-02-19 03:36:13"
    },
    {
        "TaxRateCode": "SDR3",
        "TaxRateDescription": "0.3‰",
        "TaxSystem": "中国税制",
        "TaxType": "印花税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "0.0",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-02-19 03:36:13"
    },
    {
        "TaxRateCode": "SDR2",
        "TaxRateDescription": "0.5‰",
        "TaxSystem": "中国税制",
        "TaxType": "印花税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "0.0",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-02-19 03:36:13"
    },
    {
        "TaxRateCode": "SDR1",
        "TaxRateDescription": "1‰",
        "TaxSystem": "中国税制",
        "TaxType": "印花税",
        "CountryRegion": "",
        "Precision": "2",
        "RoundingRule": "四舍五入",
        "TaxRateValue": "0.0",
        "Currency": "",
        "Unit": "",
        "Status": "启用",
        "CreationDate": "2023-02-19 03:36:13"
    }
];


// 获取账单管理台账列表
export const getBaseTaxRateList = async (): Promise<BaseTaxRateItemProps[]> => {
    return baseTaxRateItems;
}

// 保存账单管理
export const saveBaseTaxRate = async (data: BaseTaxRateItemProps, onUploadProgress?: (progress: number) => void): Promise<BaseTaxRateItemProps> => {
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


/*
// 获取币制信息
export const getBaseTaxRateList = async (): Promise<BaseTaxRateItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_tax_rate"
  })
  const responseData = response?.data as ApiRes<BaseTaxRateItemProps[]>;
  return responseData.data || [];
}

export const saveBaseTaxRate = (data:BaseTaxRateItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_tax_rate/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/

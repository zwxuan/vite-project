
import request, {ApiRes,requestWithProgress } from '../../request'
import { BaseTaxSystemItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_tax_system";
import Mock from "mockjs";
//
const baseTaxSystemItems:BaseTaxSystemItemProps[] = [
    {
        TaxSystemCode:Mock.mock("@id"),
        TaxSystemName:'中国税制',
        CountryRegion:'中国大陆',
        TaxLevel:'国家地区',
        DefaultTaxCurrency:'人民币',
        DefaultPrecision:2,
        DefaultRoundingRule:'四舍五入',
        DefaultExchangeType:'基准汇率',
        EffectiveDate:'2023-01-01',
        ExpiryDate:'2023-12-31',
        Status:'启用',
    },  
];


// 获取账单管理台账列表
export const getBaseTaxSystemList = async (): Promise<BaseTaxSystemItemProps[]> => {
  return baseTaxSystemItems;
}

// 保存账单管理
export const saveBaseTaxSystem = async (data: BaseTaxSystemItemProps, onUploadProgress?: (progress: number) => void): Promise<BaseTaxSystemItemProps> => {
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
export const getBaseTaxSystemList = async (): Promise<BaseTaxSystemItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_tax_system"
  })
  const responseData = response?.data as ApiRes<BaseTaxSystemItemProps[]>;
  return responseData.data || [];
}

export const saveBaseTaxSystem = (data:BaseTaxSystemItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_tax_system/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/

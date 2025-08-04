
import request, {ApiRes,requestWithProgress } from '../../request'
import { CustomerLevelItemProps } from "@/types/dynamic_configuration_platform/basic_manage/customer_level";
import Mock from "mockjs";
//
const customerLevelItems:CustomerLevelItemProps[] = [
    {
        Code:Mock.mock("@id"),
        ChineseName:'风险客户',
        EnglishName:'Rish',
        Level:'4',
    },  
    {
        Code:Mock.mock("@id"),
        ChineseName:'VIP客户',
        EnglishName:'VIP',
        Level:'1',
    },  
    {
        Code:Mock.mock("@id"),
        ChineseName:'普通客户',
        EnglishName:'Normal',
        Level:'2',
    },  
    {
        Code:Mock.mock("@id"),
        ChineseName:'付款买单客户',
        EnglishName:'Case by case',
        Level:'3',
    },   
];


// 获取账单管理台账列表
export const getCustomerLevelList = async (): Promise<CustomerLevelItemProps[]> => {
  return customerLevelItems;
}

// 保存账单管理
export const saveCustomerLevel = async (data: CustomerLevelItemProps, onUploadProgress?: (progress: number) => void): Promise<CustomerLevelItemProps> => {
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
export const getCustomerLevelList = async (): Promise<CustomerLevelItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/customer_level"
  })
  const responseData = response?.data as ApiRes<CustomerLevelItemProps[]>;
  return responseData.data || [];
}

export const saveCustomerLevel = (data:CustomerLevelItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/customer_level/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/

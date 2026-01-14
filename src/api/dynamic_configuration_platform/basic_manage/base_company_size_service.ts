
import request, {ApiRes,requestWithProgress } from '../../request'
import { BaseCompanySizeItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_company_size";
import Mock from "mockjs";
//
const baseCompanySizeItems:BaseCompanySizeItemProps[] = [
    {
        CompanySizeCode:'1',
        CompanySizeName:'大型企业',
        Remark:'描述1',
    },  
    {
        CompanySizeCode:'2',
        CompanySizeName:'中型企业',
        Remark:'描述2',
    },
    {
        CompanySizeCode:'3',
        CompanySizeName:'小型企业',
        Remark:'描述3',
    },
    {
        CompanySizeCode:'4',
        CompanySizeName:'微型企业',
        Remark:'描述4',
    },
];


// 获取账单管理台账列表
export const getBaseCompanySizeList = async (): Promise<BaseCompanySizeItemProps[]> => {
  return baseCompanySizeItems;
}

// 保存账单管理
export const saveBaseCompanySize = async (data: BaseCompanySizeItemProps, onUploadProgress?: (progress: number) => void): Promise<BaseCompanySizeItemProps> => {
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
export const getBaseCompanySizeList = async (): Promise<BaseCompanySizeItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_company_size"
  })
  const responseData = response?.data as ApiRes<BaseCompanySizeItemProps[]>;
  return responseData.data || [];
}

export const saveBaseCompanySize = (data:BaseCompanySizeItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_company_size/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/


import request, {ApiRes,requestWithProgress } from '../../request'
import { BaseCompanyNatureItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_company_nature";
import Mock from "mockjs";
//
const baseCompanyNatureItems:BaseCompanyNatureItemProps[] = [
  {
    "CompanyNatureCode": "100",
    "CompanyNatureName": "国有企业",
    "Remark": "国家全资设立企业"
  },
  {
    "CompanyNatureCode": "110",
    "CompanyNatureName": "集体企业",
    "Remark": "集体资产所有企业"
  },
  {
    "CompanyNatureCode": "130",
    "CompanyNatureName": "股份合作企业",
    "Remark": "股份与合作结合模式"
  },
  {
    "CompanyNatureCode": "140",
    "CompanyNatureName": "联营企业",
    "Remark": "企业联合经营实体"
  },
  {
    "CompanyNatureCode": "150",
    "CompanyNatureName": "有限责任公司",
    "Remark": "含国有独资公司"
  },
  {
    "CompanyNatureCode": "151",
    "CompanyNatureName": "国有独资公司",
    "Remark": "国家单独出资公司"
  },
  {
    "CompanyNatureCode": "159",
    "CompanyNatureName": "其他有限责任公司",
    "Remark": "非国有控股公司"
  },
  {
    "CompanyNatureCode": "160",
    "CompanyNatureName": "股份有限公司",
    "Remark": "可上市的股份公司"
  },
  {
    "CompanyNatureCode": "170",
    "CompanyNatureName": "私营企业",
    "Remark": "自然人投资控股"
  },
  {
    "CompanyNatureCode": "190",
    "CompanyNatureName": "其他企业",
    "Remark": "未分类内资企业"
  },
  {
    "CompanyNatureCode": "210",
    "CompanyNatureName": "合资经营企业",
    "Remark": "港澳台与内地合资"
  },
  {
    "CompanyNatureCode": "220",
    "CompanyNatureName": "合作经营企业",
    "Remark": "港澳台合作模式"
  },
  {
    "CompanyNatureCode": "230",
    "CompanyNatureName": "港澳台商独资企业",
    "Remark": "港澳台全额投资"
  },
  {
    "CompanyNatureCode": "240",
    "CompanyNatureName": "港澳台商投资股份有限公司",
    "Remark": "港澳台参与的股份制"
  },
  {
    "CompanyNatureCode": "310",
    "CompanyNatureName": "中外合资经营企业",
    "Remark": "中外双方共同投资"
  },
  {
    "CompanyNatureCode": "320",
    "CompanyNatureName": "中外合作经营企业",
    "Remark": "中外合作经营模式"
  },
  {
    "CompanyNatureCode": "330",
    "CompanyNatureName": "外资企业",
    "Remark": "外国投资者全资"
  },
  {
    "CompanyNatureCode": "340",
    "CompanyNatureName": "外商投资股份有限公司",
    "Remark": "外商参与的股份公司"
  }
];


// 获取账单管理台账列表
export const getBaseCompanyNatureList = async (): Promise<BaseCompanyNatureItemProps[]> => {
  return baseCompanyNatureItems;
}

// 保存账单管理
export const saveBaseCompanyNature = async (data: BaseCompanyNatureItemProps, onUploadProgress?: (progress: number) => void): Promise<BaseCompanyNatureItemProps> => {
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
export const getBaseCompanyNatureList = async (): Promise<BaseCompanyNatureItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_company_nature"
  })
  const responseData = response?.data as ApiRes<BaseCompanyNatureItemProps[]>;
  return responseData.data || [];
}

export const saveBaseCompanyNature = (data:BaseCompanyNatureItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_company_nature/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/

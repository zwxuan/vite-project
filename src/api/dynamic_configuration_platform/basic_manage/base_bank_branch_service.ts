
import request, {ApiRes,requestWithProgress } from '../../request'
import { BaseBankBranchItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_bank_branch";
import Mock from "mockjs";
//
const baseBankBranchItems:BaseBankBranchItemProps[] = [
    {
        BankBranchCode:Mock.mock("@id"),
        BankBranchName:'中国工商银行股份有限公司临海白水洋支行',
        BankType:'中国工商银行',
        BankUnionCode:'102345203656',
        Status:'已启用',
        DetailAddress:'',
        SwiftCode:'102345203656',
        Iban:'102345203656',
    },  
    {
        BankBranchCode:Mock.mock("@id"),
        BankBranchName:'中国建设银行股份有限公司淄博商厦支行',
        BankType:'中国建设银行',
        BankUnionCode:'105453061613',
        Status:'已启用',
        DetailAddress:'',
        SwiftCode:'105453061613',
        Iban:'105453061613',
        
    },  
];


// 获取账单管理台账列表
export const getBaseBankBranchList = async (): Promise<BaseBankBranchItemProps[]> => {
  return baseBankBranchItems;
}

// 保存账单管理
export const saveBaseBankBranch = async (data: BaseBankBranchItemProps, onUploadProgress?: (progress: number) => void): Promise<BaseBankBranchItemProps> => {
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
export const getBaseBankBranchList = async (): Promise<BaseBankBranchItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_bank_branch"
  })
  const responseData = response?.data as ApiRes<BaseBankBranchItemProps[]>;
  return responseData.data || [];
}

export const saveBaseBankBranch = (data:BaseBankBranchItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_bank_branch/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/

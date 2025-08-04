
import request, {ApiRes,requestWithProgress } from '../../request'
import { AccountMappingItemProps } from "@/types/dynamic_configuration_platform/basic_manage/account_mapping";
import Mock from "mockjs";

// 模拟科目映射台账数据
const accountMappingItems:AccountMappingItemProps[] = [
    {
        MappingId:Mock.mock("@id"),
        BookName:'管理账套',
        RuleName:'应收发票',
        EntryName:'应收账款',
        AccountName:'应收账款USD',
        AccountGroupBy:'币制=USD',
        FinanceCode:'113101',
        Remark:'科目内容说明',
    },
    {
      MappingId:Mock.mock("@id"),
      BookName:'管理账套',
      RuleName:'应收发票',
      EntryName:'营业收入',
      AccountName:'营业收入',
      AccountGroupBy:'',
      FinanceCode:'5001',
      Remark:'科目内容说明',
  },
];

// 获取科目映射台账列表
export const getAccountMappingList = async (): Promise<AccountMappingItemProps[]> => {
  return accountMappingItems;
}

// 保存科目映射
export const saveAccountMapping = async (data: AccountMappingItemProps, onUploadProgress?: (progress: number) => void): Promise<AccountMappingItemProps> => {
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
// 获取科目映射台账列表
export const getAccountMappingList = async (): Promise<AccountMappingItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/account_mapping"
  })
  const responseData = response?.data as ApiRes<AccountMappingItemProps[]>;
  return responseData.data || [];
}

// 保存科目映射
export const saveAccountMapping = (data:AccountMappingItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/account_mapping/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/



import request, {ApiRes,requestWithProgress } from '../request'
import { AccountMappingItemProps } from "@/types/account_mapping/account_mapping";

// 获取币制信息
export const getAccountMappingList = async (): Promise<AccountMappingItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/account_mapping"
  })
  const responseData = response?.data as ApiRes<AccountMappingItemProps[]>;
  return responseData.data || [];
}

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


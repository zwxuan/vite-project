
import request, { ApiRes, requestWithProgress } from '../request'
import { CodeMappingItemProps } from "@/types/code_mapping/code_mapping";

// 获取币制信息
export const getCodeMappingList = async () : Promise<CodeMappingItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/code_mapping"
  });
  const responseData = response?.data as ApiRes<CodeMappingItemProps[]>;
  return responseData.data || [];
}

export const getCodeMappingEntryList = async () : Promise<CodeMappingItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/code_mapping/entry"
  });
  const responseData = response?.data as ApiRes<CodeMappingItemProps[]>;
  return responseData.data || [];
}

export const saveCodeMapping = (data:CodeMappingItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/code_mapping/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}



import request, { requestWithProgress } from '../request'
import { CodeMappingItemProps } from "@/types/code_mapping/code_mapping";

// 获取币制信息
export const getCodeMappingList = () => {
  return request({
    method: "GET",
    url: "/code_mapping"
  })
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


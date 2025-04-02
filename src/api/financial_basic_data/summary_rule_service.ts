
import request, { requestWithProgress } from '../request'
import { SummaryRuleItemProps } from "@/types/summary_rule/summary_rule";

// 获取币制信息
export const getSummaryRuleList = () => {
  return request({
    method: "GET",
    url: "/summary_rule"
  })
}

export const saveSummaryRule = (data:SummaryRuleItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/summary_rule/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}



import request, { requestWithProgress } from '../request'
import { EntryGroupingRuleItemProps } from "@/types/entry_grouping_rule/entry_grouping_rule";

// 获取币制信息
export const getEntryGroupingRuleList = () => {
  return request({
    method: "GET",
    url: "/entry_grouping_rule"
  })
}

export const saveEntryGroupingRule = (data:EntryGroupingRuleItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/entry_grouping_rule/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}


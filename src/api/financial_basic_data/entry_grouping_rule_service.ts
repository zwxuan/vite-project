
import request, { ApiRes, requestWithProgress } from '../request'
import { EntryGroupingRuleItemProps } from "@/types/entry_grouping_rule/entry_grouping_rule";

// 获取币制信息
export const getEntryGroupingRuleList = async () : Promise<EntryGroupingRuleItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/entry_grouping_rule"
  });
  const responseData = response?.data as ApiRes<EntryGroupingRuleItemProps[]>;
  return responseData.data || [];
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


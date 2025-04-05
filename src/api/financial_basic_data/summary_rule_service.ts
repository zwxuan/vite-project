
import request, { ApiRes, requestWithProgress } from '../request'
import { SummaryRuleItemProps } from "@/types/summary_rule/summary_rule";

// 获取币制信息
export const getSummaryRuleList = async () : Promise<SummaryRuleItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/summary_rule"
  });
  const responseData = response?.data as ApiRes<SummaryRuleItemProps[]>;
  return responseData.data || [];
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


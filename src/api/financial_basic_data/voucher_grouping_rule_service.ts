
import request, { ApiRes, requestWithProgress } from '../request'
import { VoucherGroupingRuleItemProps } from "@/types/voucher_grouping_rule/voucher_grouping_rule";

// 获取币制信息
export const getVoucherGroupingRuleList = async () : Promise<VoucherGroupingRuleItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/voucher_grouping_rule"
  });
  const responseData = response?.data as ApiRes<VoucherGroupingRuleItemProps[]>;
  return responseData.data || [];
}

export const saveVoucherGroupingRule = (data:VoucherGroupingRuleItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/voucher_grouping_rule/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}


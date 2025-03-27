
import request, { requestWithProgress } from '../request'
import { VoucherGroupingRuleItemProps } from "@/types/voucher_grouping_rule/voucher_grouping_rule";

// 获取币制信息
export const getVoucherGroupingRuleList = () => {
  return request({
    method: "GET",
    url: "/voucher_grouping_rule"
  })
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


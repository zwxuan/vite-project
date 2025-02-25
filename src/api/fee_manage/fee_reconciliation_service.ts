
import request, { requestWithProgress } from '../request'
import { FeeReconciliationItemProps } from "@/types/fee_reconciliation/fee_reconciliation";

// 获取币制信息
export const getFeeReconciliationList = () => {
  return request({
    method: "GET",
    url: "/fee_reconciliation"
  })
}

export const saveFeeReconciliation = (data:FeeReconciliationItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/fee_reconciliation/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}


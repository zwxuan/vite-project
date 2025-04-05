
import request, { ApiRes, requestWithProgress } from '../request'
import { FeeReconciliationItemProps } from "@/types/fee_reconciliation/fee_reconciliation";

// 获取币制信息
export const getFeeReconciliationList = async () : Promise<FeeReconciliationItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/fee_reconciliation"
  });
  const responseData = response?.data as ApiRes<FeeReconciliationItemProps[]>;
  return responseData.data || [];
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


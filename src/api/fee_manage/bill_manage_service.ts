
import request, { requestWithProgress } from '../request'
import { BillManageItemProps } from "@/types/bill_manage/bill_manage";

// 获取币制信息
export const getBillManageList = () => {
  return request({
    method: "GET",
    url: "/bill_manage"
  })
}

export const saveBillManage = (data:BillManageItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/bill_manage/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}


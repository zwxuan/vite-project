
import request, { requestWithProgress } from '../request'
import { VoucherTypeItemProps } from "@/types/voucher_type/voucher_type";

// 获取币制信息
export const getVoucherTypeList = () => {
  return request({
    method: "GET",
    url: "/voucher_type"
  })
}

export const saveVoucherType = (data:VoucherTypeItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/voucher_type/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}


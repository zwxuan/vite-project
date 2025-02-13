
import request, { requestWithProgress } from '../request'
import { OrderFeeItemProps } from "@/types/order_fee/order_fee";

// 获取币制信息
export const getOrderFeeList = () => {
  return request({
    method: "GET",
    url: "/order_fee"
  })
}

export const saveOrderFee = (data:OrderFeeItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/order_fee/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}


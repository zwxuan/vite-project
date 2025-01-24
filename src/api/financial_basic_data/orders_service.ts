
import request, { requestWithProgress } from '../request'
import { OrdersItemProps } from "@/types/orders/orders";

// 获取币制信息
export const getOrdersList = () => {
  return request({
    method: "GET",
    url: "/orders"
  })
}

export const saveOrders = (data:OrdersItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/orders/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}


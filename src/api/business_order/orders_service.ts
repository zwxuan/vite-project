
import request, { ApiRes, requestWithProgress } from '../request'
import { OrdersItemProps } from "@/types/orders/orders";

// 获取币制信息
export const getOrdersList = async () : Promise<OrdersItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/orders"
  });
  const responseData = response?.data as ApiRes<OrdersItemProps[]>;
  return responseData.data || [];
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


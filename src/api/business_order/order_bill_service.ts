
import request, { ApiRes, requestWithProgress } from '../request'
import { OrderBillItemProps } from "@/types/order_bill/order_bill";

// 获取币制信息
export const getOrderBillList = async (): Promise<OrderBillItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/order_bill"
  });
  const responseData = response?.data as ApiRes<OrderBillItemProps[]>;
  return responseData.data || [];
}

export const saveOrderBill = (data:OrderBillItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/order_bill/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}


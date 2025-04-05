
import request, { ApiRes, requestWithProgress } from '../request'
import { FeeNameItemProps, OrderFeeItemProps } from "@/types/order_fee/order_fee";

// 获取币制信息
export const getOrderFeeList = async () : Promise<OrderFeeItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/order_fee"
  });
  const responseData = response?.data as ApiRes<OrderFeeItemProps[]>;
  return responseData.data || [];
}

export const getFeeNameList = async () : Promise<FeeNameItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/fee_names"
  });
  const responseData = response?.data as ApiRes<FeeNameItemProps[]>;
  return responseData.data || [];
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


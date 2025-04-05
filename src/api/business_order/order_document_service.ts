
import request, { ApiRes, requestWithProgress } from '../request'
import { OrderDocumentItemProps } from "@/types/order_document/order_document";

// 获取币制信息
export const getOrderDocumentList = async () : Promise<OrderDocumentItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/order_document"
  });
  const responseData = response?.data as ApiRes<OrderDocumentItemProps[]>;
  return responseData.data || [];
}

export const saveOrderDocument = (data:OrderDocumentItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/order_document/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}


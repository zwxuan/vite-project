
import request, { requestWithProgress } from '../request'
import { OrderDocumentItemProps } from "@/types/order_document/order_document";

// 获取币制信息
export const getOrderDocumentList = () => {
  return request({
    method: "GET",
    url: "/order_document"
  })
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


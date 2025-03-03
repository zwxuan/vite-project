
import request, { requestWithProgress } from '../request'
import { InvoiceItemProps } from "@/types/invoice/invoice";

// 获取币制信息
export const getInvoiceList = () => {
  return request({
    method: "GET",
    url: "/invoice"
  })
}

export const saveInvoice = (data:InvoiceItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/invoice/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}


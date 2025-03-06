
import request, { requestWithProgress } from '../request'
import { PhysicalInvoiceItemProps } from "@/types/physical_invoice/physical_invoice";

// 获取币制信息
export const getPhysicalInvoiceList = () => {
  return request({
    method: "GET",
    url: "/physical_invoice"
  })
}

export const savePhysicalInvoice = (data:PhysicalInvoiceItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/physical_invoice/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}


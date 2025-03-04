
import request, { requestWithProgress } from '../request'
import { InvoiceIssuanceReceiptItemProps } from "@/types/invoice_issuance_receipt/invoice_issuance_receipt";

// 获取币制信息
export const getInvoiceIssuanceReceiptList = () => {
  return request({
    method: "GET",
    url: "/invoice_issuance_receipt"
  })
}

export const saveInvoiceIssuanceReceipt = (data:InvoiceIssuanceReceiptItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/invoice_issuance_receipt/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}


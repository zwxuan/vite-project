
import request, { ApiRes, requestWithProgress } from '../request'
import { InvoiceIssuanceReceiptItemProps } from "@/types/invoice_issuance_receipt/invoice_issuance_receipt";

// 获取币制信息
export const getInvoiceIssuanceReceiptList = async () : Promise<InvoiceIssuanceReceiptItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/invoice_issuance_receipt"
  });
  const responseData = response?.data as ApiRes<InvoiceIssuanceReceiptItemProps[]>;
  return responseData.data || [];
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


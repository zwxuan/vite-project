
import request, { ApiRes, requestWithProgress } from '../request'
import { InvoiceItemProps } from "@/types/invoice/invoice";

// 获取币制信息
export const getInvoiceList = async () : Promise<InvoiceItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/invoice"
  });
  const responseData = response?.data as ApiRes<InvoiceItemProps[]>;
  return responseData.data || [];
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


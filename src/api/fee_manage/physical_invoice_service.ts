
import request, { ApiRes, requestWithProgress } from '../request'
import { PhysicalInvoiceItemProps } from "@/types/physical_invoice/physical_invoice";

// 获取币制信息
export const getPhysicalInvoiceList = async () : Promise<PhysicalInvoiceItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/physical_invoice"
  });
  const responseData = response?.data as ApiRes<PhysicalInvoiceItemProps[]>;
  return responseData.data || [];
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


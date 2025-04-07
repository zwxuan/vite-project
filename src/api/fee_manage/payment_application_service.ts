
import request, {ApiRes,requestWithProgress } from '../request'
import { PaymentApplicationItemProps } from "@/types/payment_application/payment_application";

// 获取币制信息
export const getPaymentApplicationList = async (): Promise<PaymentApplicationItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/payment_application"
  })
  const responseData = response?.data as ApiRes<PaymentApplicationItemProps[]>;
  return responseData.data || [];
}

export const savePaymentApplication = (data:PaymentApplicationItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/payment_application/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}


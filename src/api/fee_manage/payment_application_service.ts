
import { PaymentApplicationFeeItemProps } from '@/types/payment_application_fee/payment_application_fee';
import request, {ApiRes,requestWithProgress } from '../request'
import { PaymentApplicationItemProps } from "@/types/payment_application/payment_application";
import { PaymentApplicationBusinessItemProps } from '@/types/payment_application_business/payment_application_business';

// 获取币制信息
export const getPaymentApplicationList = async (): Promise<PaymentApplicationItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/payment_application"
  })
  const responseData = response?.data as ApiRes<PaymentApplicationItemProps[]>;
  return responseData.data || [];
}

export const getPaymentApplicationFeeList = async (): Promise<PaymentApplicationFeeItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/payment_application_fee"
  })
  const responseData = response?.data as ApiRes<PaymentApplicationFeeItemProps[]>;
  return responseData.data || [];
}

export const getPaymentApplicationBusinessList = async (): Promise<PaymentApplicationBusinessItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/payment_application_business"
  })
  const responseData = response?.data as ApiRes<PaymentApplicationBusinessItemProps[]>;
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


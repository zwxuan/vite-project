
import request, { ApiRes, requestWithProgress } from '../request'
import { VoucherTypeItemProps } from "@/types/voucher_type/voucher_type";

// 获取币制信息
export const getVoucherTypeList = async () : Promise<VoucherTypeItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/voucher_type"
  });
  const responseData = response?.data as ApiRes<VoucherTypeItemProps[]>;
  return responseData.data || [];
}

export const saveVoucherType = (data:VoucherTypeItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/voucher_type/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}


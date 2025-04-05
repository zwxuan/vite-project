
import request, { ApiRes, requestWithProgress } from '../request'
import { BillManageItemProps } from "@/types/bill_manage/bill_manage";

// 获取币制信息
export const getBillManageList = async () : Promise<BillManageItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/bill_manage"
  });
  const responseData = response?.data as ApiRes<BillManageItemProps[]>;
  return responseData.data || [];
}

export const saveBillManage = (data:BillManageItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/bill_manage/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}


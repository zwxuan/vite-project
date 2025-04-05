
import { NotOffFeesItemProps } from '@/types/not_off_setting/not_off_fees';
import request, { ApiRes, requestWithProgress } from '../request'
import { NotOffSettingItemProps } from "@/types/not_off_setting/not_off_setting";

// 获取币制信息
export const getNotOffSettingList = async () : Promise<NotOffSettingItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/not_off_setting"
  });
  const responseData = response?.data as ApiRes<NotOffSettingItemProps[]>;
  return responseData.data || [];
}

export const getNotOffFeesList = async () : Promise<NotOffFeesItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/not_off_fees"
  });
  const responseData = response?.data as ApiRes<NotOffFeesItemProps[]>;
  return responseData.data || [];
}

export const saveNotOffSetting = (data:NotOffSettingItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/not_off_setting/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}


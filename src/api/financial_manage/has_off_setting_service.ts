
import request, { ApiRes, requestWithProgress } from '../request'
import { HasOffSettingItemProps, OffSettingDetailItemProps } from "@/types/has_off_setting/has_off_setting";

// 获取币制信息
export const getHasOffSettingList = async () : Promise<HasOffSettingItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/has_off_setting"
  });
  const responseData = response?.data as ApiRes<HasOffSettingItemProps[]>;
  return responseData.data || [];
}

export const getHasOffDetailList = async () : Promise<OffSettingDetailItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/has_off_setting"
  });
  const responseData = response?.data as ApiRes<OffSettingDetailItemProps[]>;
  return responseData.data || [];
}

export const saveHasOffSetting = (data:HasOffSettingItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/has_off_setting/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}


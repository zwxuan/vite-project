
import request, { requestWithProgress } from '../request'
import { NotOffSettingItemProps } from "@/types/not_off_setting/not_off_setting";

// 获取币制信息
export const getNotOffSettingList = () => {
  return request({
    method: "GET",
    url: "/not_off_setting"
  })
}

export const getNotOffFeesList = () => {
  return request({
    method: "GET",
    url: "/not_off_fees"
  })
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


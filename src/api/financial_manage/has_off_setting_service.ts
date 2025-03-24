
import request, { requestWithProgress } from '../request'
import { HasOffSettingItemProps } from "@/types/has_off_setting/has_off_setting";

// 获取币制信息
export const getHasOffSettingList = () => {
  return request({
    method: "GET",
    url: "/has_off_setting"
  })
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


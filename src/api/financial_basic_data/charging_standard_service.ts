
import request, { requestWithProgress } from '../request'
import { ChargingStandardItemProps } from "@/types/charging_standard/charging_standard";

// 获取币制信息
export const getChargingStandardList = () => {
  return request({
    method: "GET",
    url: "/charging_standard"
  })
}

export const saveChargingStandard = (data:ChargingStandardItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/charging_standard/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}


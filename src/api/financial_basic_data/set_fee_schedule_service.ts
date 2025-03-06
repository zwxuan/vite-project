
import request, { requestWithProgress } from '../request'
import { SetFeeScheduleItemProps } from "@/types/set_fee_schedule/set_fee_schedule";

// 获取币制信息
export const getSetFeeScheduleList = () => {
  return request({
    method: "GET",
    url: "/set_fee_schedule"
  })
}

export const saveSetFeeSchedule = (data:SetFeeScheduleItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/set_fee_schedule/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}


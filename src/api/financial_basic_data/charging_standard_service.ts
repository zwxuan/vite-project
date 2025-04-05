
import request, { ApiRes, requestWithProgress } from '../request'
import { ChargingStandardItemProps } from "@/types/charging_standard/charging_standard";

// 获取币制信息
export const getChargingStandardList = async () : Promise<ChargingStandardItemProps[]> => {
  const reponse = await request({
    method: "GET",
    url: "/charging_standard"
  });
  const responseData = reponse?.data as ApiRes<ChargingStandardItemProps[]>;
  return responseData.data || [];
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


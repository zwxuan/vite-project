
import request, { ApiRes, requestWithProgress } from '../request'
import { SetFeeScheduleItemProps } from "@/types/system_manage/set_fee_schedule";

const setFeeScheduleItems: SetFeeScheduleItemProps[] = [
  {
    "BusinessType": "海运出口",
    "PlanName": "海出基础费用包",
    "Client": "",
    "Carrier": "",
    "BookingAgent": "",
    "CargoType": "普货",
    "LclFclType": "",
    "RouteRegion": "",
    "InputPerson": "平台客服",
    "InputDate": "2020-01-16",
    "EffectiveDate": "",
    "ExpirationDate": "",
    "AuditStatus": "未提交",
    "Auditor": "",
    "AuditTime": "",
    "PlanDescription": "",
    "DestinationAgent": ""
  },
  {
    "BusinessType": "海运进口",
    "PlanName": "海运进口基础费用",
    "Client": "",
    "Carrier": "",
    "BookingAgent": "",
    "CargoType": "普货",
    "LclFclType": "",
    "RouteRegion": "",
    "InputPerson": "平台客服",
    "InputDate": "2020-01-16",
    "EffectiveDate": "",
    "ExpirationDate": "",
    "AuditStatus": "未提交",
    "Auditor": "",
    "AuditTime": "",
    "PlanDescription": "",
    "DestinationAgent": ""
  },
  {
    "BusinessType": "空运进口",
    "PlanName": "空运进口费用",
    "Client": "上海沃行信息技术有限公司",
    "Carrier": "长锦商船船务有限公司",
    "BookingAgent": "",
    "CargoType": "普货",
    "LclFclType": "",
    "RouteRegion": "",
    "InputPerson": "平台客服",
    "InputDate": "2020-01-16",
    "EffectiveDate": "",
    "ExpirationDate": "",
    "AuditStatus": "未提交",
    "Auditor": "",
    "AuditTime": "",
    "PlanDescription": "",
    "DestinationAgent": ""
  },
  {
    "BusinessType": "空运出口",
    "PlanName": "空运出口基础费",
    "Client": "上海沃行信息技术有限公司",
    "Carrier": "长锦商船船务有限公司",
    "BookingAgent": "",
    "CargoType": "普货",
    "LclFclType": "",
    "RouteRegion": "",
    "InputPerson": "平台客服",
    "InputDate": "2020-01-16",
    "EffectiveDate": "",
    "ExpirationDate": "",
    "AuditStatus": "未提交",
    "Auditor": "",
    "AuditTime": "",
    "PlanDescription": "",
    "DestinationAgent": ""
  }
];
// 获取币制信息
export const getSetFeeScheduleList = async () : Promise<SetFeeScheduleItemProps[]> => {
  // const response = await request({
  //   method: "GET",
  //   url: "/set_fee_schedule"
  // });
  // const responseData = response?.data as ApiRes<SetFeeScheduleItemProps[]>;
  // return responseData.data || [];
  return setFeeScheduleItems;
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


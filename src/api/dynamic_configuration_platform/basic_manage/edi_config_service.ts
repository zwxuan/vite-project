
import request, {ApiRes,requestWithProgress } from '../../request'
import { EdiConfigItemProps } from "@/types/dynamic_configuration_platform/basic_manage/edi_config";
import Mock from "mockjs";
//
const ediConfigItems:EdiConfigItemProps[] = [
    {
        Id:Mock.mock("@id"),
        BranchOffice:'青岛分公司',
        EdiSenderCode:'OCEANAGENT',
        EdiReceiverCode:'PANLOG',
        CnCode:'PANL123',
        BookingAgent:'澳洲国际航运有限公司',
        BookingPersonCode:'[1234567890]张三',
    },
    {
        Id:Mock.mock("@id"),
        BranchOffice:'上海分公司',
        EdiSenderCode:'OCEANAGENT',
        EdiReceiverCode:'PANLOG',
        CnCode:'PANL123',
        BookingAgent:'上海国际航运有限公司',
        BookingPersonCode:'[1234567890]张三',
    },
    {
        Id:Mock.mock("@id"),
        BranchOffice:'北京分公司',
        EdiSenderCode:'OCEANAGENT',
        EdiReceiverCode:'PANLOG',
        CnCode:'PANL123',
        BookingAgent:'北京国际航运有限公司',
        BookingPersonCode:'[1234567890]张三',
    },
    {
        Id:Mock.mock("@id"),
        BranchOffice:'上海分公司',
        EdiSenderCode:'OCEANAGENT',
        EdiReceiverCode:'PANLOG',
        CnCode:'PANL123',
        BookingAgent:'上海国际航运有限公司',
        BookingPersonCode:'[1234567890]张三',
    },
    {
        Id:Mock.mock("@id"),
        BranchOffice:'上海分公司',
        EdiSenderCode:'OCEANAGENT',
        EdiReceiverCode:'PANLOG',
        CnCode:'PANL123',
        BookingAgent:'上海国际航运有限公司',
        BookingPersonCode:'[1234567890]张三',
    },
];


// 获取账单管理台账列表
export const getEdiConfigList = async (): Promise<EdiConfigItemProps[]> => {
  return ediConfigItems;
}

// 保存账单管理
export const saveEdiConfig = async (data: EdiConfigItemProps, onUploadProgress?: (progress: number) => void): Promise<EdiConfigItemProps> => {
  // 模拟上传进度
  if (onUploadProgress) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      onUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 1000);
  }
  return data;
}


/*
// 获取币制信息
export const getEdiConfigList = async (): Promise<EdiConfigItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/edi_config"
  })
  const responseData = response?.data as ApiRes<EdiConfigItemProps[]>;
  return responseData.data || [];
}

export const saveEdiConfig = (data:EdiConfigItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/edi_config/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/


import request, {ApiRes,requestWithProgress } from '../../request'
import { BaseEdiPortItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_edi_port";
import Mock from "mockjs";
//
const baseEdiPortItems:BaseEdiPortItemProps[] = [
    {
        "Shipper":"东方海外",
        "OriginalPortCode":"CNSZN",
        "CurrentPortCode":"CNSZN"
    },
    {
        "Shipper":"中远集装箱运输有限公司",
        "OriginalPortCode":"CNSHA",
        "CurrentPortCode":"CNSHA"
    }
];


// 获取账单管理台账列表
export const getBaseEdiPortList = async (): Promise<BaseEdiPortItemProps[]> => {
  return baseEdiPortItems;
}

// 保存账单管理
export const saveBaseEdiPort = async (data: BaseEdiPortItemProps, onUploadProgress?: (progress: number) => void): Promise<BaseEdiPortItemProps> => {
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
export const getBaseEdiPortList = async (): Promise<BaseEdiPortItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_edi_port"
  })
  const responseData = response?.data as ApiRes<BaseEdiPortItemProps[]>;
  return responseData.data || [];
}

export const saveBaseEdiPort = (data:BaseEdiPortItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_edi_port/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/

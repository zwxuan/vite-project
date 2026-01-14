
import request, {ApiRes,requestWithProgress } from '../../request'
import { BaseTradeLanesItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_trade_lanes";
import Mock from "mockjs";
//
const baseTradeLanesItems:BaseTradeLanesItemProps[] = [
    {
      "LaneCode":"AF",
      "LaneNameCn":"非洲",
      "LaneNameEn":"Africa",
      "LaneManager":"",
      "LaneGroupName":"5.拉美非",
    },
    {
      "LaneCode":"AN",
      "LaneNameCn":"澳新",
      "LaneNameEn":"Australia",
      "LaneManager":"",
      "LaneGroupName":"3.东南亚澳新",
    },
    {
      "LaneCode":"CA",
      "LaneNameCn":"加拿大",
      "LaneNameEn":"Canada",
      "LaneManager":"",
      "LaneGroupName":"1.美线",
    },
    {
      "LaneCode":"CB",
      "LaneNameCn":"加勒比",
      "LaneNameEn":"Caribbean",
      "LaneManager":"",
      "LaneGroupName":"",
    },
    {
      "LaneCode":"CN",
      "LaneNameCn":"中国",
      "LaneNameEn":"China",
      "LaneManager":"",
      "LaneGroupName":"6.其他",
    },
    {
      "LaneCode":"EU",
      "LaneNameCn":"欧洲",
      "LaneNameEn":"Europe",
      "LaneManager":"",
      "LaneGroupName":"2.欧地黑",
    },
    {
      "LaneCode":"IP",
      "LaneNameCn":"印巴",
      "LaneNameEn":"India &Pakistan",
      "LaneManager":"",
      "LaneGroupName":"",
    },
    {
      "LaneCode":"MA",
      "LaneNameCn":"中美洲",
      "LaneNameEn":"Central America",
      "LaneManager":"",
      "LaneGroupName":"",
    },
    {
      "LaneCode":"ME",
      "LaneNameCn":"中东",
      "LaneNameEn":"Middle East",
      "LaneManager":"",
      "LaneGroupName":"4.中东红海印巴",
    },
    {
      "LaneCode":"MS",
      "LaneNameCn":"地中海",
      "LaneNameEn":"Mediterranean",
      "LaneManager":"",
      "LaneGroupName":"",
    },
    {
      "LaneCode":"MX",
      "LaneNameCn":"墨西哥",
      "LaneNameEn":"Mexico",
      "LaneManager":"",
      "LaneGroupName":"",
    },
    {
      "LaneCode":"RS",
      "LaneNameCn":"红海",
      "LaneNameEn":"Red Sea",
      "LaneManager":"",
      "LaneGroupName":"",
    },
    {
      "LaneCode":"SE",
      "LaneNameCn":"东南亚",
      "LaneNameEn":"Southeast Asia",
      "LaneManager":"",
      "LaneGroupName":"",
    },
    {
      "LaneCode":"SM",
      "LaneNameCn":"南美洲",
      "LaneNameEn":"South America",
      "LaneManager":"",
      "LaneGroupName":"",
    },
    {
      "LaneCode":"SP",
      "LaneNameCn":"南太平洋",
      "LaneNameEn":"South Pacific",
      "LaneManager":"",
      "LaneGroupName":"",
    },
    {
      "LaneCode":"UE",
      "LaneNameCn":"美东",
      "LaneNameEn":"USA East",
      "LaneManager":"",
      "LaneGroupName":"",
    },
    {
      "LaneCode":"UI",
      "LaneNameCn":"美国内陆",
      "LaneNameEn":"U.S. inland",
      "LaneManager":"",
      "LaneGroupName":"",
    },
    {
      "LaneCode":"UW",
      "LaneNameCn":"美西",
      "LaneNameEn":"USA West",
      "LaneManager":"",
      "LaneGroupName":"",
    }
  ];


// 获取账单管理台账列表
export const getBaseTradeLanesList = async (): Promise<BaseTradeLanesItemProps[]> => {
  return baseTradeLanesItems;
}

// 保存账单管理
export const saveBaseTradeLanes = async (data: BaseTradeLanesItemProps, onUploadProgress?: (progress: number) => void): Promise<BaseTradeLanesItemProps> => {
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
export const getBaseTradeLanesList = async (): Promise<BaseTradeLanesItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_trade_lanes_"
  })
  const responseData = response?.data as ApiRes<BaseTradeLanesItemProps[]>;
  return responseData.data || [];
}

export const saveBaseTradeLanes = (data:BaseTradeLanesItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_trade_lanes_/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/

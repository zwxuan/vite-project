
import request, {ApiRes,requestWithProgress } from '../request'
import { BaseTradeLanesGroupingItemProps } from "@/types/basic_manage/base_trade_lanes_grouping";
import Mock from "mockjs";
//
const baseTradeLanesGroupingItems:BaseTradeLanesGroupingItemProps[] = [
    {
      "LaneGroupingCode": "USRT1",
      "LaneGroupingNameCn": "1.美线",
      "LaneGroupingNameEn": "U.S. Route",
      "LaneGroupingManager": "张美线"
    },
    {
      "LaneGroupingCode": "EMBS2",
      "LaneGroupingNameCn": "2.欧地黑",
      "LaneGroupingNameEn": "Europe, Mediterranean and Black Sea Route",
      "LaneGroupingManager": "李欧地"
    },
    {
      "LaneGroupingCode": "SEAN3",
      "LaneGroupingNameCn": "3.东南亚澳新",
      "LaneGroupingNameEn": "Southeast Asia, Australia and New Zealand Route",
      "LaneGroupingManager": "王东南亚"
    },
    {
      "LaneGroupingCode": "MERS4",
      "LaneGroupingNameCn": "4.中东红海印巴",
      "LaneGroupingNameEn": "Middle East, Red Sea, India and Pakistan Route",
      "LaneGroupingManager": "刘中东"
    },
    {
      "LaneGroupingCode": "LAAR5",
      "LaneGroupingNameCn": "5.拉美非",
      "LaneGroupingNameEn": "Latin America and Africa Route",
      "LaneGroupingManager": "赵拉美"
    },
    {
      "LaneGroupingCode": "OTHR6",
      "LaneGroupingNameCn": "6.其他",
      "LaneGroupingNameEn": "Other Routes",
      "LaneGroupingManager": "孙其他"
    }
  ];


// 获取账单管理台账列表
export const getBaseTradeLanesGroupingList = async (): Promise<BaseTradeLanesGroupingItemProps[]> => {
  return baseTradeLanesGroupingItems;
}

// 保存账单管理
export const saveBaseTradeLanesGrouping = async (data: BaseTradeLanesGroupingItemProps, onUploadProgress?: (progress: number) => void): Promise<BaseTradeLanesGroupingItemProps> => {
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
export const getBaseTradeLanesGroupingList = async (): Promise<BaseTradeLanesGroupingItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_trade_lanes_grouping"
  })
  const responseData = response?.data as ApiRes<BaseTradeLanesGroupingItemProps[]>;
  return responseData.data || [];
}

export const saveBaseTradeLanesGrouping = (data:BaseTradeLanesGroupingItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_trade_lanes_grouping/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/


import request, {ApiRes,requestWithProgress } from '../request'
import { BaseContainerTeuItemProps } from "@/types/basic_manage/base_container_teu";
import Mock from "mockjs";
//
const baseContainerTeuItems:BaseContainerTeuItemProps[] = [
    {
        "ContainerCode": "20VH",
        "ContainerSize": "20",
        "ContainerType": "VH",
        "ExchangeCode": "20VH",
        "IsoCode": "22V0",
        "TeuValue": 1,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:11",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:11"
    },
    {
        "ContainerCode": "20HC",
        "ContainerSize": "20",
        "ContainerType": "HC",
        "ExchangeCode": "20HC",
        "IsoCode": "25G1",
        "TeuValue": 1,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:12",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:12"
    },
    {
        "ContainerCode": "40OT",
        "ContainerSize": "40",
        "ContainerType": "OT",
        "ExchangeCode": "40OT",
        "IsoCode": "42U1",
        "TeuValue": 2,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:13",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:13"
    },
    {
        "ContainerCode": "45NOR",
        "ContainerSize": "45",
        "ContainerType": "NOR",
        "ExchangeCode": "45NOR",
        "IsoCode": "L5R1",
        "TeuValue": 2,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:14",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:14"
    },
    {
        "ContainerCode": "40SR",
        "ContainerSize": "40",
        "ContainerType": "SR",
        "ExchangeCode": "40SR",
        "IsoCode": "46P3",
        "TeuValue": 2,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:15",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:15"
    },
    {
        "ContainerCode": "40RF",
        "ContainerSize": "40",
        "ContainerType": "RF",
        "ExchangeCode": "40RF",
        "IsoCode": "42R1",
        "TeuValue": 2,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:16",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:16"
    },
    {
        "ContainerCode": "20HT",
        "ContainerSize": "20",
        "ContainerType": "HT",
        "ExchangeCode": "20HT",
        "IsoCode": "22V1",
        "TeuValue": 1,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:17",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:17"
    },
    {
        "ContainerCode": "20FR",
        "ContainerSize": "20",
        "ContainerType": "FR",
        "ExchangeCode": "20FR",
        "IsoCode": "22P1",
        "TeuValue": 1,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:18",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:18"
    },
    {
        "ContainerCode": "45RF",
        "ContainerSize": "45",
        "ContainerType": "RF",
        "ExchangeCode": "45RF",
        "IsoCode": "L2R1",
        "TeuValue": 2,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:19",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:19"
    },
    {
        "ContainerCode": "45FR",
        "ContainerSize": "45",
        "ContainerType": "FR",
        "ExchangeCode": "45FR",
        "IsoCode": "L2P1",
        "TeuValue": 2,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:20",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:20"
    },
    {
        "ContainerCode": "20TK",
        "ContainerSize": "20",
        "ContainerType": "TK",
        "ExchangeCode": "20TK",
        "IsoCode": "22T1",
        "TeuValue": 1,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:21",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:21"
    },
    {
        "ContainerCode": "53HC",
        "ContainerSize": "53",
        "ContainerType": "HC",
        "ExchangeCode": "53HC",
        "IsoCode": "P5G1",
        "TeuValue": 2,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:22",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:22"
    },
    {
        "ContainerCode": "20RH",
        "ContainerSize": "20",
        "ContainerType": "RH",
        "ExchangeCode": "20RH",
        "IsoCode": "25R1",
        "TeuValue": 1,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:23",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:23"
    },
    {
        "ContainerCode": "45OT",
        "ContainerSize": "45",
        "ContainerType": "OT",
        "ExchangeCode": "45OT",
        "IsoCode": "L2U1",
        "TeuValue": 2,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:24",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:24"
    },
    {
        "ContainerCode": "53GP",
        "ContainerSize": "53",
        "ContainerType": "GP",
        "ExchangeCode": "53GP",
        "IsoCode": "P2G1",
        "TeuValue": 2,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:25",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:25"
    },
    {
        "ContainerCode": "20GP",
        "ContainerSize": "20",
        "ContainerType": "GP",
        "ExchangeCode": "20GP",
        "IsoCode": "22G1",
        "TeuValue": 1,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:26",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:26"
    },
    {
        "ContainerCode": "45VH",
        "ContainerSize": "45",
        "ContainerType": "VH",
        "ExchangeCode": "45VH",
        "IsoCode": "L2V0",
        "TeuValue": 2,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:27",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:27"
    },
    {
        "ContainerCode": "20NOR",
        "ContainerSize": "20",
        "ContainerType": "NOR",
        "ExchangeCode": "20NOR",
        "IsoCode": "22R1",
        "TeuValue": 1,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:28",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:28"
    },
    {
        "ContainerCode": "40HT",
        "ContainerSize": "40",
        "ContainerType": "HT",
        "ExchangeCode": "40HT",
        "IsoCode": "42V1",
        "TeuValue": 2,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:29",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:29"
    },
    {
        "ContainerCode": "20OT",
        "ContainerSize": "20",
        "ContainerType": "OT",
        "ExchangeCode": "20OT",
        "IsoCode": "22U1",
        "TeuValue": 1,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:30",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:30"
    },
    {
        "ContainerCode": "45RH",
        "ContainerSize": "45",
        "ContainerType": "RH",
        "ExchangeCode": "45RH",
        "IsoCode": "L5R1",
        "TeuValue": 2,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:31",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:31"
    },
    {
        "ContainerCode": "40RH",
        "ContainerSize": "40",
        "ContainerType": "RH",
        "ExchangeCode": "40RH",
        "IsoCode": "45R1",
        "TeuValue": 2,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:32",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:32"
    },
    {
        "ContainerCode": "45TK",
        "ContainerSize": "45",
        "ContainerType": "TK",
        "ExchangeCode": "45TK",
        "IsoCode": "L2T1",
        "TeuValue": 2,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:33",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:33"
    },
    {
        "ContainerCode": "45GP",
        "ContainerSize": "45",
        "ContainerType": "GP",
        "ExchangeCode": "45GP",
        "IsoCode": "L2G1",
        "TeuValue": 2,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:34",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:34"
    },
    {
        "ContainerCode": "40HC",
        "ContainerSize": "40",
        "ContainerType": "HC",
        "ExchangeCode": "40HC",
        "IsoCode": "45G1",
        "TeuValue": 2,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:35",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:35"
    },
    {
        "ContainerCode": "40HW",
        "ContainerSize": "40",
        "ContainerType": "HW",
        "ExchangeCode": "40HW",
        "IsoCode": "4EG1",
        "TeuValue": 2,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:36",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:36"
    },
    {
        "ContainerCode": "45HT",
        "ContainerSize": "45",
        "ContainerType": "HT",
        "ExchangeCode": "45HT",
        "IsoCode": "L2V1",
        "TeuValue": 2,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:37",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:37"
    },
    {
        "ContainerCode": "40TK",
        "ContainerSize": "40",
        "ContainerType": "TK",
        "ExchangeCode": "40TK",
        "IsoCode": "42T1",
        "TeuValue": 2,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:38",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:38"
    },
    {
        "ContainerCode": "40GP",
        "ContainerSize": "40",
        "ContainerType": "GP",
        "ExchangeCode": "40GP",
        "IsoCode": "42G1",
        "TeuValue": 2,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:39",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:39"
    },
    {
        "ContainerCode": "45HC",
        "ContainerSize": "45",
        "ContainerType": "HC",
        "ExchangeCode": "45HC",
        "IsoCode": "L5G1",
        "TeuValue": 2,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:40",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:40"
    },
    {
        "ContainerCode": "20RF",
        "ContainerSize": "20",
        "ContainerType": "RF",
        "ExchangeCode": "20RF",
        "IsoCode": "22R1",
        "TeuValue": 1,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:41",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:41"
    },
    {
        "ContainerCode": "40OH",
        "ContainerSize": "40",
        "ContainerType": "OH",
        "ExchangeCode": "40OH",
        "IsoCode": "45U1",
        "TeuValue": 2,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:42",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:42"
    },
    {
        "ContainerCode": "40VH",
        "ContainerSize": "40",
        "ContainerType": "VH",
        "ExchangeCode": "40VH",
        "IsoCode": "42V0",
        "TeuValue": 2,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:43",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:43"
    },
    {
        "ContainerCode": "40NOR",
        "ContainerSize": "40",
        "ContainerType": "NOR",
        "ExchangeCode": "40NOR",
        "IsoCode": "45R1",
        "TeuValue": 2,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:44",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:44"
    },
    {
        "ContainerCode": "4HFR",
        "ContainerSize": "4",
        "ContainerType": "FR",
        "ExchangeCode": "4HFR",
        "IsoCode": "4HFR",
        "TeuValue": 2,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:45",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:45"
    },
    {
        "ContainerCode": "40FR",
        "ContainerSize": "40",
        "ContainerType": "FR",
        "ExchangeCode": "40FR",
        "IsoCode": "42P1",
        "TeuValue": 2,
        "UpdatedBy": "张三",
        "UpdatedTime": "2025-06-05 16:28:46",
        "CreatedBy": "张三",
        "CreatedTime": "2025-06-05 16:28:46"
    }
];


// 获取账单管理台账列表
export const getBaseContainerTeuList = async (): Promise<BaseContainerTeuItemProps[]> => {
  return baseContainerTeuItems;
}

// 保存账单管理
export const saveBaseContainerTeu = async (data: BaseContainerTeuItemProps, onUploadProgress?: (progress: number) => void): Promise<BaseContainerTeuItemProps> => {
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
export const getBaseContainerTeuList = async (): Promise<BaseContainerTeuItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_container_teu"
  })
  const responseData = response?.data as ApiRes<BaseContainerTeuItemProps[]>;
  return responseData.data || [];
}

export const saveBaseContainerTeu = (data:BaseContainerTeuItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_container_teu/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
